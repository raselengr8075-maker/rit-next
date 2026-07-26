"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectGalleryMedia } from "@/types/content";
import styles from "./ProjectDetail.module.css";

export default function ProjectMediaGallery({ items }: { items: ProjectGalleryMedia[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const move = useCallback((offset: number) => {
    setSelected((current) => current === null ? null : (current + offset + items.length) % items.length);
    setZoom(1);
  }, [items.length]);

  useEffect(() => {
    if (selected === null) return;
    const previous = document.activeElement as HTMLElement | null;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(3, value + .25));
      if (event.key === "-") setZoom((value) => Math.max(1, value - .25));
    };
    addEventListener("keydown", onKey);
    document.body.classList.add("navigation-open");
    return () => {
      removeEventListener("keydown", onKey);
      document.body.classList.remove("navigation-open");
      previous?.focus();
    };
  }, [selected, move]);

  if (!items.length) return null;
  const item = selected === null ? null : items[selected];

  return (
    <>
      <div className={styles.mediaGrid}>
        {items.map((media, index) => (
          <button key={`${media.url}-${index}`} onClick={() => setSelected(index)} aria-label={`Open ${media.altEn}`}>
            <Image
              src={media.url}
              alt={media.altEn}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              placeholder={media.blurDataUrl ? "blur" : "empty"}
              blurDataURL={media.blurDataUrl}
            />
            <span>{media.captionEn || media.altEn}</span>
          </button>
        ))}
      </div>
      {item ? (
        <div ref={dialog} className={styles.lightbox} role="dialog" aria-modal="true" aria-label={item.altEn}>
          <div className={styles.lightboxTools}>
            <button ref={closeButton} onClick={() => setSelected(null)} aria-label="Close gallery"><X /></button>
            <button onClick={() => setZoom((value) => Math.max(1, value - .25))} aria-label="Zoom out"><Minus /></button>
            <button onClick={() => setZoom((value) => Math.min(3, value + .25))} aria-label="Zoom in"><Plus /></button>
            <button onClick={() => void dialog.current?.requestFullscreen?.()} aria-label="View fullscreen"><Maximize2 /></button>
          </div>
          <button className={styles.lightboxPrevious} onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button>
          <figure>
            <div className={styles.lightboxImage}>
              <Image
                src={item.url}
                alt={item.altEn}
                fill
                sizes="100vw"
                style={{ transform: `scale(${zoom})` }}
              />
            </div>
            <figcaption>
              <strong>{item.captionEn || item.altEn}</strong>
              <span>{item.classification || "Design representation"}</span>
              {item.credit ? <small>Credit: {item.credit}</small> : null}
            </figcaption>
          </figure>
          <button className={styles.lightboxNext} onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button>
        </div>
      ) : null}
    </>
  );
}
