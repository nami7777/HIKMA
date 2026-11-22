import { SkillBranch } from '../types/hikma';

export const SKILL_BRANCHES: SkillBranch[] = [
  {
    id: 'digital-wisdom',
    name: 'Digital Wisdom',
    nameAr: 'الحكمة الرقمية',
    colorHex: '#2563EB',
    darkColorHex: '#1D4ED8',
    softBgHex: '#EFF6FF',
    borderHex: '#BFDBFE',
    description:
      'Staying safe online, checking reliable sources, spotting misleading claims, and building healthy digital habits.',
    descriptionAr:
      'البقاء بأمان عبر الإنترنت، والتحقق من المصادر الموثوقة، وتمييز المعلومات المضللة، وبناء عادات رقمية صحية.',
    culturalConnection:
      'Comparing authentic Emirati heritage sources with misleading online captions and claims.',
    culturalConnectionAr:
      'مقارنة المصادر التراثية الإماراتية الموثوقة مع المنشورات المضللة عبر الإنترنت.',
    learns: [
      'Stay safe online',
      'Check reliable information',
      'Spot misleading claims',
      'Use technology responsibly',
      'Practice healthy digital habits',
    ],
    learnsAr: [
      'البقاء بأمان على الإنترنت',
      'التحقق من صحة المعلومات',
      'اكتشاف الادعاءات المضللة',
      'استخدام التكنولوجيا بمسؤولية',
      'ممارسة عادات رقمية صحية',
    ],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    nameAr: 'القيادة',
    colorHex: '#D97706',
    darkColorHex: '#B45309',
    softBgHex: '#FFFBEB',
    borderHex: '#FDE68A',
    description:
      'Taking responsibility, showing initiative, making fair decisions, helping others, and organizing shared activities.',
    descriptionAr:
      'تحمل المسؤولية، والمبادرة، واتخاذ قرارات عادلة، ومساعدة الآخرين، وتنظيم الأنشطة المشتركة.',
    culturalConnection:
      'Verified stories of the UAE’s early unification, community cooperation, and thoughtful leadership.',
    culturalConnectionAr:
      'قصص موثقة عن بناء دولة الإمارات، والتعاون المجتمعي، والقيادة الحكيمة.',
    learns: [
      'Take responsibility',
      'Show positive initiative',
      'Make fair decisions',
      'Help teammates and family',
      'Organize group activities',
    ],
    learnsAr: [
      'تحمل المسؤولية',
      'إظهار المبادرة الإيجابية',
      'اتخاذ قرارات عادلة',
      'مساعدة الفريق والأسرة',
      'تنظيم الأنشطة الجماعية',
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    nameAr: 'التواصل',
    colorHex: '#7C3AED',
    darkColorHex: '#6D28D9',
    softBgHex: '#F5F3FF',
    borderHex: '#DDD6FE',
    description:
      'Listening actively, sharing stories clearly, speaking with confidence, explaining ideas, and disagreeing respectfully.',
    descriptionAr:
      'الاستماع الفعّال، ورواية القصص بوضوح، والتحدث بثقة، وشرح الأفكار، والاختلاف باحترام.',
    culturalConnection:
      'Emirati oral storytelling, Al-Taghrooda poetry, and respectful dialogue across generations in the majlis.',
    culturalConnectionAr:
      'الرواية الشفهية الإماراتية، وشعر التغرودة، والحوار المحترم بين الأجيال في المجلس.',
    learns: [
      'Listen attentively',
      'Tell stories with clarity',
      'Speak confidently',
      'Explain ideas simply',
      'Disagree respectfully',
    ],
    learnsAr: [
      'الاستماع باهتمام',
      'رواية القصص بوضوح',
      'التحدث بثقة',
      'شرح الأفكار ببساطة',
      'الاختلاف باحترام',
    ],
  },
  {
    id: 'respect',
    name: 'Respect',
    nameAr: 'الاحترام',
    colorHex: '#DB2777',
    darkColorHex: '#BE185D',
    softBgHex: '#FDF2F8',
    borderHex: '#FBCFE8',
    description:
      'Practicing empathy, appreciating differences, honoring elders, respecting oneself, and understanding other viewpoints.',
    descriptionAr:
      'ممارسة التعاطف، وتقدير الاختلافات، واحترام كبار السن، واحترام الذات، وفهم وجهات نظر الآخرين.',
    culturalConnection:
      'Family heritage, traditional crafts passed down by elders, and multicultural community life in Abu Dhabi.',
    culturalConnectionAr:
      'تقاليد الأسرة، والحرف التقليدية المتوارثة عن الأجداد، والتعايش الثقافي المتنوع في أبوظبي.',
    learns: [
      'Show genuine empathy',
      'Appreciate cultural differences',
      'Honor elders and heritage',
      'Practice self-respect',
      'See another perspective',
    ],
    learnsAr: [
      'إظهار التعاطف الحقيقي',
      'تقدير الاختلافات الثقافية',
      'احترام كبار السن والتراث',
      'احترام الذات',
      'رؤية الأمور من منظور الآخرين',
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    nameAr: 'الضيافة',
    colorHex: '#EA580C',
    darkColorHex: '#C2410C',
    softBgHex: '#FFF7ED',
    borderHex: '#FED7AA',
    description:
      'Welcoming others warmly, sharing generously, showing kindness, practicing inclusion, and helping guests feel at ease.',
    descriptionAr:
      'الترحيب بالآخرين بحفاوة، والكرم، واللطف، والشمولية، ومساعدة الضيوف وأفراد المجتمع على الشعور بالراحة.',
    culturalConnection:
      'Emirati traditions of welcoming guests, Arabic coffee (Gahwa) etiquette, and the open spirit of the majlis.',
    culturalConnectionAr:
      'تقاليد الضيافة الإماراتية، وآداب القهوة العربية، وروح الترحيب في المجلس.',
    learns: [
      'Welcome newcomers warmly',
      'Share with generosity',
      'Act with daily kindness',
      'Include everyone around you',
      'Help guests feel comfortable',
    ],
    learnsAr: [
      'الترحيب بالقادمين الجدد',
      'المشاركة بكرم',
      'التصرف بلطف يومياً',
      'إشراك الجميع من حولك',
      'إشعار الضيوف بالراحة',
    ],
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    nameAr: 'المرونة والتكيف',
    colorHex: '#0D9488',
    darkColorHex: '#0F766E',
    softBgHex: '#F0FDFA',
    borderHex: '#99F6E4',
    description:
      'Staying flexible, solving unexpected problems, building resilience, thinking creatively, and adjusting to change.',
    descriptionAr:
      'التحلي بالمرونة، وحل المشكلات غير المتوقعة، وبناء القدرة على الصمود، والتفكير الإبداعي، والتكيف مع التغيير.',
    culturalConnection:
      'How earlier generations thrived across desert, oasis, and sea, and how the UAE embraced thoughtful change.',
    culturalConnectionAr:
      'كيف تكيف الأجداد مع الصحراء والواحة والبحر، وكيف واكبت الإمارات التطور الحديث.',
    learns: [
      'Stay calm when plans change',
      'Solve everyday problems',
      'Keep trying after setbacks',
      'Use creative solutions',
      'Adapt to new environments',
    ],
    learnsAr: [
      'الهدوء عند تغير الخطط',
      'حل المشكلات اليومية',
      'المحاولة بعد التحديات',
      'ابتكار حلول إبداعية',
      'التكيف مع البيئات الجديدة',
    ],
  },
  {
    id: 'critical-thinking',
    name: 'Critical Thinking',
    nameAr: 'التفكير النقدي',
    colorHex: '#16A34A',
    darkColorHex: '#15803D',
    softBgHex: '#F0FDF4',
    borderHex: '#BBF7D0',
    description:
      'Asking thoughtful questions, comparing evidence, evaluating claims, exploring alternatives, and making informed choices.',
    descriptionAr:
      'طرح الأسئلة الذكية، ومقارنة الأدلة، وتقييم المعلومات، واستكشاف البدائل، واتخاذ قرارات مدروسة.',
    culturalConnection:
      'Engineering ingenuity of Al Aflaj irrigation, traditional desert architecture, and studying historical evidence.',
    culturalConnectionAr:
      'براعة هندسة أنظمة الأفلاج، والعمارة التقليدية، ودراسة الأدلة التاريخية.',
    learns: [
      'Ask curious questions',
      'Compare two sources',
      'Check supporting evidence',
      'Explore alternative designs',
      'Make thoughtful decisions',
    ],
    learnsAr: [
      'طرح أسئلة فضولية',
      'مقارنة مصدرين',
      'فحص الأدلة الداعمة',
      'استكشاف تصاميم بديلة',
      'اتخاذ قرارات واعية',
    ],
  },
];

export const SKILL_MAP = Object.fromEntries(
  SKILL_BRANCHES.map((branch) => [branch.id, branch])
) as Record<SkillBranch['id'], SkillBranch>;
