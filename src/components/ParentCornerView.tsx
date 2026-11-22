import React, { useState } from 'react';
import {
  CheckCircle2,
  Lock,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import {
  ChildProfile,
  ChildProgressRecord,
  CulturalResource,
  LeafMission,
} from '../types/hikma';
import { SKILL_BRANCHES, SKILL_MAP } from '../data/skills';
import { CONTEXT_LABELS } from '../data/translations';
import { ContextIcon, SkillIcon } from './SkillIcon';

interface ParentCornerViewProps {
  profile: ChildProfile;
  leaves: LeafMission[];
  resources: CulturalResource[];
  progress: Record<string, ChildProgressRecord>;
  parentPin: string;
  onApproveLeaf: (leafId: string, parentNote?: string) => void;
  onRequestRetry: (leafId: string, parentNote: string) => void;
  onUpdateParentPin: (pin: string) => void;
  onResetProgress: () => void;
  onOpenEducatorPanel: () => void;
}

export const ParentCornerView: React.FC<ParentCornerViewProps> = ({
  profile,
  leaves,
  resources,
  progress,
  parentPin,
  onApproveLeaf,
  onRequestRetry,
  onUpdateParentPin,
  onResetProgress,
  onOpenEducatorPanel,
}) => {
  const lang = profile.preferredLanguage;
  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [notesByLeaf, setNotesByLeaf] = useState<Record<string, string>>({});
  const [newPin, setNewPin] = useState('');
  const [pinSavedMsg, setPinSavedMsg] = useState('');

  const waitingLeaves = leaves.filter((l) => progress[l.id]?.status === 'waiting_parent');
  const completedLeaves = leaves.filter((l) => progress[l.id]?.status === 'completed');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === parentPin) {
      setUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError(
        lang === 'ar'
          ? 'رمز الدخول غير صحيح. الرمز الافتراضي للتجربة هو 1234.'
          : 'Incorrect PIN. For this demo, the default local PIN is 1234.'
      );
    }
  };

  if (!unlocked) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#16212E]">
                {lang === 'ar' ? 'ركن الوالدين' : 'Parent Corner'}
              </h1>
              <p className="text-xs text-slate-500">
                {lang === 'ar'
                  ? 'مخصص لولي الأمر لمراجعة الأنشطة وتأكيد الممارسة الواقعية'
                  : 'Guardian space for reviewing real-world practice & approving leaves'}
              </p>
            </div>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label
                htmlFor="parent-pin-input"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                {lang === 'ar' ? 'أدخل رمز الوالدين (PIN)' : 'Enter Parent PIN'}
              </label>
              <input
                id="parent-pin-input"
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {pinError && <p className="text-xs text-rose-700 mt-1.5 font-medium">{pinError}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-2.5 px-5 rounded-xl bg-[#16212E] hover:bg-slate-800 text-white font-semibold text-sm cursor-pointer"
              >
                {lang === 'ar' ? 'فتح ركن الوالدين' : 'Unlock Parent Corner'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPinInput(parentPin);
                  setUnlocked(true);
                  setPinError('');
                }}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                {lang === 'ar' ? 'دخول تجريبي (PIN: 1234)' : 'Demo PIN (1234)'}
              </button>
            </div>
          </form>

          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>
              {lang === 'ar'
                ? 'تنويه النموذج الأولي: هذا الرمز المحلي مخصص للعرض التجريبي على الجهاز فقط. يتطلب النشر الفعلي مصادقة آمنة لولي الأمر وموافقة رسمية.'
                : 'Prototype security notice: This locally stored PIN demonstrates guardian gating without collecting personal data. Production deployment requires verified guardian authentication and backend access controls.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <UserCheck className="w-4 h-4" />
            <span>
              {lang === 'ar' ? 'إشراف ولي الأمر' : 'Guardian Review'} · {profile.nickname} (
              {profile.ageBand})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#16212E]">
            {lang === 'ar' ? 'ركن الوالدين' : 'Parent Corner'}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenEducatorPanel}
            className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer"
          >
            {lang === 'ar' ? 'لوحة مراجعة المعلمين' : 'Educator Review Studio'}
          </button>
          <button
            type="button"
            onClick={() => setUnlocked(false)}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            {lang === 'ar' ? 'قفل الركن' : 'Lock Corner'}
          </button>
        </div>
      </section>

      {/* Pending Approvals Queue */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#16212E]">
            {lang === 'ar'
              ? `أنشطة بانتظار موافقتك (${waitingLeaves.length})`
              : `Activities Awaiting Your Approval (${waitingLeaves.length})`}
          </h2>
        </div>

        {waitingLeaves.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-[#FAFBFD] p-6 text-center text-sm text-slate-600">
            {lang === 'ar'
              ? 'لا توجد أنشطة معلقة حالياً. عندما ينهي طفلك ورقة ويضغط "أنهيت النشاط"، ستظهر هنا لمراجعتها.'
              : 'No activities are waiting for review right now. When your child completes a leaf and taps "I’m Done", it will appear here.'}
          </div>
        ) : (
          <div className="space-y-4">
            {waitingLeaves.map((leaf) => {
              const rec = progress[leaf.id];
              const res = resources.find((r) => r.id === leaf.resourceId);
              const branch = SKILL_MAP[leaf.branchId];
              const activityText =
                lang === 'ar' && res?.realWorldActivityAr
                  ? res.realWorldActivityAr
                  : res?.realWorldActivity;
              const parentPrompt =
                rec?.parentQuestionPrompt ||
                (lang === 'ar'
                  ? `هل نفذ ${profile.nickname} هذا النشاط وتحدث معك عما تعلمه؟`
                  : `Did ${profile.nickname} practice this activity and talk with you about what they learned?`);

              return (
                <div
                  key={leaf.id}
                  className="rounded-2xl border border-amber-200 bg-[#FFFDF7] p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <SkillIcon skillId={leaf.branchId} className="w-4 h-4" color={branch.colorHex} />
                      <span className="font-bold" style={{ color: branch.darkColorHex }}>
                        {lang === 'ar' ? branch.nameAr : branch.name}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {lang === 'ar' ? `الورقة ${leaf.orderIndex}` : `Leaf ${leaf.orderIndex}`}
                      </span>
                      {res && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1">
                            <ContextIcon context={res.contextSetting} className="w-3.5 h-3.5" />
                            {CONTEXT_LABELS[res.contextSetting][lang]}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#16212E]">
                      {lang === 'ar' ? leaf.titleAr : leaf.title}
                    </h3>
                    {res && (
                      <p className="text-sm text-slate-600">
                        <strong className="text-slate-800">
                          {lang === 'ar' ? 'ما تعلمه الطفل: ' : 'What your child explored: '}
                        </strong>
                        {lang === 'ar' && res.childDescriptionAr
                          ? res.childDescriptionAr
                          : res.childDescription}
                      </p>
                    )}
                    {activityText && (
                      <p className="text-sm text-slate-700">
                        <strong className="text-slate-800">
                          {lang === 'ar' ? 'النشاط الواقعي المقترح: ' : 'Proposed real-world activity: '}
                        </strong>
                        {activityText}
                      </p>
                    )}
                    {rec?.reflectionNote && (
                      <div className="rounded-xl bg-white border border-slate-200 p-3 text-sm text-slate-800">
                        <span className="block text-xs font-semibold text-slate-500 mb-0.5">
                          {lang === 'ar'
                            ? `ملاحظة ${profile.nickname}:`
                            : `${profile.nickname}'s reflection:`}
                        </span>
                        “{rec.reflectionNote}”
                      </div>
                    )}
                  </div>

                  {/* Conversation Question for Parent to Ask Child */}
                  <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3.5 text-sm text-emerald-950">
                    <span className="block text-xs font-semibold text-emerald-800 mb-0.5">
                      {lang === 'ar'
                        ? 'سؤال حواري مقترح قبل الموافقة:'
                        : 'Conversation prompt to ask your child:'}
                    </span>
                    {parentPrompt}
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      value={notesByLeaf[leaf.id] || ''}
                      onChange={(e) =>
                        setNotesByLeaf((prev) => ({ ...prev, [leaf.id]: e.target.value }))
                      }
                      placeholder={
                        lang === 'ar'
                          ? 'ملاحظة تشجيعية اختيارية (أو سبب طلب محاولة أخرى)...'
                          : 'Optional encouraging parent note (or feedback if requesting another try)...'
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onApproveLeaf(leaf.id, notesByLeaf[leaf.id])}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {lang === 'ar'
                            ? 'تأكيد والموافقة على النشاط'
                            : 'Approve & Unlock Next Leaf'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onRequestRetry(
                            leaf.id,
                            notesByLeaf[leaf.id] ||
                              (lang === 'ar'
                                ? 'لنجرب هذا النشاط معاً اليوم ثم أعد إرساله!'
                                : 'Let us do this activity together today and try submitting again!')
                          )
                        }
                        className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm cursor-pointer"
                      >
                        {lang === 'ar' ? 'اطلب محاولة أخرى' : 'Request Another Attempt'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Progress Summary Across 7 Skills */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
        <h2 className="text-xl font-bold text-[#16212E]">
          {lang === 'ar' ? 'التقدم عبر المهارات السبع' : 'Progress Across the Seven Skills'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILL_BRANCHES.map((branch) => {
            const bLeaves = leaves.filter((l) => l.branchId === branch.id);
            const done = bLeaves.filter((l) => progress[l.id]?.status === 'completed').length;
            return (
              <div
                key={branch.id}
                className="rounded-xl border border-slate-200 p-3.5 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <SkillIcon skillId={branch.id} className="w-5 h-5" color={branch.colorHex} />
                  <div>
                    <p className="text-sm font-bold text-[#16212E]">
                      {lang === 'ar' ? branch.nameAr : branch.name}
                    </p>
                    <p className="text-xs text-slate-600 tabular-nums">
                      {lang === 'ar'
                        ? `${done} من ${bLeaves.length} أنشطة مكتملة`
                        : `${done} of ${bLeaves.length} activities completed`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {completedLeaves.length > 0 && (
          <div className="pt-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-700 mb-2">
              {lang === 'ar' ? 'الأوراق المعتمدة:' : 'Confirmed Completed Leaves:'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {completedLeaves.map((leaf) => (
                <span
                  key={leaf.id}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  {lang === 'ar' ? leaf.titleAr : leaf.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Guardian Settings & Demo Controls */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder={lang === 'ar' ? 'رمز PIN جديد (4 أرقام)' : 'New 4-digit PIN'}
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm w-44"
          />
          <button
            type="button"
            onClick={() => {
              if (/^\d{4,6}$/.test(newPin)) {
                onUpdateParentPin(newPin);
                setNewPin('');
                setPinSavedMsg(lang === 'ar' ? 'تم تحديث الرمز.' : 'PIN updated.');
                setTimeout(() => setPinSavedMsg(''), 2500);
              }
            }}
            className="px-4 py-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            {lang === 'ar' ? 'حفظ الرمز' : 'Update PIN'}
          </button>
          {pinSavedMsg && <span className="text-xs font-medium text-emerald-700">{pinSavedMsg}</span>}
        </div>

        <button
          type="button"
          onClick={onResetProgress}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'إعادة ضبط تقدم التجربة' : 'Reset Demo Progress'}</span>
        </button>
      </section>

      <div className="text-xs text-slate-500 flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-slate-400" />
        <span>
          {lang === 'ar'
            ? 'تحفظ هذه النسخة التجريبية البيانات محلياً على المتصفح دون جمع أسماء حقيقية أو صور أو مواقع.'
            : 'Privacy by design: This prototype stores progress locally on-device with nicknames only—no real names, photos, or precise locations.'}
        </span>
      </div>
    </div>
  );
};
