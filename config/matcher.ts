import type { CommitteeMatchResult, MatcherOption, MatcherQuestion } from "@/types/committees";
import { getCommittee, getDepartmentOfCommittee } from "@/config/committees";

/** Deterministic, transparent committee matcher — no AI involved. */
export const matcherQuestions: MatcherQuestion[] = [
  {
    id: "q1",
    question: { ar: "ما المجال الذي تستمتع به أكثر؟", en: "Which field do you enjoy most?" },
    options: [
      {
        id: "q1-tech",
        label: { ar: "البرمجة والتقنية", en: "Programming & technology" },
        scores: { programming: 3, cybersecurity: 1 },
      },
      {
        id: "q1-ai",
        label: { ar: "الذكاء الاصطناعي", en: "Artificial intelligence" },
        scores: { ai: 3, programming: 1 },
      },
      {
        id: "q1-design",
        label: { ar: "التصميم والإبداع", en: "Design & creativity" },
        scores: { design: 3, marketing: 1 },
      },
      {
        id: "q1-photo",
        label: { ar: "التصوير وصناعة المحتوى", en: "Photography & content creation" },
        scores: { photography: 3, marketing: 1 },
      },
      {
        id: "q1-org",
        label: { ar: "التنظيم وإدارة الفعاليات", en: "Organizing & event management" },
        scores: { organizing: 3, content: 1 },
      },
      {
        id: "q1-comm",
        label: { ar: "التواصل والعلاقات", en: "Communication & relations" },
        scores: { ambassadors: 3, marketing: 1 },
      },
    ],
  },
  {
    id: "q2",
    question: { ar: "ما نوع المهام التي تفضلها؟", en: "What kind of tasks do you prefer?" },
    options: [
      {
        id: "q2-build",
        label: { ar: "بناء وتطوير الحلول", en: "Building & developing solutions" },
        scores: { programming: 3, cybersecurity: 1 },
      },
      {
        id: "q2-ai",
        label: {
          ar: "تحليل المشكلات واستخدام الذكاء الاصطناعي",
          en: "Analyzing problems and applying AI",
        },
        scores: { ai: 3, cybersecurity: 1 },
      },
      {
        id: "q2-design",
        label: { ar: "تصميم المحتوى", en: "Designing content" },
        scores: { design: 3, content: 1 },
      },
      {
        id: "q2-photo",
        label: { ar: "التصوير والتوثيق", en: "Photography & documentation" },
        scores: { photography: 3 },
      },
      {
        id: "q2-plan",
        label: { ar: "التخطيط والتنظيم", en: "Planning & organizing" },
        scores: { organizing: 3, content: 1 },
      },
      {
        id: "q2-network",
        label: { ar: "التواصل وبناء العلاقات", en: "Networking & building relationships" },
        scores: { ambassadors: 3 },
      },
    ],
  },
  {
    id: "q3",
    question: { ar: "كيف تفضل أن تساهم في النادي؟", en: "How would you like to contribute to the club?" },
    options: [
      {
        id: "q3-projects",
        label: { ar: "تطوير مشاريع تقنية", en: "Developing technical projects" },
        scores: { programming: 3, cybersecurity: 2 },
      },
      {
        id: "q3-ai",
        label: { ar: "ابتكار حلول باستخدام الذكاء الاصطناعي", en: "Innovating solutions with AI" },
        scores: { ai: 3 },
      },
      {
        id: "q3-identity",
        label: { ar: "صناعة هوية ومحتوى بصري", en: "Creating visual identity & content" },
        scores: { design: 3, content: 1 },
      },
      {
        id: "q3-market",
        label: { ar: "توثيق وتسويق الأنشطة", en: "Documenting & marketing activities" },
        scores: { marketing: 3, photography: 2 },
      },
      {
        id: "q3-events",
        label: { ar: "تنظيم الفعاليات", en: "Organizing events" },
        scores: { organizing: 3, content: 2 },
      },
      {
        id: "q3-represent",
        label: { ar: "تمثيل النادي والتواصل مع الآخرين", en: "Representing the club & connecting with others" },
        scores: { ambassadors: 3 },
      },
    ],
  },
];

export function scoreAnswers(answers: MatcherOption[]): CommitteeMatchResult | null {
  if (answers.length === 0) return null;

  const totals = new Map<string, number>();
  for (const answer of answers) {
    for (const [committeeId, points] of Object.entries(answer.scores)) {
      totals.set(committeeId, (totals.get(committeeId) ?? 0) + points);
    }
  }

  let bestId: string | null = null;
  let bestScore = 0;
  for (const [committeeId, score] of totals) {
    if (score > bestScore) {
      bestScore = score;
      bestId = committeeId;
    }
  }
  if (!bestId) return null;

  const committee = getCommittee(bestId);
  const department = getDepartmentOfCommittee(bestId);
  if (!committee || !department) return null;

  return {
    committee,
    department,
    score: bestScore,
    reasons: answers.filter((a) => (a.scores[bestId] ?? 0) > 0).map((a) => a.label),
  };
}
