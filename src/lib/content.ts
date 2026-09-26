export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: number;
  image: string;
  kind: "news" | "story" | "analysis" | "interview";
  body: string[];
};

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  hero: img("photo-1431324155629-1a6deb1dec8d", 2000),
  feature: img("photo-1459865264687-595d652de67e", 1800),
  pitch: img("photo-1574629810360-7efbbe195018", 1600),
  stadium: img("photo-1552667466-07770ae110d0", 1600),
  ball: img("photo-1522778119026-d647f0596c20", 1400),
  player: img("photo-1579952363873-27f3bade9f55", 1400),
  crowd: img("photo-1560272564-c83b66b1ad12", 1400),
  night: img("photo-1543326727-cf6c39e8f84c", 1400),
};

export const CATEGORIES = [
  "عاجل",
  "انتقالات",
  "مباريات",
  "دوري أبطال أوروبا",
  "الدوري الإنجليزي",
  "الدوري الإسباني",
  "الدوري السعودي",
  "تحليلات",
  "قصص",
  "مقابلات",
];

export const TICKER = [
  "ريال مدريد يحسم الكلاسيكو بهدف قاتل في الدقيقة 91",
  "صفقة الصيف: الاتحاد يقترب من التعاقد مع صانع ألعاب برتغالي",
  "الهلال يتصدر دوري روشن بعد الجولة الثانية عشرة",
  "إصابة عضلية تُبعد نجم أرسنال عن قمة الأحد",
  "قرعة دوري الأبطال: مواجهة نارية في ثمن النهائي",
];

export const HERO: Article = {
  slug: "allahza-alty-ghayarat-kol-shay",
  title: "اللحظة التي غيّرت كل شيء",
  subtitle: "تسعون دقيقة أعادت رسم موسم كامل، وثانية واحدة قلبت الطاولة",
  excerpt:
    "في ليلة باردة على مدرجات مكتظة، لم يكن الهدف مجرد رقم في لوحة النتائج. كان إعلاناً عن نهاية حقبة وبداية أخرى.",
  category: "قصة الغلاف",
  author: "محمد مرتضى",
  date: "٢٦ سبتمبر ٢٠٢٦",
  readingTime: 9,
  image: IMAGES.hero,
  kind: "story",
  body: [
    "لم تكن المباراة تحتاج إلى مقدمات. الجماهير عرفت منذ صافرة البداية أن ما يجري على العشب أكبر من ثلاث نقاط، وأن الخاسر سيحمل نتيجة هذه الليلة معه حتى نهاية الموسم.",
    "في الشوط الأول ساد الحذر. خطان دفاعيان متقاربان، ضغط عالٍ من الجهتين، ومساحات ضيقة أجبرت صانعي اللعب على البحث عن حلول فردية بدل التمريرات المركبة.",
    "بعد الاستراحة تغيّر كل شيء. تبديل واحد فتح الرواق الأيمن، ومنه جاءت الكرة التي أنهت الحسابات كلها في الدقيقة الحادية والتسعين.",
    "ما بعد الهدف كان أهم من الهدف نفسه: ثقة استعادها فريق، وأسئلة فُتحت في غرفة ملابس الطرف الآخر ولن تُغلق قريباً.",
  ],
};

