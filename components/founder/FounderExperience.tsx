import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileText,
  FlaskConical,
  Lightbulb,
  Mail,
  Quote,
  UserRound,
  Wrench,
} from "lucide-react";
import BilingualText from "@/components/site/BilingualText";
import Container from "@/components/site/Container";
import ProjectCard from "@/components/site/ProjectCard";
import type {
  Achievement,
  FounderProfile,
  Project,
  Resource,
  TimelineEvent,
} from "@/types/content";
import styles from "./FounderExperience.module.css";

type FounderExperienceProps = {
  founder: FounderProfile;
  projects: Project[];
  achievements: Achievement[];
  timeline: TimelineEvent[];
  resources: Resource[];
};

const knownBangla: Record<string, string> = {
  "Agricultural innovation": "কৃষি উদ্ভাবন",
  "Engineering concepts": "প্রকৌশল ধারণা",
  "Digital products": "ডিজিটাল পণ্য",
  "Engineering design": "প্রকৌশল নকশা",
  Prototyping: "প্রোটোটাইপ উন্নয়ন",
  Research: "গবেষণা",
  Software: "সফটওয়্যার",
};

function cleanList(values?: string[]) {
  return (values || []).map((value) => value.trim()).filter(Boolean);
}

function BanglaListLabel({ value }: { value: string }) {
  return <BilingualText en={value} bn={knownBangla[value] || value} />;
}

function UnpublishedState({
  titleEn,
  titleBn,
  textEn,
  textBn,
}: {
  titleEn: string;
  titleBn: string;
  textEn: string;
  textBn: string;
}) {
  return (
    <div className={styles.unpublished} role="status">
      <FileText aria-hidden="true" size={21} />
      <div>
        <strong><BilingualText en={titleEn} bn={titleBn} /></strong>
        <p><BilingualText en={textEn} bn={textBn} /></p>
      </div>
    </div>
  );
}

