import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/site/Container";
import SectionHeader from "@/components/site/SectionHeader";
import EngineeringProjectCard from "@/components/projects/EngineeringProjectCard";
import BilingualText from "@/components/site/BilingualText";
import type { Project } from "@/types/content";

export default function FeaturedMachinesSection({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <section id="featured-machines" className="site-section engineering-machines-section" aria-labelledby="featured-machines-title">
      <Container>
        <div className="section-title-row">
          <SectionHeader
            eyebrowEn="Selected engineering work"
            eyebrowBn="নির্বাচিত প্রকৌশল কাজ"
            titleEn="Engineering concepts in focus"
            titleBn="আলোচনায় নির্বাচিত প্রকৌশল ধারণা"
            textEn="Published projects are shown with their documented development stage. A listing does not imply completion or deployment."
            textBn="প্রকাশিত প্রকল্পগুলো নথিভুক্ত উন্নয়ন পর্যায়সহ দেখানো হয়েছে। তালিকাভুক্ত হওয়া সম্পন্ন বা প্রয়োগ হওয়া বোঝায় না।"
            titleId="featured-machines-title"
          />
          <Link href="/projects"><BilingualText en="View all projects" bn="সব প্রকল্প দেখুন" /><ArrowRight size={16} /></Link>
        </div>
        <div className="engineering-project-layout">
          <EngineeringProjectCard item={projects[0]} lead />
          <div className="engineering-project-stack">
            {projects.slice(1).map((project) => <EngineeringProjectCard key={project.id} item={project} />)}
          </div>
        </div>
      </Container>
    </section>
  );
}
