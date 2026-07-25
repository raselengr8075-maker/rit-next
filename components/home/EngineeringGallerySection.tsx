"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";
import Container from "@/components/site/Container";
import SectionHeader from "@/components/site/SectionHeader";
import BilingualText from "@/components/site/BilingualText";
import EngineeringGalleryCard from "@/components/gallery/EngineeringGalleryCard";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import type { GalleryItem } from "@/types/content";

export default function EngineeringGallerySection({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const move = useCallback((offset: number) => {
    setSelected((index) => index === null || !items.length ? null : (index + offset + items.length) % items.length);
  }, [items.length]);
  if (!items.length) return null;

  return (
    <section id="engineering-gallery" className="site-section engineering-gallery-section" aria-labelledby="engineering-gallery-title">
      <Container>
        <div className="section-title-row">
          <SectionHeader
            eyebrowEn="Engineering media"
            eyebrowBn="প্রকৌশল মিডিয়া"
            titleEn="Inside engineering and development"
            titleBn="প্রকৌশল ও উন্নয়ন কার্যক্রমের ভেতরের দৃশ্য"
            textEn="Published media and clearly classified illustrative material. Visuals do not imply an owned facility or completed machine unless marked as an actual photograph."
            textBn="প্রকাশিত মিডিয়া ও স্পষ্টভাবে শ্রেণিবদ্ধ চিত্রিত উপকরণ। ‘Actual photograph’ হিসেবে চিহ্নিত না হলে কোনো ভিজ্যুয়াল নিজস্ব স্থাপনা বা সম্পন্ন যন্ত্র বোঝায় না।"
            titleId="engineering-gallery-title"
          />
          <Link href="/gallery"><BilingualText en="View media gallery" bn="মিডিয়া গ্যালারি দেখুন" /><ArrowRight size={16} /></Link>
        </div>
        <div className="engineering-gallery-grid">
          {items.map((item, index) => <EngineeringGalleryCard key={item.id} item={item} featured={index === 0} onOpen={() => setSelected(index)} />)}
        </div>
      </Container>
      {selected !== null ? <GalleryLightbox items={items} index={selected} onClose={() => setSelected(null)} onMove={move} /> : null}
    </section>
  );
}
