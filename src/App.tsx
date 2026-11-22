import { useState } from 'react';
import { useHikmaState } from './hooks/useHikmaState';
import { Header, MainTab } from './components/Header';
import { OnboardingModal } from './components/OnboardingModal';
import { SkillTreeCanvas } from './components/SkillTreeCanvas';
import { LeafActivityView } from './components/LeafActivityView';
import { MyGrowthView } from './components/MyGrowthView';
import { ParentCornerView } from './components/ParentCornerView';
import { EducatorReviewPanel } from './components/EducatorReviewPanel';
import { UI_COPY } from './data/translations';

export default function App() {
  const {
    profile,
    resources,
    leaves,
    progress,
    adminDrafts,
    parentPin,
    totalCompletedLeaves,
    completedBranchesCount,
    completeOnboarding,
    toggleLanguage,
    markDiscovered,
    markUnderstood,
    submitForParentApproval,
    approveLeaf,
    requestAnotherTry,
    addAdminDraft,
    updateAdminDraft,
    publishDraftToTree,
    updateParentPin,
    resetDemoProgress,
  } = useHikmaState();

  const [activeTab, setActiveTab] = useState<MainTab>('tree');
  const [activeLeafId, setActiveLeafId] = useState<string | null>(null);
  const [inEducatorMode, setInEducatorMode] = useState(false);

  const lang = profile.preferredLanguage;
  const copy = UI_COPY[lang];

  const pendingApprovalCount = Object.values(progress).filter(
    (p) => p.status === 'waiting_parent'
  ).length;

  const activeLeaf = activeLeafId ? leaves.find((l) => l.id === activeLeafId) : undefined;
  const activeResource = activeLeaf
    ? resources.find((r) => r.id === activeLeaf.resourceId)
    : undefined;

  const handleSelectTab = (tab: MainTab) => {
    setInEducatorMode(false);
    setActiveLeafId(null);
    setActiveTab(tab);
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F4F8FB] text-[#16212E]"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {!profile.onboarded && (
        <OnboardingModal initialProfile={profile} onComplete={completeOnboarding} />
      )}

      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        language={lang}
        onToggleLanguage={toggleLanguage}
        pendingApprovalCount={pendingApprovalCount}
        inEducatorMode={inEducatorMode}
      />

      <main className="flex-1">
        {inEducatorMode ? (
          <EducatorReviewPanel
            leaves={leaves}
            drafts={adminDrafts}
            onAddDraft={addAdminDraft}
            onUpdateDraft={updateAdminDraft}
            onPublishDraft={publishDraftToTree}
            onExit={() => {
              setInEducatorMode(false);
              setActiveTab('tree');
            }}
          />
        ) : activeLeaf && activeResource ? (
          <LeafActivityView
            leaf={activeLeaf}
            resource={activeResource}
            record={progress[activeLeaf.id]}
            profile={profile}
            onBack={() => setActiveLeafId(null)}
            onMarkDiscovered={markDiscovered}
            onMarkUnderstood={markUnderstood}
            onSubmitToParent={submitForParentApproval}
          />
        ) : activeTab === 'tree' ? (
          <SkillTreeCanvas
            profile={profile}
            leaves={leaves}
            resources={resources}
            progress={progress}
            onOpenLeaf={(leafId) => setActiveLeafId(leafId)}
            totalCompletedLeaves={totalCompletedLeaves}
            completedBranchesCount={completedBranchesCount}
          />
        ) : activeTab === 'growth' ? (
          <MyGrowthView
            profile={profile}
            leaves={leaves}
            resources={resources}
            progress={progress}
            onOpenLeaf={(leafId) => setActiveLeafId(leafId)}
          />
        ) : (
          <ParentCornerView
            profile={profile}
            leaves={leaves}
            resources={resources}
            progress={progress}
            parentPin={parentPin}
            onApproveLeaf={approveLeaf}
            onRequestRetry={requestAnotherTry}
            onUpdateParentPin={updateParentPin}
            onResetProgress={resetDemoProgress}
            onOpenEducatorPanel={() => setInEducatorMode(true)}
          />
        )}
      </main>

      <footer className="border-t border-slate-200/80 bg-[#FAFBFD] py-5 px-4 sm:px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-start">
            <span className="font-semibold text-slate-700">{copy.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{copy.tagline}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setActiveLeafId(null);
                setInEducatorMode(true);
              }}
              className="text-slate-500 hover:text-slate-900 underline underline-offset-2 cursor-pointer"
            >
              {copy.educatorLink}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
