"use client";

import { useEffect, useRef } from "react";
import BilingualText from "@/components/site/BilingualText";
import type { ProjectTimelineStage } from "@/types/content";
import styles from "./ProjectDetail.module.css";

export default function ProjectTimeline({ items }: { items: ProjectTimelineStage[] }) {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle(styles.timelineVisible, entry.isIntersecting));
    }, { threshold: .2 });
    root.current.querySelectorAll("li").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={root} className={styles.timeline}>
      {items.map((item, index) => (
        <li key={`${item.stage}-${index}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <article>
            <small>{item.stage}{item.status ? ` · ${item.status}` : ""}</small>
            <h3><BilingualText en={item.titleEn || item.stage} bn={item.titleBn || item.titleEn || item.stage} /></h3>
            {item.descriptionEn ? <p><BilingualText en={item.descriptionEn} bn={item.descriptionBn || item.descriptionEn} /></p> : null}
            {item.date ? <time dateTime={item.date}>{item.date}</time> : null}
          </article>
        </li>
      ))}
    </ol>
  );
}
