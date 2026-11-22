import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  HelpCircle,
  PlayCircle,
  Sparkles,
} from 'lucide-react';
import {
  ChildProfile,
  ChildProgressRecord,
  CulturalResource,
  LeafMission,
} from '../types/hikma';
import { SKILL_MAP } from '../data/skills';
import { CONTEXT_LABELS, EVIDENCE_STAGE_LABELS, UI_COPY } from '../data/translations';
import { ContextIcon, SkillIcon } from './SkillIcon';

interface LeafActivityViewProps {
  leaf: LeafMission;
  resource: CulturalResource;
  record?: ChildProgressRecord;
  profile: ChildProfile;
  onBack: () => void;
  onMarkDiscovered: (leafId: string) => void;
  onMarkUnderstood: (leafId: string, count: number) => void;
  onSubmitToParent: (
    leafId: string,
    reflectionNote: string,
    suggestedParentQuestion: string
  ) => void;
}

export const LeafActivityView: React.FC<LeafActivityViewProps> = ({
  leaf,
  resource,
  record,
  profile,
  onBack,
  onMarkDiscovered,
  onMarkUnderstood,
  onSubmitToParent,
}) => {
  const lang = profile.preferredLanguage;
  const copy = UI_COPY[lang];
  const isRtl = lang === 'ar';
  const branch = SKILL_MAP[leaf.branchId];

  const isCompleted = record?.status === 'completed';
  const isWaitingParent = record?.status === 'waiting_parent';

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(
    isWaitingParent || isCompleted ? 5 : 1
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [aiHints, setAiHints] = useState<Record<string, string>>({});
  const [loadingHintId, setLoadingHintId] = useState<string | null>(null);
  const [reflection, setReflection] = useState<string>(record?.reflectionNote || '');
  const [showOriginalMeta, setShowOriginalMeta] = useState(false);

  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const title = lang === 'ar' && leaf.titleAr ? leaf.titleAr : leaf.title;
  const learningGoal =
    lang === 'ar' && resource.learningObjectiveAr
      ? resource.learningObjectiveAr
      : resource.learningObjective;
  const description =
    lang === 'ar' && resource.childDescriptionAr
      ? resource.childDescriptionAr
      : resource.childDescription;
  const articleBody =
    lang === 'ar' && resource.childArticleBodyAr
      ? resource.childArticleBodyAr
      : resource.childArticleBody;
  const activityText =
    lang === 'ar' && resource.realWorldActivityAr
      ? resource.realWorldActivityAr
      : resource.realWorldActivity;
  const atHomeText =
    lang === 'ar' && resource.atHomeEquivalentAr
      ? resource.atHomeEquivalentAr
      : resource.atHomeEquivalent;

  const allQuestionsAnsweredCorrectly =
    resource.questions.length > 0 &&
    resource.questions.every((q) => selectedAnswers[q.id] === q.correctIndex);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleAskSimplerHint = async (questionId: string) => {
    const q = resource.questions.find((item) => item.id === questionId);
    if (!q) return;
    const chosenIdx = selectedAnswers[questionId];
    const chosenText = chosenIdx !== undefined ? q.options[chosenIdx] : '';
    const correctText = q.options[q.correctIndex] || '';

    setLoadingHintId(questionId);
    try {
      const res = await fetch('/api/ai/explain-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionPrompt: q.prompt,
          chosenOption: chosenText,
          correctOption: correctText,
          sourceSummary: resource.childArticleBody,
          ageBand: profile.ageBand,
          language: lang,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { explanation?: string };
        if (data.explanation) {
          setAiHints((prev) => ({ ...prev, [questionId]: data.explanation! }));
        }
      }
    } catch {
      // Fallback gracefully to built-in curated explanation
      setAiHints((prev) => ({ ...prev, [questionId]: q.explanation }));
    } finally {
      setLoadingHintId(null);
    }
  };

  const goToStep = (targetStep: 1 | 2 | 3 | 4 | 5) => {
    if (targetStep === 3) {
      onMarkDiscovered(leaf.id);
    }
    if (targetStep === 4) {
      onMarkUnderstood(leaf.id, resource.questions.length);
    }
    setStep(targetStep);
  };

  const handleSubmitDone = (e: React.FormEvent) => {
    e.preventDefault();
    const suggestedParentQuestion =
      lang === 'ar'
        ? `هل شارك ${profile.nickname} في نشاط: "${activityText}"؟ وكيف سار الحديث معكم؟`
        : `Did ${profile.nickname} complete "${activityText}" and share what they learned?`;

    onSubmitToParent(
      leaf.id,
      reflection.trim() ||
        (lang === 'ar'
          ? 'استكشفت الدرس وأكملت النشاط الواقعي.'
          : 'I explored the lesson and practiced the real-world activity!'),
      suggestedParentQuestion
    );
    setStep(5);
  };

  const stepLabels = [
    { num: 1 as const, label: copy.discoverStep },
    { num: 2 as const, label: copy.watchReadStep },
    { num: 3 as const, label: copy.thinkStep },
    { num: 4 as const, label: copy.doStep },
    { num: 5 as const, label: copy.parentStep },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#16212E] py-1.5 cursor-pointer"
        >
          <BackIcon className="w-4 h-4" />
          <span>{lang === 'ar' ? 'العودة إلى الشجرة' : 'Back to My Tree'}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <SkillIcon skillId={leaf.branchId} className="w-4 h-4" color={branch.colorHex} />
          <span className="font-semibold" style={{ color: branch.darkColorHex }}>
            {lang === 'ar' ? branch.nameAr : branch.name}
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {lang === 'ar' ? `الورقة ${leaf.orderIndex}` : `Leaf ${leaf.orderIndex}`}
          </span>
          {record?.evidenceStage && record.evidenceStage !== 'not_started' && (
            <>
              <span aria-hidden="true">·</span>
              <span>{EVIDENCE_STAGE_LABELS[record.evidenceStage][lang]}</span>
            </>
          )}
        </div>
      </div>

      {/* 5-Step Progress Rail */}
      <nav
        aria-label="Lesson steps"
        className="grid grid-cols-5 gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200"
      >
        {stepLabels.map((item) => {
          const active = step === item.num;
          const passed = step > item.num || isCompleted;
          return (
            <button
              key={item.num}
              type="button"
              onClick={() => setStep(item.num)}
              className={`py-2 px-2 rounded-xl text-xs font-semibold transition-colors truncate cursor-pointer ${
                active
                  ? 'text-white shadow-xs'
                  : passed
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
              style={active ? { backgroundColor: branch.colorHex } : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Parent Feedback Banner if returned for another try */}
      {record?.parentNote && record.status === 'available' && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <p className="font-semibold mb-0.5">
            {lang === 'ar' ? 'رسالة من الوالدين:' : 'Note from your Parent:'}
          </p>
          <p>{record.parentNote}</p>
        </div>
      )}

      {/* Main Step Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* STEP 1: DISCOVER */}
        {step === 1 && (
          <div>
            {/* Cultural Illustration with Resilient Fallback */}
            <div className="relative w-full aspect-[16/9] max-h-80 bg-gradient-to-br from-[#EAF4F0] via-[#F7F4EA] to-[#E6EEF6] overflow-hidden border-b border-slate-100">
              {resource.illustrationUrl ? (
                <img
                  src={resource.illustrationUrl}
                  alt={resource.originalTitle}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <SkillIcon
                    skillId={leaf.branchId}
                    className="w-12 h-12 mb-3"
                    color={branch.colorHex}
                  />
                  <p className="text-base font-semibold text-slate-700">
                    {resource.mainCulturalTopic}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                    <ContextIcon context={resource.contextSetting} className="w-3.5 h-3.5" />
                    {CONTEXT_LABELS[resource.contextSetting][lang]}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{resource.difficulty}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {resource.mediaType === 'youtube'
                      ? lang === 'ar'
                        ? 'فيديو تعليمي'
                        : 'Educational Video'
                      : lang === 'ar'
                      ? 'بطاقة معرفية موثقة'
                      : 'Verified Reading'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-[#16212E] text-balance">
                  {title}
                </h1>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  {learningGoal}
                </p>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

              {/* Secondary skill connections (only when justified) */}
              {resource.secondarySkills.length > 0 && (
                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-700">
                    {lang === 'ar' ? 'يدعم أيضاً:' : 'Also supports:'}
                  </span>
                  {resource.secondarySkills.map((sid) => {
                    const sb = SKILL_MAP[sid];
                    return sb ? (
                      <span key={sid} className="inline-flex items-center gap-1 font-medium">
                        <SkillIcon skillId={sid} className="w-3.5 h-3.5" color={sb.colorHex} />
                        <span>{lang === 'ar' ? sb.nameAr : sb.name}</span>
                      </span>
                    ) : null;
                  })}
                </div>
              )}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500">{resource.attributionText}</span>
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="px-6 py-3 rounded-xl text-white font-semibold text-sm sm:text-base transition-opacity hover:opacity-95 cursor-pointer"
                  style={{ backgroundColor: branch.colorHex }}
                >
                  {lang === 'ar' ? 'هيا نشاهد ونقرأ' : 'Start Exploring'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: WATCH OR READ */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                {resource.mediaType === 'youtube' ? (
                  <PlayCircle className="w-5 h-5" style={{ color: branch.colorHex }} />
                ) : (
                  <BookOpen className="w-5 h-5" style={{ color: branch.colorHex }} />
                )}
                <span>{resource.originalTitle}</span>
              </div>
              <span className="text-xs text-slate-500">
                {resource.isAiAdaptedSummary
                  ? lang === 'ar'
                    ? 'ملخص ميسّر مدعوم بالذكاء الاصطناعي من مصدر موثق'
                    : 'AI-adapted child summary from verified source'
                  : lang === 'ar'
                  ? 'مادة معتمدة من المعلمين'
                  : 'Educator-approved material'}
              </span>
            </div>

            {resource.viewingObjective && (
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 text-sm text-slate-700">
                <strong className="font-semibold text-[#16212E]">
                  {lang === 'ar' ? 'ركز أثناء المشاهدة: ' : 'Look & Listen For: '}
                </strong>
                {resource.viewingObjective}
              </div>
            )}

            {/* Embedded Official YouTube Player (No Autoplay, Privacy-Enhanced) */}
            {resource.mediaType === 'youtube' && resource.youtubeVideoId && (
              <div className="space-y-2">
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                  <iframe
                    title={resource.originalTitle}
                    src={`https://www.youtube-nocookie.com/embed/${resource.youtubeVideoId}?rel=0&modestbranding=1&autoplay=0`}
                    className="w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{resource.attributionText}</span>
                  <a
                    href={resource.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 underline"
                  >
                    <span>{lang === 'ar' ? 'فتح المصدر الأصلي' : 'Open original video'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Child-Friendly Article Reading */}
            <div className="rounded-xl bg-[#FAFBFD] border border-slate-200/90 p-5 space-y-3">
              <p className="text-base text-[#16212E] leading-relaxed">{articleBody}</p>
              <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>{resource.attributionText}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowOriginalMeta((v) => !v)}
                    className="font-semibold text-slate-700 hover:underline cursor-pointer"
                  >
                    {showOriginalMeta
                      ? lang === 'ar'
                        ? 'إخفاء تفاصيل المصدر'
                        : 'Hide source details'
                      : lang === 'ar'
                      ? 'عرض تفاصيل المصدر'
                      : 'View source details'}
                  </button>
                  <a
                    href={resource.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                  >
                    <span>{lang === 'ar' ? 'رابط المقال الأصلي' : 'Original source'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {showOriginalMeta && (
                <div className="mt-2 pt-3 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                  <p>
                    <strong>Original Title:</strong> {resource.originalTitle}
                  </p>
                  <p>
                    <strong>Publisher:</strong> {resource.sourceOrganization}
                  </p>
                  <p>
                    <strong>Cultural Significance:</strong>{' '}
                    {lang === 'ar' && resource.culturalSignificanceAr
                      ? resource.culturalSignificanceAr
                      : resource.culturalSignificance}
                  </p>
                  <p>
                    <strong>Why this skill connects:</strong>{' '}
                    {lang === 'ar' && resource.skillReasonAr
                      ? resource.skillReasonAr
                      : resource.skillReason}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {lang === 'ar' ? 'السابق' : 'Back'}
              </button>
              <button
                type="button"
                onClick={() => goToStep(3)}
                className="px-6 py-3 rounded-xl text-white font-semibold text-sm sm:text-base transition-opacity hover:opacity-95 cursor-pointer"
                style={{ backgroundColor: branch.colorHex }}
              >
                {lang === 'ar' ? 'أكملت المشاهدة — إلى الأسئلة' : "I've Explored This — Next"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: THINK */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#16212E]">
                {lang === 'ar' ? 'تأمل وفكر فيما تعلمته' : 'Think About What You Learned'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {lang === 'ar'
                  ? 'أجب عن هذه الأسئلة القصيرة لتتأكد من فهم الفكرة الرئيسية.'
                  : 'Answer these quick questions grounded in the story to check your understanding.'}
              </p>
            </div>

            <div className="space-y-6">
              {resource.questions.map((q, qIdx) => {
                const chosen = selectedAnswers[q.id];
                const hasChosen = chosen !== undefined;
                const isRight = chosen === q.correctIndex;
                const qPrompt = lang === 'ar' && q.promptAr ? q.promptAr : q.prompt;
                const qOptions =
                  lang === 'ar' && q.optionsAr && q.optionsAr.length === q.options.length
                    ? q.optionsAr
                    : q.options;
                const qExpl =
                  lang === 'ar' && q.explanationAr ? q.explanationAr : q.explanation;

                return (
                  <div
                    key={q.id}
                    className="rounded-xl border border-slate-200 p-4 sm:p-5 space-y-3 bg-[#FAFBFD]"
                  >
                    <p className="font-semibold text-[#16212E] text-base">
                      <span className="tabular-nums text-slate-400 me-2">0{qIdx + 1}.</span>
                      {qPrompt}
                    </p>

                    <div className="space-y-2">
                      {qOptions.map((opt, optIdx) => {
                        const isSelected = chosen === optIdx;
                        const isCorrectOpt = optIdx === q.correctIndex;

                        let btnClass =
                          'bg-white border-slate-200 text-slate-800 hover:border-slate-400';
                        if (isSelected && isCorrectOpt) {
                          btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        } else if (isSelected && !isCorrectOpt) {
                          btnClass = 'bg-amber-50 border-amber-400 text-amber-950';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`w-full text-start px-4 py-3 rounded-xl border text-sm transition-colors cursor-pointer ${btnClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {hasChosen && (
                      <div
                        className={`rounded-xl p-3.5 text-sm space-y-2 ${
                          isRight
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                            : 'bg-amber-50 text-amber-950 border border-amber-200'
                        }`}
                      >
                        <p className="font-semibold">
                          {isRight
                            ? lang === 'ar'
                              ? 'إجابة موفقة!'
                              : 'Great thinking!'
                            : lang === 'ar'
                            ? 'اقتربت كثيراً — لنراجعها معاً:'
                            : 'Almost! Let us look closer:'}
                        </p>
                        <p>{aiHints[q.id] || qExpl}</p>

                        {!isRight && !aiHints[q.id] && (
                          <button
                            type="button"
                            onClick={() => handleAskSimplerHint(q.id)}
                            disabled={loadingHintId === q.id}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 underline hover:no-underline cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>
                              {loadingHintId === q.id
                                ? lang === 'ar'
                                  ? 'جاري تبسيط الشرح...'
                                  : 'Preparing a helpful hint...'
                                : lang === 'ar'
                                ? 'اشرح لي بطريقة أبسط'
                                : 'Explain in a simpler way'}
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {lang === 'ar' ? 'السابق' : 'Back'}
              </button>
              <button
                type="button"
                disabled={!allQuestionsAnsweredCorrectly}
                onClick={() => goToStep(4)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                  allQuestionsAnsweredCorrectly
                    ? 'text-white cursor-pointer hover:opacity-95'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
                style={allQuestionsAnsweredCorrectly ? { backgroundColor: branch.colorHex } : undefined}
              >
                {allQuestionsAnsweredCorrectly
                  ? lang === 'ar'
                    ? 'ممتاز! إلى النشاط الواقعي'
                    : 'Great! Go to Real-World Activity'
                  : lang === 'ar'
                  ? 'أجب عن كل الأسئلة بشكل صحيح للمتابعة'
                  : 'Answer all questions correctly to continue'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DO (REAL-WORLD ACTIVITY) */}
        {step === 4 && (
          <form onSubmit={handleSubmitDone} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                <ContextIcon context={resource.contextSetting} className="w-4 h-4" />
                <span>
                  {lang === 'ar' ? 'بيئة التطبيق:' : 'Learning Setting:'}{' '}
                  {CONTEXT_LABELS[resource.contextSetting][lang]}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#16212E]">
                {lang === 'ar' ? 'جرّب هذا في حياتك الواقعية!' : 'Practice This in Real Life!'}
              </h2>
              <p className="text-sm text-slate-600">
                {lang === 'ar'
                  ? 'المشاهدة والقراءة بداية جميلة، والممارسة الواقعية هي التي تنمي مهارتك.'
                  : 'Watching or reading starts the spark—doing the real-world activity is how your skill grows.'}
              </p>
            </div>

            <div
              className="rounded-2xl border p-5 space-y-3"
              style={{
                backgroundColor: branch.softBgHex,
                borderColor: branch.borderHex,
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: branch.darkColorHex }}>
                {lang === 'ar' ? 'مهمتك العملية' : 'Your Real-World Mission'}
              </p>
              <p className="text-base sm:text-lg font-semibold text-[#16212E] leading-relaxed">
                {activityText}
              </p>
              {atHomeText && (
                <p className="text-sm text-slate-700 pt-2 border-t border-black/10">
                  {atHomeText}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="child-reflection"
                className="block text-sm font-semibold text-[#16212E]"
              >
                {lang === 'ar' && resource.applicationQuestionAr
                  ? resource.applicationQuestionAr
                  : resource.applicationQuestion}
              </label>
              <textarea
                id="child-reflection"
                rows={3}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'اكتب جملة أو جملتين عما فعلته أو تعلمته مع أسرتك...'
                    : 'Write 1–2 sentences about what you did or talked about...'
                }
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {lang === 'ar' ? 'السابق' : 'Back'}
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base transition-colors cursor-pointer"
              >
                {copy.submitToParent}
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: PARENT APPROVAL STATUS */}
        {step === 5 && (
          <div className="p-6 sm:p-10 text-center space-y-5">
            {isCompleted ? (
              <>
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="text-2xl font-bold text-[#16212E]">
                  {lang === 'ar'
                    ? `أحسنت! نما فرع ${branch.nameAr}!`
                    : `Amazing! Your ${branch.name} branch has grown!`}
                </h2>
                <p className="text-base text-slate-600 max-w-md mx-auto">
                  {lang === 'ar'
                    ? 'تم تأكيد هذا النشاط من والديك، والورقة التالية مفتوحة الآن على شجرتك.'
                    : 'Your parent confirmed this real-world activity, and the next leaf on your branch is now unlocked!'}
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <Clock className="w-9 h-9" />
                </div>
                <h2 className="text-2xl font-bold text-[#16212E]">
                  {lang === 'ar'
                    ? 'رائع! أُرسل نشاطك إلى ركن الوالدين'
                    : 'Sent! Waiting for Parent Approval'}
                </h2>
                <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                  {lang === 'ar'
                    ? 'أخبر أحد والديك أن يفتح "ركن الوالدين" لمراجعة ما تعلمته وتأكيد إتمام النشاط، وعندها ستخضر هذه الورقة وتنفتح الورقة التالية!'
                    : 'Ask a parent to open Parent Corner to talk with you about your activity and approve it. Once approved, this leaf turns green and unlocks the next one!'}
                </p>
              </>
            )}

            {reflection && (
              <div className="max-w-md mx-auto rounded-xl bg-slate-50 border border-slate-200 p-4 text-start text-sm text-slate-700">
                <span className="block text-xs font-semibold text-slate-500 mb-1">
                  {lang === 'ar' ? 'ملاحظتك:' : 'Your Reflection:'}
                </span>
                {reflection}
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{lang === 'ar' ? 'العودة إلى شجرتي' : 'Return to My Tree'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
