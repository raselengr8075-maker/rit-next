import Container from "@/components/site/Container";
import SectionHeader from "@/components/site/SectionHeader";
import AnimatedVerifiedMetric from "./AnimatedVerifiedMetric";
import type { VerifiedMetric } from "@/types/content";

export default function VerifiedStatisticsSection({ metrics }: { metrics: VerifiedMetric[] }) {
  if (!metrics.length) return null;
  return (
    <section id="verified-statistics" className="verified-statistics-section" aria-labelledby="verified-statistics-title">
      <Container>
        <SectionHeader
          eyebrowEn="Verified public record"
          eyebrowBn="যাচাইকৃত প্রকাশ্য তথ্য"
          titleEn="Engineering and digital work, presented transparently"
          titleBn="প্রকৌশল ও ডিজিটাল কার্যক্রমের স্বচ্ছ উপস্থাপন"
          textEn="Every number below is calculated from published records or a verified metric with a documented source."
          textBn="নিচের প্রতিটি সংখ্যা প্রকাশিত রেকর্ড অথবা উৎস-নথিসহ যাচাইকৃত মেট্রিক থেকে গণনা করা হয়েছে।"
          titleId="verified-statistics-title"
        />
        <div className="verified-statistics-grid">
          {metrics.map((metric) => <AnimatedVerifiedMetric key={metric.id} metric={metric} />)}
        </div>
      </Container>
    </section>
  );
}