function formatDate(date?: string, year?: number, locale = "en") {
  if (date) {
    const parsed = new Date(`${date}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(parsed);
    }
  }
  return year ? new Intl.NumberFormat(locale).format(year) : locale === "bn" ? "প্রকাশিত মাইলফলক" : "Published milestone";
}

export default function FounderExperience({
  founder,
  projects,
  achievements,
  timeline,
  resources,
}: FounderExperienceProps) {
  const expertise = cleanList(founder.expertise);
  const publishedSkills = cleanList(founder.skills);
  const skills = publishedSkills.length ? publishedSkills : expertise;
  const researchInterests = cleanList(founder.researchInterests);
  const experience = cleanList(founder.experience);
  const awards = cleanList(founder.awards);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const visibleProjects = featuredProjects.length ? featuredProjects : projects.slice(0, 3);
  const brriExperience = experience.filter((item) => /\bBRRI\b|Bangladesh Rice Research Institute/i.test(item));
  const workshopExperience = experience.filter((item) => /research workshop|workshop|laboratory|\blab\b/i.test(item));
  const generalExperience = experience.filter(
    (item) => !brriExperience.includes(item) && !workshopExperience.includes(item),
  );

  const biographyEn = founder.contentEn?.trim()
    || `${founder.name} is the founder of Rasel Innovation & Technology. His published profile focuses on practical innovation across engineering and digital product development.`;
  const biographyBn = founder.contentBn?.trim()
    || `${founder.titleBn || "মো. রাসেল আহমেদ"} রাসেল ইনোভেশন অ্যান্ড টেকনোলজির প্রতিষ্ঠাতা। তাঁর প্রকাশিত প্রোফাইল প্রকৌশল ও ডিজিটাল পণ্য উন্নয়নে বাস্তবমুখী উদ্ভাবনের ওপর গুরুত্ব দেয়।`;
  const careerEn = founder.careerOverviewEn?.trim();
  const careerBn = founder.careerOverviewBn?.trim();

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="founder-page-title">
        <div className={styles.heroGridTexture} aria-hidden="true" />
        <Container className={styles.heroLayout}>
          <div className={styles.heroCopy}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/"><BilingualText en="Home" bn="হোম" /></Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page"><BilingualText en="Founder" bn="প্রতিষ্ঠাতা" /></span>
            </nav>
            <span className={styles.kicker}>
              <BilingualText en="Engineering leadership" bn="প্রকৌশল নেতৃত্ব" />
            </span>
            <h1 id="founder-page-title">
              <BilingualText en={founder.name} bn={founder.titleBn || founder.name} />
            </h1>
            <p className={styles.role}>
              <BilingualText en={founder.roleEn} bn={founder.roleBn || "প্রতিষ্ঠাতা"} />
              <span aria-hidden="true"> · </span>
              <BilingualText en="Rasel Innovation & Technology" bn="রাসেল ইনোভেশন অ্যান্ড টেকনোলজি" />
            </p>
            <p className={styles.intro}>
              <BilingualText en={founder.summaryEn} bn={founder.summaryBn || "রাসেল ইনোভেশন অ্যান্ড টেকনোলজির প্রতিষ্ঠাতা।"} />
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#biography">
                <BilingualText en="Explore profile" bn="প্রোফাইল দেখুন" />
                <ArrowDown size={17} aria-hidden="true" />
              </a>
              <Link className={styles.secondaryAction} href="/contact">
                <BilingualText en="Contact RIT" bn="RIT-এর সঙ্গে যোগাযোগ" />
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <nav className={styles.sectionNav} aria-label="Founder profile sections">
              <a href="#experience"><BilingualText en="Experience" bn="অভিজ্ঞতা" /></a>
              <a href="#projects"><BilingualText en="Projects" bn="প্রকল্প" /></a>
              <a href="#research"><BilingualText en="Research" bn="গবেষণা" /></a>
              <a href="#timeline"><BilingualText en="Timeline" bn="সময়রেখা" /></a>
            </nav>
          </div>

          <figure className={styles.portrait}>
            <div className={styles.portraitFrame}>
              {founder.imageUrl ? (
                <Image
                  src={founder.imageUrl}
                  alt={`${founder.name}, founder of Rasel Innovation & Technology`}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 820px) 88vw, (max-width: 1200px) 40vw, 470px"
                />
              ) : (
                <div
                  className={styles.portraitPlaceholder}
                  role="img"
                  aria-label={`${founder.name} portrait has not yet been published`}
                >
                  <UserRound size={76} strokeWidth={1.2} aria-hidden="true" />
                  <strong>RA</strong>
                  <small><BilingualText en="Portrait not yet published" bn="প্রতিকৃতি এখনো প্রকাশিত হয়নি" /></small>
                </div>
              )}
            </div>
            <figcaption>
              <span><BilingualText en="Published profile" bn="প্রকাশিত প্রোফাইল" /></span>
              <strong><BilingualText en={founder.name} bn={founder.titleBn || founder.name} /></strong>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section id="biography" className={styles.editorialSection} aria-labelledby="biography-title">
        <Container className={styles.editorialGrid}>
          <div>
            <span className={styles.sectionNumber}>01</span>
            <p className={styles.eyebrow}><BilingualText en="Biography" bn="জীবনী" /></p>
            <h2 id="biography-title">
              <BilingualText en="Leadership grounded in practical progress" bn="বাস্তব অগ্রগতিতে ভিত্তি করা নেতৃত্ব" />
            </h2>
          </div>
          <div className={styles.prose}>
            <p className={styles.lead}><BilingualText en={biographyEn} bn={biographyBn} /></p>
            <dl className={styles.profileFacts}>
              <div>
                <dt><BilingualText en="Current role" bn="বর্তমান ভূমিকা" /></dt>
                <dd><BilingualText en={founder.roleEn} bn={founder.roleBn || "প্রতিষ্ঠাতা"} /></dd>
              </div>
              <div>
                <dt><BilingualText en="Organization" bn="প্রতিষ্ঠান" /></dt>
                <dd><BilingualText en="Rasel Innovation & Technology" bn="রাসেল ইনোভেশন অ্যান্ড টেকনোলজি" /></dd>
              </div>
              <div>
                <dt><BilingualText en="Published focus" bn="প্রকাশিত কাজের ক্ষেত্র" /></dt>
                <dd>{expertise.length}<BilingualText en=" areas" bn="টি ক্ষেত্র" /></dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      <section className={styles.visionSection} aria-labelledby="vision-title">
        <Container className={styles.visionLayout}>
          <div className={styles.visionIcon} aria-hidden="true"><Quote size={30} /></div>
          <div>
            <p className={styles.eyebrow}><BilingualText en="Vision" bn="দৃষ্টিভঙ্গি" /></p>
            <h2 id="vision-title"><BilingualText en="Build carefully. Communicate honestly." bn="সযত্নে নির্মাণ, সততার সঙ্গে উপস্থাপন।" /></h2>
            <blockquote>
              “<BilingualText
                en={founder.philosophyEn || founder.summaryEn}
                bn={founder.philosophyBn || founder.summaryBn || "বাস্তব ধারণা অর্থবহ অগ্রগতি তৈরি করতে পারে।"}
              />”
            </blockquote>
          </div>
        </Container>
      </section>

      <section id="experience" className={styles.section} aria-labelledby="experience-title">
        <Container>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionNumber}>02</span>
              <p className={styles.eyebrow}><BilingualText en="Engineering experience" bn="প্রকৌশল অভিজ্ঞতা" /></p>
            </div>
            <div>
              <h2 id="experience-title"><BilingualText en="A profile built from published evidence" bn="প্রকাশিত তথ্যের ভিত্তিতে নির্মিত প্রোফাইল" /></h2>
              <p><BilingualText
                en="Career details appear only when they have been added to the verified public founder profile."
                bn="যাচাইকৃত জনসাধারণের প্রতিষ্ঠাতা প্রোফাইলে যোগ করা হলেই কর্মজীবনের তথ্য এখানে প্রদর্শিত হয়।"
              /></p>
            </div>
          </header>

          <div className={styles.experienceGrid}>
            <article className={styles.experienceCard}>
              <span className={styles.cardIcon}><Wrench size={22} aria-hidden="true" /></span>
              <p className={styles.cardLabel}><BilingualText en="Engineering experience" bn="প্রকৌশল অভিজ্ঞতা" /></p>
              <h3><BilingualText en="Practical engineering practice" bn="বাস্তবমুখী প্রকৌশল চর্চা" /></h3>
              {careerEn || generalExperience.length ? (
                <>
                  {careerEn ? <p><BilingualText en={careerEn} bn={careerBn || "বাংলা কর্মজীবন বিবরণ এখনো প্রকাশিত হয়নি।"} /></p> : null}
                  {generalExperience.length ? (
                    <ul>{generalExperience.map((item) => <li key={item}>{item}</li>)}</ul>
                  ) : null}
                </>
              ) : (
                <UnpublishedState
                  titleEn="Detailed experience not yet published"
                  titleBn="বিস্তারিত অভিজ্ঞতা এখনো প্রকাশিত নয়"
                  textEn="Verified roles, dates and responsibilities can be added through the founder profile."
                  textBn="যাচাইকৃত পদ, সময়কাল ও দায়িত্ব প্রতিষ্ঠাতা প্রোফাইলের মাধ্যমে যোগ করা যাবে।"
                />
              )}
            </article>

            <article className={styles.experienceCard}>
              <span className={styles.cardIcon}><Building2 size={22} aria-hidden="true" /></span>
              <p className={styles.cardLabel}><BilingualText en="BRRI career" bn="BRRI কর্মজীবন" /></p>
              <h3><BilingualText en="Bangladesh Rice Research Institute" bn="বাংলাদেশ ধান গবেষণা ইনস্টিটিউট" /></h3>
              {brriExperience.length ? (
                <ul>{brriExperience.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : (
                <UnpublishedState
                  titleEn="BRRI details awaiting publication"
                  titleBn="BRRI সম্পর্কিত তথ্য প্রকাশের অপেক্ষায়"
                  textEn="No verified BRRI role, dates or responsibilities are currently present in the public profile."
                  textBn="জনসাধারণের প্রোফাইলে বর্তমানে কোনো যাচাইকৃত BRRI পদ, সময়কাল বা দায়িত্ব প্রকাশিত নেই।"
                />
              )}
            </article>

            <article className={styles.experienceCard}>
              <span className={styles.cardIcon}><FlaskConical size={22} aria-hidden="true" /></span>
              <p className={styles.cardLabel}><BilingualText en="Research workshop" bn="গবেষণা কর্মশালা" /></p>
              <h3><BilingualText en="Workshop and laboratory practice" bn="কর্মশালা ও পরীক্ষাগার চর্চা" /></h3>
              {workshopExperience.length ? (
                <ul>{workshopExperience.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : (
                <UnpublishedState
                  titleEn="Workshop record not yet published"
                  titleBn="কর্মশালার তথ্য এখনো প্রকাশিত নয়"
                  textEn="Facilities, responsibilities and dates will appear only after source verification."
                  textBn="উৎস যাচাইয়ের পরেই স্থাপনা, দায়িত্ব ও সময়কালের তথ্য এখানে প্রকাশিত হবে।"
                />
              )}
            </article>
          </div>
        </Container>
      </section>

      <section id="projects" className={`${styles.section} ${styles.softSection}`} aria-labelledby="projects-title">
        <Container>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionNumber}>03</span>
              <p className={styles.eyebrow}><BilingualText en="Featured projects" bn="নির্বাচিত প্রকল্প" /></p>
            </div>
            <div>
              <h2 id="projects-title"><BilingualText en="Published work from the RIT portfolio" bn="RIT পোর্টফোলিওর প্রকাশিত কাজ" /></h2>
              <p><BilingualText
                en="These are published RIT projects. The page does not infer an individual role beyond the verified founder profile."
                bn="এগুলো RIT-এর প্রকাশিত প্রকল্প। যাচাইকৃত প্রতিষ্ঠাতা প্রোফাইলের বাইরে কোনো ব্যক্তিগত ভূমিকা অনুমান করা হয়নি।"
              /></p>
            </div>
          </header>
          {visibleProjects.length ? (
            <div className={styles.projectGrid}>
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} item={project} />
              ))}
            </div>
          ) : (
            <UnpublishedState
              titleEn="No published projects available"
              titleBn="কোনো প্রকাশিত প্রকল্প পাওয়া যায়নি"
              textEn="Verified projects will appear here after publication."
              textBn="যাচাইকৃত প্রকল্প প্রকাশের পর এখানে প্রদর্শিত হবে।"
            />
          )}
        </Container>
      </section>

      <section id="research" className={styles.section} aria-labelledby="research-title">
        <Container>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionNumber}>04</span>
              <p className={styles.eyebrow}><BilingualText en="Capabilities and inquiry" bn="সক্ষমতা ও অনুসন্ধান" /></p>
            </div>
            <div>
              <h2 id="research-title"><BilingualText en="Skills and research interests" bn="দক্ষতা ও গবেষণার আগ্রহ" /></h2>
              <p><BilingualText
                en="Only focus areas already present in the published profile are listed."
                bn="শুধু প্রকাশিত প্রোফাইলে থাকা কাজের ক্ষেত্রগুলো এখানে দেখানো হয়েছে।"
              /></p>
            </div>
          </header>
          <div className={styles.researchGrid}>
            <article className={styles.listPanel} aria-labelledby="skills-title">
              <span className={styles.panelIcon}><BriefcaseBusiness size={23} aria-hidden="true" /></span>
              <h3 id="skills-title"><BilingualText en="Skills and focus areas" bn="দক্ষতা ও কাজের ক্ষেত্র" /></h3>
              {skills.length ? (
                <ul className={styles.tagList}>
                  {skills.map((skill) => <li key={skill}><BanglaListLabel value={skill} /></li>)}
                </ul>
              ) : (
                <UnpublishedState
                  titleEn="Skills not yet published"
                  titleBn="দক্ষতা এখনো প্রকাশিত নয়"
                  textEn="Verified skill information can be added to the public profile."
                  textBn="যাচাইকৃত দক্ষতার তথ্য জনসাধারণের প্রোফাইলে যোগ করা যাবে।"
                />
              )}
            </article>
            <article className={styles.listPanel} aria-labelledby="interests-title">
              <span className={styles.panelIcon}><Lightbulb size={23} aria-hidden="true" /></span>
              <h3 id="interests-title"><BilingualText en="Research interests" bn="গবেষণার আগ্রহ" /></h3>
              {researchInterests.length ? (
                <ul className={styles.tagList}>
                  {researchInterests.map((interest) => <li key={interest}><BanglaListLabel value={interest} /></li>)}
                </ul>
              ) : (
                <UnpublishedState
                  titleEn="Research interests not yet published"
                  titleBn="গবেষণার আগ্রহ এখনো প্রকাশিত নয়"
                  textEn="No detailed research-interest list is currently present in the verified profile."
                  textBn="যাচাইকৃত প্রোফাইলে বর্তমানে গবেষণার আগ্রহের বিস্তারিত তালিকা নেই।"
                />
              )}
            </article>
          </div>
        </Container>
      </section>

      <section id="publications" className={`${styles.section} ${styles.publicationsSection}`} aria-labelledby="publications-title">
        <Container>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionNumber}>05</span>
              <p className={styles.eyebrow}><BilingualText en="Publications" bn="প্রকাশনা" /></p>
            </div>
            <div>
              <h2 id="publications-title"><BilingualText en="Verified documents and publications" bn="যাচাইকৃত নথি ও প্রকাশনা" /></h2>
              <p><BilingualText
                en="No patent, paper or authorship is claimed without a published source."
                bn="প্রকাশিত উৎস ছাড়া কোনো পেটেন্ট, গবেষণাপত্র বা লেখকত্বের দাবি করা হয় না।"
              /></p>
            </div>
          </header>
          {resources.length ? (
            <div className={styles.resourceGrid}>
              {resources.slice(0, 6).map((resource) => {
                const href = resource.fileUrl || resource.externalUrl;
                return (
                  <article key={resource.id} className={styles.resourceCard}>
                    <BookOpen size={23} aria-hidden="true" />
                    <span>{resource.category || "Published resource"}</span>
                    <h3><BilingualText en={resource.titleEn} bn={resource.titleBn || "প্রকাশিত রিসোর্স"} /></h3>
                    <p><BilingualText en={resource.summaryEn} bn={resource.summaryBn || "বাংলা সারসংক্ষেপ এখনো প্রকাশিত হয়নি।"} /></p>
                    {href ? <Link href={href} target="_blank" rel="noopener noreferrer"><BilingualText en="Open publication" bn="প্রকাশনা খুলুন" /><ArrowRight size={15} /></Link> : null}
                  </article>
                );
              })}
            </div>
          ) : (
            <UnpublishedState
              titleEn="No verified publications are available"
              titleBn="কোনো যাচাইকৃত প্রকাশনা পাওয়া যায়নি"
              textEn="Publication records and source links will be added here when they are ready for public release."
              textBn="জনসাধারণের জন্য প্রস্তুত হলে প্রকাশনার তথ্য ও উৎসের লিংক এখানে যোগ করা হবে।"
            />
          )}
        </Container>
      </section>

      <section id="achievements" className={styles.section} aria-labelledby="achievements-title">
        <Container>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionNumber}>06</span>
              <p className={styles.eyebrow}><BilingualText en="Achievements" bn="অর্জন" /></p>
            </div>
            <div>
              <h2 id="achievements-title"><BilingualText en="Published milestones, clearly scoped" bn="সুস্পষ্টভাবে প্রকাশিত মাইলফলক" /></h2>
              <p><BilingualText
                en="Organizational milestones are not presented as personal awards. Personal recognition appears only when verified and published."
                bn="প্রাতিষ্ঠানিক মাইলফলককে ব্যক্তিগত পুরস্কার হিসেবে উপস্থাপন করা হয় না। যাচাই ও প্রকাশের পরেই ব্যক্তিগত স্বীকৃতি দেখানো হয়।"
              /></p>
            </div>
          </header>
          {awards.length ? (
            <div className={styles.awardsNotice}>
              <Award size={22} aria-hidden="true" />
              <div>
                <strong><BilingualText en="Published recognitions" bn="প্রকাশিত স্বীকৃতি" /></strong>
                <ul>{awards.map((award) => <li key={award}>{award}</li>)}</ul>
              </div>
            </div>
          ) : null}
          {achievements.length ? (
            <ol className={styles.achievementGrid}>
              {achievements.slice(0, 6).map((achievement) => (
                <li key={achievement.id}>
                  <CheckCircle2 size={20} aria-hidden="true" />
                  <time>{achievement.year || "—"}</time>
                  <h3><BilingualText en={achievement.titleEn} bn={achievement.titleBn || "প্রকাশিত মাইলফলক"} /></h3>
                  <p><BilingualText en={achievement.summaryEn} bn={achievement.summaryBn || "বিস্তারিত বাংলা তথ্য এখনো প্রকাশিত হয়নি।"} /></p>
                </li>
              ))}
            </ol>
          ) : (
            <UnpublishedState
              titleEn="No verified achievements published"
              titleBn="কোনো যাচাইকৃত অর্জন প্রকাশিত হয়নি"
              textEn="Verified milestones will appear here when available."
              textBn="যাচাইকৃত মাইলফলক পাওয়া গেলে এখানে প্রদর্শিত হবে।"
            />
          )}
        </Container>
      </section>

      <section id="timeline" className={`${styles.section} ${styles.timelineSection}`} aria-labelledby="timeline-title">
        <Container>
          <header className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionNumber}>07</span>
              <p className={styles.eyebrow}><BilingualText en="Timeline" bn="সময়রেখা" /></p>
            </div>
            <div>
              <h2 id="timeline-title"><BilingualText en="A documented RIT journey" bn="RIT-এর নথিভুক্ত যাত্রা" /></h2>
              <p><BilingualText
                en="This public timeline records RIT milestones; it does not substitute for an unpublished personal career history."
                bn="এই জনসাধারণের সময়রেখায় RIT-এর মাইলফলক নথিভুক্ত; এটি অপ্রকাশিত ব্যক্তিগত কর্মজীবনের বিকল্প নয়।"
              /></p>
            </div>
          </header>
          {timeline.length ? (
            <ol className={styles.timeline}>
              {timeline.map((event) => {
                const eventDate = event.date || event.eventDate;
                return <li key={event.id}>
                  <span className={styles.timelineMarker} aria-hidden="true"><CalendarDays size={17} /></span>
                  <article>
                    <time dateTime={eventDate || String(event.year || "")}>
                      <BilingualText
                        en={formatDate(eventDate, event.year, "en")}
                        bn={formatDate(eventDate, event.year, "bn-BD")}
                      />
                    </time>
                    <h3><BilingualText en={event.titleEn} bn={event.titleBn || "প্রকাশিত ঘটনা"} /></h3>
                    <p><BilingualText en={event.summaryEn} bn={event.summaryBn || "বাংলা বিবরণ এখনো প্রকাশিত হয়নি।"} /></p>
                  </article>
                </li>;
              })}
            </ol>
          ) : (
            <UnpublishedState
              titleEn="Timeline not yet published"
              titleBn="সময়রেখা এখনো প্রকাশিত নয়"
              textEn="Verified dated events will appear here."
              textBn="যাচাইকৃত তারিখসহ ঘটনা এখানে প্রদর্শিত হবে।"
            />
          )}
        </Container>
      </section>

      <section className={styles.contactSection} aria-labelledby="founder-contact-title">
        <Container className={styles.contactLayout}>
          <div>
            <p className={styles.eyebrow}><BilingualText en="Contact RIT" bn="RIT-এর সঙ্গে যোগাযোগ" /></p>
            <h2 id="founder-contact-title"><BilingualText en="Start a focused engineering conversation" bn="প্রকৌশল নিয়ে লক্ষ্যভিত্তিক আলোচনা শুরু করুন" /></h2>
            <p><BilingualText
              en="Discuss a practical challenge, a product idea or a responsible collaboration with the RIT team."
              bn="RIT দলের সঙ্গে বাস্তব সমস্যা, পণ্যের ধারণা বা দায়িত্বশীল সহযোগিতা নিয়ে আলোচনা করুন।"
            /></p>
          </div>
          <Link className={styles.contactAction} href="/contact">
            <Mail size={18} aria-hidden="true" />
            <BilingualText en="Start a conversation" bn="আলোচনা শুরু করুন" />
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </div>
  );
}
