import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import StructuredData from "@/components/site/StructuredData";
import FounderExperience from "@/components/founder/FounderExperience";
import { getFounder } from "@/lib/content/founder";
import { getProjects } from "@/lib/content/projects";
import { getAchievements, getTimeline } from "@/lib/content/achievements";
import { getResources } from "@/lib/content/resources";
import { pageMetadata } from "@/lib/seo/metadata";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.raselinnovation.com";

function absoluteUrl(value: string) {
  try {
    return new URL(value, siteUrl).toString();
  } catch {
    return value;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const founder = await getFounder();
  return pageMetadata(
    `${founder.name} | Founder`,
    founder.summaryEn || "Founder profile and engineering leadership philosophy at Rasel Innovation & Technology.",
    "/founder",
    founder.imageUrl,
  );
}

export default async function FounderPage() {
  const [founder, projects, achievements, timeline, resources] = await Promise.all([
    getFounder(),
    getProjects(),
    getAchievements(),
    getTimeline(),
    getResources(),
  ]);

  const professionalLinks = (founder.professionalLinks || []).filter((link) => /^https?:\/\//i.test(link));
  const knowsAbout = [...new Set([
    ...(founder.expertise || []),
    ...(founder.skills || []),
    ...(founder.researchInterests || []),
  ])];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    url: absoluteUrl("/founder"),
    jobTitle: founder.roleEn,
    description: founder.summaryEn,
    worksFor: {
      "@type": "Organization",
      name: "Rasel Innovation & Technology",
      url: absoluteUrl("/"),
    },
    ...(founder.imageUrl ? { image: absoluteUrl(founder.imageUrl) } : {}),
    ...(knowsAbout.length ? { knowsAbout } : {}),
    ...(professionalLinks.length ? { sameAs: professionalLinks } : {}),
  };

  return (
    <>
      <PageHeader />
      <main id="main-content">
        <StructuredData data={jsonLd} />
        <FounderExperience
          founder={founder}
          projects={projects}
          achievements={achievements}
          timeline={timeline}
          resources={resources}
        />
      </main>
      <Footer />
    </>
  );
}
