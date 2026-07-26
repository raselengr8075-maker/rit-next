import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  FileText,
  ShieldCheck,
} from "lucide-react";
import BilingualText from "@/components/site/BilingualText";
import Container from "@/components/site/Container";
import ProjectCard from "@/components/site/ProjectCard";
import ShareButtons from "@/components/site/ShareButtons";
import TechnicalPlaceholder from "@/components/media/TechnicalPlaceholder";
import ContentStatusBadge from "@/components/ui/ContentStatusBadge";
import ImageClassificationBadge from "@/components/ui/ImageClassificationBadge";
import type {
  Project,
  ProjectDocument,
  ProjectGalleryMedia,
  ProjectVideo,
} from "@/types/content";
import styles from "./ProjectDetail.module.css";

const ProjectMediaGallery = dynamic(() => import("./ProjectMediaGallery"));
const ProjectTimeline = dynamic(() => import("./ProjectTimeline"));
const ProjectVideos = dynamic(() => import("./ProjectVideos"));

type Props = {
  project: Project;
  related: Project[];
  previous?: Project;
  next?: Project;
};

function textList(values?: string[]) {
  return (values || []).map((value) => value.trim()).filter(Boolean);
}

function EvidenceEmpty({ labelEn, labelBn }: { labelEn: string; labelBn: string }) {
  return (
    <div className={styles.emptyState}>
      <ShieldCheck size={20} aria-hidden="true" />
      <p><BilingualText
        en={`${labelEn} will be published when verified information is available.`}
        bn={`যাচাইকৃত তথ্য পাওয়া গেলে ${labelBn} প্রকাশিত হবে।`}
      /></p>
    </div>
  );
}

function EditorialSection({
  id,
  titleEn,
  titleBn,
  children,
}: {
  id: string;
  titleEn: string;
  titleBn: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={styles.editorialSection} aria-labelledby={`${id}-title`}>
      <span className={styles.sectionMarker}>{titleEn.slice(0, 2).toUpperCase()}</span>
      <div>
        <h2 id={`${id}-title`}><BilingualText en={titleEn} bn={titleBn} /></h2>
        {children}
      </div>
    </section>
  );
}

