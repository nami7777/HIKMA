import { EcosystemContext, EvidenceStage, LeafStatus } from '../types/hikma';

export const CONTEXT_LABELS: Record<
  EcosystemContext,
  { en: string; ar: string; descriptionEn: string; descriptionAr: string }
> = {
  family: {
    en: 'Family',
    ar: 'الأسرة',
    descriptionEn: 'Conversations, shared traditions, and practicing values at home.',
    descriptionAr: 'الحوارات الأسرية، والتقاليد المشتركة، وممارسة القيم في المنزل.',
  },
  school: {
    en: 'School',
    ar: 'المدرسة',
    descriptionEn: 'Group discussions, teamwork, presentations, and classroom tasks.',
    descriptionAr: 'النقاشات الصفية، والعمل الجماعي، والعروض التقديمية، والمهام التعليمية.',
  },
  community: {
    en: 'Community',
    ar: 'المجتمع',
    descriptionEn: 'Helping neighbors, inclusion, and youth-friendly community initiatives.',
    descriptionAr: 'مساعدة الجيران، والشمولية، والمبادرات المجتمعية المناسبة للأطفال.',
  },
  'public-spaces': {
    en: 'Public Spaces',
    ar: 'الأماكن العامة',
    descriptionEn: 'Visits to museums, cultural centers, and heritage sites (with at-home equivalents).',
    descriptionAr: 'زيارة المتاحف والمراكز الثقافية والمواقع التراثية (مع بديل منزلي متاح).',
  },
  digital: {
    en: 'Digital',
    ar: 'الفضاء الرقمي',
    descriptionEn: 'Educational videos, verified articles, interactive questions, and safe digital habits.',
    descriptionAr: 'مقاطع الفيديو التعليمية، والمقالات الموثقة، والأسئلة التفاعلية، والعادات الرقمية الآمنة.',
  },
};

export const LEAF_STATUS_LABELS: Record<LeafStatus, { en: string; ar: string }> = {
  locked: { en: 'Locked', ar: 'مغلق' },
  available: { en: 'Ready to Explore', ar: 'جاهز للاستكشاف' },
  waiting_parent: { en: 'Waiting for Parent', ar: 'بانتظار موافقة الوالدين' },
  completed: { en: 'Completed', ar: 'مكتمل' },
};

export const EVIDENCE_STAGE_LABELS: Record<EvidenceStage, { en: string; ar: string }> = {
  not_started: { en: 'Not Started', ar: 'لم يبدأ بعد' },
  discovered: { en: 'Discovered', ar: 'تم الاكتشاف' },
  understood: { en: 'Understood', ar: 'تم الفهم' },
  practiced: { en: 'Practiced', ar: 'تم التطبيق' },
  parent_confirmed: { en: 'Parent Confirmed', ar: 'تم تأكيد الوالدين' },
};

export const UI_COPY = {
  en: {
    brand: 'HIKMA',
    tagline: 'Rooted in Culture. Growing for the Future.',
    navTree: 'My Tree',
    navGrowth: 'My Growth',
    navParent: 'Parent Corner',
    rootsCulture: 'Culture',
    rootsFamily: 'Family',
    centralMessage:
      'Our roots are family and culture. Our branches are life skills. Every experience helps us grow.',
    frameworkDisclaimer:
      'Proposed practical framework: these seven domains are the skills HIKMA prioritizes for children ages 8–12, rather than a scientific ranking or official ECA standard.',
    stepsSimple:
      'Choose a branch · Open a leaf · Watch or read · Do an activity · Get parent approval · Grow your tree',
    onboardingTitle: 'Welcome to HIKMA',
    onboardingSubtitle: 'Grow your wisdom tree by exploring culture and practicing real-life skills.',
    nicknameLabel: 'Your nickname (never your full name)',
    ageBandLabel: 'Your age group',
    languageLabel: 'Preferred language',
    startSkillLabel: 'Which skill would you like to practice first?',
    startButton: 'Plant My Tree',
    useDemoExplorer: 'Use Explorer Profile (Noor, 9)',
    discoverStep: '1. Discover',
    watchReadStep: '2. Watch or Read',
    thinkStep: '3. Think',
    doStep: '4. Do',
    parentStep: '5. Parent Approval',
    submitToParent: "I'm Done — Ask Parent to Review",
    educatorLink: 'Educator Review',
  },
  ar: {
    brand: 'حكمة',
    tagline: 'جذورنا في الثقافة.. وننمو للمستقبل.',
    navTree: 'شجرتي',
    navGrowth: 'نموي',
    navParent: 'ركن الوالدين',
    rootsCulture: 'الثقافة',
    rootsFamily: 'الأسرة',
    centralMessage:
      'جذورنا هي الأسرة والثقافة. وفروعنا هي مهارات الحياة. كل تجربة تساعدنا على النمو.',
    frameworkDisclaimer:
      'إطار عملي مقترح: تمثل هذه المجالات السبعة المهارات التي يركز عليها مشروع حكمة للأطفال بعمر 8–12 عاماً، وليست تصنيفاً علمياً أو معياراً رسمياً.',
    stepsSimple:
      'اختر فرعاً · افتح ورقة · شاهد أو اقرأ · نفذ نشاطاً · احصل على موافقة الوالدين · انمِ شجرتك',
    onboardingTitle: 'مرحباً بك في حكمة',
    onboardingSubtitle: 'انمِ شجرة حكمتك عبر استكشاف التراث وممارسة مهارات الحياة الواقعية.',
    nicknameLabel: 'الاسم المستعار (لا تكتب اسمك الكامل)',
    ageBandLabel: 'الفئة العمرية',
    languageLabel: 'اللغة المفضلة',
    startSkillLabel: 'ما المهارة التي تود أن تبدأ بها؟',
    startButton: 'ابدأ رحلتي',
    useDemoExplorer: 'استخدم ملف مستكشف تجريبي (نور، 9 سنوات)',
    discoverStep: '١. اكتشف',
    watchReadStep: '٢. شاهد أو اقرأ',
    thinkStep: '٣. فكر',
    doStep: '٤. طبّق',
    parentStep: '٥. موافقة الوالدين',
    submitToParent: 'أنهيت النشاط — أرسل للوالدين',
    educatorLink: 'مراجعة المعلمين',
  },
};
