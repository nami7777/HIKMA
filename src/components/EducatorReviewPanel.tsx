import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Loader2,
  Lock,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  AdminAnalyzedDraft,
  CulturalResource,
  EditorialStatus,
  LeafMission,
  SkillId,
} from '../types/hikma';
import { SKILL_BRANCHES, SKILL_MAP } from '../data/skills';
import { CONTEXT_LABELS } from '../data/translations';
import { SkillIcon } from './SkillIcon';

interface EducatorReviewPanelProps {
  leaves: LeafMission[];
  drafts: AdminAnalyzedDraft[];
  onAddDraft: (draft: AdminAnalyzedDraft) => void;
  onUpdateDraft: (
    draftId: string,
    updater: (d: AdminAnalyzedDraft) => AdminAnalyzedDraft
  ) => void;
  onPublishDraft: (draftId: string) => void;
  onExit: () => void;
}

const SAMPLE_VERIFIED_URLS = [
  {
    label: 'Wikipedia: Al Ain Oasis',
    url: 'https://en.wikipedia.org/wiki/Al_Ain_Oasis',
  },
  {
    label: 'YouTube (UNESCO): Al-Taghrooda Poetry',
    url: 'https://www.youtube.com/watch?v=Cd3g3o2Wq0Y',
  },
  {
    label: 'YouTube (UNESCO): Al Sadu Weaving',
    url: 'https://www.youtube.com/watch?v=N4iXW0V2BEE',
  },
];

const STATUS_DISPLAY: Record<EditorialStatus, string> = {
  submitted: 'Submitted',
  analyzed: 'Analyzed',
  needs_review: 'Needs Review',
  approved: 'Approved',
  rejected: 'Rejected',
  published: 'Published',
};

