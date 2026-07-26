import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3 } from "lucide-react";
import type { NewsArticle } from "@/types/content";
import BilingualText from "./BilingualText";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";

const categoryTranslations: Record<string, string> = {
  Engineering: "প্রকৌশল",
  Research: "গবেষণা",
  Software: "সফটওয়্যার",
  Agriculture: "কৃষি",
  Innovation: "উদ্ভাবন",
  News: "সংবাদ",
};

export default function NewsCard({ item, lead = false }: { item: NewsArticle; lead?: boolean }) {
  const words = (item.contentEn || item.summaryEn).trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  const publishedDate = item.publishedAt ? new Date(item.publishedAt) : null;
  const categoryEn = item.category || "RIT insight";
  const categoryBn = categoryTranslations[categoryEn] || (item.category ? categoryEn : "RIT অন্তর্দৃষ্টি");

  return (
    <article className={`news-card editorial-news-card ${lead ? "editorial-news-lead" : ""}`}>
      <div className="news-card-media">
        {item.imageUrl ? (
          <Image
            unoptimized
            src={item.imageUrl}
            alt={item.titleEn}
            width={lead ? 960 : 640}
            height={lead ? 560 : 420}
            sizes={lead ? "(max-width: 760px) 100vw, 40vw" : "(max-width: 760px) 100vw, 30vw"}
          />
        ) : <TechnicalPlaceholder kind="news" label={`${item.titleEn} — publication illustration`} labelBn={`${item.titleBn || item.titleEn} — প্রকাশনার চিত্র`} />}
      </div>
      <div className="news-card-body">
        <div className="card-meta">
          <span><BilingualText en={categoryEn} bn={categoryBn} /></span>
          {publishedDate ? (
            <time dateTime={item.publishedAt}>
              <BilingualText
                en={new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(publishedDate)}
                bn={new Intl.DateTimeFormat("bn-BD", { dateStyle: "medium" }).format(publishedDate)}
              />
            </time>
          ) : null}
        </div>
        <h3><BilingualText en={item.titleEn} bn={item.titleBn || item.titleEn} /></h3>
        <p><BilingualText en={item.summaryEn} bn={item.summaryBn || item.summaryEn} /></p>
        <div className="news-card-foot">
          <span><Clock3 size={14} /><BilingualText en={`${minutes} min read`} bn={`${minutes} মিনিটের পাঠ`} /></span>
          {item.author ? <span>{item.author}</span> : null}
          <Link href={`/news/${item.slug}`}><BilingualText en="Read insight" bn="নিবন্ধ পড়ুন" /><ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </article>
  );
}
