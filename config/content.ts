/**
 * Official JISR editorial content (bilingual).
 * Arabic text is authoritative and must not be altered without approval.
 */

export const slogan = {
  ar: "كُلُّ طَرِيقٍ لِلْمُسْتَقْبَلِ... يَبْدَأُ بِجِسْرٍ",
  en: "Every road to the future... begins with a bridge",
} as const;

export const aboutContent = {
  ar: "نحن نادٍ طلابي في جامعة الملك فيصل، يُمثّل جسراً يربط بين مختلف التخصصات الأكاديمية. نُسخّر أدوات التقنية والذكاء الاصطناعي لتمكين العقول الشابة، وبناء بيئة تعليمية ومجتمعية مبتكرة وقائمة على العمل التعاوني.",
  en: "We are a student club at King Faisal University that acts as a bridge between different academic disciplines. We harness technology and artificial intelligence tools to empower young minds and build an innovative, collaborative educational and community environment.",
} as const;

export const visionContent = {
  ar: "أن نكون الخيار الأول والنادي الطلابي الرائد في جامعة الملك فيصل لدعم وتكامل التخصصات عبر الحلول التقنية والذكاء الاصطناعي لتحقيق الابتكار، والأرتقاء بالتعليم وخدمة المجتمع.",
  en: "To be the first choice and the leading student club at King Faisal University in supporting and integrating disciplines through technology and artificial intelligence solutions, achieving innovation, advancing education and serving the community.",
} as const;

export const missionContent = {
  ar: "بناء مجتمع تقني متمكن رقمياً عبر تبسيط أدوات الذكاء الاصطناعي، وإطلاق مبادرات تطبيقية تعزز التعاون بين مختلف التخصصات؛ لإعداد كوادر مبتكرة تسهم في تحقيق مستهدفات رؤية المملكة 2030.",
  en: "Building a digitally empowered technology community by simplifying artificial intelligence tools and launching applied initiatives that strengthen cross-disciplinary collaboration, preparing innovative talents who contribute to the goals of Saudi Vision 2030.",
} as const;

export type GoalIcon = "workshop" | "skills" | "leadership" | "ideas";

export interface GoalItem {
  key: string;
  icon: GoalIcon;
  ar: string;
  en: string;
}

export const goals: GoalItem[] = [
  {
    key: "events",
    icon: "workshop",
    ar: "إقامة ورش وفعاليات نوعية في مجالات التقنية والذكاء الاصطناعي ثري تجربة الطالب الجامعي.",
    en: "Hosting distinctive workshops and events in technology and artificial intelligence that enrich the university student experience.",
  },
  {
    key: "skills",
    icon: "skills",
    ar: "تنمية مهارات الطلاب في مختلف مجالات التقنية الحديثة والذكاء الاصطناعي.",
    en: "Developing student skills across modern technology fields and artificial intelligence.",
  },
  {
    key: "leadership",
    icon: "leadership",
    ar: "إعداد وتأهيل الكوادر الطلابية لقيادة مشاريع الابتكار التقني وتطبيقات الذكاء الاصطناعي.",
    en: "Preparing and qualifying student talents to lead technical innovation projects and AI applications.",
  },
  {
    key: "ideas",
    icon: "ideas",
    ar: "تحفيز الأفكار الإبداعية وتحويلها إلى مشاريع تقنية وحلول مبنية على الذكاء الاصطناعي.",
    en: "Encouraging creative ideas and turning them into technical projects and AI-based solutions.",
  },
];

export interface InitiativeDetail {
  labelAr: string;
  labelEn: string;
  ar: string;
  en: string;
}

export interface InitiativeItem {
  key: string;
  icon: "hackathon" | "lab" | "talks" | "expo";
  titleAr: string;
  titleEn: string;
  details: InitiativeDetail[];
}

