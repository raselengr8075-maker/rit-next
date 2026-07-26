"use client";

import Image from "next/image";
import { useState } from "react";
import BilingualText from "@/components/site/BilingualText";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";
import ImageClassificationBadge from "@/components/ui/ImageClassificationBadge";
import type { GalleryItem } from "@/types/content";

export default function EngineeringGalleryCard({ item, featured, onOpen }: { item: GalleryItem; featured?: boolean; onOpen: () => void }) {
  const [failed, setFailed] = useState(false);
  return (
    <button className={`engineering-gallery-card ${featured ? "engineering-gallery-feature" : ""}`} onClick={onOpen} aria-label={`Open ${item.altEn || item.titleEn}`}>
      <div className="engineering-gallery-media">
        {item.imageUrl && !failed ? (
          <Image
            unoptimized
            src={item.imageUrl}
            alt={item.altEn || item.titleEn}
            fill
            sizes={featured ? "(max-width: 760px) 100vw, 58vw" : "(max-width: 760px) 100vw, 30vw"}
            onError={() => setFailed(true)}
          />
        ) : <TechnicalPlaceholder kind="gallery" label={`${item.titleEn} — design representation`} labelBn={`${item.titleBn || item.titleEn} — নকশা উপস্থাপনা`} />}
        <span className="engineering-gallery-category">{item.category || "Engineering"}</span>
        <ImageClassificationBadge classification={item.imageClassification} />
        <span className="engineering-gallery-caption">
          <b><BilingualText en={item.captionEn || item.titleEn} bn={item.captionBn || item.titleBn || item.titleEn} /></b>
          <small><BilingualText en="Open media" bn="মিডিয়া দেখুন" /></small>
        </span>
      </div>
    </button>
  );
}