export const ARTICLES: Article[] = [
  {
    slug: "sfqa-alsayf-alkobra",
    title: "صفقة الصيف الكبرى تقترب من الحسم",
    subtitle: "المفاوضات دخلت مرحلتها الأخيرة بعد اتفاق على قيمة البنود المتغيرة",
    excerpt:
      "مصادر مقرّبة تؤكد أن الطرفين تجاوزا العقبة المالية الأخيرة، وأن الفحص الطبي مقرر خلال الساعات المقبلة.",
    category: "انتقالات",
    author: "ليلى حمدان",
    date: "٢٦ سبتمبر ٢٠٢٦",
    readingTime: 4,
    image: IMAGES.player,
    kind: "news",
    body: [
      "دخلت المفاوضات مرحلتها الحاسمة بعد جلسة استمرت أكثر من أربع ساعات، انتهت باتفاق مبدئي على قيمة الصفقة والبنود المتغيرة المرتبطة بعدد المباريات والألقاب.",
      "اللاعب أبدى حماساً للمشروع الرياضي، فيما يضغط ناديه الحالي للحصول على نسبة من إعادة البيع مستقبلاً.",
    ],
  },
  {
    slug: "kayf-yobna-khat-wasat-hadith",
    title: "كيف يُبنى خط وسط حديث؟",
    subtitle: "قراءة تكتيكية في أدوار اللاعب الحر والرقم ستة المزدوج",
    excerpt:
      "الأرقام وحدها لا تكفي لتفسير التفوق في منطقة الوسط. نفكك البنية التكتيكية التي يعتمدها أنجح فرق الموسم.",
    category: "تحليلات",
    author: "عمر الشاذلي",
    date: "٢٥ سبتمبر ٢٠٢٦",
    readingTime: 7,
    image: IMAGES.pitch,
    kind: "analysis",
    body: [
      "لم يعد خط الوسط منطقة عبور. صار مركز القرار الذي يحدد إيقاع المباراة، وسرعة التحول، وارتفاع خط الدفاع.",
      "الفرق الأكثر استقراراً هذا الموسم تشترك في عنصر واحد: لاعب يقرأ الضغط قبل وصوله، ويحرر التمريرة الأولى تحت ضغط رجلين.",
    ],
  },
  {
    slug: "layla-fi-almadrajat",
    title: "ليلة في المدرجات: ما لا تنقله الكاميرات",
    subtitle: "من بوابة الملعب إلى صافرة النهاية، رحلة داخل جمهور لا ينام",
    excerpt:
      "قضينا تسعين دقيقة مع مجموعة تشجيع تأسست قبل ثلاثين عاماً، ورأينا كيف تُصنع أجواء المباريات الكبرى.",
    category: "قصص",
    author: "سارة عبد الله",
    date: "٢٤ سبتمبر ٢٠٢٦",
    readingTime: 6,
    image: IMAGES.crowd,
    kind: "story",
    body: [
      "قبل ثلاث ساعات من انطلاق المباراة كانت الأعلام جاهزة، والأناشيد مكتوبة، وقائمة الأسماء التي ستقود المدرج محفوظة عن ظهر قلب.",
      "هنا لا يوجد وقت مستقطع. الغناء يبدأ مع الحافلة وينتهي بعد مغادرة آخر مشجع.",
    ],
  },
  {
    slug: "alhilal-ysadr",
    title: "الهلال يواصل الصدارة بعد فوز صعب خارج الديار",
    subtitle: "ثلاث نقاط ثمينة في ليلة كثرت فيها الأخطاء الدفاعية",
    excerpt: "الفريق حسم اللقاء في آخر عشرين دقيقة بعد تغييرات جريئة من الجهاز الفني.",
    category: "الدوري السعودي",
    author: "فهد العتيبي",
    date: "٢٤ سبتمبر ٢٠٢٦",
    readingTime: 3,
    image: IMAGES.stadium,
    kind: "news",
    body: [
      "بدأ اللقاء بطيئاً، وسيطر التحفظ على الشوط الأول قبل أن تتغير الصورة تماماً مع دخول البدلاء.",
    ],
  },
  {
    slug: "hiwar-mudarrib",
    title: "حوار: «لا أؤمن بخطة واحدة تصلح لكل مباراة»",
    subtitle: "مدرب صاعد يتحدث عن فلسفته، وعن الضغط، وعن غرفة الملابس",
    excerpt:
      "جلسنا معه بعد التدريب الصباحي للحديث عن التفاصيل التي لا تظهر في المؤتمرات الصحفية.",
    category: "مقابلات",
    author: "محمد مرتضى",
    date: "٢٣ سبتمبر ٢٠٢٦",
    readingTime: 8,
    image: IMAGES.night,
    kind: "interview",
    body: [
      "«أول ما أطلبه من اللاعب ليس الجري، بل الفهم. الجري بلا فهم يرهق الفريق أكثر مما يساعده».",
    ],
  },
  {
    slug: "kora-alabtal-qoraa",
    title: "قرعة دوري الأبطال تضع العمالقة في مسار واحد",
    subtitle: "ثمن النهائي يحمل مواجهات مبكرة لم يتوقعها أحد",
    excerpt: "المسار المرسوم يعني أن أحد المرشحين الثلاثة الكبار سيغادر قبل نصف النهائي.",
    category: "دوري أبطال أوروبا",
    author: "ليلى حمدان",
    date: "٢٣ سبتمبر ٢٠٢٦",
    readingTime: 4,
    image: IMAGES.ball,
    kind: "news",
    body: ["القرعة أسفرت عن مواجهات مبكرة بين أصحاب أعلى معدل نقاط في دور المجموعات."],
  },
];

