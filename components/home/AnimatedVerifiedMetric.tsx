"use client";

import { useEffect, useRef, useState } from "react";
import { AppWindow, BadgeCheck, BookOpenText, FolderKanban, Milestone } from "lucide-react";
import BilingualText from "@/components/site/BilingualText";
import type { VerifiedMetric } from "@/types/content";

const icons = { project: FolderKanban, app: AppWindow, publication: BookOpenText, milestone: Milestone, verified: BadgeCheck };

export default function AnimatedVerifiedMetric({ metric }: { metric: VerifiedMetric }) {
  const root = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const [displayed, setDisplayed] = useState(metric.numericValue);
  const [locale, setLocale] = useState("en");
  const Icon = icons[metric.iconKey as keyof typeof icons] || BadgeCheck;

  useEffect(() => {
    const updateLocale = () => setLocale(document.documentElement.dataset.language === "bn" ? "bn-BD" : "en");
    updateLocale();
    const languageObserver = new MutationObserver(updateLocale);
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-language"] });

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !root.current) return () => languageObserver.disconnect();

    setDisplayed(0);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      visibilityObserver.disconnect();
      const start = performance.now();
      const duration = 900;
      const tick = (time: number) => {
        const progress = Math.min(1, (time - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayed(Math.round(metric.numericValue * eased));
        if (progress < 1) frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    visibilityObserver.observe(root.current);

    return () => {
      visibilityObserver.disconnect();
      languageObserver.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [metric.numericValue]);

  return (
    <article ref={root} className="verified-stat-card" title={metric.sourceNote}>
      <span className="verified-stat-icon"><Icon size={22} aria-hidden="true" /></span>
      <strong aria-label={`${metric.numericValue}${metric.suffix || ""} ${metric.labelEn}`}>
        {new Intl.NumberFormat(locale).format(displayed)}{metric.suffix}
      </strong>
      <span><BilingualText en={metric.labelEn} bn={metric.labelBn || metric.labelEn} /></span>
      <small><BadgeCheck size={13} aria-hidden="true" /><BilingualText en="Verified public data" bn="যাচাইকৃত প্রকাশ্য তথ্য" /></small>
    </article>
  );
}
