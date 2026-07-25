"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { GalleryItem } from "@/types/content";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";
import GalleryFilters from "./GalleryFilters";
import GalleryLightbox from "./GalleryLightbox";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const categories = [...new Set(items.map((item) => item.category).filter(Boolean))] as string[];
  const shown = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return items.filter((item) => {
      const inCategory = category === "all" || item.category === category;
      const inSearch = !needle || `${item.titleEn} ${item.titleBn} ${item.captionEn || ""} ${item.captionBn || ""}`.toLocaleLowerCase().includes(needle);
      return inCategory && inSearch;
    });
  }, [items, category, query]);
  const move = useCallback((offset: number) => {
    setSelected((index) => index === null || !shown.length ? null : (index + offset + shown.length) % shown.length);
  }, [shown.length]);

  return (
    <>
      <div className="gallery-toolbar">
        <GalleryFilters categories={categories} active={category} onChange={(value) => { setCategory(value); setSelected(null); }} />
        <label className="gallery-search">
          <Search size={17} aria-hidden="true" />
          <span className="srOnly">Search gallery</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search published media" />
        </label>
      </div>
      {shown.length ? (
        <div className="premium-gallery">
          {shown.map((item, index) => (
            <button key={item.id} onClick={() => setSelected(index)} aria-label={`Open ${item.altEn || item.titleEn}`}>
              <div className="premium-gallery-media">
                {item.imageUrl ? (
                  <Image unoptimized src={item.imageUrl} alt={item.altEn || item.titleEn} fill sizes="(max-width: 720px) 100vw, 33vw" />
                ) : (
                  <TechnicalPlaceholder kind="gallery" label={`${item.titleEn} — image unavailable`} />
                )}
              </div>
              <span><b>{item.captionEn || item.titleEn}</b><small>{item.category || "RIT media"}{item.mediaDate ? ` · ${new Date(item.mediaDate).toLocaleDateString("en-GB", { dateStyle: "medium" })}` : ""}</small></span>
            </button>
          ))}
        </div>
      ) : <p className="site-empty">No published media matches this search.</p>}
      {selected !== null ? <GalleryLightbox items={shown} index={selected} onClose={() => setSelected(null)} onMove={move} /> : null}
    </>
  );
}
