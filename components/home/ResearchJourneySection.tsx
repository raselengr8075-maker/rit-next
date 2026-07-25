import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/site/Container";
import SectionHeader from "@/components/site/SectionHeader";
import BilingualText from "@/components/site/BilingualText";
import ResearchJourneyTimeline from "@/components/research/ResearchJourneyTimeline";
import { researchProcess } from "@/data/research-process";

export default function ResearchJourneySection() {
  return (
    <section id="research-journey" className="site-section research-journey-section" aria-labelledby="research-journey-title">
      <Container>
        <SectionHeader
          eyebrowEn="Research & development"
          eyebrowBn="গবেষণা ও উন্নয়ন"
          titleEn="An iterative path from a real problem to a responsible outcome"
          titleBn="বাস্তব সমস্যা থেকে দায়িত্বশীল ফলাফলের পুনরাবৃত্তিমূলক পথ"
          textEn="The sequence is a working framework, not a promise that every project reaches deployment. Stages can repeat or stop according to evidence, safety and scope."
          textBn="এই ধাপগুলো একটি কাজের কাঠামো—সব প্রকল্প প্রয়োগ পর্যন্ত পৌঁছাবে এমন প্রতিশ্রুতি নয়। প্রমাণ, নিরাপত্তা ও পরিধি অনুযায়ী ধাপ পুনরাবৃত্তি বা বন্ধ হতে পারে।"
          titleId="research-journey-title"
        />
        <ResearchJourneyTimeline stages={researchProcess} />
        <Link className="site-button light" href="/research"><BilingualText en="Explore our research approach" bn="গবেষণা পদ্ধতি দেখুন" /><ArrowRight size={16} /></Link>
      </Container>
    </section>
  );
}
