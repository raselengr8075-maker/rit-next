import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import CorporateHeader from "@/components/site/CorporateHeader";
import CorporateFooter from "@/components/site/CorporateFooter";
import Container from "@/components/site/Container";
import BilingualText from "@/components/site/BilingualText";
import SectionHeader from "@/components/site/SectionHeader";
import AppCard from "@/components/site/AppCard";
import NewsCard from "@/components/site/NewsCard";
import ServiceCard from "@/components/site/ServiceCard";
import StructuredData from "@/components/site/StructuredData";
import ContactSection from "@/components/ContactSection";
import FounderVisual from "@/components/home/FounderVisual";
import EditorialTimeline from "@/components/timeline/EditorialTimeline";
import EngineeringIcon from "@/components/ui/EngineeringIcon";
import VerifiedStatisticsSection from "@/components/home/VerifiedStatisticsSection";
import FeaturedMachinesSection from "@/components/home/FeaturedMachinesSection";
import EngineeringGallerySection from "@/components/home/EngineeringGallerySection";
import ResearchJourneySection from "@/components/home/ResearchJourneySection";
import PartnersSection from "@/components/home/PartnersSection";
import { getApps } from "@/lib/content/apps";
import { getNews } from "@/lib/content/news";
import { getFounder } from "@/lib/content/founder";
import { getAchievements } from "@/lib/content/achievements";
import { getPublicSiteSettings } from "@/lib/content/site-settings";
import { getVerifiedHomeMetrics } from "@/lib/data/home-statistics";
import { getFeaturedMachines } from "@/lib/data/featured-machines";
import { getEngineeringGallery } from "@/lib/data/engineering-gallery";
import { getPublicPartners } from "@/lib/data/public-partners";
import { divisions, services } from "@/lib/site/content";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";

const contactText = {
  nav: [],
  heroA: "",
  heroB: "",
  heroText: "",
  about: "",
  aboutText: "",
  divisions: "",
  projects: "",
  apps: "",
  news: "",
  founder: "",
  founderText: "",
  contact: "Start a focused conversation",
  send: "Send inquiry",
  success: "Thank you — your message has been received.",
  explore: "",
  talk: "",
};

const divisionIcons = ["agriculture", "software", "research", "prototype"] as const;
const trustItems = [
  ["Agricultural Engineering", "কৃষি প্রকৌশল"],
  ["Machinery Development", "যন্ত্র উন্নয়ন"],
  ["Research & Prototyping", "গবেষণা ও প্রোটোটাইপ"],
  ["Software Solutions", "সফটওয়্যার সমাধান"],
  ["Mobile Applications", "মোবাইল অ্যাপ্লিকেশন"],
] as const;

