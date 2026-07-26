"use client";

import { useMemo, useState } from "react";
import type { Achievement } from "@/types/content";
import BilingualText from "@/components/site/BilingualText";

const filters = [
  { key: "All", en: "All", bn: "সব" },
  { key: "Engineering", en: "Engineering", bn: "প্রকৌশল" },
  { key: "Software", en: "Software", bn: "সফটওয়্যার" },
  { key: "Research", en: "Research", bn: "গবেষণা" },
  { key: "Organization", en: "Organization", bn: "প্রতিষ্ঠান" },
] as const;

const categoryTranslations = Object.fromEntries(filters.slice(1).map((item) => [item.key, item.bn]));

export default function EditorialTimeline({ items }: { items: Achievement[] }) {
  const [filter, setFilter] = useState("All");
  const shown = useMemo(
    () => filter === "All"
      ? items
      : items.filter((item) => (item.category || "Organization").toLowerCase() === filter.toLowerCase()),
    [filter, items],
  );

  return (
    <div>
      <div className="timeline-filters" role="group" aria-label="Filter milestones">
        {filters.map((item) => (
          <button
            key={item.key}
            className={filter === item.key ? "active" : ""}
            onClick={() => setFilter(item.key)}
            aria-pressed={filter === item.key}
          >
            <BilingualText en={item.en} bn={item.bn} />
          </button>
        ))}
      </div>
      {shown.length ? (
        <ol className="editorial-timeline">
          {shown.map((item, index) => {
            const categoryEn = item.category || "Organization";
            const categoryBn = categoryTranslations[categoryEn] || categoryEn;
            return (
              <li key={item.id} className={index % 2 ? "timeline-right" : "timeline-left"}>
                <div className="timeline-node" aria-hidden="true" />
                <article>
                  <div className="card-meta">
                    <time><BilingualText en={item.year ? String(item.year) : "Date pending"} bn={item.year ? String(item.year) : "তারিখ অপেক্ষমাণ"} /></time>
                    <span><BilingualText en={categoryEn} bn={categoryBn} /></span>
                  </div>
                  <h3><BilingualText en={item.titleEn} bn={item.titleBn || item.titleEn} /></h3>
                  <p><BilingualText en={item.summaryEn} bn={item.summaryBn || item.summaryEn} /></p>
                </article>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="site-empty">
          <BilingualText en="No published milestones match this category." bn="এই বিভাগে কোনো প্রকাশিত মাইলফলক নেই।" />
        </p>
      )}
    </div>
  );
}
