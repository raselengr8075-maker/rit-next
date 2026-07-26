import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Smartphone } from "lucide-react";
import type { AppProduct } from "@/types/content";
import BilingualText from "./BilingualText";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";

const platformTranslations: Record<string, string> = {
  Android: "অ্যান্ড্রয়েড",
  iOS: "আইওএস",
  Web: "ওয়েব",
  Mobile: "মোবাইল",
  "Digital product": "ডিজিটাল পণ্য",
};

const statusTranslations: Record<string, string> = {
  Published: "প্রকাশিত",
  Active: "সক্রিয়",
  Development: "উন্নয়নাধীন",
  Prototype: "প্রোটোটাইপ",
  Concept: "ধারণা",
};

export default function AppCard({ item }: { item: AppProduct }) {
  const version = item.currentVersion || item.version;
  const platformEn = item.platform || "Digital product";
  const platformBn = platformTranslations[platformEn] || platformEn;
  const statusBn = statusTranslations[item.status] || item.status;
  const updated = new Date(item.updatedAt);

  return (
    <article className="content-card app-product-card">
      <div className="app-product-visual">
        {item.appIconUrl ? (
          <Image unoptimized src={item.appIconUrl} alt={`${item.titleEn} application icon`} width={92} height={92} />
        ) : <TechnicalPlaceholder kind="app" label={`${item.titleEn} branded app placeholder`} labelBn={`${item.titleBn || item.titleEn} অ্যাপের স্থানধারক`} />}
      </div>
      <div className="content-card-body">
        <div className="card-meta">
          <span><Smartphone size={13} /><BilingualText en={platformEn} bn={platformBn} /></span>
          <span className={`status-badge status-${item.status?.toLowerCase().replace(/\s+/g, "-")}`}>
            <BilingualText en={item.status} bn={statusBn} />
          </span>
        </div>
        <h3><BilingualText en={item.titleEn} bn={item.titleBn || item.titleEn} /></h3>
        <p><BilingualText en={item.summaryEn} bn={item.summaryBn || item.summaryEn} /></p>
        <div className="app-card-facts">
          {version ? <small>v{version}</small> : null}
          <small>
            <BilingualText
              en={`Updated ${updated.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`}
              bn={`হালনাগাদ ${updated.toLocaleDateString("bn-BD", { month: "short", year: "numeric" })}`}
            />
          </small>
        </div>
        <Link href={`/apps/${item.slug}`}><BilingualText en="Explore application" bn="অ্যাপ দেখুন" /><ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
