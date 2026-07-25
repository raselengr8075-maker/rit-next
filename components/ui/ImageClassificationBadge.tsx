import { ImageIcon } from "lucide-react";
import type { ImageClassification } from "@/types/content";

export default function ImageClassificationBadge({ classification }: { classification?: ImageClassification }) {
  const label = classification || "Design representation";
  return <span className="image-classification-badge"><ImageIcon size={12} aria-hidden="true" />{label}</span>;
}
