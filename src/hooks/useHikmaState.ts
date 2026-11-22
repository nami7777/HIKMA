import { useState, useEffect, useCallback } from 'react';
import {
  AdminAnalyzedDraft,
  ChildProfile,
  ChildProgressRecord,
  CulturalResource,
  LeafMission,
  SkillId,
} from '../types/hikma';
import { INITIAL_LEAVES, INITIAL_RESOURCES } from '../data/resources';
import { SKILL_BRANCHES } from '../data/skills';

const STORAGE_KEY = 'hikma_wisdom_tree_v1';

interface PersistedHikmaState {
  profile: ChildProfile;
  resources: CulturalResource[];
  leaves: LeafMission[];
  progress: Record<string, ChildProgressRecord>;
  adminDrafts: AdminAnalyzedDraft[];
  parentPin: string;
}

function createInitialProgress(leaves: LeafMission[]): Record<string, ChildProgressRecord> {
  const map: Record<string, ChildProgressRecord> = {};
  for (const leaf of leaves) {
    map[leaf.id] = {
      leafId: leaf.id,
      status: leaf.orderIndex === 1 ? 'available' : 'locked',
      evidenceStage: 'not_started',
      questionsAnsweredCount: 0,
    };
  }
  return map;
}

const DEFAULT_PROFILE: ChildProfile = {
  nickname: 'Noor',
  ageBand: '8-9',
  preferredLanguage: 'en',
  startingSkill: 'communication',
  onboarded: false,
};

function loadInitialState(): PersistedHikmaState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PersistedHikmaState;
      if (parsed.leaves && parsed.resources && parsed.progress && parsed.profile) {
        return parsed;
      }
    }
  } catch {
    // Fallback to fresh initial state
  }
  return {
    profile: DEFAULT_PROFILE,
    resources: INITIAL_RESOURCES,
    leaves: INITIAL_LEAVES,
    progress: createInitialProgress(INITIAL_LEAVES),
    adminDrafts: [],
    parentPin: '1234',
  };
}

