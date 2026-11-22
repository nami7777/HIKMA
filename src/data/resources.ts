import { CulturalResource, LeafMission } from '../types/hikma';

const IMG_MAJLIS = '/src/assets/images/culture_majlis_storytelling_1794751398115.jpg';
const IMG_PEARL = '/src/assets/images/culture_pearl_diving_1794751398539.jpg';
const IMG_OASIS = '/src/assets/images/culture_al_ain_oasis_1794751400010.jpg';
const IMG_SADU = '/src/assets/images/culture_al_sadu_craft_1794751405724.jpg';

export const INITIAL_RESOURCES: CulturalResource[] = [
  // =========================================================
  // 1. COMMUNICATION (5 Progressive Leaves)
  // =========================================================
  {
    id: 'res-comm-taghrooda',
    originalTitle: 'Al-Taghrooda, traditional Bedouin chanted poetry',
    originalTitleAr: 'التغرودة: الشعر البدوي المغنى التقليدي',
    originalUrl: 'https://www.youtube.com/watch?v=Cd3g3o2Wq0Y',
    sourceOrganization: 'UNESCO Intangible Cultural Heritage',
    mediaType: 'youtube',
    youtubeVideoId: 'Cd3g3o2Wq0Y',
    language: 'English / Arabic',
    childDescription:
      'Discover how desert travelers in the UAE used rhythmic call-and-response poetry to share stories and stay united on long journeys.',
    childDescriptionAr:
      'اكتشف كيف استخدم المسافرون في صحراء الإمارات الشعر الإيقاعي المتبادل لمشاركة القصص وتعزيز روح الجماعة.',
    childArticleBody:
      'Al-Taghrooda is a traditional form of Bedouin chanted poetry practiced across the United Arab Emirates and Oman. Travelers riding camels across the desert composed short verses—often seven lines or fewer—and sang them back and forth between two groups. Today, families and poets still share Al-Taghrooda at weddings, gatherings, and heritage festivals to keep community stories alive.',
    childArticleBodyAr:
      'التغرودة فن شعري بدوي تقليدي يُمارس في دولة الإمارات وسلطنة عُمان. كان المسافرون على ظهور الإبل يؤلفون أبياتاً قصيرة ويتبادلون إنشادها بين مجموعتين لتشجيع القافلة ومشاركة الأخبار والقصص.',
    mainCulturalTopic: 'Emirati oral storytelling and Bedouin chanted poetry',
    culturalSignificance:
      'Inscribed by UNESCO in 2012, Al-Taghrooda shows how spoken rhythm and attentive listening connect generations across distances.',
    culturalSignificanceAr:
      'أدرجتها اليونسكو عام 2012 في قائمة التراث الثقافي غير المادي، وتُظهر كيف يربط الإيقاع والاستماع الواعي بين الأجيال.',
    primarySkill: 'communication',
    secondarySkills: ['respect'],
    skillReason:
      'Al-Taghrooda relies on clear expression, turn-taking, and listening closely so the second group can respond in rhythm.',
    skillReasonAr:
      'تعتمد التغرودة على وضوح التعبير وتبادل الأدوار والإنصات الجيد للرد بالإيقاع نفسه.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'See how taking turns and listening carefully makes storytelling meaningful.',
    learningObjectiveAr: 'تعلّم كيف يجعل تبادل الأدوار والإنصات الجيد رواية القصص أكثر تأثيراً.',
    viewingObjective: 'Watch how performers listen to one verse before answering with their own.',
    questions: [
      {
        id: 'q-comm-1-1',
        format: 'multiple_choice',
        prompt: 'Why did Bedouin travelers sing Al-Taghrooda while crossing the desert?',
        promptAr: 'لماذا كان المسافرون في البادية ينشدون التغرودة أثناء السفر؟',
        options: [
          'To entertain riders, share messages, and keep camels moving in rhythm',
          'To replace written maps with silent hand signals',
          'Only for indoor competitions inside city towers',
        ],
        optionsAr: [
          'لإمتاع المسافرين ومشاركة القصص والحفاظ على إيقاع السير',
          'لاستبدال الخرائط بإشارات صامتة',
          'فقط للمسابقات داخل الأبراج الحديثة',
        ],
        correctIndex: 0,
        explanation:
          'Al-Taghrooda helped riders stay upbeat, share verses back and forth, and travel together harmoniously.',
        explanationAr: 'ساعدت التغرودة المسافرين على تبادل الأبيات وبث الحماس وروح التعاون.',
      },
      {
        id: 'q-comm-1-2',
        format: 'true_false',
        prompt: 'In Al-Taghrooda, one group chants first and another group listens and responds.',
        promptAr: 'في التغرودة، تنشد مجموعة أولاً ثم تستمع المجموعة الأخرى وترد عليها.',
        options: ['True', 'False'],
        optionsAr: ['صحيح', 'خطأ'],
        correctIndex: 0,
        explanation: 'Yes! That call-and-response pattern teaches active listening and turn-taking.',
        explanationAr: 'نعم! هذا التبادل يعلمنا الاستماع النشط واحترام الدور في الحديث.',
      },
    ],
    applicationQuestion: 'How can you show someone you are truly listening when they tell you a story?',
    applicationQuestionAr: 'كيف تُظهر لشخص ما أنك تستمع إليه باهتمام عندما يروي لك قصة؟',
    realWorldActivity:
      'Ask a parent, grandparent, or older family member to share a short story or memory from their childhood, then retell the main lesson back to them in your own words.',
    realWorldActivityAr:
      'اطلب من أحد والديك أو أجدادك أن يروي لك قصة قصيرة من طفولته، ثم أعد تلخيص الفكرة الرئيسية له بأسلوبك الخاص.',
    contextSetting: 'family',
    expectedOutcome: 'Child practices active listening and clear oral retelling with a family member.',
    aiConfidence: 96,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: UNESCO Intangible Cultural Heritage (YouTube)',
    illustrationUrl: IMG_MAJLIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-comm-majlis',
    originalTitle: 'Majlis, a cultural and social space',
    originalTitleAr: 'المجلس: مساحة ثقافية واجتماعية',
    originalUrl: 'https://www.youtube.com/watch?v=59KQbS1DMpQ',
    sourceOrganization: 'UNESCO Intangible Cultural Heritage',
    mediaType: 'youtube',
    youtubeVideoId: '59KQbS1DMpQ',
    language: 'English / Arabic',
    childDescription:
      'Step inside a traditional Emirati majlis where elders, neighbors, and young people gather to talk, listen, and solve community questions.',
    childDescriptionAr:
      'تعرف على المجلس الإماراتي التقليدي حيث يجتمع الكبار والجيران والشباب للحوار والاستماع وتبادل الآراء.',
    childArticleBody:
      'In Emirati heritage, the majlis ("sitting place") is where community members meet to welcome guests, share news, tell stories, and discuss decisions respectfully. Young people learn by watching how elders greet newcomers, allow everyone to speak without interruption, and keep discussions calm even when people disagree.',
    childArticleBodyAr:
      'في التراث الإماراتي، المجلس هو المكان الذي يجتمع فيه أفراد المجتمع للترحيب بالضيوف وتبادل الأخبار والقصص ومناقشة شؤون الحياة باحترام وهدوء.',
    mainCulturalTopic: 'Traditional majlis dialogue and intergenerational listening',
    culturalSignificance:
      'UNESCO recognized the Majlis in 2015 as a cornerstone of oral heritage, hospitality, and community problem-solving.',
    culturalSignificanceAr:
      'أدرجت اليونسكو المجلس عام 2015 بوصفه ركيزة للتراث الشفهي والضيافة والحوار المجتمعي.',
    primarySkill: 'communication',
    secondarySkills: ['hospitality', 'respect'],
    skillReason:
      'The majlis models how calm, inclusive conversation allows people of different ages to exchange ideas safely.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Notice how polite turn-taking keeps a group conversation welcoming for everyone.',
    learningObjectiveAr: 'ملاحظة كيف يحافظ أدب الحديث وتبادل الأدوار على دفء الحوار الجماعي.',
    viewingObjective: 'Notice who speaks in the majlis and how people seated together show attention.',
    questions: [
      {
        id: 'q-comm-2-1',
        format: 'best_response',
        prompt: 'If two classmates disagree during a group talk, what majlis habit helps most?',
        promptAr: 'إذا اختلف زميلان في الصف حول فكرة، ما العادة المستلهمة من المجلس التي تساعدهما؟',
        options: [
          'Let each person finish speaking calmly before sharing a different idea',
          'Talk louder so everyone stops talking',
          'Walk away without listening',
        ],
        optionsAr: [
          'السماح لكل شخص بإتمام حديثه بهدوء قبل طرح الفكرة الأخرى',
          'رفع الصوت لإسكات الجميع',
          'المغادرة دون استماع',
        ],
        correctIndex: 0,
        explanation:
          'Listening completely before responding shows respect and helps people understand each other.',
        explanationAr: 'الاستماع الكامل قبل الرد يظهر الاحترام ويساعد على الفهم المتبادل.',
      },
      {
        id: 'q-comm-2-2',
        format: 'multiple_choice',
        prompt: 'Who learns and participates inside a traditional majlis?',
        promptAr: 'من يتعلم ويشارك في المجلس التقليدي؟',
        options: [
          'Elders, neighbors, guests, and young people learning from conversations',
          'Only professional speakers from television',
          'No one is allowed to ask questions',
        ],
        optionsAr: [
          'كبار السن والجيران والضيوف والشباب الذين يتعلمون من الحوار',
          'فقط المذيعون المحترفون',
          'لا يُسمح لأحد بطرح الأسئلة',
        ],
        correctIndex: 0,
        explanation: 'A majlis connects generations by welcoming youth to observe and join thoughtfully.',
        explanationAr: 'يربط المجلس بين الأجيال عبر إتاحة الفرصة للصغار للاستماع والمشاركة بأدب.',
      },
    ],
    applicationQuestion: 'What is one rule you would set for a respectful "family majlis" at home?',
    applicationQuestionAr: 'ما القاعدة الواحدة التي تقترحها لجعل "مجلس الأسرة" في منزلك مريحاً ومحترماً؟',
    realWorldActivity:
      'Hold a 10-minute "Mini Majlis" with your family or school table where everyone shares one highlight of their week while others listen without interrupting.',
    realWorldActivityAr:
      'نظم "مجلساً مصغراً" لمدة 10 دقائق مع أسرتك أو زملائك في المدرسة، يتحدث فيه كل فرد عن موقف جميل في أسبوعه بينما يستمع الباقون دون مقاطعة.',
    contextSetting: 'family',
    expectedOutcome: 'Child facilitates turn-taking and respectful listening in a real conversation.',
    aiConfidence: 97,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: UNESCO Intangible Cultural Heritage (YouTube)',
    illustrationUrl: IMG_MAJLIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-comm-ayyala',
    originalTitle: 'Al-Ayyala, a traditional performing art of Oman and the UAE',
    originalTitleAr: 'العيالة: فن أدائي تقليدي في الإمارات وعُمان',
    originalUrl: 'https://www.youtube.com/watch?v=V6roOGoW07k',
    sourceOrganization: 'UNESCO Intangible Cultural Heritage',
    mediaType: 'youtube',
    youtubeVideoId: 'V6roOGoW07k',
    language: 'English / Arabic',
    childDescription:
      'See how performers use rhythm, posture, and coordinated chants to communicate unity without chaos.',
    childDescriptionAr:
      'شاهد كيف يستخدم المؤدون الإيقاع والحركة المتناغمة للتعبير عن الوحدة والتعاون.',
    childArticleBody:
      'Al-Ayyala is a traditional performing art practiced across the UAE during celebrations and community gatherings. Two facing rows of performers move in steady unison to drums and chanted poetry, showing how communication is not only words—it is also posture, rhythm, and staying in sync with a team.',
    childArticleBodyAr:
      'العيالة فن أدائي تقليدي يُمارس في الإمارات خلال المناسبات الوطنية والاحتفالات. يقف المؤدون في صفين متقابلين ويتحركون بتناغم على إيقاع الطبول والأهازيج.',
    mainCulturalTopic: 'Non-verbal teamwork and synchronized group expression',
    culturalSignificance:
      'Inscribed by UNESCO in 2014, Al-Ayyala highlights collective harmony and community celebration.',
    primarySkill: 'communication',
    secondarySkills: ['leadership'],
    skillReason:
      'Coordinating two rows of performers requires clear visual cues, rhythm, and attentive group communication.',
    ageSuitability: '8-12',
    difficulty: 'Intermediate',
    learningObjective: 'Understand how body language, eye contact, and rhythm help groups work together.',
    learningObjectiveAr: 'فهم كيف تساعد لغة الجسد والتواصل البصري والإيقاع المجموعات على العمل معاً.',
    questions: [
      {
        id: 'q-comm-3-1',
        format: 'multiple_choice',
        prompt: 'Besides spoken words, what helps Al-Ayyala performers stay together?',
        promptAr: 'إلى جانب الكلمات، ما الذي يساعد مؤدي العيالة على التناغم؟',
        options: [
          'Listening to the drumbeat and watching their teammates’ movements',
          'Looking down at their shoes the whole time',
          'Each person choosing a completely different speed',
        ],
        optionsAr: [
          'الإنصات لإيقاع الطبول ومراقبة حركة زملائهم',
          'النظر إلى الأرض طوال الوقت',
          'اختيار كل شخص سرعة مختلفة تماماً',
        ],
        correctIndex: 0,
        explanation: 'Paying attention to shared cues keeps an entire group moving in harmony.',
        explanationAr: 'الانتباه للإشارات المشتركة يحفظ انسجام المجموعة كلها.',
      },
      {
        id: 'q-comm-3-2',
        format: 'true_false',
        prompt: 'Communication only happens through spoken or typed words.',
        promptAr: 'يحدث التواصل فقط عبر الكلمات المنطوقة أو المكتوبة.',
        options: ['True', 'False'],
        optionsAr: ['صحيح', 'خطأ'],
        correctIndex: 1,
        explanation: 'False! Facial expressions, posture, eye contact, and tone of voice also communicate feelings.',
        explanationAr: 'خطأ! تعبيرات الوجه ولغة الجسد ونبرة الصوت تنقل المشاعر والأفكار أيضاً.',
      },
    ],
    applicationQuestion: 'How do your posture and facial expression show a classmate you welcome their idea?',
    realWorldActivity:
      'In a school group project or family game, practice explaining one step clearly using calm voice, eye contact, and helpful hand gestures—then ask your partner if anything was unclear.',
    realWorldActivityAr:
      'في نشاط مدرسي جماعي أو لعبة عائلية، اشرح خطوة واحدة بصوت واضح وتواصل بصري مريح، ثم اسأل شريكك إن كان الشرح مفهوماً.',
    contextSetting: 'school',
    expectedOutcome: 'Child practices clear verbal and non-verbal explanation with feedback.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: UNESCO Intangible Cultural Heritage (YouTube)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-comm-wiki-majlis',
    originalTitle: 'Majlis — History and Community Role',
    originalTitleAr: 'المجلس: التاريخ والدور المجتمعي',
    originalUrl: 'https://en.wikipedia.org/wiki/Majlis',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Majlis',
    language: 'English',
    childDescription:
      'Read how the word "majlis" grew from a traditional sitting room into a symbol of open dialogue and civic listening.',
    childDescriptionAr:
      'اقرأ كيف تطور مفهوم المجلس من غرفة جلوس تقليدية إلى رمز للحوار المفتوح والاستماع المجتمعي.',
    childArticleBody:
      'In Arabic, "majlis" literally means "a place of sitting." Historically, communities gathered in a majlis to welcome visitors, share poetry, settle disagreements peacefully, and pass down local history. Today, the word is also used for councils and public discussions where people bring ideas to serve their community.',
    childArticleBodyAr:
      'تعني كلمة "مجلس" مكان الجلوس. تاريخياً، اجتمع الناس في المجالس للترحيب بالزوار ورواية الشعر وحل الخلافات سلمياً ونقل التاريخ الشفهي، واليوم يُستخدم المصطلح أيضاً للمجالس التي تناقش شؤون المجتمع.',
    mainCulturalTopic: 'Civic dialogue and explaining ideas clearly',
    culturalSignificance:
      'Demonstrates how traditional spaces evolved to support community consultation and shared decision-making.',
    primarySkill: 'communication',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Understanding how a majlis turns individual opinions into clear, respectful proposals strengthens persuasive speaking.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Explain an idea clearly using one reason and one respectful example.',
    learningObjectiveAr: 'شرح فكرة بوضوح باستخدام سبب واحد ومثال محترم.',
    questions: [
      {
        id: 'q-comm-4-1',
        format: 'multiple_choice',
        prompt: 'What does the Arabic word "Majlis" literally mean?',
        promptAr: 'ماذا تعني كلمة "مجلس" حرفياً؟',
        options: ['A place of sitting', 'A sailing ship', 'A desert mountain'],
        optionsAr: ['مكان الجلوس', 'سفينة شراعية', 'جبل صحراوي'],
        correctIndex: 0,
        explanation: 'Majlis comes from the Arabic root meaning to sit together.',
        explanationAr: 'تأتي كلمة مجلس من الجذر العربي للجلوس معاً.',
      },
      {
        id: 'q-comm-4-2',
        format: 'best_response',
        prompt: 'When sharing a suggestion with your class or neighborhood, what makes people listen?',
        options: [
          'Explaining WHY the idea helps everyone and inviting questions',
          'Repeating the same sentence ten times quickly',
          'Refusing to hear other suggestions',
        ],
        correctIndex: 0,
        explanation: 'Giving a clear reason and welcoming questions turns an opinion into helpful dialogue.',
        explanationAr: 'ذكر السبب والترحيب بالأسئلة يحوّل الرأي إلى حوار مثمر.',
      },
    ],
    applicationQuestion: 'Write or say one improvement idea for your school or neighborhood in two clear sentences.',
    realWorldActivity:
      'Prepare a 30-second "Majlis Idea" about one kind thing your class or neighborhood can do this month, and present it to a parent or teacher.',
    realWorldActivityAr:
      'أعدّ فكرة مدتها 30 ثانية حول مبادرة لطيفة يمكن لصفك أو حيك القيام بها هذا الشهر، واعرضها على أحد والديك أو معلمك.',
    contextSetting: 'community',
    expectedOutcome: 'Child structures and delivers a brief, constructive community idea.',
    aiConfidence: 91,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Majlis", CC BY-SA 4.0)',
    illustrationUrl: IMG_MAJLIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-comm-qasr',
    originalTitle: 'Qasr Al Hosn — Historical Places in Abu Dhabi',
    originalTitleAr: 'قصر الحصن: معلم تاريخي في أبوظبي',
    originalUrl: 'https://www.youtube.com/watch?v=gzM3dhnq3Wo',
    sourceOrganization: 'Visit Abu Dhabi (DCT Abu Dhabi)',
    mediaType: 'youtube',
    youtubeVideoId: 'gzM3dhnq3Wo',
    language: 'English',
    childDescription:
      'Explore Abu Dhabi’s oldest stone building and practice telling a historical story accurately to someone younger or older.',
    childDescriptionAr:
      'استكشف أقدم مبنى حجري في أبوظبي وتدرّب على سرد قصته التاريخية بدقة لأسرتك.',
    childArticleBody:
      'Built in the 1760s as a coral-and-sea-stone watchtower protecting Abu Dhabi’s freshwater well, Qasr Al Hosn later grew into the ruler’s residence, a place of government, and today a living museum. Every wall and courtyard tells the story of how Abu Dhabi grew from a coastal settlement into a modern capital.',
    childArticleBodyAr:
      'بُني قصر الحصن في ستينيات القرن الثامن عشر كبرج مراقبة من الحجر البحري لحماية بئر المياه العذبة في أبوظبي، ثم تطور ليصبح مقراً للحكم ومتحفاً يروي تاريخ المدينة.',
    mainCulturalTopic: 'Qasr Al Hosn heritage storytelling',
    culturalSignificance:
      'The oldest standing landmark in Abu Dhabi, connecting modern residents with 250+ years of local history.',
    primarySkill: 'communication',
    secondarySkills: ['critical-thinking', 'respect'],
    skillReason:
      'Turning historical facts about Qasr Al Hosn into a clear tour for someone else builds storytelling confidence.',
    ageSuitability: '8-12',
    difficulty: 'Challenging',
    learningObjective: 'Summarize a real historical landmark in 3 clear facts for another person.',
    learningObjectiveAr: 'تلخيص معلم تاريخي حقيقي في 3 حقائق واضحة لشخص آخر.',
    questions: [
      {
        id: 'q-comm-5-1',
        format: 'multiple_choice',
        prompt: 'Why was Qasr Al Hosn’s first watchtower originally built in the 1760s?',
        options: [
          'To protect a vital freshwater well and watch over the coast',
          'To serve as an indoor ice-skating rink',
          'To launch modern cargo airplanes',
        ],
        correctIndex: 0,
        explanation: 'Freshwater was precious on the island, so the stone watchtower protected the community’s well.',
        explanationAr: 'كانت المياه العذبة ثمينة، لذا حُميت البئر ببرج المراقبة الحجري.',
      },
      {
        id: 'q-comm-5-2',
        format: 'true_false',
        prompt: 'Qasr Al Hosn is now a museum and cultural landmark open to families.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Today Qasr Al Hosn welcomes visitors to learn about Abu Dhabi’s heritage.',
        explanationAr: 'نعم! يرحب قصر الحصن بالزوار والعائلات للتعرف على تراث أبوظبي.',
      },
    ],
    applicationQuestion: 'If you were a young guide at Qasr Al Hosn, what is the first fact you would share?',
    realWorldActivity:
      'Visit Qasr Al Hosn with your family—or take a virtual photo walk at home—and act as a 2-minute mini tour guide explaining three facts you learned.',
    realWorldActivityAr:
      'قم بزيارة قصر الحصن مع أسرتك — أو تصفح صوره الموثقة في المنزل — وقدم جولة قصيرة لمدة دقيقتين تشرح فيها ثلاث حقائق تعلمتها.',
    atHomeEquivalent:
      'At-home option: Look up Qasr Al Hosn’s official page with a parent and present a 2-minute living-room museum tour.',
    atHomeEquivalentAr:
      'بديل منزلي: استعرض صفحة قصر الحصن الرسمية مع أحد والديك وقدم جولة إرشادية مصغرة في المنزل.',
    contextSetting: 'public-spaces',
    expectedOutcome: 'Child synthesizes verified historical facts into an engaging spoken explanation.',
    aiConfidence: 95,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Visit Abu Dhabi / DCT Abu Dhabi (YouTube)',
    illustrationUrl: IMG_SADU,
    isAiAdaptedSummary: true,
  },

  // =========================================================
  // 2. DIGITAL WISDOM (5 Progressive Leaves)
  // =========================================================
  {
    id: 'res-dig-literacy',
    originalTitle: 'Digital literacy — Checking Reliable Information',
    originalTitleAr: 'الثقافة الرقمية: التحقق من موثوقية المعلومات',
    originalUrl: 'https://en.wikipedia.org/wiki/Digital_literacy',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Digital_literacy',
    language: 'English',
    childDescription:
      'Learn how to check who wrote a webpage, spot missing evidence, and compare trustworthy cultural sources against made-up captions.',
    childDescriptionAr:
      'تعلّم كيف تتحقق من ناشر الصفحة، وتكتشف نقص الأدلة، وتقارن المصادر الثقافية الموثوقة بالمنشورات المزيفة.',
    childArticleBody:
      'Digital literacy means knowing how to find, evaluate, and share information safely and responsibly online. Just because a post has lots of likes or dramatic pictures does not make it true! Reliable cultural information names its source—like a museum, UNESCO, or an encyclopedia with references—so readers can check the facts.',
    childArticleBodyAr:
      'تعني الثقافة الرقمية معرفة كيفية البحث عن المعلومات وتقييمها ومشاركتها بأمان. كثرة الإعجابات لا تعني صحة الخبر! المصادر الثقافية الموثوقة تذكر مرجعها بوضوح مثل المتاحف أو اليونسكو.',
    mainCulturalTopic: 'Distinguishing authentic heritage sources from misleading online posts',
    culturalSignificance:
      'Protects young learners from cultural misinformation while encouraging respectful digital citizenship.',
    primarySkill: 'digital-wisdom',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Evaluating source authorship, references, and publisher credibility is the foundation of digital wisdom.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Identify two clues that show whether an online cultural post is trustworthy.',
    learningObjectiveAr: 'تحديد علامتين تدلان على موثوقية المعلومات الثقافية عبر الإنترنت.',
    questions: [
      {
        id: 'q-dig-1-1',
        format: 'best_response',
        prompt:
          'You see two posts about Qasr Al Hosn: Post A says "Built by space travelers in 1999!" with no source. Post B links to UNESCO and Abu Dhabi’s museum archive. Which should you trust?',
        promptAr:
          'شاهدت منشورين عن قصر الحصن: الأول بدون مصدر ويدّعي قصة خيالية، والثاني يستند إلى أرشيف المتحف واليونسكو. أيهما تثق به؟',
        options: [
          'Post B, because it names recognized cultural institutions you can verify',
          'Post A, because exciting claims are always true',
          'Neither—just share both immediately without reading',
        ],
        optionsAr: [
          'المنشور الثاني لأنه يذكر مؤسسات ثقافية موثوقة يمكن التحقق منها',
          'المنشور الأول لأن العناوين المثيرة دائماً صحيحة',
          'أشارك كليهما دون قراءة',
        ],
        correctIndex: 0,
        explanation: 'Always look for named, verifiable institutions and references before believing or sharing.',
        explanationAr: 'ابحث دائماً عن المؤسسات والمراجع الموثوقة قبل تصديق أي معلومة أو مشاركتها.',
      },
      {
        id: 'q-dig-1-2',
        format: 'true_false',
        prompt: 'If a short video has thousands of views, every fact inside it is guaranteed to be accurate.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! Popularity is not proof. Always check who made the video and what evidence they cite.',
        explanationAr: 'خطأ! كثرة المشاهدات لا تعني صحة المعلومات، لذا يجب التحقق من المصدر.',
      },
    ],
    applicationQuestion: 'What three questions can you ask before sharing a picture or fact online?',
    realWorldActivity:
      'With a parent, compare one real heritage webpage (like UNESCO or Qasr Al Hosn) with an invented silly claim, and write down two clues that prove which one is trustworthy.',
    realWorldActivityAr:
      'مع أحد والديك، قارن بين صفحة تراثية حقيقية (مثل اليونسكو) وادعاء خيالي، واكتب علامتين تثبتان أيهما موثوق.',
    contextSetting: 'digital',
    expectedOutcome: 'Child applies source-checking criteria alongside a parent.',
    aiConfidence: 95,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Digital literacy", CC BY-SA 4.0)',
    illustrationUrl: IMG_SADU,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-dig-safety-privacy',
    originalTitle: 'Staying Safe Online — Protecting Family Privacy',
    originalTitleAr: 'السلامة الرقمية: حماية خصوصية الأسرة',
    originalUrl: 'https://en.wikipedia.org/wiki/Internet_safety',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Internet_safety',
    language: 'English',
    childDescription:
      'Learn what personal details belong only to you and your family—and never to strangers or public apps.',
    childArticleBody:
      'In Emirati hospitality, we welcome guests kindly while respecting family privacy at home. Online, safety works the same way! Never share your real full name, home address, school uniform photos, phone number, or passwords on public pages. Using a nickname like we do in HIKMA keeps learning fun and private.',
    childArticleBodyAr:
      'مثلما نحترم خصوصية بيوتنا في ثقافتنا، نحمي خصوصيتنا على الإنترنت! لا تشارك اسمك الكامل أو عنوانك أو مدرستك أو كلمات المرور مع الغرباء أو في الصفحات العامة.',
    mainCulturalTopic: 'Privacy boundaries in digital spaces and respectful family traditions',
    culturalSignificance:
      'Connects traditional cultural respect for household privacy with modern child online safety.',
    primarySkill: 'digital-wisdom',
    secondarySkills: ['respect'],
    skillReason:
      'Knowing what private information to keep safe protects children and respects everyone in the household.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Separate safe public information (like a nickname) from private personal details.',
    questions: [
      {
        id: 'q-dig-2-1',
        format: 'multiple_choice',
        prompt: 'Which of these is SAFE to use as a screen name in an educational game?',
        options: [
          'A fun nickname like "DesertFalcon9"',
          'Your full real name and home street address',
          'Your parent’s phone number and school name',
        ],
        correctIndex: 0,
        explanation: 'A creative nickname protects your identity while letting you enjoy learning.',
        explanationAr: 'الاسم المستعار يحمي هويتك بينما تستمتع بالتعلم.',
      },
      {
        id: 'q-dig-2-2',
        format: 'best_response',
        prompt: 'If a stranger online asks you to send a photo or tell them which school you attend, what should you do?',
        options: [
          'Do not reply, and tell a parent or trusted adult right away',
          'Reply politely with your school name so you do not seem rude',
          'Keep it a secret',
        ],
        correctIndex: 0,
        explanation: 'Never share personal details with strangers online—always involve a trusted parent immediately.',
        explanationAr: 'لا تشارك معلوماتك الشخصية أبداً مع غرباء، وأخبر والديك فوراً.',
      },
    ],
    applicationQuestion: 'Why is it wise to ask a parent before clicking an unfamiliar link or downloading an app?',
    realWorldActivity:
      'Together with a parent, review your tablet or computer safety rules and agree on one "Pause & Ask" rule whenever something unexpected pops up.',
    realWorldActivityAr:
      'راجع مع أحد والديك قواعد الأمان على جهازك، واتفقا معاً على قاعدة "توقف واسأل" عند ظهور أي رابط غير مألوف.',
    contextSetting: 'family',
    expectedOutcome: 'Family establishes a clear digital safety agreement.',
    aiConfidence: 94,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Internet safety", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-dig-healthy-habits',
    originalTitle: 'Balancing Screen Time and Real-Life Play',
    originalTitleAr: 'توازن وقت الشاشة والنشاط الواقعي',
    originalUrl: 'https://en.wikipedia.org/wiki/Screen_time',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Screen_time',
    language: 'English',
    childDescription:
      'Explore why short, purposeful screen learning works best when paired with outdoor play, sleep, and family time.',
    childArticleBody:
      'Screens help us watch documentaries, read encyclopedias, and learn new ideas—but too much passive scrolling leaves our eyes tired and takes time away from friends, movement, and sleep. Setting clear screen boundaries lets technology serve us, instead of us getting stuck in front of a screen.',
    mainCulturalTopic: 'Healthy digital habits and active community life',
    culturalSignificance:
      'Reflects balanced living in Abu Dhabi where digital tools support, rather than replace, family and outdoor heritage.',
    primarySkill: 'digital-wisdom',
    secondarySkills: ['adaptability'],
    skillReason:
      'Healthy digital habits require noticing how screen time affects mood, focus, and sleep.',
    ageSuitability: '8-12',
    difficulty: 'Intermediate',
    learningObjective: 'Design a simple daily balance between screen learning and offline activities.',
    questions: [
      {
        id: 'q-dig-3-1',
        format: 'true_false',
        prompt: 'Watching endless short videos right before bedtime can make it harder to sleep deeply.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Bright screens and fast videos keep the brain alert when it needs calm rest.',
        explanationAr: 'الشاشات الساطعة والمقاطع المتواصلة تبقي الدماغ يقظاً وتؤثر على جودة النوم.',
      },
      {
        id: 'q-dig-3-2',
        format: 'multiple_choice',
        prompt: 'What is the healthiest way to use a learning app like HIKMA?',
        options: [
          'Spend 5–10 minutes learning, then switch off the screen to do a real-world activity',
          'Keep staring at the screen for 5 hours straight without breaks',
          'Skip outdoor play and meals',
        ],
        correctIndex: 0,
        explanation: 'Short focused digital learning paired with real-world practice builds real wisdom!',
        explanationAr: 'التعلم الرقمي القصير والمرتبط بأنشطة واقعية هو الأفضل لنموك.',
      },
    ],
    applicationQuestion: 'What offline activity gives you the most energy after finishing screen time?',
    realWorldActivity:
      'Take a 20-minute "Screen-Free Hour" tonight with your family—play a board game, draw, walk outside, or help prepare a snack.',
    realWorldActivityAr:
      'طبّق "ساعة بلا شاشات" مع أسرتك الليلة: العب لعبة لوحية، أو ارسم، أو تمشَّ في الخارج.',
    contextSetting: 'family',
    expectedOutcome: 'Child practices intentional screen-off transitions.',
    aiConfidence: 92,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Screen time", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-dig-verify-oasis',
    originalTitle: 'Al Ain Oasis — Cross-Checking Heritage Facts',
    originalTitleAr: 'واحة العين: التحقق من الحقائق التراثية',
    originalUrl: 'https://en.wikipedia.org/wiki/Al_Ain_Oasis',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Al_Ain_Oasis',
    language: 'English',
    childDescription:
      'Practice verifying facts by comparing an encyclopedia entry about Al Ain Oasis with official UNESCO heritage details.',
    childArticleBody:
      'Al Ain Oasis spans about 1,200 hectares in Abu Dhabi’s Garden City and protects more than 147,000 date palms watered by traditional falaj channels. Notice how real articles give exact measurements, locations, and UNESCO World Heritage details—whereas unreliable websites often exaggerate numbers or forget to say where facts came from.',
    mainCulturalTopic: 'Cross-checking cultural claims against primary heritage records',
    culturalSignificance:
      'Al Ain Oasis is part of the UAE’s first UNESCO World Heritage site (2011).',
    primarySkill: 'digital-wisdom',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Teaches children why Wikipedia is a great starting point that should be cross-checked with official institutional sources.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Verify an encyclopedia fact by checking it against a second trusted source.',
    questions: [
      {
        id: 'q-dig-4-1',
        format: 'multiple_choice',
        prompt: 'If you read a number on Wikipedia, what is the smartest next step for a school report?',
        options: [
          'Check the footnote or an official source like UNESCO or a museum website',
          'Guess a bigger number to sound impressive',
          'Assume every sentence online is automatically 100% final',
        ],
        correctIndex: 0,
        explanation: 'Cross-checking footnotes against recognized institutions makes your research solid.',
        explanationAr: 'مراجعة الهوامش والمصادر الرسمية مثل اليونسكو يجعل بحثك دقيقاً.',
      },
      {
        id: 'q-dig-4-2',
        format: 'true_false',
        prompt: 'Al Ain Oasis uses traditional falaj irrigation channels to water tens of thousands of date palms.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Over 147,000 date palms thrive there thanks to shaded canopy and falaj channels.',
        explanationAr: 'نعم! تروي قنوات الأفلاج أكثر من 147,000 نخلة في واحة العين.',
      },
    ],
    applicationQuestion: 'Why is checking two sources better than stopping after reading just one?',
    realWorldActivity:
      'For your next school topic, check two different trustworthy sources (such as a book or museum page plus an encyclopedia) and show your teacher or parent both sources.',
    realWorldActivityAr:
      'في بحثك المدرسي القادم، تحقق من مصدرين موثوقين مختلفين وأظهرهما لمعلمك أو أحد والديك.',
    contextSetting: 'school',
    expectedOutcome: 'Child demonstrates cross-source verification for a school task.',
    aiConfidence: 94,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Al Ain Oasis", CC BY-SA 4.0)',
    illustrationUrl: IMG_OASIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-dig-kind-digital',
    originalTitle: 'Digital Citizenship — Kindness and Honesty Online',
    originalTitleAr: 'المواطنة الرقمية: اللطف والصدق عبر الإنترنت',
    originalUrl: 'https://en.wikipedia.org/wiki/Digital_citizen',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Digital_citizen',
    language: 'English',
    childDescription:
      'Connect Emirati values of respect and courtesy to how we treat classmates and creators in digital spaces.',
    childArticleBody:
      'Being a good digital citizen means bringing the same kindness, honesty, and respect online that we show face-to-face. That includes giving credit when you use someone’s drawing or article, writing polite comments, and refusing to forward unkind rumors.',
    mainCulturalTopic: 'Responsible and respectful digital citizenship',
    culturalSignificance:
      'Applies timeless values of truthfulness and courtesy to modern online life.',
    primarySkill: 'digital-wisdom',
    secondarySkills: ['respect', 'communication'],
    skillReason:
      'Responsible technology use includes empathy, attribution, and standing against online unkindness.',
    ageSuitability: '10-12',
    difficulty: 'Challenging',
    learningObjective: 'Practice giving proper credit and choosing kind words in digital communication.',
    questions: [
      {
        id: 'q-dig-5-1',
        format: 'best_response',
        prompt: 'You find an amazing photo of a desert falcon online to use in a school slide. What is the wise choice?',
        options: [
          'Check if it is free to use and write the photographer or website name underneath',
          'Erase the creator’s name and say you took the photo yourself',
          'Copy it without telling anyone where it came from',
        ],
        correctIndex: 0,
        explanation: 'Giving credit honors the person who created the work and builds honest habits.',
        explanationAr: 'ذكر اسم صاحب العمل يحترم جهده ويبني عادات صادقة.',
      },
      {
        id: 'q-dig-5-2',
        format: 'true_false',
        prompt: 'If a message looks embarrassing or unkind about a classmate, forwarding it "just as a joke" still causes harm.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Kind digital citizens stop rumors and unkind messages from spreading.',
        explanationAr: 'صحيح! المواطن الرقمي اللطيف يوقف انتشار الشائعات والإساءات.',
      },
    ],
    applicationQuestion: 'How do you decide whether a message is helpful before sending it?',
    realWorldActivity:
      'Create a 3-rule "Kind Digital Citizen" mini-poster on paper with a sibling or parent and put it near your family study desk.',
    realWorldActivityAr:
      'صمم ملصقاً ورقياً صغيراً من 3 قواعد للمواطن الرقمي اللطيف مع أسرتك وضعه قرب مكتب الدراسة.',
    contextSetting: 'digital',
    expectedOutcome: 'Child articulates ethical digital rules in collaboration with family.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Digital citizen", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },

  // =========================================================
  // 3. LEADERSHIP (5 Progressive Leaves)
  // =========================================================
  {
    id: 'res-lead-zayed',
    originalTitle: 'Sheikh Zayed bin Sultan Al Nahyan — Building Through Unity',
    originalTitleAr: 'الشيخ زايد بن سلطان آل نهيان: القيادة بالوحدة والتعاون',
    originalUrl: 'https://en.wikipedia.org/wiki/Zayed_bin_Sultan_Al_Nahyan',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Zayed_bin_Sultan_Al_Nahyan',
    language: 'English',
    childDescription:
      'Learn how patient listening, fairness, and uniting neighbors helped transform separate emirates into one cooperative nation.',
    childDescriptionAr:
      'تعلّم كيف ساهم الإنصات والإنصاف وتوحيد الجهود في بناء دولة الإمارات العربية المتحدة.',
    childArticleBody:
      'Before 1971, the emirates were separate communities along the coast and desert. Sheikh Zayed bin Sultan Al Nahyan became a unifying leader by visiting communities, listening to people’s needs, sharing resources fairly, and believing that people are stronger when they work together. True leadership starts with responsibility and care for others.',
    childArticleBodyAr:
      'قبل عام 1971، كانت الإمارات مجتمعات متفرقة على الساحل وفي الصحراء. قاد الشيخ زايد مسيرة الاتحاد عبر الاستماع للناس ومشاركة الموارد بعدل والإيمان بأن التعاون يصنع المستقبل.',
    mainCulturalTopic: 'Historical UAE leadership, consensus, and community cooperation',
    culturalSignificance:
      'Founding history of the UAE illustrating servant leadership and shared purpose.',
    primarySkill: 'leadership',
    secondarySkills: ['communication', 'respect'],
    skillReason:
      'Shows that leadership means listening to everyone’s voice and uniting a group around fair goals.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Describe one quality of fair leadership learned from UAE history.',
    questions: [
      {
        id: 'q-lead-1-1',
        format: 'multiple_choice',
        prompt: 'What helped turn separate communities into the United Arab Emirates in 1971?',
        options: [
          'Listening, fairness, and uniting people around shared goals',
          'Refusing to meet with neighboring leaders',
          'Working completely alone without cooperation',
        ],
        correctIndex: 0,
        explanation: 'Cooperation, patient dialogue, and fairness brought the emirates together.',
        explanationAr: 'التعاون والحوار الصبور والإنصاف جمعت الإمارات معاً.',
      },
      {
        id: 'q-lead-1-2',
        format: 'true_false',
        prompt: 'Being a good leader means bossing everyone around without listening to their ideas.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! Great leaders listen carefully and help everyone contribute.',
        explanationAr: 'خطأ! القائد الجيد يستمع باهتمام ويساعد الجميع على المشاركة.',
      },
    ],
    applicationQuestion: 'When have you seen someone lead fairly by helping a quieter teammate join in?',
    realWorldActivity:
      'Take responsibility for organizing one small shared chore or family game tonight, making sure everyone gets a fair turn.',
    realWorldActivityAr:
      'بادر بتنظيم مهمة عائلية بسيطة أو لعبة جماعية الليلة، وتأكد من حصول الجميع على دور عادل.',
    contextSetting: 'family',
    expectedOutcome: 'Child practices fair initiative and turn-sharing at home.',
    aiConfidence: 95,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Zayed bin Sultan Al Nahyan", CC BY-SA 4.0)',
    illustrationUrl: IMG_MAJLIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-lead-pearl-crew',
    originalTitle: 'Team Roles on a Traditional Pearl Dhow',
    originalTitleAr: 'أدوار الفريق على سفينة الغوص التقليدية',
    originalUrl: 'https://en.wikipedia.org/wiki/Dhow',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Dhow',
    language: 'English',
    childDescription:
      'Discover how every crew member on a wooden dhow—from captain to rope-puller—had a vital job keeping everyone safe.',
    childArticleBody:
      'On historic Emirati wooden dhows, no single person could sail or dive alone. The Nakhuda (captain) planned the route fairly, the Seib held the safety rope for the diver, and singers kept morale high. Every role mattered—teaching us that organizing a team means respecting what each person brings.',
    mainCulturalTopic: 'Maritime teamwork and shared responsibility on traditional dhows',
    culturalSignificance:
      'Dhows symbolize the UAE’s coastal heritage of discipline, trust, and organized teamwork.',
    primarySkill: 'leadership',
    secondarySkills: ['adaptability'],
    skillReason:
      'Demonstrates clear role assignment, accountability, and mutual trust in a team.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Plan a small team task where each person has a clear, helpful role.',
    questions: [
      {
        id: 'q-lead-2-1',
        format: 'multiple_choice',
        prompt: 'Why did every member of a dhow crew need to do their job reliably?',
        options: [
          'Because everyone’s safety and success depended on trusting one another',
          'Because only the captain stayed awake during the trip',
          'Because the boat moved without sails or ropes',
        ],
        correctIndex: 0,
        explanation: 'Teamwork works when every person takes responsibility for their part.',
        explanationAr: 'ينجح العمل الجماعي عندما يتحمل كل فرد مسؤولية دوره بصدق.',
      },
      {
        id: 'q-lead-2-2',
        format: 'best_response',
        prompt: 'You are leading a 3-person school cleanup table. One classmate does not know what to do. What should you do?',
        options: [
          'Kindly give them a clear, fair task and thank them for helping',
          'Do everything yourself and complain afterward',
          'Tell them to sit in the corner',
        ],
        correctIndex: 0,
        explanation: 'Good organizers make sure every teammate feels needed and included.',
        explanationAr: 'القائد المنظم يمنح كل زميل دوراً واضحاً ويشكره على مساهمته.',
      },
    ],
    applicationQuestion: 'How do you make sure everyone in a school group feels their job matters?',
    realWorldActivity:
      'Organize a small 10-minute team activity at school or with friends—assign fair roles (timer, organizer, helper) and check in on everyone.',
    realWorldActivityAr:
      'نظم نشاطاً جماعياً قصيراً في المدرسة أو مع أصدقائك ووزع الأدوار بعدل ولطف.',
    contextSetting: 'school',
    expectedOutcome: 'Child organizes a fair micro-team activity in a school or peer setting.',
    aiConfidence: 94,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Dhow", CC BY-SA 4.0)',
    illustrationUrl: IMG_PEARL,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-lead-falaj-steward',
    originalTitle: 'Al Aflaj — Fair Water Sharing in Oasis Communities',
    originalTitleAr: 'الأفلاج: التوزيع العادل للمياه في الواحات',
    originalUrl: 'https://www.youtube.com/watch?v=Q76F7WtiRN0',
    sourceOrganization: 'UNESCO Intangible Cultural Heritage',
    mediaType: 'youtube',
    youtubeVideoId: 'Q76F7WtiRN0',
    language: 'English / Arabic',
    childDescription:
      'Watch how oasis communities elected trusted stewards to share precious water fairly across every farm.',
    childArticleBody:
      'Al Aflaj irrigation networks carry underground mountain water to date palm oasis gardens across the UAE. To keep water fair for all families—upstream and downstream—communities relied on careful timekeeping, clear rules, and honest leaders who solved disputes calmly.',
    mainCulturalTopic: 'Fair resource stewardship and community governance',
    culturalSignificance:
      'Recognized by UNESCO as living heritage of cooperative community engineering in the UAE.',
    primarySkill: 'leadership',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Fair decision-making with shared resources is one of the highest tests of community leadership.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Explain why clear, fair rules help a community share limited resources peacefully.',
    questions: [
      {
        id: 'q-lead-3-1',
        format: 'multiple_choice',
        prompt: 'Why could the first farm along a falaj channel NOT simply keep all the water?',
        options: [
          'Because community rules ensured every neighbor downstream got a fair share',
          'Because palm trees do not need water',
          'Because water flowed upward into the sky',
        ],
        correctIndex: 0,
        explanation: 'Fair leadership protects everyone in the community, not just the person in front.',
        explanationAr: 'القيادة العادلة تحفظ حق الجميع في المجتمع ولا تقتصر على الأقرب.',
      },
      {
        id: 'q-lead-3-2',
        format: 'true_false',
        prompt: 'Good leaders make rules that help both themselves and the people arriving last.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Fairness means thinking about the whole community.',
        explanationAr: 'نعم! الإنصاف يعني مراعاة مصلحة المجتمع بأكمله.',
      },
    ],
    applicationQuestion: 'How would you divide limited art supplies fairly if a table of 5 students only had 2 scissors?',
    realWorldActivity:
      'Notice a shared resource at home or school (like family screen time, water, or sports equipment) and propose a fair turn-taking schedule.',
    realWorldActivityAr:
      'لاحظ مورداً مشتركاً في المنزل أو المدرسة واقترح جدولاً عادلاً لتبادل استخدامه.',
    contextSetting: 'community',
    expectedOutcome: 'Child designs and applies a fair sharing rule in real life.',
    aiConfidence: 95,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: UNESCO Intangible Cultural Heritage (YouTube)',
    illustrationUrl: IMG_OASIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-lead-greening-desert',
    originalTitle: 'Date Palms and Long-Term Care for Future Generations',
    originalTitleAr: 'النخيل: الرعاية طويلة المدى للأجيال القادمة',
    originalUrl: 'https://en.wikipedia.org/wiki/Date_palm',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Date_palm',
    language: 'English',
    childDescription:
      'Why did families plant date palms that take years to grow? Explore leadership that cares about tomorrow.',
    childArticleBody:
      'A date palm takes several years before giving abundant fruit, and can live for decades providing shade, food, and weaving materials (khoos). Caring for trees and public gardens is a quiet form of leadership—doing helpful work today so future neighbors enjoy shade tomorrow.',
    mainCulturalTopic: 'Environmental stewardship and long-term initiative',
    culturalSignificance:
      'Date palms have nourished Emirati families for millennia and symbolize generosity across generations.',
    primarySkill: 'leadership',
    secondarySkills: ['adaptability'],
    skillReason:
      'Taking initiative on environmental care builds patience, responsibility, and civic pride.',
    ageSuitability: '8-12',
    difficulty: 'Intermediate',
    learningObjective: 'Take small, steady responsibility for a living plant or shared community space.',
    questions: [
      {
        id: 'q-lead-4-1',
        format: 'multiple_choice',
        prompt: 'What does planting and caring for a tree teach us about leadership?',
        options: [
          'True leaders invest patient effort today to help people tomorrow',
          'If something takes patience, it is not worth starting',
          'Only adults can care for plants or parks',
        ],
        correctIndex: 0,
        explanation: 'Consistent care over time creates lasting benefits for everyone.',
        explanationAr: 'العناية المستمرة تصنع خيراً يدوم للجميع.',
      },
      {
        id: 'q-lead-4-2',
        format: 'true_false',
        prompt: 'Traditionally, almost every part of a date palm—from fruit to fronds—was used thoughtfully without waste.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Fronds were woven into baskets and mats, trunks used for building, and dates shared as food.',
        explanationAr: 'صحيح! استُخدمت كل أجزاء النخلة بذكاء دون هدر.',
      },
    ],
    applicationQuestion: 'What small care habit can you keep up for an entire week without being reminded?',
    realWorldActivity:
      'Take care of a household plant, tidy a shared family corner, or help water a garden area for 5 days in a row.',
    realWorldActivityAr:
      'اعتنِ بنبتة منزلية أو رتّب ركناً مشتركاً في المنزل أو ساعد في سقي الحديقة لمدة 5 أيام متواصلة.',
    contextSetting: 'community',
    expectedOutcome: 'Child practices consistent stewardship without reminders.',
    aiConfidence: 91,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Date palm", CC BY-SA 4.0)',
    illustrationUrl: IMG_OASIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-lead-uae-cooperation',
    originalTitle: 'United Arab Emirates — Seven Emirates Working Together',
    originalTitleAr: 'الإمارات السبع: العمل المشترك لخدمة المجتمع',
    originalUrl: 'https://en.wikipedia.org/wiki/United_Arab_Emirates',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'United_Arab_Emirates',
    language: 'English',
    childDescription:
      'See how Abu Dhabi and the six sister emirates cooperate on schools, nature, and culture while keeping local character.',
    childArticleBody:
      'The United Arab Emirates brings together seven emirates—Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah. Each emirate has its own landscape of islands, deserts, coasts, or mountains, yet they unite around shared education, safety, and cultural preservation.',
    mainCulturalTopic: 'Federal unity and collaborative project planning',
    culturalSignificance:
      'Illustrates how diverse regions contribute unique strengths to one shared community.',
    primarySkill: 'leadership',
    secondarySkills: ['communication', 'hospitality'],
    skillReason:
      'Coordinating different strengths toward one shared project is the hallmark of mature youth leadership.',
    ageSuitability: '10-12',
    difficulty: 'Challenging',
    learningObjective: 'Plan a simple family or school mini-project with clear goals and shared helpers.',
    questions: [
      {
        id: 'q-lead-5-1',
        format: 'multiple_choice',
        prompt: 'How many emirates unite together to form the UAE?',
        options: ['Seven emirates', 'Two emirates', 'Twelve emirates'],
        correctIndex: 0,
        explanation: 'Seven emirates cooperate together as the United Arab Emirates.',
        explanationAr: 'سبع إمارات تتحد معاً لتشكل دولة الإمارات العربية المتحدة.',
      },
      {
        id: 'q-lead-5-2',
        format: 'best_response',
        prompt: 'When planning a charity book drive or neighborhood kindness box, what makes it succeed?',
        options: [
          'Inviting teammates’ ideas, setting a clear date, and thanking everyone who helped',
          'Changing the plan every five minutes without telling anyone',
          'Keeping the project secret from helpers',
        ],
        correctIndex: 0,
        explanation: 'Clear plans and appreciation turn good intentions into real community impact.',
        explanationAr: 'الوضوح والشكر يحولان النية الطيبة إلى أثر حقيقي.',
      },
    ],
    applicationQuestion: 'What is one mini-project you could plan this weekend with your family or classmates?',
    realWorldActivity:
      'Lead a small "Kindness or Heritage Mini-Project" (such as donating gently used books, making thank-you cards for school helpers, or organizing a family walk).',
    realWorldActivityAr:
      'قد مبادرة صغيرة للخير أو التراث (مثل التبرع بكتب مستعملة بلطف، أو صنع بطاقات شكر للعاملين في المدرسة، أو تنظيم نزهة عائلية).',
    contextSetting: 'community',
    expectedOutcome: 'Child initiates and completes a collaborative mini-project.',
    aiConfidence: 92,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("United Arab Emirates", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },

  // =========================================================
  // 4. RESPECT (5 Progressive Leaves)
  // =========================================================
  {
    id: 'res-resp-alsadu-video',
    originalTitle: 'Al Sadu — Traditional Weaving Skills in the UAE',
    originalTitleAr: 'السدو: مهارات النسيج التقليدي في الإمارات',
    originalUrl: 'https://www.youtube.com/watch?v=N4iXW0V2BEE',
    sourceOrganization: 'UNESCO Intangible Cultural Heritage',
    mediaType: 'youtube',
    youtubeVideoId: 'N4iXW0V2BEE',
    language: 'English / Arabic',
    childDescription:
      'Meet Emirati women weavers who keep geometric Bedouin patterns alive through patience, care, and teaching younger generations.',
    childDescriptionAr:
      'تعرّف على الحرفيات الإماراتيات اللواتي يحفظن نقوش السدو الهندسية بالصبر وتعليم الأجيال الجديدة.',
    childArticleBody:
      'Al Sadu is a traditional Bedouin weaving craft practiced mainly by women in the UAE. Using spun camel, goat, and sheep wool dyed in earthy reds, blacks, whites, and sands, weavers sit together creating tent dividers, cushions, and camel trappings—passing down designs and life lessons from elders to youth.',
    mainCulturalTopic: 'Honoring elders and artisan craftsmanship in Al Sadu',
    culturalSignificance:
      'Inscribed by UNESCO, Al Sadu preserves women’s artistic heritage and intergenerational mentorship.',
    primarySkill: 'respect',
    secondarySkills: ['communication'],
    skillReason:
      'Watching masters teach intricate skills fosters deep respect for elders’ patience and wisdom.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Appreciate the patience and skill elders bring to family and cultural crafts.',
    questions: [
      {
        id: 'q-resp-1-1',
        format: 'multiple_choice',
        prompt: 'What materials were traditionally spun to weave Al Sadu textiles?',
        options: [
          'Sheep, goat, and camel wool',
          'Plastic straws and metal wire',
          'Tree bark only',
        ],
        correctIndex: 0,
        explanation: 'Bedouin weavers spun natural wool from their herds and dyed it with natural colors.',
        explanationAr: 'استخدمت النساجات صوف الأغنام والماعز والإبل.',
      },
      {
        id: 'q-resp-1-2',
        format: 'true_false',
        prompt: 'Al Sadu weaving was often done together in groups where elders taught younger family members.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Weaving together created friendships and passed skills to the next generation.',
        explanationAr: 'نعم! النسج الجماعي عزز المحبة ونقل المهارة للأجيال الجديدة.',
      },
    ],
    applicationQuestion: 'What is something an older family member knows how to do that you admire?',
    realWorldActivity:
      'Ask an elder in your family or neighborhood about a skill or craft they learned growing up—and thank them for sharing their story.',
    realWorldActivityAr:
      'اسأل أحد كبار السن في أسرتك عن مهارة أو حرفة تعلمها في صغره، واشكره على مشاركة قصته.',
    contextSetting: 'family',
    expectedOutcome: 'Child shows appreciation and curiosity toward an elder’s lived knowledge.',
    aiConfidence: 96,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: UNESCO Intangible Cultural Heritage (YouTube)',
    illustrationUrl: IMG_SADU,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-resp-alsadu-wiki',
    originalTitle: 'Al Sadu — Symbols, Patterns, and Cultural Stories',
    originalTitleAr: 'السدو: الرموز والزخارف والقصص الثقافية',
    originalUrl: 'https://en.wikipedia.org/wiki/Al_Sadu',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Al_Sadu',
    language: 'English',
    childDescription:
      'Discover how geometric Al Sadu shapes reflect desert dunes, stars, and everyday family life—and why different traditions deserve respect.',
    childArticleBody:
      'Every Al Sadu pattern tells something about desert surroundings—triangles, diamonds, and stripes mirror sand dunes, palm trees, and night skies. Across Abu Dhabi, families come from many different backgrounds and countries, each bringing their own treasured crafts, foods, and holidays.',
    mainCulturalTopic: 'Appreciating diverse family crafts and cultural symbols',
    culturalSignificance:
      'Shows how visual symbols carry meaning across cultures in Abu Dhabi.',
    primarySkill: 'respect',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Comparing cultural symbols helps children appreciate both Emirati roots and multicultural neighbors.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Notice one similarity and one unique detail between two family traditions.',
    questions: [
      {
        id: 'q-resp-2-1',
        format: 'multiple_choice',
        prompt: 'What often inspired geometric patterns in Al Sadu weaving?',
        options: [
          'The natural desert environment, sand dunes, and daily life',
          'Video game controllers',
          'Subway maps',
        ],
        correctIndex: 0,
        explanation: 'Nature and daily desert life inspired those timeless geometric lines.',
        explanationAr: 'استُلهمت الزخارف من الطبيعة الصحراوية والحياة اليومية.',
      },
      {
        id: 'q-resp-2-2',
        format: 'best_response',
        prompt: 'A classmate brings a traditional food or wears cultural clothing unfamiliar to you. What shows respect?',
        options: [
          'Ask a kind, curious question and appreciate what it means to their family',
          'Laugh because it looks different from yours',
          'Ignore them all day',
        ],
        correctIndex: 0,
        explanation: 'Respectful curiosity helps every child in Abu Dhabi feel valued and safe.',
        explanationAr: 'الفضول اللطيف والاحترام يجعلان كل طفل يشعر بالتقدير.',
      },
    ],
    applicationQuestion: 'What tradition from your own family—or a friend’s family—makes celebrations special?',
    realWorldActivity:
      'Talk with a parent or classmate about a cultural tradition from another family background and list one similarity and one interesting difference.',
    realWorldActivityAr:
      'تحدث مع أحد والديك أو زميلك حول تقليد ثقافي من خلفية أخرى، واذكر تشابهاً واحداً واختلافاً واحداً جميلاً.',
    contextSetting: 'school',
    expectedOutcome: 'Child practices empathetic cross-cultural curiosity.',
    aiConfidence: 94,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Al Sadu", CC BY-SA 4.0)',
    illustrationUrl: IMG_SADU,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-resp-falconry',
    originalTitle: 'Falconry — Patience, Care, and Self-Respect',
    originalTitleAr: 'الصقارة: الصبر والرعاية واحترام الطبيعة',
    originalUrl: 'https://en.wikipedia.org/wiki/Falconry',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Falconry',
    language: 'English',
    childDescription:
      'Learn how Emirati falconers build trust with wildlife through calm patience—and release falcons back to nature.',
    childArticleBody:
      'Falconry has deep roots across the Arabian Peninsula. Historically, families partnered with falcons to survive in harsh desert seasons. Modern Emirati falconry emphasizes wildlife protection, specialized veterinary hospitals, and releasing falcons back into the wild—showing respect for living creatures and calm self-control.',
    mainCulturalTopic: 'Respect for nature, patience, and gentle stewardship',
    culturalSignificance:
      'UAE-led international falconry heritage recognized by UNESCO alongside modern conservation.',
    primarySkill: 'respect',
    secondarySkills: ['adaptability'],
    skillReason:
      'Caring for living creatures requires calm emotions, patience, and self-discipline.',
    ageSuitability: '8-12',
    difficulty: 'Intermediate',
    learningObjective: 'Practice patience and gentle care toward animals and quiet spaces.',
    questions: [
      {
        id: 'q-resp-3-1',
        format: 'true_false',
        prompt: 'In modern UAE falconry, conservation programs care for injured falcons and help release healthy birds back to the wild.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Abu Dhabi leads major falcon conservation and veterinary care.',
        explanationAr: 'نعم! تقود أبوظبي جهوداً رائدة في رعاية الصقور وإطلاقها في الطبيعة.',
      },
      {
        id: 'q-resp-3-2',
        format: 'multiple_choice',
        prompt: 'What attitude helps build trust when caring for an animal or helping a shy friend?',
        options: [
          'Calm patience and gentle kindness',
          'Shouting and rushing',
          'Forgetting to check how they feel',
        ],
        correctIndex: 0,
        explanation: 'Patience and gentleness create safety and trust.',
        explanationAr: 'الصبر واللطف يبنيان الثقة والأمان.',
      },
    ],
    applicationQuestion: 'How do you keep yourself calm when you feel frustrated or rushed?',
    realWorldActivity:
      'Practice taking 3 slow breaths before reacting if something frustrates you today, and show gentle care for a pet, bird, or neighborhood tree.',
    realWorldActivityAr:
      'تدرّب على أخذ 3 أنفاس هادئة قبل الرد إذا شعرت بالانزعاج اليوم، وأظهر لطفاً تجاه الطبيعة أو الحيوانات.',
    contextSetting: 'community',
    expectedOutcome: 'Child practices emotional self-respect and gentle stewardship.',
    aiConfidence: 92,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Falconry", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-resp-empathy',
    originalTitle: 'Empathy — Seeing Through Another Person’s Eyes',
    originalTitleAr: 'التعاطف: رؤية العالم من منظور الآخرين',
    originalUrl: 'https://en.wikipedia.org/wiki/Empathy',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Empathy',
    language: 'English',
    childDescription:
      'Understand what empathy means in everyday school and family life, and how noticing feelings strengthens friendships.',
    childArticleBody:
      'Empathy is the ability to imagine how another person feels in their situation. Even when we do not agree on everything—whether choosing a game or understanding someone’s bad day—pausing to ask "How might they be feeling right now?" helps us respond with respect instead of anger.',
    mainCulturalTopic: 'Empathy and perspective-taking across communities',
    culturalSignificance:
      'Supports inclusive, harmonious school and neighborhood life in multicultural Abu Dhabi.',
    primarySkill: 'respect',
    secondarySkills: ['communication'],
    skillReason:
      'Perspective-taking turns daily interactions into opportunities for genuine understanding.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Pause and imagine another person’s perspective during a disagreement.',
    questions: [
      {
        id: 'q-resp-4-1',
        format: 'best_response',
        prompt: 'A new student sits alone looking nervous at lunch. What shows empathy?',
        options: [
          'Remember how nervous starting somewhere new feels, smile, and invite them over',
          'Stare at them from across the room',
          'Assume they want to be ignored',
        ],
        correctIndex: 0,
        explanation: 'Imagining how they feel turns awkwardness into a warm welcome.',
        explanationAr: 'تخيّل مشاعر الآخرين يحوّل التردد إلى ترحيب دافئ.',
      },
      {
        id: 'q-resp-4-2',
        format: 'true_false',
        prompt: 'You can understand how someone feels even if you would have chosen differently.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Empathy does not mean always agreeing—it means caring enough to understand.',
        explanationAr: 'صحيح! التعاطف يعني فهم مشاعر الآخر حتى لو اختلف رأيك.',
      },
    ],
    applicationQuestion: 'Tell about a time someone noticed how you felt and helped you feel better.',
    realWorldActivity:
      'Check in on a sibling, classmate, or elder today by asking "How was your day?" and listening to their whole answer.',
    realWorldActivityAr:
      'اسأل أخاك أو زميلك أو أحد كبار السن اليوم: "كيف كان يومك؟" واستمع لإجابته كاملة.',
    contextSetting: 'school',
    expectedOutcome: 'Child initiates an empathetic check-in with someone in their daily circle.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Empathy", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-resp-museum-manners',
    originalTitle: 'Caring for Shared Heritage Spaces',
    originalTitleAr: 'احترام الأماكن العامة والتراث المشترك',
    originalUrl: 'https://en.wikipedia.org/wiki/Qasr_Al_Hosn',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Qasr_Al_Hosn',
    language: 'English',
    childDescription:
      'Learn why museums, parks, and historic landmarks like Qasr Al Hosn rely on every visitor’s respect to stay welcoming for all.',
    childArticleBody:
      'Historic places like Qasr Al Hosn have survived centuries of sun and wind so children today can walk through their courtyards. Respecting public spaces—keeping voices calm, throwing away litter, not touching fragile artifacts, and holding doors open—helps preserve our shared home for everyone.',
    mainCulturalTopic: 'Stewardship of public spaces and historical monuments',
    culturalSignificance:
      'Connects pride in Abu Dhabi’s heritage sites with everyday public courtesy.',
    primarySkill: 'respect',
    secondarySkills: ['hospitality'],
    skillReason:
      'Respectful behavior in public spaces keeps cultural centers welcoming for families and visitors.',
    ageSuitability: '8-12',
    difficulty: 'Challenging',
    learningObjective: 'Practice three mindful habits when visiting a museum, library, park, or community center.',
    questions: [
      {
        id: 'q-resp-5-1',
        format: 'multiple_choice',
        prompt: 'Why do museums ask visitors not to touch ancient stone or woven textiles?',
        options: [
          'Oils and dust on hands can slowly wear down fragile historical materials',
          'Because artifacts are invisible',
          'Only so rooms stay completely empty',
        ],
        correctIndex: 0,
        explanation: 'Looking carefully without touching keeps priceless heritage safe for future children.',
        explanationAr: 'النظر بعناية دون لمس يحفظ القطع التراثية للأجيال القادمة.',
      },
      {
        id: 'q-resp-5-2',
        format: 'true_false',
        prompt: 'Respecting a public park or cultural space includes picking up our own litter even when nobody is watching.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Self-respect shows in what we do quietly to care for shared spaces.',
        explanationAr: 'صحيح! احترام الذات يظهر في محافظتنا على الأماكن المشتركة دائماً.',
      },
    ],
    applicationQuestion: 'What is one thing you can do to leave a public space cleaner or nicer than you found it?',
    realWorldActivity:
      'Visit a public park, library, or cultural site (or tidy your family’s shared living space at home) and follow three "Guardian of Shared Spaces" habits.',
    realWorldActivityAr:
      'زر حديقة عامة أو مكتبة أو مركزاً ثقافياً (أو رتب غرفة الجلوس في منزلك) وطبق ثلاث عادات لحماية الأماكن المشتركة.',
    atHomeEquivalent:
      'At-home option: Care for your family’s shared reading/living corner as if it were a community museum.',
    contextSetting: 'public-spaces',
    expectedOutcome: 'Child demonstrates civic respect in a shared public or home space.',
    aiConfidence: 94,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Qasr Al Hosn", CC BY-SA 4.0)',
    illustrationUrl: IMG_SADU,
    isAiAdaptedSummary: true,
  },

  // =========================================================
  // 5. HOSPITALITY (5 Progressive Leaves)
  // =========================================================
  {
    id: 'res-hosp-gahwa-video',
    originalTitle: 'Arabic Coffee — Emirati Gahwa Hospitality',
    originalTitleAr: 'القهوة العربية: رمز الضيافة الإماراتية',
    originalUrl: 'https://www.youtube.com/watch?v=-ErVbR_Sk8I',
    sourceOrganization: 'Visit Abu Dhabi (DCT Abu Dhabi)',
    mediaType: 'youtube',
    youtubeVideoId: '-ErVbR_Sk8I',
    language: 'English / Arabic',
    childDescription:
      'Watch how serving Arabic coffee (Gahwa) and dates expresses warmth, generosity, and care for every guest.',
    childDescriptionAr:
      'شاهد كيف يعبر تقديم القهوة العربية والتمر عن الدفء والكرم والعناية بكل ضيف.',
    childArticleBody:
      'In Emirati homes and majlis gatherings, offering Gahwa (lightly roasted coffee spiced with cardamom and saffron) alongside fresh dates is one of the warmest ways to say "You are welcome here." Hosts pour with their right hand, start with elders or honored guests, and never rush someone’s visit.',
    mainCulturalTopic: 'Emirati Gahwa hospitality traditions and welcoming guests',
    culturalSignificance:
      'Inscribed by UNESCO in 2015, Arabic coffee rituals symbolize open-hearted generosity across the UAE.',
    primarySkill: 'hospitality',
    secondarySkills: ['respect'],
    skillReason:
      'Shows how small, thoughtful gestures help visitors feel immediately cared for and included.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Notice two thoughtful gestures that make a guest feel comfortable and welcome.',
    viewingObjective: 'Watch how the host serves the cup and pays attention to the guests.',
    questions: [
      {
        id: 'q-hosp-1-1',
        format: 'multiple_choice',
        prompt: 'What do Emirati hosts traditionally serve alongside Arabic Gahwa to welcome guests?',
        options: ['Sweet dates', 'Ice cubes only', 'Spicy soup'],
        correctIndex: 0,
        explanation: 'Dates balance the fragrant spiced coffee and honor classic desert hospitality.',
        explanationAr: 'يُقدَّم التمر مع القهوة العربية رمزاً للكرم وحسن الاستقبال.',
      },
      {
        id: 'q-hosp-1-2',
        format: 'true_false',
        prompt: 'Making a guest feel welcome is mostly about expensive decorations rather than kindness and attention.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! Warm greetings, eye contact, and offering comfort matter far more than fancy items.',
        explanationAr: 'خطأ! الابتسامة وحسن الاستقبال والاهتمام أهم من المظاهر.',
      },
    ],
    applicationQuestion: 'How can you help a visitor or relative feel comfortable the moment they arrive at your home?',
    realWorldActivity:
      'Help welcome a family member, neighbor, or guest at home by greeting them warmly and offering water, dates, or a comfortable seat.',
    realWorldActivityAr:
      'شارك في الترحيب بضيف أو قريب في منزلك بتحية دافئة وتقديم الماء أو التمر أو مكان مريح للجلوس.',
    contextSetting: 'family',
    expectedOutcome: 'Child actively participates in welcoming someone at home.',
    aiConfidence: 97,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Visit Abu Dhabi / DCT Abu Dhabi (YouTube)',
    illustrationUrl: IMG_MAJLIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-hosp-gahwa-wiki',
    originalTitle: 'Arabic Coffee — Etiquette and Generosity',
    originalTitleAr: 'آداب القهوة العربية والكرم',
    originalUrl: 'https://en.wikipedia.org/wiki/Arabic_coffee',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Arabic_coffee',
    language: 'English',
    childDescription:
      'Read about the traditional dallah pot, finjan cup, and the respectful etiquette shared between host and guest.',
    childArticleBody:
      'Traditional Arabic coffee is brewed in a curved pot called a dallah and poured into a small handleless cup called a finjan. The host fills only the bottom portion of the cup so it stays hot and easy to hold, refilling gently until the guest gives a polite little shake of the cup to say "Thank you, I have had enough."',
    mainCulturalTopic: 'Gahwa etiquette as mutual respect between host and guest',
    culturalSignificance:
      'Shows how unspoken cultural cues make hospitality gracious for both giver and receiver.',
    primarySkill: 'hospitality',
    secondarySkills: ['communication'],
    skillReason:
      'Attentive hosting notices when someone needs something without making them feel awkward.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Practice noticing small needs around you and offering help politely.',
    questions: [
      {
        id: 'q-hosp-2-1',
        format: 'multiple_choice',
        prompt: 'Why does a host pour only a small amount of Gahwa into the finjan cup at a time?',
        options: [
          'So it stays fresh and warm, and the host can warmly care for the guest with refills',
          'Because the dallah pot is broken',
          'To finish the visit as fast as possible',
        ],
        correctIndex: 0,
        explanation: 'Pouring fresh small cups shows continuous care and attentiveness.',
        explanationAr: 'صب القهوة بكميات قليلة يحافظ على حرارتها ويعبر عن الاهتمام المستمر بالضيف.',
      },
      {
        id: 'q-hosp-2-2',
        format: 'multiple_choice',
        prompt: 'How does a guest politely signal they have had enough Arabic coffee?',
        options: [
          'By gently shaking the small finjan cup side to side',
          'By putting the cup on the floor',
          'By clapping loudly',
        ],
        correctIndex: 0,
        explanation: 'A gentle shake of the finjan is a classic, polite cultural signal!',
        explanationAr: 'هز الفنجان بلطف إشارة مهذبة للاكتفاء.',
      },
    ],
    applicationQuestion: 'How can you notice when someone at school or home needs help before they even ask?',
    realWorldActivity:
      'Practice "Noticing Kindness" today: spot one person at home or school who needs a hand (carrying books, finding a seat, or tidying up) and offer help warmly.',
    realWorldActivityAr:
      'مارس "لطف الانتباه" اليوم: لاحظ شخصاً يحتاج مساعدة بسيطة في المنزل أو المدرسة وبادر بمساعدته بلطف.',
    contextSetting: 'school',
    expectedOutcome: 'Child practices proactive everyday kindness.',
    aiConfidence: 95,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Arabic coffee", CC BY-SA 4.0)',
    illustrationUrl: IMG_MAJLIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-hosp-inclusion',
    originalTitle: 'Inclusion — Opening the Circle for Everyone',
    originalTitleAr: 'الشمولية: فتح الدائرة للجميع',
    originalUrl: 'https://en.wikipedia.org/wiki/Hospitality',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Hospitality',
    language: 'English',
    childDescription:
      'Discover how true hospitality goes beyond food—it means welcoming newcomers at school, parks, and clubs.',
    childArticleBody:
      'Across history, desert hospitality meant offering shelter and water even to strangers passing through. Today in Abu Dhabi’s schools and neighborhoods, hospitality looks like widening our circle so a new student, a shy teammate, or someone speaking a different language feels right at home.',
    mainCulturalTopic: 'Inclusion and welcoming newcomers in community life',
    culturalSignificance:
      'Bridges ancient desert shelter traditions with modern inclusive neighborhoods.',
    primarySkill: 'hospitality',
    secondarySkills: ['respect', 'leadership'],
    skillReason:
      'Inclusion turns friendliness into real social courage—making room for others.',
    ageSuitability: '8-12',
    difficulty: 'Intermediate',
    learningObjective: 'Invite someone outside your usual group to join a game, table, or activity.',
    questions: [
      {
        id: 'q-hosp-3-1',
        format: 'best_response',
        prompt: 'You and your friends are playing at break time and a classmate stands nearby watching. What is true hospitality?',
        options: [
          'Wave them over, explain the rules quickly, and include them in the round',
          'Say "Sorry, our team is full" without trying to make space',
          'Move to a different corner',
        ],
        correctIndex: 0,
        explanation: 'Hospitality means making space so others feel welcome to belong.',
        explanationAr: 'الضيافة تعني إفساح المجال ليشارك الآخرون ويشعروا بالانتماء.',
      },
      {
        id: 'q-hosp-3-2',
        format: 'true_false',
        prompt: 'Hospitality only happens inside a house when guests come for dinner.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! We can practice hospitality in classrooms, playgrounds, parks, and communities.',
        explanationAr: 'خطأ! يمكننا ممارسة الضيافة في الصف والملعب والحي والمجتمع.',
      },
    ],
    applicationQuestion: 'What does it feel like when someone welcomes you into a new group?',
    realWorldActivity:
      'At school, a club, or a neighborhood park, greet someone you do not usually play with or invite someone new to join an activity.',
    realWorldActivityAr:
      'في المدرسة أو النادي أو الحديقة، سلّم على زميل لا تلعب معه عادة أو ادعُ شخصاً جديداً للانضمام إليكم.',
    contextSetting: 'school',
    expectedOutcome: 'Child practices inclusive welcoming behavior with peers.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Hospitality", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-hosp-generosity',
    originalTitle: 'Generosity in Community Celebrations',
    originalTitleAr: 'الكرم في المناسبات المجتمعية',
    originalUrl: 'https://en.wikipedia.org/wiki/Generosity',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Generosity',
    language: 'English',
    childDescription:
      'Explore how sharing time, kind words, and simple treats strengthens neighborhood bonds.',
    childArticleBody:
      'In UAE neighborhoods, celebrations like Eid, Ramadan evenings, and community festivals feature families sharing meals with neighbors and workers nearby. Generosity is not about having the most expensive gifts—it is sharing willingly from what you have, including your time and encouragement.',
    mainCulturalTopic: 'Neighborhood generosity and sharing',
    culturalSignificance:
      'Reflects the Emirati spirit of neighborliness ("Al Jar qabl Al Dar" — the neighbor before the house).',
    primarySkill: 'hospitality',
    secondarySkills: ['community' as never].filter(Boolean) as ('respect')[],
    skillReason:
      'Practicing small acts of generosity builds community trust and warmth.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Share time, help, or a thoughtful note with someone in your neighborhood.',
    questions: [
      {
        id: 'q-hosp-4-1',
        format: 'multiple_choice',
        prompt: 'Which of these is a meaningful act of generosity for a 10-year-old?',
        options: [
          'Sharing extra snacks, helping carry groceries, or writing a thank-you note',
          'Showing off new toys without letting anyone touch them',
          'Only helping if you receive a prize',
        ],
        correctIndex: 0,
        explanation: 'True generosity gives cheerfully without expecting rewards.',
        explanationAr: 'الكرم الحقيقي هو العطاء بطيب نفس ودون انتظار مقابل.',
      },
      {
        id: 'q-hosp-4-2',
        format: 'true_false',
        prompt: 'Giving your time to cheer someone up or help them is a real form of generosity.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Kind attention and time are among the finest gifts we can share.',
        explanationAr: 'نعم! منح الوقت والاهتمام من أجمل صور الكرم.',
      },
    ],
    applicationQuestion: 'Who in your neighborhood or school works hard every day and might appreciate a kind thank-you?',
    realWorldActivity:
      'Prepare a small thank-you card or share a family-approved treat with a neighbor, security guard, bus driver, or school helper.',
    realWorldActivityAr:
      'أعدّ بطاقة شكر لطيفة أو شارك ضيافة بسيطة بموافقة والديك مع جار أو عامل في المدرسة أو الحي.',
    contextSetting: 'community',
    expectedOutcome: 'Child extends hospitality and gratitude into the broader neighborhood.',
    aiConfidence: 92,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Generosity", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-hosp-host-event',
    originalTitle: 'Hosting a Cultural Welcome Corner',
    originalTitleAr: 'تنظيم ركن ترحيب ثقافي',
    originalUrl: 'https://www.youtube.com/watch?v=59KQbS1DMpQ',
    sourceOrganization: 'UNESCO Intangible Cultural Heritage',
    mediaType: 'youtube',
    youtubeVideoId: '59KQbS1DMpQ',
    language: 'English / Arabic',
    childDescription:
      'Put everything together by planning a mini hospitality welcome for relatives, neighbors, or visiting family friends.',
    childArticleBody:
      'Great hosts prepare ahead so guests feel relaxed from the moment they step inside: greeting by name, offering a seat, sharing something thoughtful, and introducing guests to everyone else in the room so nobody feels left out.',
    mainCulturalTopic: 'Planning inclusive hospitality experiences',
    culturalSignificance:
      'Combines majlis welcoming etiquette with youth leadership.',
    primarySkill: 'hospitality',
    secondarySkills: ['leadership', 'communication'],
    skillReason:
      'Planning and hosting a warm welcome uses empathy, organization, and clear greeting skills.',
    ageSuitability: '10-12',
    difficulty: 'Challenging',
    learningObjective: 'Plan and carry out a welcoming host checklist for a family or community gathering.',
    questions: [
      {
        id: 'q-hosp-5-1',
        format: 'best_response',
        prompt: 'Two guests arrive who do not know anyone else in the room. What should a thoughtful young host do?',
        options: [
          'Greet them warmly, offer refreshments, and introduce them to others',
          'Stay in another room playing games',
          'Only talk to your best friend',
        ],
        correctIndex: 0,
        explanation: 'Introducing newcomers helps everyone relax and start friendly conversations.',
        explanationAr: 'التعريف بالضيوف الجدد يساعد الجميع على الشعور بالراحة والاندماج.',
      },
      {
        id: 'q-hosp-5-2',
        format: 'true_false',
        prompt: 'Preparing a tidy, comfortable space before guests arrive shows respect and care.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Thoughtful preparation tells guests you were glad to welcome them.',
        explanationAr: 'نعم! التجهيز المسبق يعبر عن الترحيب والاهتمام.',
      },
    ],
    applicationQuestion: 'What three steps belong on your personal "Great Host Checklist"?',
    realWorldActivity:
      'With a parent, co-host a small family tea/coffee welcome or community cultural gathering—prepare the space, greet guests, and help introduce everyone.',
    realWorldActivityAr:
      'بمشاركة والديك، ساعد في استضافة جلسة عائلية دافئة: جهّز المكان، رحّب بالضيوف، وساعد في تعريفهم بالجميع.',
    atHomeEquivalent:
      'At-home option: Host a Friday family tea/dates circle at home where you act as the official welcome host.',
    contextSetting: 'public-spaces',
    expectedOutcome: 'Child plans and delivers a complete welcoming host experience.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: UNESCO Intangible Cultural Heritage (YouTube)',
    illustrationUrl: IMG_MAJLIS,
    isAiAdaptedSummary: true,
  },

  // =========================================================
  // 6. ADAPTABILITY (5 Progressive Leaves)
  // =========================================================
  {
    id: 'res-adap-pearl-video',
    originalTitle: 'Pearl Diving in the UAE — Adapting to the Sea',
    originalTitleAr: 'الغوص على اللؤلؤ: التكيف مع تحديات البحر',
    originalUrl: 'https://www.youtube.com/watch?v=VPpZWgFvM68',
    sourceOrganization: 'World History Revealed (Verified Educational Video)',
    mediaType: 'youtube',
    youtubeVideoId: 'VPpZWgFvM68',
    language: 'English',
    childDescription:
      'Explore how Emirati pearl divers prepared cleverly for deep waters with simple handmade tools and strong resilience.',
    childDescriptionAr:
      'استكشف كيف استعد الغواصون الإماراتيون لأعماق البحر بأدوات بسيطة وإرادة قوية.',
    childArticleBody:
      'For centuries before oil, pearl diving (Ghaus) was vital to coastal families in the UAE. Divers worked during hot summer months using minimal gear: a tortoise-shell or horn nose clip (fataam), leather finger guards (khabt), a weighted stone (hijara) to sink quickly, and a woven basket (dayyeen). When seas changed or seasons were tough, communities adapted together.',
    mainCulturalTopic: 'Emirati pearl diving resilience and clever adaptation',
    culturalSignificance:
      'Maritime heritage showing courage, preparation, and adaptability in challenging natural conditions.',
    primarySkill: 'adaptability',
    secondarySkills: ['leadership', 'critical-thinking'],
    skillReason:
      'Illustrates how communities solved harsh environmental challenges through preparation and resilience.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Identify how preparation and flexible problem-solving help overcome difficult tasks.',
    viewingObjective: 'Notice the simple tools divers created to solve underwater challenges.',
    questions: [
      {
        id: 'q-adap-1-1',
        format: 'multiple_choice',
        prompt: 'Why did pearl divers tie a stone weight (hijara) to their foot when diving?',
        options: [
          'To help them sink quickly to the seabed without wasting breath',
          'To decorate the boat deck',
          'To measure the wind speed',
        ],
        correctIndex: 0,
        explanation: 'Sinking quickly saved precious oxygen so divers could collect oysters safely.',
        explanationAr: 'النزول السريع وفّر الأكسجين وساعد الغواص على جمع المحار بأمان.',
      },
      {
        id: 'q-adap-1-2',
        format: 'true_false',
        prompt: 'Watching a video about pearl diving automatically gives us adaptability without needing to practice in real life.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! Stories inspire us, and real-world practice and reflection build true adaptability.',
        explanationAr: 'خطأ! القصص تلهمنا، ولكن التطبيق الواقعي والتأمل هما ما ينميان مهارتنا.',
      },
    ],
    applicationQuestion: 'What challenges did pearl divers face, and how did they prepare for them?',
    realWorldActivity:
      'With a family member, talk about one challenge your family has overcome and what helped everyone adapt and stay strong.',
    realWorldActivityAr:
      'تحدث مع أحد أفراد أسرتك عن تحدٍّ تجاوزته الأسرة معاً، وما الذي ساعدكم على التكيف وتجاوزه.',
    contextSetting: 'family',
    expectedOutcome: 'Child connects historical resilience to real family problem-solving.',
    aiConfidence: 96,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: World History Revealed (YouTube)',
    illustrationUrl: IMG_PEARL,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-adap-pearl-wiki',
    originalTitle: 'Pearl Hunting — Adapting When an Industry Changed',
    originalTitleAr: 'تجارة اللؤلؤ: التكيف مع تغير الزمن',
    originalUrl: 'https://en.wikipedia.org/wiki/Pearl_hunting',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Pearl_hunting',
    language: 'English',
    childDescription:
      'Read how Gulf coastal towns adapted with creativity and new skills when natural pearl diving declined in the 1930s.',
    childArticleBody:
      'For generations, natural pearls supported schools, merchants, and sailors across the Gulf. In the late 1920s and 1930s, global economic shifts and cultured pearls caused pearl diving to decline sharply. Families showed remarkable resilience—adapting to new trades, education, and eventually helping build the modern UAE.',
    mainCulturalTopic: 'Historical economic transition and community resilience',
    culturalSignificance:
      'Explains how UAE society navigated profound change between the pearling era and modern nationhood.',
    primarySkill: 'adaptability',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Teaches children that when external circumstances shift, learning new skills helps us adjust.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Respond calmly with a "Plan B" when a favorite plan suddenly changes.',
    questions: [
      {
        id: 'q-adap-2-1',
        format: 'multiple_choice',
        prompt: 'What happened in the 1930s that changed the Gulf’s traditional pearl-diving economy?',
        options: [
          'Cultured pearls and global economic changes meant communities had to adapt to new work',
          'All oceans dried up completely',
          'Everyone stopped wearing boats',
        ],
        correctIndex: 0,
        explanation: 'Families showed resilience by learning new skills during tough decades.',
        explanationAr: 'أظهرت الأسر صموداً وتكيفت بتعلم مهن ومهارات جديدة.',
      },
      {
        id: 'q-adap-2-2',
        format: 'best_response',
        prompt: 'You planned an outdoor picnic, and suddenly a sandstorm or rain starts. What shows adaptability?',
        options: [
          'Stay calm and turn the living room into an indoor picnic camp',
          'Stay upset all afternoon and refuse to enjoy anything',
          'Blame your family for the weather',
        ],
        correctIndex: 0,
        explanation: 'Creative "Plan B" thinking turns surprises into fun memories.',
        explanationAr: 'التفكير المرن وإيجاد خطة بديلة يحولان المفاجآت إلى لحظات ممتعة.',
      },
    ],
    applicationQuestion: 'Think of a time your plan changed unexpectedly—what was your Plan B?',
    realWorldActivity:
      'Create a fun "Plan B Challenge" at home: take a simple everyday routine or rainy-day game and invent a creative new version using only items you already have.',
    realWorldActivityAr:
      'ابتكر "تحدي الخطة البديلة" في المنزل: غيّر لعبة أو نشاطاً معتاداً باستخدام أدوات بسيطة متوفرة لديك فقط.',
    contextSetting: 'family',
    expectedOutcome: 'Child practices creative flexibility with limited materials.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Pearl hunting", CC BY-SA 4.0)',
    illustrationUrl: IMG_PEARL,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-adap-oasis-video',
    originalTitle: 'Al Ain Oasis — Thriving in an Arid Environment',
    originalTitleAr: 'واحة العين: الازدهار في البيئة الصحراوية',
    originalUrl: 'https://www.youtube.com/watch?v=rEKrcC2lakA',
    sourceOrganization: 'UNESCO World Heritage Showcase (YouTube)',
    mediaType: 'youtube',
    youtubeVideoId: 'rEKrcC2lakA',
    language: 'English',
    childDescription:
      'See how tall date palms create cool shade so fruit trees and gardens grow right beside the desert.',
    childArticleBody:
      'In Al Ain Oasis, clever farmers planted tall date palms above shorter citrus and fig trees, creating a natural multi-layer canopy that shades the soil and saves water from evaporating. This smart ecosystem lets communities grow fresh food even during blazing summers.',
    mainCulturalTopic: 'Desert oasis adaptation and multi-layer farming',
    culturalSignificance:
      'UNESCO World Heritage landscape demonstrating ecological ingenuity in Abu Dhabi.',
    primarySkill: 'adaptability',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Shows how working WITH nature rather than fighting it solves tough resource challenges.',
    ageSuitability: '8-12',
    difficulty: 'Intermediate',
    learningObjective: 'Solve a simple resource-sharing or conservation scenario using oasis wisdom.',
    questions: [
      {
        id: 'q-adap-3-1',
        format: 'multiple_choice',
        prompt: 'Why did oasis farmers plant shorter fruit trees underneath tall date palms?',
        options: [
          'The palm canopy shades the smaller trees and reduces water evaporation',
          'Because smaller trees are afraid of the sun',
          'So birds cannot see the garden',
        ],
        correctIndex: 0,
        explanation: 'Shade keeps soil cooler and helps every drop of falaj water go further.',
        explanationAr: 'الظل يبرد التربة ويقلل تبخر المياه الثمينة.',
      },
      {
        id: 'q-adap-3-2',
        format: 'true_false',
        prompt: 'Small water-saving habits at home—like turning off the tap while brushing teeth—are modern ways of practicing oasis wisdom.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Respecting water connects past desert life directly to our lives today.',
        explanationAr: 'صحيح! ترشيد المياه اليوم امتداد لحكمة الأجداد في الواحة.',
      },
    ],
    applicationQuestion: 'How could a classroom or home conserve one everyday resource like water or paper?',
    realWorldActivity:
      'Solve a "Water-Wise Scenario" at home or school: track water or electricity use for one day and find two creative ways your family or class can save resources.',
    realWorldActivityAr:
      'حل سيناريو "حفظ المياه": راقب استخدام الماء أو الكهرباء ليوم واحد واقترح طريقتين مبتكرتين للترشيد مع أسرتك أو صفك.',
    contextSetting: 'school',
    expectedOutcome: 'Child applies resource-adaptation principles to modern conservation.',
    aiConfidence: 94,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Al Ain Oasis UNESCO Heritage Showcase (YouTube)',
    illustrationUrl: IMG_OASIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-adap-windcatcher',
    originalTitle: 'Barjeel (Windcatcher) — Natural Desert Cooling',
    originalTitleAr: 'البراجيل: التبريد الطبيعي في العمارة الإماراتية',
    originalUrl: 'https://en.wikipedia.org/wiki/Windcatcher',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Windcatcher',
    language: 'English',
    childDescription:
      'Discover how traditional Emirati homes stayed cool before electricity using clever rooftop wind towers called Barjeel.',
    childArticleBody:
      'Long before air conditioners existed, Gulf builders designed tall square towers called Barjeel (windcatchers) on top of coral-stone and mudbrick houses. Openings facing all four directions caught cool high breezes and channeled them down into family rooms below, while warm air rose out.',
    mainCulturalTopic: 'Traditional UAE architecture (Barjeel) adapting to heat',
    culturalSignificance:
      'Iconic Emirati architectural innovation still admired by green engineers worldwide.',
    primarySkill: 'adaptability',
    secondarySkills: ['critical-thinking'],
    skillReason:
      'Creative engineering solves comfort challenges without wasting energy.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Notice how creative design adapts buildings to local weather.',
    questions: [
      {
        id: 'q-adap-4-1',
        format: 'multiple_choice',
        prompt: 'Why did a traditional Barjeel tower have openings on all four sides?',
        options: [
          'So it could catch cool breezes no matter which direction the wind blew',
          'So birds could hold meetings',
          'To store extra dates on the roof',
        ],
        correctIndex: 0,
        explanation: 'Four-sided openings captured breezes from every direction and guided cool air downward.',
        explanationAr: 'الفتحات الأربع تلتقط النسيم من أي اتجاه وتوجهه إلى داخل المنزل.',
      },
      {
        id: 'q-adap-4-2',
        format: 'true_false',
        prompt: 'Modern architects still study traditional Barjeel designs to make eco-friendly buildings.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Traditional wisdom continues inspiring sustainable architecture today.',
        explanationAr: 'صحيح! لا يزال المهندسون يستلهمون من البراجيل لتصميم مبانٍ مستدامة.',
      },
    ],
    applicationQuestion: 'If you built a play fort in summer, what clever feature would keep it cool?',
    realWorldActivity:
      'Look at photos of a traditional Barjeel house (or visit a heritage neighborhood like Al Fahidi / Qasr Al Hosn) and sketch or build a paper mini-model showing how air flows through it.',
    realWorldActivityAr:
      'تأمل صور البيوت ذات البراجيل (أو زر حياً تراثياً) وارسم أو اصنع نموذجاً ورقياً صغيراً يوضح كيف يمر الهواء لتبريد الغرفة.',
    atHomeEquivalent:
      'At-home option: Fold a simple paper windcatcher model with a parent and test airflow with a handheld fan.',
    contextSetting: 'public-spaces',
    expectedOutcome: 'Child explores architectural adaptation through hands-on modeling.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Windcatcher", CC BY-SA 4.0)',
    illustrationUrl: IMG_SADU,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-adap-modern-uae',
    originalTitle: 'Resilience — Adjusting to New Challenges Today',
    originalTitleAr: 'المرونة: التكيف مع التحديات الحديثة',
    originalUrl: 'https://en.wikipedia.org/wiki/Psychological_resilience',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Psychological_resilience',
    language: 'English',
    childDescription:
      'Learn what resilience means when starting a new school year, learning a hard skill, or making a mistake.',
    childArticleBody:
      'Resilience is the ability to bounce back and adapt when things feel unfamiliar or difficult. Whether earlier Emirati generations were navigating sea storms or young people today are learning coding, new languages, or sports, mistakes are not the end—they are clues showing what to try next.',
    mainCulturalTopic: 'Personal resilience and growth through change',
    culturalSignificance:
      'Connects the endurance of UAE heritage with children’s everyday confidence.',
    primarySkill: 'adaptability',
    secondarySkills: ['respect'],
    skillReason:
      'Resilience helps children adjust kindly to setbacks without giving up.',
    ageSuitability: '10-12',
    difficulty: 'Challenging',
    learningObjective: 'Turn one mistake or setback into a calm "What can I try differently?" step.',
    questions: [
      {
        id: 'q-adap-5-1',
        format: 'best_response',
        prompt: 'You practiced hard for a school presentation or sports match, and something did not go as planned. What shows resilience?',
        options: [
          'Ask what one part you can improve next time and keep trying',
          'Say "I am terrible at everything" and quit forever',
          'Pretend nothing happened and never practice again',
        ],
        correctIndex: 0,
        explanation: 'Learning from one setback helps you grow stronger the very next time.',
        explanationAr: 'التعلم من العقبات يقوّي ثقتنا ويساعدنا على النجاح لاحقاً.',
      },
      {
        id: 'q-adap-5-2',
        format: 'true_false',
        prompt: 'Resilient people never feel nervous or disappointed—they only feel happy.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! Everyone feels disappointed sometimes; resilience means taking a breath and trying again.',
        explanationAr: 'خطأ! يشعر الجميع بالإحباط أحياناً، لكن المرونة تعني النهوض والمحاولة من جديد.',
      },
    ],
    applicationQuestion: 'What is one hard skill you could keep practicing for 10 minutes even if it feels tricky at first?',
    realWorldActivity:
      'Try something slightly challenging today (a new puzzle, recipe step, Arabic word, or math problem) and write down one thing you adjusted when it got tricky.',
    realWorldActivityAr:
      'جرب مهارة جديدة تتطلب صبراً اليوم (لغزاً، أو كلمة جديدة، أو مسألة)، واكتب كيف عدّلت طريقتك عندما واجهت صعوبة.',
    contextSetting: 'digital',
    expectedOutcome: 'Child practices adaptive self-reflection after effort.',
    aiConfidence: 91,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Psychological resilience", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },

  // =========================================================
  // 7. CRITICAL THINKING (5 Progressive Leaves)
  // =========================================================
  {
    id: 'res-crit-aflaj-wiki',
    originalTitle: 'Aflaj Irrigation Systems — How Gravity Moves Water',
    originalTitleAr: 'أنظمة الأفلاج: كيف تحرك الجاذبية المياه؟',
    originalUrl: 'https://en.wikipedia.org/wiki/Aflaj_Irrigation_Systems_of_Oman',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Aflaj_Irrigation_Systems_of_Oman',
    language: 'English',
    childDescription:
      'Ask how ancient engineers moved water miles across the desert without electric pumps—just slope, gravity, and underground tunnels.',
    childDescriptionAr:
      'اكتشف كيف نقل المهندسون القدماء المياه أميالاً في الصحراء دون مضخات كهربائية باستخدام الجاذبية والأنفاق.',
    childArticleBody:
      'Long before diesel pumps existed, communities in Al Ain and across southeastern Arabia built Aflaj—gently sloped underground and surface water channels. Why underground? Because deep tunnels protected fresh mountain water from evaporating under the desert sun! Every detail of a falaj shows careful questioning and engineering logic.',
    mainCulturalTopic: 'Traditional Aflaj engineering and cause-and-effect thinking',
    culturalSignificance:
      'Demonstrates over 2,000 years of sustainable water engineering in the region.',
    primarySkill: 'critical-thinking',
    secondarySkills: ['adaptability'],
    skillReason:
      'Understanding why channels were buried and gently sloped teaches children to ask "why?" and trace physical evidence.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Ask "why" about a traditional design and explain how it solves a real problem.',
    questions: [
      {
        id: 'q-crit-1-1',
        format: 'multiple_choice',
        prompt: 'Why were large sections of traditional falaj channels built underground instead of wide open pools?',
        options: [
          'To keep water cool and stop it from evaporating quickly in desert heat',
          'So fish could hide from the sun',
          'Because stone tunnels were easier than digging shallow ditches',
        ],
        correctIndex: 0,
        explanation: 'Underground channels shaded the water so far more reached oasis palm roots!',
        explanationAr: 'الأنفاق الأرضية تحفظ برودة الماء وتقلل التبخر في حر الصحراء.',
      },
      {
        id: 'q-crit-1-2',
        format: 'true_false',
        prompt: 'Aflaj systems needed electric motors to push water downhill to the oasis.',
        options: ['True', 'False'],
        correctIndex: 1,
        explanation: 'False! Careful slope measurements let natural gravity move the water gently.',
        explanationAr: 'خطأ! اعتمدت الأفلاج على الانحدار المدروس والجاذبية الطبيعية.',
      },
    ],
    applicationQuestion: 'Why did builders give the tunnel a gentle slope instead of a steep drop?',
    realWorldActivity:
      'Compare two everyday designs in your home or school (for example, a shaded bottle vs. a wide open cup in sunlight) and ask a parent or sibling why one holds water longer.',
    realWorldActivityAr:
      'قارن بين تصميمين يوميين في منزلك (مثل زجاجة مغطاة وكوب مفتوح في الشمس) وناقش مع أسرتك سبب احتفاظ أحدهما بالماء مدة أطول.',
    contextSetting: 'family',
    expectedOutcome: 'Child conducts a simple comparative observation with family.',
    aiConfidence: 96,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Aflaj Irrigation Systems of Oman", CC BY-SA 4.0)',
    illustrationUrl: IMG_OASIS,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-crit-qasr-design',
    originalTitle: 'Qasr Al Hosn — Comparing Building Materials',
    originalTitleAr: 'قصر الحصن: مقارنة مواد البناء التقليدية',
    originalUrl: 'https://en.wikipedia.org/wiki/Qasr_Al_Hosn',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Qasr_Al_Hosn',
    language: 'English',
    childDescription:
      'Compare why coastal builders chose sea coral stone and mangrove beams instead of heavy inland wood.',
    childArticleBody:
      'When Abu Dhabi builders constructed Qasr Al Hosn near the sea, tall forest timber was scarce—so they used locally gathered coral stone, sea-shell lime plaster (juss), and strong mangrove poles (chandal). Studying how materials match local climate teaches us to evaluate design choices using evidence.',
    mainCulturalTopic: 'Evaluating architectural design choices using historical evidence',
    culturalSignificance:
      'Reveals practical resource logic behind Abu Dhabi’s oldest landmark.',
    primarySkill: 'critical-thinking',
    secondarySkills: ['adaptability'],
    skillReason:
      'Comparing two design choices based on strength, heat, and local availability strengthens analytical reasoning.',
    ageSuitability: '8-12',
    difficulty: 'Beginner',
    learningObjective: 'Compare two building materials and explain one strength of each.',
    questions: [
      {
        id: 'q-crit-2-1',
        format: 'multiple_choice',
        prompt: 'Why was white lime plaster (juss) used on Qasr Al Hosn’s outer stone walls?',
        options: [
          'It protected the stone from salty sea air and reflected hot sunlight',
          'It made the tower glow in the dark',
          'It melted every summer',
        ],
        correctIndex: 0,
        explanation: 'White plaster protected coral stone from moisture and reflected heat!',
        explanationAr: 'حافظ الجص الأبيض على الحجر من الرطوبة وعكس حرارة الشمس.',
      },
      {
        id: 'q-crit-2-2',
        format: 'true_false',
        prompt: 'Builders chose coral stone and lime plaster because those materials were available locally along the coast.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Smart designers evaluate what materials are nearby and suited to the weather.',
        explanationAr: 'نعم! اعتمد البناؤون على المواد المتوفرة محلياً والمناسبة للمناخ.',
      },
    ],
    applicationQuestion: 'If you had to build a shaded reading corner at school, which two materials would you compare first?',
    realWorldActivity:
      'Read or look at two pictures of traditional UAE buildings (a coastal coral-stone watchtower and a desert mudbrick fort) and tell a parent two differences you notice.',
    realWorldActivityAr:
      'تأمل صورتين لمبنيين تقليديين في الإمارات (برج ساحلي من الحجر البحري وحصن صحراوي طيني) واشرح لوالديك فرقين بينهما.',
    contextSetting: 'public-spaces',
    expectedOutcome: 'Child compares architectural evidence across two environments.',
    aiConfidence: 95,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Qasr Al Hosn", CC BY-SA 4.0)',
    illustrationUrl: IMG_SADU,
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-crit-evidence-history',
    originalTitle: 'How Historians Use Evidence to Understand the Past',
    originalTitleAr: 'كيف يستخدم المؤرخون الأدلة لفهم الماضي؟',
    originalUrl: 'https://en.wikipedia.org/wiki/Historical_method',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Historical_method',
    language: 'English',
    childDescription:
      'Learn how archaeologists and historians compare artifacts, old photographs, and oral stories before deciding what happened.',
    childArticleBody:
      'How do we know how people lived in Abu Dhabi 200 or 4,000 years ago? Historians do not guess! They examine physical evidence—pottery, pearl shells, old stone walls, maps, and written letters—and compare them with oral family histories to build a careful picture of the past.',
    mainCulturalTopic: 'Evaluating historical evidence and asking careful questions',
    culturalSignificance:
      'Connects UAE archaeological heritage (like Umm an-Nar and Al Ain) with scientific inquiry.',
    primarySkill: 'critical-thinking',
    secondarySkills: ['digital-wisdom'],
    skillReason:
      'Distinguishing evidence from guesses is central to both history and everyday critical thinking.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Tell the difference between a verified piece of evidence and an unsupported guess.',
    questions: [
      {
        id: 'q-crit-3-1',
        format: 'multiple_choice',
        prompt: 'Which item gives a historian the strongest evidence about what coastal villagers ate 500 years ago?',
        options: [
          'Ancient fish bones, oyster shells, and date seeds found during an archaeological dig',
          'A comic strip drawn yesterday',
          'A random guess with no proof',
        ],
        correctIndex: 0,
        explanation: 'Physical artifacts discovered and dated carefully provide strong evidence.',
        explanationAr: 'اللقى الأثرية مثل البذور والأصداف تقدم أدلة ملموسة وموثوقة.',
      },
      {
        id: 'q-crit-3-2',
        format: 'true_false',
        prompt: 'Good critical thinkers change their conclusion if stronger, real evidence appears.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Following evidence honestly is a sign of wisdom.',
        explanationAr: 'صحيح! اتباع الأدلة الصادقة علامة على التفكير السليم.',
      },
    ],
    applicationQuestion: 'What clues in your own family photo album or kitchen tell a story about your family’s history?',
    realWorldActivity:
      'Play "Family Historian" with a parent: pick one old family object or photograph and ask 3 evidence questions (When was it made? Who used it? What does it tell us?).',
    realWorldActivityAr:
      'العب دور "المؤرخ الصغير" مع أسرتك: اختر غرضاً قديماً أو صورة عائلية واطرح 3 أسئلة استقصائية عنها.',
    contextSetting: 'family',
    expectedOutcome: 'Child applies evidence-based questioning to family heritage.',
    aiConfidence: 93,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Historical method", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-crit-alternatives',
    originalTitle: 'Exploring Alternatives — Decision Making Together',
    originalTitleAr: 'استكشاف البدائل: اتخاذ قرارات مدروسة',
    originalUrl: 'https://en.wikipedia.org/wiki/Decision-making',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Decision-making',
    language: 'English',
    childDescription:
      'Practice weighing pros and cons across two or three options before picking the fairest solution.',
    childArticleBody:
      'When facing a tricky choice—like how a school club should spend its project time or how to solve a neighborhood problem—rushing into the very first idea can miss better solutions. Listing at least two alternatives and asking "Who does this help? What might go wrong?" leads to wiser decisions.',
    mainCulturalTopic: 'Exploring alternatives and weighing pros and cons',
    culturalSignificance:
      'Supports thoughtful youth participation in school and community planning.',
    primarySkill: 'critical-thinking',
    secondarySkills: ['leadership'],
    skillReason:
      'Comparing alternatives prevents impulsive choices and strengthens fair teamwork.',
    ageSuitability: '10-12',
    difficulty: 'Intermediate',
    learningObjective: 'Compare two possible solutions by listing one pro and one challenge for each.',
    questions: [
      {
        id: 'q-crit-4-1',
        format: 'best_response',
        prompt: 'Your class wants to reduce plastic bottle waste. Why is comparing 3 ideas better than picking the first idea shouted out?',
        options: [
          'Comparing options lets you spot which idea is easiest for everyone and truly works',
          'Because the loudest idea is always the best',
          'So the class never picks any idea',
        ],
        correctIndex: 0,
        explanation: 'Exploring alternatives uncovers practical solutions everyone can actually stick with.',
        explanationAr: 'مقارنة البدائل تكشف الحل العملي الذي يستطيع الجميع تطبيقه.',
      },
      {
        id: 'q-crit-4-2',
        format: 'true_false',
        prompt: 'Asking "What could go wrong with this plan?" before starting helps prevent surprises.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'Yes! Thinking one step ahead makes plans stronger.',
        explanationAr: 'نعم! التفكير في التحديات المحتملة مسبقاً يقوي الخطة.',
      },
    ],
    applicationQuestion: 'Before choosing how to spend a free Saturday afternoon, what two options could you compare?',
    realWorldActivity:
      'Help your class or family make one real decision this week by writing down two options with 1 good point and 1 challenge for each before choosing.',
    realWorldActivityAr:
      'ساعد صفك أو أسرتك في اتخاذ قرار عملي هذا الأسبوع بكتابة خيارين مع ميزة وتحدٍ لكل خيار قبل الاختيار.',
    contextSetting: 'school',
    expectedOutcome: 'Child uses structured pros-and-cons reasoning in a real decision.',
    aiConfidence: 92,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Decision-making", CC BY-SA 4.0)',
    isAiAdaptedSummary: true,
  },
  {
    id: 'res-crit-oasis-ecosystem',
    originalTitle: 'Al Ain Oasis — Systems Thinking in Nature',
    originalTitleAr: 'واحة العين: التفكير المنظومي في الطبيعة',
    originalUrl: 'https://en.wikipedia.org/wiki/Al_Ain_Oasis',
    sourceOrganization: 'Wikipedia (Wikimedia Foundation)',
    mediaType: 'wikipedia',
    wikipediaTitle: 'Al_Ain_Oasis',
    language: 'English',
    childDescription:
      'Put your critical thinking together: trace how water, soil, palm shade, birds, and human care connect inside an oasis.',
    childArticleBody:
      'An oasis is not just a bunch of separate trees—it is a connected system! Underground falaj water feeds date palms; palm fronds shade fruit trees below; fallen leaves enrich desert soil; and community caretakers maintain the channels. Changing one piece affects everything else.',
    mainCulturalTopic: 'Systems thinking in Abu Dhabi oasis ecology',
    culturalSignificance:
      'Demonstrates interconnected sustainability in Al Ain’s UNESCO oasis groves.',
    primarySkill: 'critical-thinking',
    secondarySkills: ['adaptability', 'leadership'],
    skillReason:
      'Tracing how multiple parts of a system depend on one another is advanced age-appropriate critical thinking.',
    ageSuitability: '10-12',
    difficulty: 'Challenging',
    learningObjective: 'Trace a 3-step chain showing how one change affects an entire community or natural system.',
    questions: [
      {
        id: 'q-crit-5-1',
        format: 'multiple_choice',
        prompt: 'In Al Ain Oasis, if the falaj water channel becomes blocked and nobody cleans it, what happens next?',
        options: [
          'Palms receive less water, shade shrinks, and smaller fruit trees underneath also struggle',
          'Only one single leaf changes color and nothing else is affected',
          'The trees turn into stone statues',
        ],
        correctIndex: 0,
        explanation: 'In a connected system, one neglected part affects the whole community of plants and people.',
        explanationAr: 'في الأنظمة المترابطة، يؤثر إهمال جزء واحد في المنظومة كلها.',
      },
      {
        id: 'q-crit-5-2',
        format: 'true_false',
        prompt: 'Critical thinking helps us look at how actions connect to results before making big choices.',
        options: ['True', 'False'],
        correctIndex: 0,
        explanation: 'True! Seeing connections helps us make wiser choices for our families and planet.',
        explanationAr: 'صحيح! فهم الترابط يساعدنا على اتخاذ قرارات حكيمة.',
      },
    ],
    applicationQuestion: 'Trace one positive chain reaction: if you help clean up a park, what happens next?',
    realWorldActivity:
      'Explore a local park, oasis photo, or garden with your family and draw a 4-box "Connection Chain" (Water -> Trees -> Shade -> People/Birds).',
    realWorldActivityAr:
      'استكشف حديقة أو صوراً لواحة العين مع أسرتك وارسم "سلسلة ترابط" من 4 خطوات (ماء ← أشجار ← ظل ← طيور وناس).',
    atHomeEquivalent:
      'At-home option: Draw the 4-box Oasis Connection Chain on paper and explain each arrow to a parent.',
    contextSetting: 'public-spaces',
    expectedOutcome: 'Child explains systems interdependence using a visual diagram.',
    aiConfidence: 94,
    requiresAdultReview: false,
    verificationStatus: 'Verified',
    editorialStatus: 'published',
    attributionText: 'Source: Wikipedia ("Al Ain Oasis", CC BY-SA 4.0)',
    illustrationUrl: IMG_OASIS,
    isAiAdaptedSummary: true,
  },
];

export const INITIAL_LEAVES: LeafMission[] = [
  // Digital Wisdom (5)
  { id: 'leaf-dw-1', branchId: 'digital-wisdom', orderIndex: 1, title: 'Checking Trusted Sources', titleAr: 'التحقق من المصادر الموثوقة', difficultyLevel: 1, resourceId: 'res-dig-literacy' },
  { id: 'leaf-dw-2', branchId: 'digital-wisdom', orderIndex: 2, title: 'Protecting Family Privacy', titleAr: 'حماية خصوصية الأسرة', difficultyLevel: 2, resourceId: 'res-dig-safety-privacy' },
  { id: 'leaf-dw-3', branchId: 'digital-wisdom', orderIndex: 3, title: 'Healthy Screen Balance', titleAr: 'توازن وقت الشاشة', difficultyLevel: 3, resourceId: 'res-dig-healthy-habits' },
  { id: 'leaf-dw-4', branchId: 'digital-wisdom', orderIndex: 4, title: 'Cross-Checking Oasis Facts', titleAr: 'مراجعة حقائق الواحة', difficultyLevel: 4, resourceId: 'res-dig-verify-oasis' },
  { id: 'leaf-dw-5', branchId: 'digital-wisdom', orderIndex: 5, title: 'Kind Digital Citizenship', titleAr: 'المواطنة الرقمية اللطيفة', difficultyLevel: 5, resourceId: 'res-dig-kind-digital' },

  // Leadership (5)
  { id: 'leaf-ld-1', branchId: 'leadership', orderIndex: 1, title: 'Leading Through Unity', titleAr: 'القيادة بالوحدة والتعاون', difficultyLevel: 1, resourceId: 'res-lead-zayed' },
  { id: 'leaf-ld-2', branchId: 'leadership', orderIndex: 2, title: 'Team Roles on a Dhow', titleAr: 'أدوار الفريق في السفينة', difficultyLevel: 2, resourceId: 'res-lead-pearl-crew' },
  { id: 'leaf-ld-3', branchId: 'leadership', orderIndex: 3, title: 'Fair Water Stewardship', titleAr: 'توزيع الموارد بعدل', difficultyLevel: 3, resourceId: 'res-lead-falaj-steward' },
  { id: 'leaf-ld-4', branchId: 'leadership', orderIndex: 4, title: 'Caring for Tomorrow', titleAr: 'رعاية المستقبل والأشجار', difficultyLevel: 4, resourceId: 'res-lead-greening-desert' },
  { id: 'leaf-ld-5', branchId: 'leadership', orderIndex: 5, title: 'Community Mini-Project', titleAr: 'مبادرة مجتمعية صغيرة', difficultyLevel: 5, resourceId: 'res-lead-uae-cooperation' },

  // Communication (5)
  { id: 'leaf-cm-1', branchId: 'communication', orderIndex: 1, title: 'Al-Taghrooda Storytelling', titleAr: 'شعر التغرودة والإنصات', difficultyLevel: 1, resourceId: 'res-comm-taghrooda' },
  { id: 'leaf-cm-2', branchId: 'communication', orderIndex: 2, title: 'Listening in the Majlis', titleAr: 'الاستماع في المجلس', difficultyLevel: 2, resourceId: 'res-comm-majlis' },
  { id: 'leaf-cm-3', branchId: 'communication', orderIndex: 3, title: 'Group Sync in Al-Ayyala', titleAr: 'تناغم المجموعة في العيالة', difficultyLevel: 3, resourceId: 'res-comm-ayyala' },
  { id: 'leaf-cm-4', branchId: 'communication', orderIndex: 4, title: 'Explaining Ideas Clearly', titleAr: 'شرح الأفكار بوضوح', difficultyLevel: 4, resourceId: 'res-comm-wiki-majlis' },
  { id: 'leaf-cm-5', branchId: 'communication', orderIndex: 5, title: 'Qasr Al Hosn Story Guide', titleAr: 'مرشد قصة قصر الحصن', difficultyLevel: 5, resourceId: 'res-comm-qasr' },

  // Respect (5)
  { id: 'leaf-rs-1', branchId: 'respect', orderIndex: 1, title: 'Honoring Al Sadu Weavers', titleAr: 'تقدير حرفيات السدو', difficultyLevel: 1, resourceId: 'res-resp-alsadu-video' },
  { id: 'leaf-rs-2', branchId: 'respect', orderIndex: 2, title: 'Symbols & Cultures', titleAr: 'احترام التنوع والرموز', difficultyLevel: 2, resourceId: 'res-resp-alsadu-wiki' },
  { id: 'leaf-rs-3', branchId: 'respect', orderIndex: 3, title: 'Patience in Falconry', titleAr: 'الصبر ورعاية الطبيعة', difficultyLevel: 3, resourceId: 'res-resp-falconry' },
  { id: 'leaf-rs-4', branchId: 'respect', orderIndex: 4, title: 'Seeing Other Perspectives', titleAr: 'التعاطف وفهم الآخر', difficultyLevel: 4, resourceId: 'res-resp-empathy' },
  { id: 'leaf-rs-5', branchId: 'respect', orderIndex: 5, title: 'Guardian of Shared Spaces', titleAr: 'حماية الأماكن المشتركة', difficultyLevel: 5, resourceId: 'res-resp-museum-manners' },

  // Hospitality (5)
  { id: 'leaf-hs-1', branchId: 'hospitality', orderIndex: 1, title: 'Emirati Gahwa Welcome', titleAr: 'ترحيب القهوة العربية', difficultyLevel: 1, resourceId: 'res-hosp-gahwa-video' },
  { id: 'leaf-hs-2', branchId: 'hospitality', orderIndex: 2, title: 'Noticing Kindness', titleAr: 'آداب القهوة ولطف الانتباه', difficultyLevel: 2, resourceId: 'res-hosp-gahwa-wiki' },
  { id: 'leaf-hs-3', branchId: 'hospitality', orderIndex: 3, title: 'Opening the Circle', titleAr: 'إشراك الجميع والشمولية', difficultyLevel: 3, resourceId: 'res-hosp-inclusion' },
  { id: 'leaf-hs-4', branchId: 'hospitality', orderIndex: 4, title: 'Neighborhood Generosity', titleAr: 'كرم الجيرة والمجتمع', difficultyLevel: 4, resourceId: 'res-hosp-generosity' },
  { id: 'leaf-hs-5', branchId: 'hospitality', orderIndex: 5, title: 'Hosting a Welcome Corner', titleAr: 'تنظيم ركن الضيافة', difficultyLevel: 5, resourceId: 'res-hosp-host-event' },

  // Adaptability (5)
  { id: 'leaf-ad-1', branchId: 'adaptability', orderIndex: 1, title: 'Pearl Divers at Sea', titleAr: 'الغواصون وتحدي البحر', difficultyLevel: 1, resourceId: 'res-adap-pearl-video' },
  { id: 'leaf-ad-2', branchId: 'adaptability', orderIndex: 2, title: 'Creative Plan B', titleAr: 'التكيف وابتكار البدائل', difficultyLevel: 2, resourceId: 'res-adap-pearl-wiki' },
  { id: 'leaf-ad-3', branchId: 'adaptability', orderIndex: 3, title: 'Oasis Canopy Wisdom', titleAr: 'حكمة التبريد في الواحة', difficultyLevel: 3, resourceId: 'res-adap-oasis-video' },
  { id: 'leaf-ad-4', branchId: 'adaptability', orderIndex: 4, title: 'Barjeel Windcatchers', titleAr: 'تكيّف عمارة البراجيل', difficultyLevel: 4, resourceId: 'res-adap-windcatcher' },
  { id: 'leaf-ad-5', branchId: 'adaptability', orderIndex: 5, title: 'Bouncing Back Strong', titleAr: 'المرونة عند الصعوبات', difficultyLevel: 5, resourceId: 'res-adap-modern-uae' },

  // Critical Thinking (5)
  { id: 'leaf-ct-1', branchId: 'critical-thinking', orderIndex: 1, title: 'Why Tunnels Save Water', titleAr: 'لماذا تحفظ الأفلاج الماء؟', difficultyLevel: 1, resourceId: 'res-crit-aflaj-wiki' },
  { id: 'leaf-ct-2', branchId: 'critical-thinking', orderIndex: 2, title: 'Comparing Coral & Mudbrick', titleAr: 'مقارنة مواد البناء', difficultyLevel: 2, resourceId: 'res-crit-qasr-design' },
  { id: 'leaf-ct-3', branchId: 'critical-thinking', orderIndex: 3, title: 'Evaluating Evidence', titleAr: 'تقييم الأدلة التاريخية', difficultyLevel: 3, resourceId: 'res-crit-evidence-history' },
  { id: 'leaf-ct-4', branchId: 'critical-thinking', orderIndex: 4, title: 'Weighing Alternatives', titleAr: 'مقارنة الخيارات والبدائل', difficultyLevel: 4, resourceId: 'res-crit-alternatives' },
  { id: 'leaf-ct-5', branchId: 'critical-thinking', orderIndex: 5, title: 'Oasis Systems Chain', titleAr: 'ترابط منظومة الواحة', difficultyLevel: 5, resourceId: 'res-crit-oasis-ecosystem' },
];
