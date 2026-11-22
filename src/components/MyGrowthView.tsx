import React from 'react';
import { Award, CheckCircle2, BookOpenCheck, Users } from 'lucide-react';
import {
  ChildProfile,
  ChildProgressRecord,
  CulturalResource,
  EcosystemContext,
  LeafMission,
} from '../types/hikma';
import { SKILL_BRANCHES } from '../data/skills';
import { CONTEXT_LABELS, EVIDENCE_STAGE_LABELS, UI_COPY } from '../data/translations';
import { ContextIcon, SkillIcon } from './SkillIcon';

interface MyGrowthViewProps {
  profile: ChildProfile;
  leaves: LeafMission[];
  resources: CulturalResource[];
  progress: Record<string, ChildProgressRecord>;
  onOpenLeaf: (leafId: string) => void;
}

export const MyGrowthView: React.FC<MyGrowthViewProps> = ({
  profile,
  leaves,
  resources,
  progress,
  onOpenLeaf,
}) => {
  const lang = profile.preferredLanguage;
  const copy = UI_COPY[lang];

  const allRecords = Object.values(progress);
  const completedLeaves = leaves.filter((l) => progress[l.id]?.status === 'completed');
  const waitingLeaves = leaves.filter((l) => progress[l.id]?.status === 'waiting_parent');
  const discoveredCount = allRecords.filter((r) => r.evidenceStage !== 'not_started').length;
  const totalQuestionsAnswered = allRecords.reduce(
    (sum, r) => sum + (r.questionsAnsweredCount || 0),
    0
  );

  const completedBranchesCount = SKILL_BRANCHES.filter((b) => {
    const bLeaves = leaves.filter((l) => l.branchId === b.id);
    return bLeaves.length > 0 && bLeaves.every((l) => progress[l.id]?.status === 'completed');
  }).length;

  const activePracticedSkills = SKILL_BRANCHES.filter((b) => {
    const bLeaves = leaves.filter((l) => l.branchId === b.id);
    return bLeaves.some((l) => {
      const st = progress[l.id]?.evidenceStage;
      return st && st !== 'not_started';
    });
  });

  const contexts: EcosystemContext[] = [
    'family',
    'school',
    'community',
    'public-spaces',
    'digital',
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            {lang === 'ar' ? `رحلة ${profile.nickname}` : `${profile.nickname}'s Journey`}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#16212E] mt-1">
            {lang === 'ar' ? 'نموي وتقدمي في المهارات' : 'My Growth & Practice Log'}
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
            {lang === 'ar'
              ? 'تسجل هذه الصفحة خطوات استكشافك وممارستك الواقعية مع أسرتك ومدرستك ومجتمعك — وليست اختبار ذكاء.'
              : 'This log tracks your real-life exploration, understanding, and family-confirmed practice—never an intelligence score.'}
          </p>
        </div>
      </section>

      {/* Engagement Summary Strip (No fake IQ/scorecards, clean tabular figures) */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: lang === 'ar' ? 'الأوراق المكتملة' : 'Leaves Completed',
            value: `${completedLeaves.length}/${leaves.length}`,
          },
          {
            label: lang === 'ar' ? 'الفروع المكتملة' : 'Branches Completed',
            value: `${completedBranchesCount}/7`,
          },
          {
            label: lang === 'ar' ? 'الأسئلة المجابة' : 'Questions Answered',
            value: String(totalQuestionsAnswered),
          },
          {
            label: lang === 'ar' ? 'الأنشطة المعتمدة' : 'Activities Approved',
            value: String(completedLeaves.length),
          },
          {
            label: lang === 'ar' ? 'تجارب تم اكتشافها' : 'Experiences Explored',
            value: String(discoveredCount),
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5"
          >
            <span className="block text-xs font-medium text-slate-500">{stat.label}</span>
            <span className="block text-2xl font-bold tabular-nums text-[#16212E] mt-1">
              {stat.value}
            </span>
          </div>
        ))}
      </section>

      {/* 7 Skill Branches Progress & 4-Stage Evidence Breakdown */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-[#16212E]">
            {lang === 'ar' ? 'تقدمك عبر المهارات السبع' : 'Progress Across the Seven Life Skills'}
          </h2>
          <span className="text-xs text-slate-500">
            {lang === 'ar'
              ? `تمارس حالياً ${activePracticedSkills.length} من 7 مهارات`
              : `Currently practicing ${activePracticedSkills.length} of 7 skills`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_BRANCHES.map((branch) => {
            const bLeaves = leaves
              .filter((l) => l.branchId === branch.id)
              .sort((a, b) => a.orderIndex - b.orderIndex);
            const doneCount = bLeaves.filter(
              (l) => progress[l.id]?.status === 'completed'
            ).length;
            const pct = bLeaves.length > 0 ? Math.round((doneCount / bLeaves.length) * 100) : 0;

            return (
              <div
                key={branch.id}
                className="rounded-xl border border-slate-200/90 p-4 space-y-3 bg-[#FAFBFD]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: branch.softBgHex }}
                    >
                      <SkillIcon skillId={branch.id} className="w-5 h-5" color={branch.colorHex} />
                    </span>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-[#16212E]">
                        {lang === 'ar' ? branch.nameAr : branch.name}
                      </h3>
                      <p className="text-xs text-slate-500 tabular-nums">
                        {lang === 'ar'
                          ? `${doneCount} من ${bLeaves.length} أنشطة مكتملة`
                          : `${doneCount} of ${bLeaves.length} activities completed`}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-slate-700">{pct}%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: branch.colorHex }}
                  />
                </div>

                {/* Leaf-by-leaf engagement stages */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {bLeaves.map((leaf) => {
                    const rec = progress[leaf.id];
                    const stage = rec?.evidenceStage || 'not_started';
                    const isLocked = rec?.status === 'locked';
                    return (
                      <button
                        key={leaf.id}
                        type="button"
                        disabled={isLocked}
                        onClick={() => onOpenLeaf(leaf.id)}
                        title={`${leaf.title}: ${EVIDENCE_STAGE_LABELS[stage][lang]}`}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                          rec?.status === 'completed'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold cursor-pointer'
                            : rec?.status === 'waiting_parent'
                            ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold cursor-pointer'
                            : !isLocked
                            ? 'bg-white border-slate-300 text-slate-800 hover:border-slate-500 cursor-pointer'
                            : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        #{leaf.orderIndex} · {EVIDENCE_STAGE_LABELS[stage][lang]}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Completed & Pending Leaves */}
      {(completedLeaves.length > 0 || waitingLeaves.length > 0) && (
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#16212E] flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700" />
            <span>
              {lang === 'ar' ? 'الأوراق المنجزة وقيد المراجعة' : 'Completed & Pending Leaves'}
            </span>
          </h2>
          <div className="divide-y divide-slate-100">
            {[...waitingLeaves, ...completedLeaves].map((leaf) => {
              const rec = progress[leaf.id];
              const res = resources.find((r) => r.id === leaf.resourceId);
              const isDone = rec?.status === 'completed';
              return (
                <div
                  key={leaf.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">
                        {lang === 'ar'
                          ? SKILL_BRANCHES.find((b) => b.id === leaf.branchId)?.nameAr
                          : SKILL_BRANCHES.find((b) => b.id === leaf.branchId)?.name}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{res ? CONTEXT_LABELS[res.contextSetting][lang] : ''}</span>
                      <span aria-hidden="true">·</span>
                      <span>{EVIDENCE_STAGE_LABELS[rec.evidenceStage][lang]}</span>
                    </div>
                    <p className="text-base font-semibold text-[#16212E] mt-0.5">
                      {lang === 'ar' ? leaf.titleAr : leaf.title}
                    </p>
                    {rec.reflectionNote && (
                      <p className="text-sm text-slate-600 mt-1">“{rec.reflectionNote}”</p>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold shrink-0 ${
                      isDone ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {isDone
                        ? lang === 'ar'
                          ? 'مؤكد من الوالدين'
                          : 'Parent Confirmed'
                        : lang === 'ar'
                        ? 'بانتظار الوالدين'
                        : 'Waiting for Parent'}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Part A & Part B Ecosystem Answer */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-[#16212E] flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>
              {lang === 'ar'
                ? 'كيف ينمي نظام حكمة المهارات في أبوظبي؟'
                : 'How HIKMA Reinforces Life Skills Across Five Settings'}
            </span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {copy.frameworkDisclaimer}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {contexts.map((ctx) => {
            const count = completedLeaves.filter((l) => {
              const res = resources.find((r) => r.id === l.resourceId);
              return res?.contextSetting === ctx;
            }).length;

            return (
              <div
                key={ctx}
                className="rounded-xl border border-slate-200 bg-[#FAFBFD] p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-bold text-sm text-[#16212E]">
                    <ContextIcon context={ctx} className="w-4 h-4 text-emerald-700" />
                    {CONTEXT_LABELS[ctx][lang]}
                  </span>
                  <span className="text-xs font-semibold tabular-nums text-slate-500">
                    {count}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'ar'
                    ? CONTEXT_LABELS[ctx].descriptionAr
                    : CONTEXT_LABELS[ctx].descriptionEn}
                </p>
              </div>
            );
          })}
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-4 flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
          <BookOpenCheck className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p>
            {lang === 'ar'
              ? 'ملاحظة: مراحل التقدم الأربع (اكتشاف، فهم، تطبيق، وتأكيد الوالدين) توثق المشاركة والممارسة الواقعية، وليست قياساً نفسياً لقدرات الطفل.'
              : 'Engagement distinction: Discovered (watched or read) → Understood (answered questions) → Practiced (real-world activity) → Parent Confirmed (verified at home). These record practice and participation, not psychological competence scores.'}
          </p>
        </div>
      </section>
    </div>
  );
};
