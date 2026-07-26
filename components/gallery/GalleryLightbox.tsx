"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Maximize2, Minus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/types/content";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";
import ImageClassificationBadge from "@/components/ui/ImageClassificationBadge";

export default function GalleryLightbox({ items, index, onClose, onMove }: { items: GalleryItem[]; index: number; onClose: () => void; onMove: (offset: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const item = items[index];
  const move = useCallback((offset: number) => {
    setZoom(1);
    onMove(offset);
  }, [onMove]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(3, value + .25));
      if (event.key === "-") setZoom((value) => Math.max(1, value - .25));
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
  }, [onClose, move]);

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
        if (Math.abs(distance) > 48) move(distance < 0 ? 1 : -1);
        touchStart.current = null;
      }}
    >
      <div className="lightbox-tools">
        <button ref={closeRef} onClick={onClose} aria-label="Close gallery"><X /></button>
        <button onClick={() => setZoom((value) => Math.max(1, value - .25))} aria-label="Zoom out"><Minus /></button>
        <button onClick={() => setZoom((value) => Math.min(3, value + .25))} aria-label="Zoom in"><Plus /></button>
        <button onClick={() => void dialogRef.current?.requestFullscreen?.()} aria-label="View fullscreen"><Maximize2 /></button>
      </div>
      <button className="lightbox-prev" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button>
      <figure>
        <div className="lightbox-stage">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.altEn || item.titleEn}
              fill
              sizes="95vw"
              placeholder={item.blurDataUrl ? "blur" : "empty"}
              blurDataURL={item.blurDataUrl}
              style={{ transform: `scale(${zoom})` }}
            />
          ) : <TechnicalPlaceholder kind="gallery" label={`${item.titleEn} — image unavailable`} />}
        </div>
        <figcaption>
          <div>
            <ImageClassificationBadge classification={item.imageClassification} />
            <b>{item.captionEn || item.titleEn}</b>
            <p>{item.altEn}</p>
            {item.imageCredit ? <small>Credit: {item.imageCredit}</small> : null}
          </div>
          <div>
            {item.relatedProjectSlug ? <Link href={`/projects/${item.relatedProjectSlug}`}>Related project <ExternalLink size={14} /></Link> : null}
            {item.downloadUrl ? <a href={item.downloadUrl} download>Download <Download size={14} /></a> : null}
          </div>
        </figcaption>
      </figure>
      <button className="lightbox-next" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button>
    </div>
  );
}
