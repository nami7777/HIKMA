import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VALID_SKILL_IDS = [
  'digital-wisdom',
  'leadership',
  'communication',
  'respect',
  'hospitality',
  'adaptability',
  'critical-thinking',
] as const;

const VALID_CONTEXTS = [
  'family',
  'school',
  'community',
  'public-spaces',
  'digital',
] as const;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in server secrets.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function extractYouTubeId(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();
    if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0];
      return id && /^[a-zA-Z0-9_-]{6,15}$/.test(id) ? id : null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (parsed.pathname.startsWith('/watch')) {
        const v = parsed.searchParams.get('v');
        return v && /^[a-zA-Z0-9_-]{6,15}$/.test(v) ? v : null;
      }
      if (parsed.pathname.startsWith('/shorts/') || parsed.pathname.startsWith('/embed/')) {
        const id = parsed.pathname.split('/')[2];
        return id && /^[a-zA-Z0-9_-]{6,15}$/.test(id) ? id : null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

function extractWikipediaInfo(rawUrl: string): { lang: string; title: string } | null {
  try {
    const parsed = new URL(rawUrl);
    const match = parsed.hostname.match(/^([a-z]{2,3})\.(?:m\.)?wikipedia\.org$/i);
    if (!match) return null;
    if (!parsed.pathname.startsWith('/wiki/')) return null;
    const rawTitle = decodeURIComponent(parsed.pathname.slice('/wiki/'.length).split('#')[0]);
    if (!rawTitle) return null;
    return { lang: match[1].toLowerCase(), title: rawTitle };
  } catch {
    return null;
  }
}

async function fetchSourceMetadata(rawUrl: string) {
  const trimmed = rawUrl.trim();
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmed);
  } catch {
    throw new Error('Please enter a valid http(s) URL.');
  }
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('Only HTTP/HTTPS educational URLs are supported.');
  }

  // 1. Check YouTube
  const ytId = extractYouTubeId(trimmed);
  if (ytId) {
    const canonicalUrl = `https://www.youtube.com/watch?v=${ytId}`;
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(canonicalUrl)}&format=json`;
    const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      throw new Error(
        `Could not verify YouTube video (${res.status}). It may be private, unavailable, or embed-restricted.`
      );
    }
    const oembed = (await res.json()) as {
      title?: string;
      author_name?: string;
      thumbnail_url?: string;
      html?: string;
    };
    return {
      mediaType: 'youtube' as const,
      originalUrl: canonicalUrl,
      originalTitle: oembed.title || `YouTube Video (${ytId})`,
      sourceOrganization: oembed.author_name ? `${oembed.author_name} (YouTube)` : 'YouTube',
      youtubeVideoId: ytId,
      language: 'English',
      extractedText: `Verified YouTube video title: "${oembed.title}". Channel/Publisher: "${oembed.author_name || 'Unknown'}".`,
      thumbnailUrl: oembed.thumbnail_url,
      attributionText: `Source: ${oembed.author_name || 'YouTube Creator'} (YouTube)`,
      verificationStatus: 'Verified' as const,
    };
  }

  // 2. Check Wikipedia
  const wiki = extractWikipediaInfo(trimmed);
  if (wiki) {
    const summaryEndpoint = `https://${wiki.lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki.title)}`;
    const extractEndpoint = `https://${wiki.lang}.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&exchars=3200&titles=${encodeURIComponent(wiki.title)}&format=json`;
    const headers = { 'User-Agent': 'HIKMA-Educational-App/1.0 (https://hikma.edu)' };

    const [summaryRes, extractRes] = await Promise.all([
      fetch(summaryEndpoint, { headers, signal: AbortSignal.timeout(8000) }),
      fetch(extractEndpoint, { headers, signal: AbortSignal.timeout(8000) }),
    ]);

    if (!summaryRes.ok) {
      throw new Error(`Could not retrieve Wikipedia article "${wiki.title}" (${summaryRes.status}).`);
    }

    const summaryData = (await summaryRes.json()) as {
      title?: string;
      extract?: string;
      content_urls?: { desktop?: { page?: string } };
      thumbnail?: { source?: string };
    };

    let fullExtract = summaryData.extract || '';
    if (extractRes.ok) {
      const extractJson = (await extractRes.json()) as {
        query?: { pages?: Record<string, { extract?: string }> };
      };
      const pages = extractJson.query?.pages;
      if (pages) {
        const firstPage = Object.values(pages)[0];
        if (firstPage?.extract && firstPage.extract.length > fullExtract.length) {
          fullExtract = firstPage.extract;
        }
      }
    }

    const canonicalUrl =
      summaryData.content_urls?.desktop?.page ||
      `https://${wiki.lang}.wikipedia.org/wiki/${encodeURIComponent(wiki.title)}`;

    return {
      mediaType: 'wikipedia' as const,
      originalUrl: canonicalUrl,
      originalTitle: summaryData.title || wiki.title.replace(/_/g, ' '),
      sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
      wikipediaTitle: wiki.title,
      language: wiki.lang === 'ar' ? 'Arabic' : 'English',
      extractedText: fullExtract.slice(0, 3500),
      thumbnailUrl: summaryData.thumbnail?.source,
      attributionText: `Source: Wikipedia ("${summaryData.title || wiki.title}", CC BY-SA 4.0)`,
      verificationStatus: 'Verified' as const,
    };
  }

  // 3. Trusted Cultural / Educational Webpage
  const pageRes = await fetch(trimmed, {
    headers: {
      'User-Agent': 'HIKMA-Educational-App/1.0',
      Accept: 'text/html,application/xhtml+xml',
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!pageRes.ok) {
    throw new Error(
      `Could not retrieve webpage (${pageRes.status}). The publisher may restrict automated access.`
    );
  }
  const html = await pageRes.text();
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descMatch = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
  );
  const ogSiteMatch = html.match(
    /<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i
  );

  const strippedText = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 3000);

  const pageTitle = (titleMatch?.[1] || parsedUrl.hostname).trim();
  const orgName = (ogSiteMatch?.[1] || parsedUrl.hostname.replace(/^www\./, '')).trim();
  const metaDesc = descMatch?.[1]?.trim() || '';

  return {
    mediaType: 'cultural_webpage' as const,
    originalUrl: trimmed,
    originalTitle: pageTitle,
    sourceOrganization: orgName,
    language: 'English',
    extractedText: [metaDesc, strippedText].filter(Boolean).join('\n\n').slice(0, 3200),
    attributionText: `Source: ${orgName} (${parsedUrl.hostname})`,
    verificationStatus: 'Needs Review' as const,
  };
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    childDescription: {
      type: Type.STRING,
      description: '1-2 friendly sentences explaining what the child will explore.',
    },
    childArticleBody: {
      type: Type.STRING,
      description: 'Short, accurate, child-friendly reading summary (80-130 words) grounded strictly in the source.',
    },
    mainCulturalTopic: {
      type: Type.STRING,
      description: 'Main Emirati or universal cultural topic.',
    },
    culturalSignificance: {
      type: Type.STRING,
      description: '1-2 sentences on historical or cultural significance.',
    },
    primarySkill: {
      type: Type.STRING,
      description:
        'Must be exactly one of: digital-wisdom, leadership, communication, respect, hospitality, adaptability, critical-thinking.',
    },
    secondarySkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '0 to 2 secondary skills ONLY if genuinely supported by the source.',
    },
    skillReason: {
      type: Type.STRING,
      description: 'Why this resource meaningfully supports practicing the primary and secondary skills.',
    },
    ageSuitability: {
      type: Type.STRING,
      description: 'One of: 8-9, 10-12, 8-12.',
    },
    difficulty: {
      type: Type.STRING,
      description: 'One of: Beginner, Intermediate, Challenging.',
    },
    learningObjective: {
      type: Type.STRING,
      description: 'One clear sentence explaining the learning goal.',
    },
    viewingObjective: {
      type: Type.STRING,
      description: 'Short viewing/reading focus tip for children.',
    },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          format: { type: Type.STRING, description: 'multiple_choice, true_false, or best_response' },
          prompt: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctIndex: { type: Type.INTEGER },
          explanation: { type: Type.STRING },
        },
        required: ['format', 'prompt', 'options', 'correctIndex', 'explanation'],
      },
      description: 'Exactly 3 age-appropriate comprehension questions grounded strictly in the source.',
    },
    applicationQuestion: {
      type: Type.STRING,
      description: 'One open reflection question connecting the lesson to the child’s life.',
    },
    realWorldActivity: {
      type: Type.STRING,
      description: 'One concrete real-world activity for family, school, community, public space, or digital setting.',
    },
    atHomeEquivalent: {
      type: Type.STRING,
      description: 'Accessible at-home alternative if the activity mentions visiting a public place or special materials.',
    },
    contextSetting: {
      type: Type.STRING,
      description: 'Must be one of: family, school, community, public-spaces, digital.',
    },
    expectedOutcome: {
      type: Type.STRING,
      description: 'What real-world skill practice the child demonstrates through the activity.',
    },
    aiConfidence: {
      type: Type.INTEGER,
      description: 'Confidence integer from 0 to 100 based on how much verified source text/video was available.',
    },
    requiresAdultReview: {
      type: Type.BOOLEAN,
      description: 'True if an educator or parent should review details carefully before publishing.',
    },
  },
  required: [
    'childDescription',
    'childArticleBody',
    'mainCulturalTopic',
    'culturalSignificance',
    'primarySkill',
    'secondarySkills',
    'skillReason',
    'ageSuitability',
    'difficulty',
    'learningObjective',
    'questions',
    'applicationQuestion',
    'realWorldActivity',
    'contextSetting',
    'expectedOutcome',
    'aiConfidence',
    'requiresAdultReview',
  ],
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'hikma-api' });
  });

  app.post('/api/resources/fetch-metadata', async (req, res) => {
    try {
      const { url } = req.body as { url?: string };
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL is required.' });
      }
      const metadata = await fetchSourceMetadata(url);
      res.json(metadata);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch source metadata.';
      res.status(400).json({ error: message });
    }
  });

  app.post('/api/ai/analyze-resource', async (req, res) => {
    try {
      const { url, educatorNote } = req.body as { url?: string; educatorNote?: string };
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'A valid educational URL is required.' });
      }

      const sourceMeta = await fetchSourceMetadata(url);
      const ai = getGeminiClient();

      const systemInstruction = `You are the HIKMA Curriculum Analysis Assistant for Abu Dhabi children ages 8–12.
Your job is to classify verified cultural or educational content into HIKMA's FIXED seven life skills framework:
1. digital-wisdom (online safety, checking sources, spotting misinformation, healthy digital habits)
2. leadership (responsibility, initiative, fairness, organizing tasks, helping others)
3. communication (active listening, storytelling, speaking clearly, respectful disagreement)
4. respect (empathy, honoring elders, respecting differences, self-respect)
5. hospitality (welcoming others, generosity, kindness, inclusion)
6. adaptability (flexibility, problem-solving, resilience, creativity, adapting to change)
7. critical-thinking (asking questions, comparing information, evaluating evidence, weighing alternatives)

STRICT GROUNDING RULES:
- Base EVERY summary, fact, and question strictly on the verified source provided. Do NOT fabricate quotations, timestamps, historical dates, or facts not present in the source.
- Never force irrelevant skill links. Pick ONE primarySkill and 0–2 secondarySkills only when genuinely supported.
- Never claim watching a video or reading an article automatically builds competence; emphasize the real-world offline activity and reflection.
- Keep language warm, respectful of all families in Abu Dhabi, and clear for ages 8–12.`;

      const promptText = `Analyze this verified resource for HIKMA:
Original Title: ${sourceMeta.originalTitle}
Publisher/Organization: ${sourceMeta.sourceOrganization}
Media Type: ${sourceMeta.mediaType}
Canonical URL: ${sourceMeta.originalUrl}
${educatorNote ? `Educator Note: ${educatorNote}\n` : ''}
Retrieved Source Context:
${sourceMeta.extractedText}`;

      let limitationNote: string | undefined;
      let rawText: string | undefined;

      // Attempt multimodal YouTube understanding when mediaType === 'youtube'
      if (sourceMeta.mediaType === 'youtube') {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-4-hydrogen',
            contents: [
              {
                fileData: {
                  fileUri: sourceMeta.originalUrl,
                },
              },
              { text: promptText },
            ],
            config: {
              systemInstruction,
              thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
              responseMimeType: 'application/json',
              responseSchema: analysisSchema,
            },
          });
          rawText = response.text;
        } catch {
          // Graceful fallback to verified metadata when direct video inspection is unavailable
          limitationNote =
            'Direct video stream analysis was unavailable for this link; classification and draft questions were generated from verified oEmbed title and channel metadata. Educator verification is required before publishing.';
        }
      }

      if (!rawText) {
        const response = await ai.models.generateContent({
          model: 'gemini-4-hydrogen',
          contents: promptText,
          config: {
            systemInstruction,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
            responseMimeType: 'application/json',
            responseSchema: analysisSchema,
          },
        });
        rawText = response.text;
      }

      if (!rawText) {
        return res.status(502).json({ error: 'Gemini returned an empty response.' });
      }

      const parsed = JSON.parse(rawText);

      // Strict validation & sanitization against fixed framework
      const primarySkill = VALID_SKILL_IDS.includes(parsed.primarySkill)
        ? parsed.primarySkill
        : 'critical-thinking';

      const secondarySkills: string[] = Array.isArray(parsed.secondarySkills)
        ? parsed.secondarySkills
            .filter(
              (s: string) =>
                VALID_SKILL_IDS.includes(s as (typeof VALID_SKILL_IDS)[number]) && s !== primarySkill
            )
            .slice(0, 2)
        : [];

      const contextSetting = VALID_CONTEXTS.includes(parsed.contextSetting)
        ? parsed.contextSetting
        : 'family';

      const questions = Array.isArray(parsed.questions)
        ? parsed.questions.slice(0, 3).map((q: Record<string, unknown>, idx: number) => ({
            id: `ai-q-${Date.now()}-${idx}`,
            format:
              q.format === 'true_false' || q.format === 'best_response'
                ? q.format
                : 'multiple_choice',
            prompt: String(q.prompt || ''),
            options: Array.isArray(q.options) ? q.options.map(String) : ['Yes', 'No'],
            correctIndex:
              typeof q.correctIndex === 'number' && q.correctIndex >= 0 ? q.correctIndex : 0,
            explanation: String(q.explanation || 'Great thinking! Let us review the source together.'),
          }))
        : [];

      const resource = {
        id: `res-custom-${Date.now()}`,
        originalTitle: sourceMeta.originalTitle,
        originalUrl: sourceMeta.originalUrl,
        sourceOrganization: sourceMeta.sourceOrganization,
        mediaType: sourceMeta.mediaType,
        youtubeVideoId: 'youtubeVideoId' in sourceMeta ? sourceMeta.youtubeVideoId : undefined,
        wikipediaTitle: 'wikipediaTitle' in sourceMeta ? sourceMeta.wikipediaTitle : undefined,
        language: sourceMeta.language,
        childDescription: String(parsed.childDescription || ''),
        childArticleBody: String(parsed.childArticleBody || ''),
        mainCulturalTopic: String(parsed.mainCulturalTopic || sourceMeta.originalTitle),
        culturalSignificance: String(parsed.culturalSignificance || ''),
        primarySkill,
        secondarySkills,
        skillReason: String(parsed.skillReason || ''),
        ageSuitability:
          parsed.ageSuitability === '8-9' || parsed.ageSuitability === '10-12'
            ? parsed.ageSuitability
            : '8-12',
        difficulty:
          parsed.difficulty === 'Intermediate' || parsed.difficulty === 'Challenging'
            ? parsed.difficulty
            : 'Beginner',
        learningObjective: String(parsed.learningObjective || ''),
        viewingObjective: parsed.viewingObjective ? String(parsed.viewingObjective) : undefined,
        questions,
        applicationQuestion: String(parsed.applicationQuestion || ''),
        realWorldActivity: String(parsed.realWorldActivity || ''),
        atHomeEquivalent: parsed.atHomeEquivalent ? String(parsed.atHomeEquivalent) : undefined,
        contextSetting,
        expectedOutcome: String(parsed.expectedOutcome || ''),
        aiConfidence: Math.max(
          0,
          Math.min(100, typeof parsed.aiConfidence === 'number' ? parsed.aiConfidence : 78)
        ),
        requiresAdultReview: true, // Always require educator confirmation before child-facing publication
        verificationStatus: limitationNote ? 'Metadata Only' : sourceMeta.verificationStatus,
        editorialStatus: 'analyzed' as const,
        attributionText: sourceMeta.attributionText,
        isAiAdaptedSummary: true,
        limitationNote,
      };

      res.json({ resource, sourceMeta });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'AI analysis failed.';
      res.status(500).json({ error: message });
    }
  });

  app.post('/api/ai/explain-answer', async (req, res) => {
    try {
      const {
        questionPrompt,
        chosenOption,
        correctOption,
        sourceSummary,
        ageBand,
        language,
      } = req.body as {
        questionPrompt: string;
        chosenOption: string;
        correctOption: string;
        sourceSummary: string;
        ageBand?: string;
        language?: 'en' | 'ar';
      };

      const ai = getGeminiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `A child (age ${ageBand || '8-12'}) answered a comprehension question.
Source lesson summary: "${sourceSummary}"
Question: "${questionPrompt}"
Child picked: "${chosenOption}"
Correct answer: "${correctOption}"

Write a warm, encouraging 2-sentence hint explaining why "${correctOption}" fits best based ONLY on the source summary above.
${language === 'ar' ? 'Respond in clear, child-friendly Modern Standard Arabic.' : 'Respond in simple, encouraging English.'}
Do not chat or ask follow-up questions; just give the gentle explanation.`,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      res.json({ explanation: response.text?.trim() || '' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not generate explanation.';
      res.status(500).json({ error: message });
    }
  });

  // Vite dev middleware or production static assets
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`HIKMA server running on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start HIKMA server:', err);
  process.exit(1);
});
