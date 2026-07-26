import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import StructuredData from "@/components/site/StructuredData";
import ProjectDetailExperience from "@/components/projects/detail/ProjectDetailExperience";
import { fallbackProjects } from "@/data/fallback-content";
import { getProject, getProjects, relatedProjects } from "@/lib/content/projects";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbsJsonLd } from "@/lib/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.raselinnovation.com";

export const revalidate = 3600;
export const generateStaticParams = () => fallbackProjects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  const image = project.heroImage || project.heroImageUrl || project.imageUrl;
  return pageMetadata(
    project.seoTitle || project.titleEn,
    project.seoDescription || project.summaryEn,
    `/projects/${project.slug}`,
    image,
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined;
  const related = relatedProjects(project, projects);
  const image = project.heroImage || project.heroImageUrl || project.imageUrl;
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    additionalType: "https://schema.org/Project",
    name: project.titleEn,
    description: project.summaryEn,
    url: new URL(`/projects/${project.slug}`, siteUrl).toString(),
    inLanguage: ["en", "bn"],
    creator: {
      "@type": "Organization",
      name: "Rasel Innovation & Technology",
      url: new URL("/", siteUrl).toString(),
    },
    ...(image ? { image: image.startsWith("http") ? image : new URL(image, siteUrl).toString() } : {}),
    ...(project.category ? { genre: project.category } : {}),
    ...(project.keywords?.length ? { keywords: project.keywords.join(", ") } : {}),
    ...(project.updatedAt ? { dateModified: project.lastUpdated || project.updatedAt } : {}),
  };

  return (
    <>
      <PageHeader />
      <main id="main-content">
        <StructuredData data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.titleEn, path: `/projects/${project.slug}` },
        ])} />
        <StructuredData data={projectJsonLd} />
        <ProjectDetailExperience project={project} related={related} previous={previous} next={next} />
      </main>
      <Footer />
    </>
  );
}
