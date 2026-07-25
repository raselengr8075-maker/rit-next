"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, Images } from "lucide-react";
import { useState } from "react";
import BilingualText from "@/components/site/BilingualText";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";
import ContentStatusBadge from "@/components/ui/ContentStatusBadge";
import ImageClassificationBadge from "@/components/ui/ImageClassificationBadge";
import type { Project } from "@/types/content";

export default function EngineeringProjectCard({ item, lead = false }: { item: Project; lead?: boolean }) {
  const [failed, setFailed] = useState(false);
  const image = item.heroImageUrl || item.imageUrl;
  const galleryCount = item.galleryImages?.length || item.gallery?.length || 0;
  const documentCount = item.documentUrls?.length || 0;
  return (
    <article className={`engineering-project-card ${lead ? "engineering-project-lead" : ""}`}>
      <div className="engineering-project-media">
        {image && !failed ? (
          <Image
            unoptimized
            src={image}
            alt={`${item.titleEn}, ${item.imageClassification || "concept visualization"}`}
            fill
            sizes={lead ? "(max-width: 760px) 100vw, 64vw" : "(max-width: 760px) 100vw, 32vw"}
            onError={() => setFailed(true)}
          />
        ) : <TechnicalPlaceholder kind="prototype" label={`${item.titleEn} — design representation`} />}
        <ImageClassificationBadge classification={item.imageClassification} />
      </div>
      <div className="engineering-project-copy">
        <div className="engineering-project-meta">
          <span>{item.category || "Engineering"}</span>
          <ContentStatusBadge status={item.developmentStage || item.status} />
        </div>
        <h3><BilingualText en={item.titleEn} bn={item.titleBn || item.titleEn} /></h3>
        <p><BilingualText en={item.summaryEn} bn={item.summaryBn || item.summaryEn} /></p>
        <dl>
          <div><dt><BilingualText en="Stage" bn="পর্যায়" /></dt><dd>{item.developmentStage || item.status}</dd></div>
          {item.year ? <div><dt><BilingualText en="Year" bn="বছর" /></dt><dd>{item.year}</dd></div> : null}
        </dl>
        {(galleryCount > 0 || documentCount > 0) ? <div className="engineering-evidence">
          {galleryCount > 0 ? <span><Images size={14} />{galleryCount} media</span> : null}
          {documentCount > 0 ? <span><FileText size={14} />{documentCount} document{documentCount === 1 ? "" : "s"}</span> : null}
        </div> : null}
        <Link href={`/projects/${item.slug}`}><BilingualText en="View project" bn="প্রকল্প দেখুন" /><ArrowUpRight size={17} /></Link>
      </div>
    </article>
  );
}