export const EducatorReviewPanel: React.FC<EducatorReviewPanelProps> = ({
  leaves,
  drafts,
  onAddDraft,
  onUpdateDraft,
  onPublishDraft,
  onExit,
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  const [urlInput, setUrlInput] = useState('');
  const [educatorNote, setEducatorNote] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState('');
  const [activeDraftId, setActiveDraftId] = useState<string | null>(
    drafts[0]?.id || null
  );

  const activeDraft = drafts.find((d) => d.id === activeDraftId) || drafts[0] || null;

  const handlePassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === '2026') {
      setUnlocked(true);
      setPassError('');
    } else {
      setPassError('Incorrect Educator Passcode. Use 2026 for demo access.');
    }
  };

  const handleAnalyzeUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setAnalyzing(true);
    setAnalyzeError('');
    try {
      const res = await fetch('/api/ai/analyze-resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urlInput.trim(),
          educatorNote: educatorNote.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Analysis failed.');
      }
      const resource = data.resource as CulturalResource;
      const newDraft: AdminAnalyzedDraft = {
        id: `draft-${Date.now()}`,
        submittedUrl: urlInput.trim(),
        submittedAt: new Date().toISOString(),
        status: resource.limitationNote ? 'needs_review' : 'analyzed',
        resource,
        assignedBranchId: resource.primarySkill,
        targetLeafId: '__NEW__',
        newLeafTitle: resource.originalTitle.slice(0, 38),
      };
      onAddDraft(newDraft);
      setActiveDraftId(newDraft.id);
      setUrlInput('');
      setEducatorNote('');
    } catch (err) {
      setAnalyzeError(err instanceof Error ? err.message : 'Unable to analyze URL.');
    } finally {
      setAnalyzing(false);
    }
  };

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#16212E]">Educator Content Review</h1>
              <p className="text-xs text-slate-500">Protected curriculum curation studio</p>
            </div>
          </div>

          <form onSubmit={handlePassSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="educator-passcode"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                Educator Passcode
              </label>
              <input
                id="educator-passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {passError && <p className="text-xs text-rose-700 mt-1.5">{passError}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#16212E] hover:bg-slate-800 text-white text-sm font-semibold cursor-pointer"
              >
                Enter Studio
              </button>
              <button
                type="button"
                onClick={() => {
                  setPasscode('2026');
                  setUnlocked(true);
                }}
                className="py-2.5 px-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Demo Passcode (2026)
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Child Tree</span>
          </button>
        </div>
      </div>
    );
  }

  const branchLeavesForDraft = activeDraft
    ? leaves
        .filter((l) => l.branchId === activeDraft.assignedBranchId)
        .sort((a, b) => a.orderIndex - b.orderIndex)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6" dir="ltr">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#16212E] mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Educator Studio</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#16212E]">
            AI Content Review & Curation Panel
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Gemini analyzes verified URLs and proposes skill mappings. Educators make the final approval and publishing decision.
          </p>
        </div>
      </div>

      {/* Step 1: Submit New Source URL for Gemini Analysis */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#16212E]">
          Analyze a Cultural Resource URL with Gemini
        </h2>

        <form onSubmit={handleAnalyzeUrl} className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-6">
              <label htmlFor="admin-url" className="block text-xs font-semibold text-slate-600 mb-1">
                Public YouTube, Wikipedia, or Trusted Cultural Webpage URL
              </label>
              <input
                id="admin-url"
                type="url"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://en.wikipedia.org/wiki/Al_Ain_Oasis or https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="lg:col-span-4">
              <label htmlFor="admin-note" className="block text-xs font-semibold text-slate-600 mb-1">
                Optional Educator Focus Note
              </label>
              <input
                id="admin-note"
                type="text"
                value={educatorNote}
                onChange={(e) => setEducatorNote(e.target.value)}
                placeholder="e.g. Focus on water sharing for ages 8–10"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="lg:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={analyzing}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-400 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Quick verified URLs:</span>
            {SAMPLE_VERIFIED_URLS.map((sample) => (
              <button
                key={sample.url}
                type="button"
                onClick={() => setUrlInput(sample.url)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>

          {analyzeError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
              {analyzeError}
            </div>
          )}
        </form>
      </section>

      {/* Draft Queue + Structured Review Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Queue */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <h2 className="text-sm font-bold text-slate-700">
            Review Queue ({drafts.length})
          </h2>

          {drafts.length === 0 ? (
            <p className="text-xs text-slate-500 leading-relaxed py-4">
              Paste a verified YouTube or Wikipedia URL above to run Gemini skill classification and review generated questions before publishing.
            </p>
          ) : (
            <div className="space-y-2">
              {drafts.map((d) => {
                const active = activeDraft?.id === d.id;
                const branch = SKILL_MAP[d.assignedBranchId];
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDraftId(d.id)}
                    className={`w-full text-start p-3 rounded-xl border transition-colors cursor-pointer ${
                      active
                        ? 'border-emerald-600 bg-emerald-50/40'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold" style={{ color: branch.darkColorHex }}>
                        {branch.name}
                      </span>
                      <span className="font-semibold text-slate-700">
                        {STATUS_DISPLAY[d.status]}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#16212E] truncate">
                      {d.resource.originalTitle}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        {/* Right Detailed Review & Edit Workspace */}
        <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          {!activeDraft ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Select an analyzed resource from the queue or submit a new URL above.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Source Metadata Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{activeDraft.resource.sourceOrganization}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeDraft.resource.mediaType}</span>
                    <span aria-hidden="true">·</span>
                    <span>AI Confidence: {activeDraft.resource.aiConfidence}%</span>
                    <span aria-hidden="true">·</span>
                    <span>Verification: {activeDraft.resource.verificationStatus}</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#16212E]">
                    {activeDraft.resource.originalTitle}
                  </h2>
                  <a
                    href={activeDraft.resource.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    <span>{activeDraft.resource.originalUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800">
                  Status: {STATUS_DISPLAY[activeDraft.status]}
                </span>
              </div>

              {activeDraft.resource.limitationNote && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950">
                  <strong>Source Limitation Note:</strong> {activeDraft.resource.limitationNote}
                </div>
              )}

              {/* Skill Classification & Reasoning */}
              <div className="rounded-xl bg-[#FAFBFD] border border-slate-200 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Primary Skill Branch (Editable)
                    </label>
                    <select
                      value={activeDraft.assignedBranchId}
                      onChange={(e) => {
                        const nextBranch = e.target.value as SkillId;
                        onUpdateDraft(activeDraft.id, (d) => ({
                          ...d,
                          assignedBranchId: nextBranch,
                          targetLeafId: '__NEW__',
                          resource: { ...d.resource, primarySkill: nextBranch },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-[#16212E]"
                    >
                      {SKILL_BRANCHES.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="block text-xs font-semibold text-slate-600 mb-1">
                      Secondary Skills (If Justified)
                    </span>
                    <div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs">
                      {activeDraft.resource.secondarySkills.length === 0 ? (
                        <span className="text-slate-500">None forced</span>
                      ) : (
                        activeDraft.resource.secondarySkills.map((sid) => {
                          const sb = SKILL_MAP[sid];
                          return sb ? (
                            <span key={sid} className="inline-flex items-center gap-1 font-semibold">
                              <SkillIcon skillId={sid} className="w-3.5 h-3.5" color={sb.colorHex} />
                              {sb.name}
                            </span>
                          ) : null;
                        })
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong>AI Skill Reasoning:</strong> {activeDraft.resource.skillReason}
                </p>
              </div>

              {/* Editable Child-Friendly Summary & Learning Objective */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Child-Friendly Description
                  </label>
                  <textarea
                    rows={2}
                    value={activeDraft.resource.childDescription}
                    onChange={(e) =>
                      onUpdateDraft(activeDraft.id, (d) => ({
                        ...d,
                        resource: { ...d.resource, childDescription: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Child-Friendly Reading Summary (Grounded in Source)
                  </label>
                  <textarea
                    rows={3}
                    value={activeDraft.resource.childArticleBody}
                    onChange={(e) =>
                      onUpdateDraft(activeDraft.id, (d) => ({
                        ...d,
                        resource: { ...d.resource, childArticleBody: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              {/* Editable AI-Generated Questions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#16212E]">
                  Generated Comprehension Questions ({activeDraft.resource.questions.length})
                </h3>
                {activeDraft.resource.questions.map((q, qIdx) => (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 p-3.5 space-y-2 bg-[#FAFBFD]"
                  >
                    <input
                      type="text"
                      value={q.prompt}
                      onChange={(e) =>
                        onUpdateDraft(activeDraft.id, (d) => ({
                          ...d,
                          resource: {
                            ...d.resource,
                            questions: d.resource.questions.map((item, idx) =>
                              idx === qIdx ? { ...item, prompt: e.target.value } : item
                            ),
                          },
                        }))
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-sm font-semibold"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`px-2.5 py-1.5 rounded-lg border ${
                            optIdx === q.correctIndex
                              ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-semibold'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {optIdx === q.correctIndex ? '✓ ' : ''}
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-World Activity & Leaf Assignment */}
              <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Ecosystem Setting
                    </label>
                    <select
                      value={activeDraft.resource.contextSetting}
                      onChange={(e) =>
                        onUpdateDraft(activeDraft.id, (d) => ({
                          ...d,
                          resource: {
                            ...d.resource,
                            contextSetting: e.target.value as CulturalResource['contextSetting'],
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm"
                    >
                      {Object.keys(CONTEXT_LABELS).map((k) => (
                        <option key={k} value={k}>
                          {CONTEXT_LABELS[k as keyof typeof CONTEXT_LABELS].en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Assign to Leaf on {SKILL_MAP[activeDraft.assignedBranchId].name}
                    </label>
                    <select
                      value={activeDraft.targetLeafId}
                      onChange={(e) =>
                        onUpdateDraft(activeDraft.id, (d) => ({
                          ...d,
                          targetLeafId: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm"
                    >
                      <option value="__NEW__">+ Add as New Leaf on Branch</option>
                      {branchLeavesForDraft.map((l) => (
                        <option key={l.id} value={l.id}>
                          Replace Leaf {l.orderIndex}: {l.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Leaf Title on Tree
                  </label>
                  <input
                    type="text"
                    value={activeDraft.newLeafTitle || ''}
                    onChange={(e) =>
                      onUpdateDraft(activeDraft.id, (d) => ({
                        ...d,
                        newLeafTitle: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Real-World Activity Prompt
                  </label>
                  <textarea
                    rows={2}
                    value={activeDraft.resource.realWorldActivity}
                    onChange={(e) =>
                      onUpdateDraft(activeDraft.id, (d) => ({
                        ...d,
                        resource: { ...d.resource, realWorldActivity: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>

              {/* Editorial Approval & Publish Controls */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateDraft(activeDraft.id, (d) => ({ ...d, status: 'approved' }))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-sm font-semibold cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Approved</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onUpdateDraft(activeDraft.id, (d) => ({ ...d, status: 'rejected' }))
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-900 text-sm font-semibold cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>

                <button
                  type="button"
                  disabled={activeDraft.status === 'rejected'}
                  onClick={() => onPublishDraft(activeDraft.id)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white text-sm font-semibold cursor-pointer"
                >
                  {activeDraft.status === 'published'
                    ? 'Republish Updates to Tree'
                    : 'Approve & Publish to Tree'}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
