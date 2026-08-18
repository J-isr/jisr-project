import type { Committee, Department } from "@/types/committees";

/**
 * Centralized JISR departments & committees content.
 * Single source of truth — components must not hardcode this structure.
 * Can be migrated to the existing Supabase `committees` table later.
 */
export const departments: Department[] = [
  {
    id: "public-relations",
    featured: true,
    icon: "Handshake",
    name: { ar: "قسم العلاقات العامة", en: "Public Relations Department" },
    overview: {
      ar: "يمثل الجسر الخارجي للنادي لبناء وتوطيد العلاقات مع مختلف الجهات والطلاب لتوسيع أثر النادي، بما يسهم في تحقيق مستهدفات رؤية المملكة 2030.",
      en: "The club's external bridge, building and strengthening relationships with entities and students to widen JISR's impact and support Saudi Vision 2030 targets.",
    },
    committees: [
      {
        id: "ambassadors",
        departmentId: "public-relations",
        name: { ar: "لجنة السفراء", en: "Ambassadors Committee" },
        description: {
          ar: "تمثيل النادي داخل الكليات الجامعية المختلفة وتسهيل التواصل لنشر الأنشطة والبرامج بين الطلاب.",
          en: "Representing the club across university colleges and facilitating communication to spread activities and programs among students.",
        },
      },
    ],
  },
  {
    id: "media",
    icon: "Camera",
    name: { ar: "قسم الإعلام", en: "Media Department" },
    overview: {
      ar: "المسؤول عن بناء الهوية البصرية والرقمية للنادي، ونشر المحتوى الإبداعي الذي يعكس أنشطته وفعالياته.",
      en: "Responsible for building the club's visual and digital identity and publishing creative content that reflects its activities and events.",
    },
    committees: [
      {
        id: "design",
        departmentId: "media",
        name: { ar: "لجنة التصميم", en: "Design Committee" },
        description: {
          ar: "تصميم الإعلانات، المنشورات، وقوالب منصات التواصل الاجتماعي بهوية موحدة ومبتكرة.",
          en: "Designing announcements, publications and social media templates with a unified, innovative identity.",
        },
      },
      {
        id: "photography",
        departmentId: "media",
        name: { ar: "لجنة التصوير", en: "Photography Committee" },
        description: {
          ar: "توثيق الفعاليات والأنشطة بالصور والفيديوهات عالية الجودة لتغذية حسابات وأرشيف النادي.",
          en: "Documenting events and activities with high quality photos and videos to feed the club's channels and archive.",
        },
      },
      {
        id: "marketing",
        departmentId: "media",
        name: { ar: "لجنة التسويق", en: "Marketing Committee" },
        description: {
          ar: "إدارة حسابات التواصل الاجتماعي والتخطيط للحملات لضمان وصول البرامج لأكبر عدد من الطلاب.",
          en: "Managing social media accounts and planning campaigns so programs reach the largest possible number of students.",
        },
      },
    ],
  },
  {
    id: "events",
    icon: "CalendarDays",
    name: { ar: "قسم الفعاليات والتنظيم", en: "Events & Organization Department" },
    overview: {
      ar: "المسؤول عن تحويل الأفكار والخطط إلى أنشطة ودورات وفعاليات حية ومنظمة على أرض الواقع.",
      en: "Responsible for turning ideas and plans into live, well-organized activities, courses and events on the ground.",
    },
    committees: [
      {
        id: "organizing",
        departmentId: "events",
        name: { ar: "لجنة التنظيم", en: "Organizing Committee" },
        description: {
          ar: "إدارة الأمور اللوجستية، حجز القاعات وتجهيزها، وتنظيم دخول الحضور لضمان سير الفعاليات بسلاسة.",
          en: "Handling logistics, booking and preparing venues, and managing attendee flow so events run smoothly.",
        },
      },
      {
        id: "content",
        departmentId: "events",
        name: { ar: "لجنة المحتوى", en: "Content Committee" },
        description: {
          ar: "إعداد المادة المعرفية والحقائب التدريبية للورش، وصياغة الخطابات والتنسيق الأكاديمي للأنشطة.",
          en: "Preparing knowledge material and training kits for workshops, drafting letters and handling academic coordination.",
        },
      },
    ],
  },
  {
    id: "computer",
    icon: "Cpu",
    name: { ar: "قسم الحاسب", en: "Computer Department" },
    overview: {
      ar: "المسؤول عن تمكين النادي تقنياً وتقديم الحلول الذكية، وبناء وتطوير المشاريع الرقمية والورش التخصصية.",
      en: "Responsible for technically empowering the club, delivering smart solutions, and building digital projects and specialized workshops.",
    },
    committees: [
      {
        id: "programming",
        departmentId: "computer",
        name: { ar: "لجنة البرمجة", en: "Programming Committee" },
        description: {
          ar: "تطوير المنصات والمواقع وتصميم الأنظمة التقنية التي تخدم مبادرات النادي وأنشطته.",
          en: "Developing platforms and websites and designing the technical systems that serve the club's initiatives.",
        },
      },
      {
        id: "ai",
        departmentId: "computer",
        name: { ar: "لجنة الذكاء الاصطناعي", en: "Artificial Intelligence Committee" },
        description: {
          ar: "تقديم الورش والمشاريع التطبيقية في مجالات الذكاء الاصطناعي وتوظيف تقنياته الحديثة.",
          en: "Delivering workshops and applied projects in artificial intelligence and applying its modern techniques.",
        },
      },
      {
        id: "cybersecurity",
        departmentId: "computer",
        name: { ar: "لجنة الأمن السيبراني", en: "Cybersecurity Committee" },
        description: {
          ar: "تعزيز النوعية التقنية بحماية البيانات، وتحديد الأنشطة والورش الخاصة بالدفاع الرقمي والأمان السحابي.",
          en: "Raising technical awareness of data protection and running activities and workshops on digital defense and cloud security.",
        },
      },
    ],
  },
];

export const featuredDepartment = (departments.find((d) => d.featured) ?? departments[0])!;
export const otherDepartments = departments.filter((d) => !d.featured);

export const allCommittees: Committee[] = departments.flatMap((d) => d.committees);

export function getCommittee(id: string): Committee | undefined {
  return allCommittees.find((c) => c.id === id);
}

export function getDepartmentOfCommittee(id: string): Department | undefined {
  return departments.find((d) => d.committees.some((c) => c.id === id));
}