export function useHikmaState() {
  const [state, setState] = useState<PersistedHikmaState>(() => loadInitialState());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors in restricted preview modes
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.dir = state.profile.preferredLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = state.profile.preferredLanguage;
  }, [state.profile.preferredLanguage]);

  const completeOnboarding = useCallback((nextProfile: Omit<ChildProfile, 'onboarded'>) => {
    setState((prev) => ({
      ...prev,
      profile: { ...nextProfile, onboarded: true },
    }));
  }, []);

  const toggleLanguage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        preferredLanguage: prev.profile.preferredLanguage === 'en' ? 'ar' : 'en',
      },
    }));
  }, []);

  const markDiscovered = useCallback((leafId: string) => {
    setState((prev) => {
      const curr = prev.progress[leafId];
      if (!curr || curr.status === 'locked' || curr.status === 'completed') return prev;
      const nextStage =
        curr.evidenceStage === 'not_started' ? 'discovered' : curr.evidenceStage;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [leafId]: { ...curr, evidenceStage: nextStage },
        },
      };
    });
  }, []);

  const markUnderstood = useCallback((leafId: string, count: number) => {
    setState((prev) => {
      const curr = prev.progress[leafId];
      if (!curr || curr.status === 'locked' || curr.status === 'completed') return prev;
      const nextStage =
        curr.evidenceStage === 'not_started' || curr.evidenceStage === 'discovered'
          ? 'understood'
          : curr.evidenceStage;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [leafId]: {
            ...curr,
            evidenceStage: nextStage,
            questionsAnsweredCount: Math.max(curr.questionsAnsweredCount, count),
          },
        },
      };
    });
  }, []);

  const submitForParentApproval = useCallback(
    (leafId: string, reflectionNote: string, parentQuestionPrompt: string) => {
      setState((prev) => {
        const curr = prev.progress[leafId];
        if (!curr || curr.status === 'locked') return prev;
        return {
          ...prev,
          progress: {
            ...prev.progress,
            [leafId]: {
              ...curr,
              status: 'waiting_parent',
              evidenceStage: 'practiced',
              reflectionNote: reflectionNote.trim(),
              parentQuestionPrompt,
              submittedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    []
  );

  const approveLeaf = useCallback((leafId: string, parentNote?: string) => {
    setState((prev) => {
      const targetLeaf = prev.leaves.find((l) => l.id === leafId);
      if (!targetLeaf) return prev;

      const updatedProgress = { ...prev.progress };
      const curr = updatedProgress[leafId];
      updatedProgress[leafId] = {
        ...(curr || { leafId, questionsAnsweredCount: 2 }),
        status: 'completed',
        evidenceStage: 'parent_confirmed',
        approvedAt: new Date().toISOString(),
        parentNote: parentNote?.trim() || undefined,
      };

      // Unlock the next sequential leaf in the same branch
      const branchLeaves = prev.leaves
        .filter((l) => l.branchId === targetLeaf.branchId)
        .sort((a, b) => a.orderIndex - b.orderIndex);
      const currentIdx = branchLeaves.findIndex((l) => l.id === leafId);
      const nextLeaf = currentIdx >= 0 ? branchLeaves[currentIdx + 1] : undefined;

      if (nextLeaf) {
        const nextCurr = updatedProgress[nextLeaf.id];
        if (!nextCurr || nextCurr.status === 'locked') {
          updatedProgress[nextLeaf.id] = {
            ...(nextCurr || {
              leafId: nextLeaf.id,
              evidenceStage: 'not_started',
              questionsAnsweredCount: 0,
            }),
            status: 'available',
          };
        }
      }

      return { ...prev, progress: updatedProgress };
    });
  }, []);

  const requestAnotherTry = useCallback((leafId: string, parentNote: string) => {
    setState((prev) => {
      const curr = prev.progress[leafId];
      if (!curr) return prev;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [leafId]: {
            ...curr,
            status: 'available',
            parentNote: parentNote.trim() || 'Let us talk about this activity together and try once more!',
          },
        },
      };
    });
  }, []);

  const addAdminDraft = useCallback((draft: AdminAnalyzedDraft) => {
    setState((prev) => ({
      ...prev,
      adminDrafts: [draft, ...prev.adminDrafts],
    }));
  }, []);

  const updateAdminDraft = useCallback((draftId: string, updater: (d: AdminAnalyzedDraft) => AdminAnalyzedDraft) => {
    setState((prev) => ({
      ...prev,
      adminDrafts: prev.adminDrafts.map((d) => (d.id === draftId ? updater(d) : d)),
    }));
  }, []);

  const publishDraftToTree = useCallback((draftId: string) => {
    setState((prev) => {
      const draft = prev.adminDrafts.find((d) => d.id === draftId);
      if (!draft) return prev;

      const publishedResource: CulturalResource = {
        ...draft.resource,
        primarySkill: draft.assignedBranchId,
        editorialStatus: 'published',
        requiresAdultReview: false,
        humanApprovedBy: 'Educator Review Studio',
      };

      const existingResIndex = prev.resources.findIndex((r) => r.id === publishedResource.id);
      const nextResources =
        existingResIndex >= 0
          ? prev.resources.map((r) => (r.id === publishedResource.id ? publishedResource : r))
          : [...prev.resources, publishedResource];

      let nextLeaves = [...prev.leaves];
      const nextProgress = { ...prev.progress };

      if (draft.targetLeafId === '__NEW__') {
        const branchLeaves = nextLeaves.filter((l) => l.branchId === draft.assignedBranchId);
        const maxOrder = branchLeaves.reduce((m, l) => Math.max(m, l.orderIndex), 0);
        const prevTopLeaf = branchLeaves.find((l) => l.orderIndex === maxOrder);
        const prevCompleted = prevTopLeaf
          ? nextProgress[prevTopLeaf.id]?.status === 'completed'
          : false;

        const newLeafId = `leaf-custom-${Date.now()}`;
        const newLeaf: LeafMission = {
          id: newLeafId,
          branchId: draft.assignedBranchId,
          orderIndex: maxOrder + 1,
          title: draft.newLeafTitle?.trim() || publishedResource.originalTitle.slice(0, 34),
          titleAr: publishedResource.originalTitleAr || draft.newLeafTitle?.trim() || publishedResource.originalTitle.slice(0, 34),
          difficultyLevel: Math.min(6, maxOrder + 1),
          resourceId: publishedResource.id,
        };
        nextLeaves.push(newLeaf);
        nextProgress[newLeafId] = {
          leafId: newLeafId,
          status: prevCompleted || branchLeaves.length === 0 ? 'available' : 'locked',
          evidenceStage: 'not_started',
          questionsAnsweredCount: 0,
        };
      } else {
        nextLeaves = nextLeaves.map((l) =>
          l.id === draft.targetLeafId
            ? {
                ...l,
                title: draft.newLeafTitle?.trim() || publishedResource.originalTitle.slice(0, 36),
                resourceId: publishedResource.id,
              }
            : l
        );
      }

      const nextDrafts = prev.adminDrafts.map((d) =>
        d.id === draftId ? { ...d, status: 'published' as const, resource: publishedResource } : d
      );

      return {
        ...prev,
        resources: nextResources,
        leaves: nextLeaves,
        progress: nextProgress,
        adminDrafts: nextDrafts,
      };
    });
  }, []);

  const updateParentPin = useCallback((nextPin: string) => {
    if (/^\d{4,6}$/.test(nextPin)) {
      setState((prev) => ({ ...prev, parentPin: nextPin }));
    }
  }, []);

  const resetDemoProgress = useCallback(() => {
    setState((prev) => ({
      ...prev,
      progress: createInitialProgress(prev.leaves),
    }));
  }, []);

  const getBranchStats = useCallback(
    (branchId: SkillId) => {
      const branchLeaves = state.leaves
        .filter((l) => l.branchId === branchId)
        .sort((a, b) => a.orderIndex - b.orderIndex);
      const completed = branchLeaves.filter(
        (l) => state.progress[l.id]?.status === 'completed'
      ).length;
      const waiting = branchLeaves.filter(
        (l) => state.progress[l.id]?.status === 'waiting_parent'
      ).length;
      return {
        total: branchLeaves.length,
        completed,
        waiting,
        isBranchCompleted: branchLeaves.length > 0 && completed === branchLeaves.length,
        leaves: branchLeaves,
      };
    },
    [state.leaves, state.progress]
  );

  const totalCompletedLeaves = Object.values(state.progress).filter(
    (p) => p.status === 'completed'
  ).length;

  const completedBranchesCount = SKILL_BRANCHES.filter((b) => {
    const branchLeaves = state.leaves.filter((l) => l.branchId === b.id);
    return (
      branchLeaves.length > 0 &&
      branchLeaves.every((l) => state.progress[l.id]?.status === 'completed')
    );
  }).length;

  return {
    ...state,
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
    getBranchStats,
  };
}
