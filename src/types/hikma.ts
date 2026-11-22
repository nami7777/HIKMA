export type SkillId =
  | 'digital-wisdom'
  | 'leadership'
  | 'communication'
  | 'respect'
  | 'hospitality'
  | 'adaptability'
  | 'critical-thinking';

export type EcosystemContext =
  | 'family'
  | 'school'
  | 'community'
  | 'public-spaces'
  | 'digital';

export type MediaType =
  | 'youtube'
  | 'wikipedia'
  | 'cultural_webpage'
  | 'educator_approved';

export type LeafStatus =
  | 'locked'
  | 'available'
  | 'waiting_parent'
  | 'completed';

export type EvidenceStage =
  | 'not_started'
  | 'discovered'
  | 'understood'
  | 'practiced'
  | 'parent_confirmed';

export type EditorialStatus =
  | 'submitted'
  | 'analyzed'
  | 'needs_review'
  | 'approved'
  | 'rejected'
  | 'published';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Challenging';

export type QuestionFormat =
  | 'multiple_choice'
  | 'true_false'
  | 'best_response'
  | 'reflection';

export interface QuizQuestion {
  id: string;
  format: QuestionFormat;
  prompt: string;
  promptAr?: string;
  options: string[];
  optionsAr?: string[];
  correctIndex: number;
  explanation: string;
  explanationAr?: string;
}

export interface SourceCitation {
  originalTitle: string;
  originalUrl: string;
  sourceOrganization: string;
  mediaType: MediaType;
  attributionText: string;
  verificationStatus: 'Verified' | 'Metadata Only' | 'Needs Review';
}

export interface AISkillClassification {
  primarySkill: SkillId;
  secondarySkills: SkillId[];
  reasoning: string;
  aiConfidence: number;
  requiresAdultReview: boolean;
  limitationNote?: string;
}

export interface CulturalResource {
  id: string;
  originalTitle: string;
  originalTitleAr?: string;
  originalUrl: string;
  sourceOrganization: string;
  mediaType: MediaType;
  youtubeVideoId?: string;
  wikipediaTitle?: string;
  language: string;
  childDescription: string;
  childDescriptionAr?: string;
  childArticleBody: string;
  childArticleBodyAr?: string;
  mainCulturalTopic: string;
  culturalSignificance: string;
  culturalSignificanceAr?: string;
  primarySkill: SkillId;
  secondarySkills: SkillId[];
  skillReason: string;
  skillReasonAr?: string;
  ageSuitability: '8-9' | '10-12' | '8-12';
  difficulty: DifficultyLevel;
  learningObjective: string;
  learningObjectiveAr?: string;
  viewingObjective?: string;
  questions: QuizQuestion[];
  applicationQuestion: string;
  applicationQuestionAr?: string;
  realWorldActivity: string;
  realWorldActivityAr?: string;
  atHomeEquivalent?: string;
  atHomeEquivalentAr?: string;
  contextSetting: EcosystemContext;
  expectedOutcome: string;
  aiConfidence: number;
  requiresAdultReview: boolean;
  verificationStatus: 'Verified' | 'Metadata Only' | 'Needs Review';
  editorialStatus: EditorialStatus;
  attributionText: string;
  illustrationUrl?: string;
  isAiAdaptedSummary: boolean;
  humanApprovedBy?: string;
  limitationNote?: string;
}

export interface LeafMission {
  id: string;
  branchId: SkillId;
  orderIndex: number;
  title: string;
  titleAr: string;
  difficultyLevel: number;
  resourceId: string;
}

export interface SkillBranch {
  id: SkillId;
  name: string;
  nameAr: string;
  colorHex: string;
  darkColorHex: string;
  softBgHex: string;
  borderHex: string;
  description: string;
  descriptionAr: string;
  culturalConnection: string;
  culturalConnectionAr: string;
  learns: string[];
  learnsAr: string[];
}

export interface ChildProfile {
  nickname: string;
  ageBand: '8-9' | '10-12';
  preferredLanguage: 'en' | 'ar';
  startingSkill: SkillId;
  onboarded: boolean;
}

export interface ChildProgressRecord {
  leafId: string;
  status: LeafStatus;
  evidenceStage: EvidenceStage;
  questionsAnsweredCount: number;
  reflectionNote?: string;
  submittedAt?: string;
  approvedAt?: string;
  parentQuestionPrompt?: string;
  parentNote?: string;
}

export interface ParentApprovalRequest {
  leafId: string;
  branchId: SkillId;
  leafTitle: string;
  learnedSummary: string;
  activityPrompt: string;
  contextSetting: EcosystemContext;
  childReflection: string;
  suggestedParentQuestion: string;
  submittedAt: string;
}

export interface AdminAnalyzedDraft {
  id: string;
  submittedUrl: string;
  submittedAt: string;
  status: EditorialStatus;
  resource: CulturalResource;
  assignedBranchId: SkillId;
  targetLeafId: string; // existing leafId or '__NEW__'
  newLeafTitle?: string;
}
