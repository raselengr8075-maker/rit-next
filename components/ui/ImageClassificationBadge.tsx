import { ImageIcon } from "lucide-react";
import BilingualText from "@/components/site/BilingualText";
import type { ImageClassification } from "@/types/content";

const translations: Record<string, string> = {
  "Actual photograph": "বাস্তব আলোকচিত্র",
  "Illustrative image": "চিত্রিত উপস্থাপনা",
  "Concept visualization": "ধারণাগত ভিজ্যুয়াল",
  "Design representation": "নকশা উপস্থাপনা",
};

export default function ImageClassificationBadge({ classification }: { classification?: ImageClassification }) {
  const label = classification || "Design representation";
  return <span className="image-classification-badge"><ImageIcon size={12} aria-hidden="true" /><BilingualText en={label} bn={translations[label] || label} /></span>;
}
