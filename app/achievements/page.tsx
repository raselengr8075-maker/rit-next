import CorporateHeader from "@/components/site/CorporateHeader";
import CorporateFooter from "@/components/site/CorporateFooter";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/site/Container";
import SectionHeader from "@/components/site/SectionHeader";
import EditorialTimeline from "@/components/timeline/EditorialTimeline";
import { getAchievements } from "@/lib/content/achievements";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Achievements & Milestones",
  "A transparent record of verified RIT development milestones.",
  "/achievements",
);

export default async function Page() {
  const achievements = await getAchievements();
  return (
    <>
      <CorporateHeader />
      <main id="main-content">
        <PageHero
          eyebrowEn="Verified progress"
          eyebrowBn="যাচাইকৃত অগ্রগতি"
          titleEn="Milestones presented with evidence and context."
          titleBn="প্রমাণ ও প্রেক্ষাপটসহ উপস্থাপিত মাইলফলক।"
          textEn="A transparent record of organizational, engineering, software and research progress published by RIT."
          textBn="RIT কর্তৃক প্রকাশিত সাংগঠনিক, প্রকৌশল, সফটওয়্যার ও গবেষণা অগ্রগতির স্বচ্ছ নথি।"
          crumbs={[{ label: "Home", href: "/" }, { label: "Achievements" }]}
        />
        <section className="site-section">
          <Container>
            <SectionHeader
              eyebrowEn="Development journey"
              eyebrowBn="উন্নয়নের যাত্রা"
              titleEn="A chronological view of published progress."
              titleBn="প্রকাশিত অগ্রগতির কালানুক্রমিক চিত্র।"
              textEn="Filters organize the record without changing or inflating what has been published."
              textBn="ফিল্টার প্রকাশিত তথ্য পরিবর্তন বা অতিরঞ্জিত না করে নথিকে সাজায়।"
            />
            <EditorialTimeline items={achievements} />
          </Container>
        </section>
      </main>
      <CorporateFooter />
    </>
  );
}
