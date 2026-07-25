"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/types/content";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";
import ImageClassificationBadge from "@/components/ui/ImageClassificationBadge";

export default function GalleryLightbox({ items, index, onClose, onMove }: { items: GalleryItem[]; index: number; onClose: () => void; onMove: (offset: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const item = items[index];

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
      if (event.key === "Tab" && dialogRef.current) {
        const controls = [...dialogRef.current.querySelectorAll<HTMLElement>("button,a[href]")];
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    addEventListener("keydown", onKey);
    document.body.classList.add("navigation-open");
    return () => {
      removeEventListener("keydown", onKey);
      document.body.classList.remove("navigation-open");
      previouslyFocused?.focus();
    };
  }, [onClose, onMove]);

  return (
    <div
      ref={dialogRef}
      className="premium-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.altEn || item.titleEn}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        if (Math.abs(distance) > 48) onMove(distance < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <button ref={closeRef} className="lightbox-close" onClick={onClose} aria-label="Close gallery"><X /></button>
      <button className="lightbox-prev" onClick={() => onMove(-1)} aria-label="Previous image"><ChevronLeft /></button>
      <figure>
        <div className="lightbox-stage">
          {item.imageUrl ? <Image unoptimized src={item.imageUrl} alt={item.altEn || item.titleEn} fill sizes="95vw" /> : <TechnicalPlaceholder kind="gallery" label={`${item.titleEn} — image unavailable`} />}
        </div>
        <figcaption>
          <div><ImageClassificationBadge classification={item.imageClassification} /><b>{item.captionEn || item.titleEn}</b><p>{item.altEn}</p></div>
          <div>
            {item.relatedProjectSlug ? <Link href={`/projects/${item.relatedProjectSlug}`}>Related project <ExternalLink size={14} /></Link> : null}
            {item.downloadUrl ? <a href={item.downloadUrl} download>Download <Download size={14} /></a> : null}
          </div>
        </figcaption>
      </figure>
      <button className="lightbox-next" onClick={() => onMove(1)} aria-label="Next image"><ChevronRight /></button>
    </div>
  );
}
