import EngineeringIcon from "@/components/ui/EngineeringIcon";
import BilingualText from "@/components/site/BilingualText";

type Kind = "project" | "app" | "research" | "prototype" | "news" | "founder" | "gallery";

const map = {
  project: "machinery",
  app: "mobile",
  research: "research",
  prototype: "prototype",
  news: "document",
  founder: "consultation",
  gallery: "product",
} as const;

const labels = {
  project: { en: "Agricultural machinery concept", bn: "কৃষিযন্ত্রের ধারণা" },
  app: { en: "Software product", bn: "সফটওয়্যার পণ্য" },
  research: { en: "Research document", bn: "গবেষণা নথি" },
  prototype: { en: "Prototype concept", bn: "প্রোটোটাইপ ধারণা" },
  news: { en: "RIT publication", bn: "RIT প্রকাশনা" },
  founder: { en: "Founder profile", bn: "প্রতিষ্ঠাতার প্রোফাইল" },
  gallery: { en: "Media unavailable", bn: "মিডিয়া অনুপলব্ধ" },
};

export default function TechnicalPlaceholder({
  kind = "project",
  label,
  labelBn,
  className = "",
}: {
  kind?: Kind;
  label?: string;
  labelBn?: string;
  className?: string;
}) {
  const textEn = label || labels[kind].en;
  const textBn = labelBn || labels[kind].bn;
  return (
    <div className={`technical-placeholder technical-placeholder-${kind} ${className}`.trim()} role="img" aria-label={textEn}>
      <div className="technical-placeholder-grid" />
      <div className="technical-placeholder-ring" />
      <span className="technical-placeholder-icon"><EngineeringIcon name={map[kind]} size={34} /></span>
      <small><BilingualText en={textEn} bn={textBn} /></small>
      <b>RIT / {kind.toUpperCase()}</b>
    </div>
  );
}