export const ALL_ARTICLES = [HERO, ...ARTICLES];

export type Match = {
  competition: string;
  home: string;
  away: string;
  homeShort: string;
  awayShort: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  stadium: string;
  status: "upcoming" | "live" | "finished" | "postponed";
  minute?: string;
};

export const MATCHES: Match[] = [
  {
    competition: "الدوري الإسباني",
    home: "ريال مدريد",
    away: "برشلونة",
    homeShort: "RMA",
    awayShort: "BAR",
    homeScore: 2,
    awayScore: 1,
    date: "٢٥ سبتمبر",
    time: "٢٢:٠٠",
    stadium: "سانتياغو برنابيو",
    status: "finished",
  },
  {
    competition: "الدوري الإنجليزي",
    home: "أرسنال",
    away: "مانشستر سيتي",
    homeShort: "ARS",
    awayShort: "MCI",
    homeScore: 1,
    awayScore: 1,
    date: "اليوم",
    time: "٢٠:٣٠",
    stadium: "الإمارات",
    status: "live",
    minute: "٦٧'",
  },
  {
    competition: "دوري روشن السعودي",
    home: "الهلال",
    away: "الاتحاد",
    homeShort: "HIL",
    awayShort: "ITT",
    homeScore: null,
    awayScore: null,
    date: "غداً",
    time: "٢١:٠٠",
    stadium: "المملكة أرينا",
    status: "upcoming",
  },
  {
    competition: "دوري أبطال أوروبا",
    home: "بايرن ميونخ",
    away: "إنتر ميلان",
    homeShort: "BAY",
    awayShort: "INT",
    homeScore: null,
    awayScore: null,
    date: "الثلاثاء",
    time: "٢٢:٠٠",
    stadium: "أليانز أرينا",
    status: "upcoming",
  },
];

export type Transfer = {
  player: string;
  from: string;
  to: string;
  fee: string;
  status: "مؤكد" | "متقدم" | "شائعة";
  date: string;
  source: string;
};

export const TRANSFERS: Transfer[] = [
  {
    player: "لوكاس فيريرا",
    from: "بنفيكا",
    to: "الاتحاد",
    fee: "٣٢ مليون يورو",
    status: "مؤكد",
    date: "٢٦ سبتمبر",
    source: "بيان رسمي",
  },
  {
    player: "كريم عبد النور",
    from: "ليون",
    to: "نيوكاسل",
    fee: "٢٤ مليون يورو",
    status: "متقدم",
    date: "٢٥ سبتمبر",
    source: "مصادر مقربة",
  },
  {
    player: "ماتيو رينالدي",
    from: "أتالانتا",
    to: "ميلان",
    fee: "غير معلن",
    status: "شائعة",
    date: "٢٤ سبتمبر",
    source: "صحافة إيطالية",
  },
  {
    player: "سالم الدوسري الابن",
    from: "أكاديمية الهلال",
    to: "الهلال",
    fee: "تدرّج",
    status: "مؤكد",
    date: "٢٣ سبتمبر",
    source: "النادي",
  },
];

export const SOCIAL = [
  { name: "إنستغرام", handle: "Instagram", url: "https://instagram.com" },
  { name: "فيسبوك", handle: "Facebook", url: "https://facebook.com" },
  { name: "إكس", handle: "X", url: "https://x.com" },
  { name: "تيك توك", handle: "TikTok", url: "https://tiktok.com" },
  { name: "يوتيوب", handle: "YouTube", url: "https://youtube.com" },
  { name: "تيليجرام", handle: "Telegram", url: "https://telegram.org" },
  { name: "واتساب", handle: "WhatsApp", url: "https://whatsapp.com" },
];

export const NAV = [
  { label: "الأخبار", to: "/news" },
  { label: "المباريات", to: "/matches" },
  { label: "الانتقالات", to: "/transfers" },
  { label: "تحليلات", to: "/analysis" },
  { label: "قصص", to: "/stories" },
  { label: "عن أبو حمد", to: "/about" },
] as const;