export default async function Home() {
  const [apps, news, founder, achievements, siteSettings, verifiedMetrics, featuredMachines, engineeringGallery, partners] = await Promise.all([
    getApps(),
    getNews(),
    getFounder(),
    getAchievements(),
    getPublicSiteSettings(),
    getVerifiedHomeMetrics(),
    getFeaturedMachines(),
    getEngineeringGallery(),
    getPublicPartners(),
  ]);
  const featuredApps = apps.filter((item) => item.featured).slice(0, 3);
  const founderName = founder.name || founder.titleEn || "Md. Rasel Ahmed";

  return (
    <>
      <CorporateHeader />
      <main id="main-content">
        <StructuredData data={organizationJsonLd} />
        <StructuredData data={websiteJsonLd} />

        <section className="corporate-hero">
          <Image
            className="hero-banner-image object-cover"
            src="/images/hero/rit-hero-background.png"
            alt="RIT innovation and engineering research campus"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-banner-overlay" aria-hidden="true" />
          <div className="hero-bottom-transition" aria-hidden="true" />
          <Container className="hero-layout">
            <div className="hero-content">
              <span className="site-eyebrow">
                <BilingualText en="Rasel Innovation & Technology" bn="রাসেল ইনোভেশন অ্যান্ড টেকনোলজি" />
              </span>
              <h1>
                <BilingualText
                  en="Practical engineering and digital innovation for real-world progress."
                  bn="বাস্তব অগ্রগতির জন্য ব্যবহারিক প্রকৌশল ও ডিজিটাল উদ্ভাবন।"
                />
              </h1>
              <p>
                <BilingualText
                  en="RIT develops responsible machinery concepts, prototypes and digital products around genuine needs in Bangladesh and beyond."
                  bn="RIT বাংলাদেশ ও বিশ্বের বাস্তব প্রয়োজনকে কেন্দ্র করে দায়িত্বশীল যন্ত্রধারণা, প্রোটোটাইপ ও ডিজিটাল পণ্য তৈরি করে।"
                />
              </p>
              <div className="hero-actions">
                <Link className="site-button primary" href="/projects">
                  <BilingualText en="Explore projects" bn="প্রকল্প দেখুন" /><ArrowRight size={17} />
                </Link>
                <Link className="site-button secondary" href="/contact">
                  <BilingualText en="Start a conversation" bn="কথা বলুন" />
                </Link>
                <Link className="hero-tertiary" href="/services">
                  <BilingualText en="See capabilities" bn="সক্ষমতা দেখুন" /><ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="capability-strip" aria-label="RIT capabilities">
          <Container>
            {trustItems.map(([en, bn]) => <span key={en}><BilingualText en={en} bn={bn} /></span>)}
          </Container>
        </section>

        <VerifiedStatisticsSection metrics={verifiedMetrics} />

        <section className="site-section">
          <Container className="editorial-about editorial-about-single">
            <div className="editorial-about-copy">
              <SectionHeader
                eyebrowEn="About RIT"
                eyebrowBn="RIT পরিচিতি"
                titleEn="Useful innovation begins with an honest understanding of the problem."
                titleBn="কার্যকর উদ্ভাবন শুরু হয় সমস্যার সৎ উপলব্ধি থেকে।"
              />
              <p>
                <BilingualText
                  en="RIT is a multidisciplinary initiative from Bangladesh connecting agricultural engineering, applied research, product development and software."
                  bn="RIT বাংলাদেশের একটি বহুমুখী উদ্যোগ, যা কৃষি প্রকৌশল, প্রয়োগভিত্তিক গবেষণা, পণ্য উন্নয়ন ও সফটওয়্যারকে যুক্ত করে।"
                />
              </p>
              <div className="principle-grid">
                {[
                  ["Vision", "প্রযুক্তির মাধ্যমে বাস্তব অগ্রগতিকে আরও সহজলভ্য করা।"],
                  ["Mission", "বাস্তব চাহিদার জন্য গবেষণা, নকশা ও উন্নয়ন করা।"],
                  ["Approach", "প্রমাণ, পুনরাবৃত্তি ও স্পষ্ট নথিকে অগ্রাধিকার দেওয়া।"],
                  ["Bangladesh", "স্থানীয় বাস্তবতা থেকে আন্তর্জাতিক মানের কাজ গড়া।"],
                ].map(([title, copy]) => (
                  <article key={title}><b>{title}</b><p>{copy}</p></article>
                ))}
              </div>
              <Link className="section-link" href="/about">Learn about RIT <ArrowRight size={15} /></Link>
            </div>
          </Container>
        </section>

        <section className="site-section muted-section">
          <Container>
            <SectionHeader
              eyebrowEn="Core divisions"
              eyebrowBn="মূল বিভাগ"
              titleEn="Connected capabilities, organized around useful outcomes."
              titleBn="কার্যকর ফলাফলের জন্য সংযুক্ত সক্ষমতা।"
            />
            <div className="card-grid four-cols">
              {divisions.map((item, index) => (
                <article className="division-card" key={item.slug}>
                  <span className="engineering-icon"><EngineeringIcon name={divisionIcons[index]} size={48} /></span>
                  <h3><BilingualText en={item.titleEn} bn={item.titleBn} /></h3>
                  <p><BilingualText en={item.summaryEn} bn={item.summaryBn} /></p>
                  <Link href={`/divisions/${item.slug}`}>
                    <BilingualText en="Explore division" bn="বিভাগ দেখুন" /> <ArrowRight size={15} />
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <FeaturedMachinesSection projects={featuredMachines} />

        {featuredApps.length ? (
          <section className="site-section muted-section">
            <Container>
              <div className="section-title-row">
                <SectionHeader eyebrowEn="Digital products" eyebrowBn="ডিজিটাল পণ্য" titleEn="Focused applications for useful everyday work." titleBn="দৈনন্দিন কার্যকর কাজের জন্য অ্যাপ্লিকেশন।" />
                <Link href="/apps">View all applications <ArrowRight size={15} /></Link>
              </div>
              <div className="card-grid three-cols">
                {featuredApps.map((item) => <AppCard key={item.id} item={item} />)}
              </div>
            </Container>
          </section>
        ) : null}

        <section className="site-section">
          <Container>
            <SectionHeader eyebrowEn="Services" eyebrowBn="সেবা" titleEn="Focused support from concept to delivery." titleBn="ধারণা থেকে বাস্তবায়ন পর্যন্ত লক্ষ্যভিত্তিক সহায়তা।" />
            <div className="card-grid three-cols">{services.slice(0, 6).map((item) => <ServiceCard key={item.slug} item={item} />)}</div>
            <Link className="section-link" href="/services">View all services <ArrowRight size={15} /></Link>
          </Container>
        </section>

        <EngineeringGallerySection items={engineeringGallery} />

        <ResearchJourneySection />

        {achievements.length ? (
          <section className="site-section">
            <Container>
              <SectionHeader eyebrowEn="Development journey" eyebrowBn="উন্নয়নের যাত্রা" titleEn="Published milestones, presented with context." titleBn="প্রকাশিত মাইলফলক, যথাযথ প্রেক্ষাপটে।" />
              <EditorialTimeline items={achievements.slice(0, 8)} />
              <Link className="section-link" href="/achievements">View the complete journey <ArrowRight size={15} /></Link>
            </Container>
          </section>
        ) : null}

        {news.length ? (
          <section className="site-section muted-section">
            <Container>
              <div className="section-title-row">
                <SectionHeader eyebrowEn="News & insights" eyebrowBn="সংবাদ ও অন্তর্দৃষ্টি" titleEn="Latest thinking and development notes." titleBn="সর্বশেষ ভাবনা ও উন্নয়ন নোট।" />
                <Link href="/news">All news <ArrowRight size={15} /></Link>
              </div>
              <div className="news-editorial-grid">
                {news.slice(0, 3).map((item, index) => <NewsCard key={item.id} item={item} lead={index === 0} />)}
              </div>
            </Container>
          </section>
        ) : null}

        {siteSettings.partnersVisible ? <PartnersSection partners={partners} /> : null}

        {siteSettings.founderVisible ? <section className="site-section">
          <Container className="founder-editorial">
            <FounderVisual imageUrl={founder.imageUrl} name={founderName} />
            <div>
              <span className="site-eyebrow"><BilingualText en="Founder" bn="প্রতিষ্ঠাতা" /></span>
              <h2>{founderName}</h2>
              <p><BilingualText en={founder.roleEn} bn={founder.roleBn || founder.roleEn} /></p>
              <blockquote>
                “<BilingualText en={founder.philosophyEn || founder.summaryEn} bn={founder.philosophyBn || founder.summaryBn || founder.summaryEn} />”
              </blockquote>
              <Link className="site-button secondary" href="/founder">
                <BilingualText en="View founder profile" bn="প্রতিষ্ঠাতার প্রোফাইল দেখুন" /><ArrowRight size={15} />
              </Link>
            </div>
          </Container>
        </section> : null}

        <ContactSection text={contactText} />
      </main>
      <CorporateFooter />
    </>
  );
}