/** Official operational-plan initiatives. No dates, speakers or locations exist yet. */
export const initiatives: InitiativeItem[] = [
  {
    key: "hackathon",
    icon: "hackathon",
    titleAr: "هاكاثون التخصصات المتقاطعة",
    titleEn: "Cross-disciplinary Hackathon",
    details: [
      {
        labelAr: "الفكرة",
        labelEn: "Idea",
        ar: "منافسة ابتكارية تشكل فرقاً هجينة (تقني + صحي/قانوني/أعمال + إعلامي).",
        en: "An innovation competition forming hybrid teams (tech + health/legal/business + media).",
      },
      {
        labelAr: "التحدي",
        labelEn: "Challenge",
        ar: "حل المشكلات الواقعية للكليات باستخدام أدوات الذكاء الاصطناعي.",
        en: "Solving real college challenges using artificial intelligence tools.",
      },
      {
        labelAr: "الأثر",
        labelEn: "Impact",
        ar: "نماذج أصلية ومشاريع تطبيقية جاهزة للتبني والتبلور.",
        en: "Prototypes and applied projects ready for adoption and development.",
      },
    ],
  },
  {
    key: "ai-labs",
    icon: "lab",
    titleAr: "معامل الذكاء الاصطناعي",
    titleEn: "AI Labs",
    details: [
      {
        labelAr: "الفكرة",
        labelEn: "Idea",
        ar: "ورش تطبيقية سريعة مُخصصة وموجهة لكل كلية على حدة.",
        en: "Fast, applied workshops tailored to each college individually.",
      },
      {
        labelAr: "التطبيق",
        labelEn: "Application",
        ar: "استخدام أدوات الذكاء الاصطناعي في البحث، التشخيص، والتصميم.",
        en: "Using AI tools in research, diagnosis and design.",
      },
      {
        labelAr: "الأثر",
        labelEn: "Impact",
        ar: "إكساب الطلاب مهارات تقنية مباشرة تلائم مستقبل تخصصاتهم.",
        en: "Giving students hands-on technical skills suited to the future of their fields.",
      },
    ],
  },
  {
    key: "talks",
    icon: "talks",
    titleAr: "حوارات جسر التقنية",
    titleEn: "JISR Technology Dialogues",
    details: [
      {
        labelAr: "الفكرة",
        labelEn: "Idea",
        ar: "لقاءات وبودكاست ملهم يستضيف نخبة من الخبراء والأكاديميين.",
        en: "Inspiring sessions and a podcast hosting selected experts and academics.",
      },
      {
        labelAr: "المحور",
        labelEn: "Focus",
        ar: "استعراض التجارب الناجحة لتوظيف التقنية في المجالات غير التقنية.",
        en: "Showcasing successful cases of applying technology in non-technical fields.",
      },
      {
        labelAr: "الأثر",
        labelEn: "Impact",
        ar: "بناء الوعي الرقمي وإبراز رواد الابتكار والتكامل بين العلوم.",
        en: "Building digital awareness and highlighting innovation leaders and cross-science integration.",
      },
    ],
  },
  {
    key: "expo",
    icon: "expo",
    titleAr: "معرض أثر جسر",
    titleEn: "JISR Impact Expo",
    details: [
      {
        labelAr: "الفكرة",
        labelEn: "Idea",
        ar: "ملتقى ختامي استعراضي لمخرجات الهكاثون والورش والمشاريع.",
        en: "A closing showcase gathering for hackathon, workshop and project outcomes.",
      },
      {
        labelAr: "الحضور",
        labelEn: "Attendance",
        ar: "دعوة قيادات الجامعة، عمداء الكليات، والرعاة المستهدفين.",
        en: "Inviting university leadership, college deans and target sponsors.",
      },
      {
        labelAr: "الأثر",
        labelEn: "Impact",
        ar: "تكريم الفرق المتميزة وتسويق ابتكارات الطلاب للجهات الداعمة.",
        en: "Honouring outstanding teams and promoting student innovations to supporting entities.",
      },
    ],
  },
];