export default function ProjectDetailExperience({ project, related, previous, next }: Props) {
  const heroImage = project.heroImage || project.heroImageUrl || project.imageUrl;
  const gallery: ProjectGalleryMedia[] = [
    ...(project.projectGallery || []),
    ...(project.galleryImages || project.gallery || []).map((url) => ({
      url,
      altEn: `${project.titleEn} project media`,
      altBn: `${project.titleBn || project.titleEn} প্রকল্পের ছবি`,
      classification: project.imageClassification || "Design representation" as const,
    })),
  ].filter((item, index, items) => item.url && items.findIndex((candidate) => candidate.url === item.url) === index);
  const videos: ProjectVideo[] = [
    ...(project.videos || []),
    ...(project.videoUrl ? [{ title: `${project.titleEn} video`, url: project.videoUrl }] : []),
  ];
  const documents: ProjectDocument[] = [
    ...(project.documents || []),
    ...(project.downloads || []),
    ...(project.documentUrls || []).map((url, index) => ({ title: `Project document ${index + 1}`, url, type: "Document" })),
  ].filter((item, index, items) => item.url && items.findIndex((candidate) => candidate.url === item.url) === index);
  const specifications = project.technicalSpecs || [];
  const innovations = textList(project.keyInnovations);
  const features = textList(project.engineeringFeatures?.length ? project.engineeringFeatures : project.features);
  const benefits = textList(project.benefits);
  const applications = textList(project.applicationAreas?.length ? project.applicationAreas : project.applications);
  const toc = [
    ["overview", "Overview", "সংক্ষিপ্ত বিবরণ"],
    ["problem", "Problem", "সমস্যা"],
    ["solution", "Solution", "সমাধান"],
    ["specifications", "Specifications", "কারিগরি বৈশিষ্ট্য"],
    ["timeline", "Timeline", "সময়রেখা"],
    ["gallery", "Gallery", "গ্যালারি"],
    ["documents", "Documents", "নথি"],
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="project-title">
        {heroImage ? <Image className={styles.heroBackdrop} src={heroImage} alt="" fill priority sizes="100vw" /> : null}
        <div className={styles.heroOverlay} aria-hidden="true" />
        <Container className={styles.heroInner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/"><BilingualText en="Home" bn="হোম" /></Link><span>/</span>
            <Link href="/projects"><BilingualText en="Projects" bn="প্রকল্প" /></Link><span>/</span>
            <span aria-current="page">{project.titleEn}</span>
          </nav>
          <div className={styles.heroCopy}>
            <div className={styles.heroBadges}>
              <ContentStatusBadge status={project.developmentStage || project.status} />
              <span>{project.category || "RIT engineering"}</span>
              {project.year ? <time>{project.year}</time> : null}
            </div>
            <h1 id="project-title"><BilingualText en={project.titleEn} bn={project.titleBn || project.titleEn} /></h1>
            <p><BilingualText en={project.summaryEn} bn={project.summaryBn || project.summaryEn} /></p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contact"><BilingualText en="Discuss this project" bn="এই প্রকল্প নিয়ে আলোচনা করুন" /><ArrowRight size={17} /></Link>
              <a className={styles.ghostButton} href="#overview"><BilingualText en="Explore engineering detail" bn="প্রকৌশল বিবরণ দেখুন" /></a>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.heroMediaSection} aria-label="Project hero media">
        <Container>
          <div className={styles.heroMedia}>
            {heroImage ? (
              <Image src={heroImage} alt={`${project.titleEn}, ${project.imageClassification || "project visual"}`} fill priority sizes="(max-width: 1280px) 100vw, 1240px" />
            ) : (
              <TechnicalPlaceholder kind="prototype" label={`${project.titleEn} — verified project image not yet published`} labelBn={`${project.titleBn || project.titleEn} — যাচাইকৃত প্রকল্পের ছবি এখনো প্রকাশিত নয়`} />
            )}
            <ImageClassificationBadge classification={project.imageClassification || "Concept visualization"} />
          </div>
        </Container>
      </section>

      <Container className={styles.contentLayout}>
        <aside className={styles.tableOfContents}>
          <strong><BilingualText en="On this page" bn="এই পৃষ্ঠায়" /></strong>
          <nav aria-label="Project table of contents">
            {toc.map(([id, en, bn]) => <a key={id} href={`#${id}`}><BilingualText en={en} bn={bn} /></a>)}
          </nav>
          <dl>
            <div><dt><BilingualText en="Stage" bn="পর্যায়" /></dt><dd>{project.developmentStage || project.status}</dd></div>
            {project.researchStatus ? <div><dt><BilingualText en="Research" bn="গবেষণা" /></dt><dd>{project.researchStatus}</dd></div> : null}
            {project.prototypeStatus ? <div><dt><BilingualText en="Prototype" bn="প্রোটোটাইপ" /></dt><dd>{project.prototypeStatus}</dd></div> : null}
            {project.fieldTestStatus ? <div><dt><BilingualText en="Field test" bn="মাঠ পরীক্ষা" /></dt><dd>{project.fieldTestStatus}</dd></div> : null}
          </dl>
        </aside>

        <article className={styles.projectArticle}>
          <EditorialSection id="overview" titleEn="Project overview" titleBn="প্রকল্পের সংক্ষিপ্ত বিবরণ">
            {project.contentEn ? <p><BilingualText en={project.contentEn} bn={project.contentBn || project.summaryBn || project.summaryEn} /></p> : <EvidenceEmpty labelEn="A detailed project overview" labelBn="প্রকল্পের বিস্তারিত বিবরণ" />}
          </EditorialSection>

          <EditorialSection id="problem" titleEn="Problem statement" titleBn="সমস্যার বিবরণ">
            {project.problemStatementEn || project.problem ? <p><BilingualText en={project.problemStatementEn || project.problem || ""} bn={project.problemStatementBn || "বাংলা সমস্যার বিবরণ এখনো প্রকাশিত নয়।"} /></p> : <EvidenceEmpty labelEn="The verified problem statement" labelBn="যাচাইকৃত সমস্যার বিবরণ" />}
          </EditorialSection>

          <EditorialSection id="objectives" titleEn="Objectives" titleBn="উদ্দেশ্য">
            {project.objectivesEn || project.objective ? <p><BilingualText en={project.objectivesEn || project.objective || ""} bn={project.objectivesBn || "বাংলা উদ্দেশ্য এখনো প্রকাশিত নয়।"} /></p> : <EvidenceEmpty labelEn="Verified project objectives" labelBn="যাচাইকৃত প্রকল্পের উদ্দেশ্য" />}
          </EditorialSection>

          <EditorialSection id="solution" titleEn="Technical solution" titleBn="কারিগরি সমাধান">
            {project.proposedSolutionEn || project.solution || project.technicalSummaryEn ? <p><BilingualText en={project.proposedSolutionEn || project.solution || project.technicalSummaryEn || ""} bn={project.proposedSolutionBn || project.technicalSummaryBn || "বাংলা কারিগরি সমাধান এখনো প্রকাশিত নয়।"} /></p> : <EvidenceEmpty labelEn="The technical solution" labelBn="কারিগরি সমাধান" />}
          </EditorialSection>

          <div className={styles.listSectionGrid}>
            <section aria-labelledby="innovations-title">
              <h2 id="innovations-title"><BilingualText en="Key innovations" bn="মূল উদ্ভাবন" /></h2>
              {innovations.length ? <ul>{innovations.map((item) => <li key={item}>{item}</li>)}</ul> : <EvidenceEmpty labelEn="Verified innovation details" labelBn="যাচাইকৃত উদ্ভাবনের তথ্য" />}
            </section>
            <section aria-labelledby="features-title">
              <h2 id="features-title"><BilingualText en="Engineering features" bn="প্রকৌশল বৈশিষ্ট্য" /></h2>
              {features.length ? <ul>{features.map((item) => <li key={item}>{item}</li>)}</ul> : <EvidenceEmpty labelEn="Engineering feature details" labelBn="প্রকৌশল বৈশিষ্ট্যের তথ্য" />}
            </section>
            <section aria-labelledby="benefits-title">
              <h2 id="benefits-title"><BilingualText en="Benefits" bn="সুবিধা" /></h2>
              {benefits.length ? <ul>{benefits.map((item) => <li key={item}>{item}</li>)}</ul> : <EvidenceEmpty labelEn="Verified benefit statements" labelBn="যাচাইকৃত সুবিধার তথ্য" />}
            </section>
            <section aria-labelledby="applications-title">
              <h2 id="applications-title"><BilingualText en="Application areas" bn="প্রয়োগের ক্ষেত্র" /></h2>
              {applications.length ? <ul>{applications.map((item) => <li key={item}>{item}</li>)}</ul> : <EvidenceEmpty labelEn="Application-area details" labelBn="প্রয়োগের ক্ষেত্রের তথ্য" />}
            </section>
          </div>

          <EditorialSection id="research-method" titleEn="Research method" titleBn="গবেষণা পদ্ধতি">
            {project.researchMethodEn ? <p><BilingualText en={project.researchMethodEn} bn={project.researchMethodBn || "বাংলা গবেষণা পদ্ধতি এখনো প্রকাশিত নয়।"} /></p> : <EvidenceEmpty labelEn="The verified research method" labelBn="যাচাইকৃত গবেষণা পদ্ধতি" />}
          </EditorialSection>

          <section id="specifications" className={styles.blockSection} aria-labelledby="specifications-title">
            <header><span>TECH / DATA</span><h2 id="specifications-title"><BilingualText en="Technical specifications" bn="কারিগরি স্পেসিফিকেশন" /></h2></header>
            {specifications.length ? (
              <dl className={styles.specificationGrid}>
                {specifications.map((spec, index) => <div key={`${spec.label}-${index}`}><dt>{spec.label}</dt><dd>{spec.value}{spec.unit ? <small> {spec.unit}</small> : null}</dd>{spec.group ? <span>{spec.group}</span> : null}</div>)}
              </dl>
            ) : <EvidenceEmpty labelEn="Verified technical specifications" labelBn="যাচাইকৃত কারিগরি স্পেসিফিকেশন" />}
          </section>

          <section id="timeline" className={styles.blockSection} aria-labelledby="timeline-title">
            <header><span>BUILD / LOG</span><h2 id="timeline-title"><BilingualText en="Development timeline" bn="উন্নয়ন সময়রেখা" /></h2></header>
            {project.developmentTimeline?.length ? <Suspense fallback={<p>Loading timeline…</p>}><ProjectTimeline items={project.developmentTimeline} /></Suspense> : <EvidenceEmpty labelEn="A dated development timeline" labelBn="তারিখসহ উন্নয়ন সময়রেখা" />}
          </section>

          <section id="gallery" className={styles.blockSection} aria-labelledby="gallery-title">
            <header><span>MEDIA</span><h2 id="gallery-title"><BilingualText en="Engineering gallery" bn="প্রকৌশল গ্যালারি" /></h2></header>
            {gallery.length ? <Suspense fallback={<p>Loading gallery…</p>}><ProjectMediaGallery items={gallery} /></Suspense> : <EvidenceEmpty labelEn="Verified project gallery media" labelBn="যাচাইকৃত প্রকল্প গ্যালারির ছবি" />}
          </section>

          <section id="videos" className={styles.blockSection} aria-labelledby="videos-title">
            <header><span>VIDEO</span><h2 id="videos-title"><BilingualText en="Project videos" bn="প্রকল্পের ভিডিও" /></h2></header>
            {videos.length ? <Suspense fallback={<p>Loading videos…</p>}><ProjectVideos items={videos} /></Suspense> : <EvidenceEmpty labelEn="Prototype, testing or operation videos" labelBn="প্রোটোটাইপ, পরীক্ষা বা পরিচালনার ভিডিও" />}
          </section>

          <section id="documents" className={styles.blockSection} aria-labelledby="documents-title">
            <header><span>FILES</span><h2 id="documents-title"><BilingualText en="Documents and downloads" bn="নথি ও ডাউনলোড" /></h2></header>
            {documents.length ? (
              <div className={styles.documentGrid}>
                {documents.map((document, index) => (
                  <article key={`${document.url}-${index}`}>
                    <FileText size={22} aria-hidden="true" />
                    <span>{document.type || "Document"}</span>
                    <h3>{document.title}</h3>
                    {document.descriptionEn ? <p>{document.descriptionEn}</p> : null}
                    <div>
                      <a href={document.previewUrl || document.url} target="_blank" rel="noopener noreferrer">Preview <ExternalLink size={14} /></a>
                      <a href={document.url} download>Download <Download size={14} /></a>
                    </div>
                  </article>
                ))}
              </div>
            ) : <EvidenceEmpty labelEn="Verified public documents" labelBn="যাচাইকৃত প্রকাশ্য নথি" />}
          </section>

          <div className={styles.integrityNote}>
            <ShieldCheck size={22} aria-hidden="true" />
            <p><BilingualText
              en="Performance, capacity, efficiency, cost and validation claims are shown only when verified information has been published."
              bn="কার্যক্ষমতা, ধারণক্ষমতা, দক্ষতা, খরচ ও যাচাইকরণের দাবি শুধু যাচাইকৃত তথ্য প্রকাশিত হলেই দেখানো হয়।"
            /></p>
          </div>
          <ShareButtons title={project.titleEn} path={`/projects/${project.slug}`} />
        </article>
      </Container>

      {related.length ? (
        <section className={styles.relatedSection} aria-labelledby="related-title">
          <Container>
            <div className={styles.relatedHeader}><div><span>RECOMMENDED</span><h2 id="related-title"><BilingualText en="Related engineering projects" bn="সম্পর্কিত প্রকৌশল প্রকল্প" /></h2></div><Link href="/projects"><BilingualText en="View all projects" bn="সব প্রকল্প দেখুন" /><ArrowRight size={16} /></Link></div>
            <div className={styles.relatedGrid}>{related.map((item) => <ProjectCard key={item.id} item={item} />)}</div>
          </Container>
        </section>
      ) : null}

      <nav className={styles.projectNavigation} aria-label="Previous and next projects">
        <Container>
          {previous ? <Link href={`/projects/${previous.slug}`}><ArrowLeft /><span><small>Previous project</small><strong>{previous.titleEn}</strong></span></Link> : <span />}
          {next ? <Link href={`/projects/${next.slug}`}><span><small>Next project</small><strong>{next.titleEn}</strong></span><ArrowRight /></Link> : <span />}
        </Container>
      </nav>

      <section className={styles.contactCta} aria-labelledby="project-contact-title">
        <Container><div><span>ENGINEERING CONVERSATION</span><h2 id="project-contact-title"><BilingualText en="Discuss the problem, not just the product." bn="শুধু পণ্য নয়, সমস্যা নিয়ে আলোচনা করুন।" /></h2></div><Link href="/contact"><BilingualText en="Contact RIT" bn="RIT-এর সঙ্গে যোগাযোগ" /><ArrowRight size={17} /></Link></Container>
      </section>
    </div>
  );
}
