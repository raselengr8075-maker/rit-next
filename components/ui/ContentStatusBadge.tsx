import BilingualText from "@/components/site/BilingualText";

const translations: Record<string, string> = {
  published: "প্রকাশিত",
  active: "সক্রিয়",
  concept: "ধারণা",
  prototype: "প্রোটোটাইপ",
  testing: "পরীক্ষাধীন",
  development: "উন্নয়নাধীন",
  "in development": "উন্নয়নাধীন",
  completed: "সম্পন্ন",
};

export default function ContentStatusBadge({ status }: { status?: string }) {
  const label = status?.trim() || "Published";
  return (
    <span className={`content-status-badge status-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
      <BilingualText en={label} bn={translations[label.toLowerCase()] || label} />
    </span>
  );
}
