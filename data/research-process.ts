export type ResearchStage = {
  number: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  activityEn: string;
  activityBn: string;
  outputEn: string;
  outputBn: string;
  icon: "identify" | "research" | "design" | "prototype" | "test" | "improve" | "deploy";
};

export const researchProcess: ResearchStage[] = [
  { number: "01", titleEn: "Identify", titleBn: "সমস্যা চিহ্নিতকরণ", descriptionEn: "Define the operating need, users and constraints.", descriptionBn: "কাজের প্রয়োজন, ব্যবহারকারী ও সীমাবদ্ধতা নির্ধারণ।", activityEn: "Problem framing", activityBn: "সমস্যা বিন্যাস", outputEn: "Problem brief", outputBn: "সমস্যার সংক্ষিপ্ত বিবরণ", icon: "identify" },
  { number: "02", titleEn: "Research", titleBn: "গবেষণা", descriptionEn: "Organize evidence, context and relevant prior work.", descriptionBn: "তথ্য, প্রেক্ষাপট ও প্রাসঙ্গিক পূর্ববর্তী কাজ সংগঠিত করা।", activityEn: "Evidence review", activityBn: "তথ্য পর্যালোচনা", outputEn: "Research notes", outputBn: "গবেষণা নোট", icon: "research" },
  { number: "03", titleEn: "CAD Design", titleBn: "CAD নকশা", descriptionEn: "Translate requirements into a reviewable technical design.", descriptionBn: "প্রয়োজনকে পর্যালোচনাযোগ্য কারিগরি নকশায় রূপ দেওয়া।", activityEn: "Modelling and review", activityBn: "মডেলিং ও পর্যালোচনা", outputEn: "Design representation", outputBn: "নকশা উপস্থাপনা", icon: "design" },
  { number: "04", titleEn: "Prototype", titleBn: "প্রোটোটাইপ", descriptionEn: "Build the smallest useful representation for learning.", descriptionBn: "শেখার জন্য ক্ষুদ্রতম কার্যকর উপস্থাপনা তৈরি।", activityEn: "Prototype fabrication", activityBn: "প্রোটোটাইপ নির্মাণ", outputEn: "Testable prototype", outputBn: "পরীক্ষাযোগ্য প্রোটোটাইপ", icon: "prototype" },
  { number: "05", titleEn: "Test", titleBn: "পরীক্ষা", descriptionEn: "Evaluate assumptions safely at an appropriate maturity level.", descriptionBn: "উপযুক্ত পরিপক্বতায় নিরাপদভাবে অনুমান যাচাই।", activityEn: "Controlled evaluation", activityBn: "নিয়ন্ত্রিত মূল্যায়ন", outputEn: "Test record", outputBn: "পরীক্ষা নথি", icon: "test" },
  { number: "06", titleEn: "Improve", titleBn: "উন্নয়ন", descriptionEn: "Apply evidence, document revisions and repeat when needed.", descriptionBn: "প্রমাণ প্রয়োগ, সংশোধন নথিভুক্ত এবং প্রয়োজনমতো পুনরাবৃত্তি।", activityEn: "Design iteration", activityBn: "নকশার পুনরাবৃত্তি", outputEn: "Documented revision", outputBn: "নথিভুক্ত সংশোধন", icon: "improve" },
  { number: "07", titleEn: "Deploy", titleBn: "প্রয়োগ", descriptionEn: "Prepare a suitable handover or field-use plan when justified.", descriptionBn: "যথাযথ হলে হস্তান্তর বা মাঠে ব্যবহারের পরিকল্পনা প্রস্তুত।", activityEn: "Readiness review", activityBn: "প্রস্তুতি পর্যালোচনা", outputEn: "Deployment plan", outputBn: "প্রয়োগ পরিকল্পনা", icon: "deploy" },
];
