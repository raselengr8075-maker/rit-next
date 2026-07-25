"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, DraftingCompass, FlaskConical, Lightbulb, Rocket, Search, Wrench } from "lucide-react";
import BilingualText from "@/components/site/BilingualText";
import type { ResearchStage } from "@/data/research-process";

const icons = { identify: Lightbulb, research: Search, design: DraftingCompass, prototype: Wrench, test: FlaskConical, improve: BadgeCheck, deploy: Rocket };

export default function ResearchJourneyTimeline({ stages }: { stages: ResearchStage[] }) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index || 0));
    }, { rootMargin: "-30% 0px -45%", threshold: [0.25, 0.6] });
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="research-process-timeline">
      <div className="research-progress" aria-hidden="true"><span style={{ "--journey-progress": `${(active / Math.max(stages.length - 1, 1)) * 100}%` } as React.CSSProperties} /></div>
      <ol>
        {stages.map((stage, index) => {
          const Icon = icons[stage.icon];
          return (
            <li key={stage.number} ref={(node) => { items.current[index] = node; }} data-index={index} className={index <= active ? "is-active" : ""}>
              <button onClick={() => setActive(index)} onFocus={() => setActive(index)} aria-current={index === active ? "step" : undefined}>
                <span className="research-stage-marker"><Icon size={21} aria-hidden="true" /></span>
                <span className="research-stage-number">{stage.number}</span>
                <b><BilingualText en={stage.titleEn} bn={stage.titleBn} /></b>
                <p><BilingualText en={stage.descriptionEn} bn={stage.descriptionBn} /></p>
                <dl>
                  <div><dt><BilingualText en="Typical activity" bn="সাধারণ কার্যক্রম" /></dt><dd><BilingualText en={stage.activityEn} bn={stage.activityBn} /></dd></div>
                  <div><dt><BilingualText en="Possible output" bn="সম্ভাব্য ফলাফল" /></dt><dd><BilingualText en={stage.outputEn} bn={stage.outputBn} /></dd></div>
                </dl>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
