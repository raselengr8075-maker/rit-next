import Container from "@/components/site/Container";
import SectionHeader from "@/components/site/SectionHeader";
import PartnerLogoCard from "@/components/partners/PartnerLogoCard";
import type { Partner } from "@/types/content";

export default function PartnersSection({ partners }: { partners: Partner[] }) {
  if (!partners.length) return null;
  return (
    <section id="verified-partners" className="site-section verified-partners-section" aria-labelledby="verified-partners-title">
      <Container>
        <SectionHeader
          eyebrowEn="Approved public relationships"
          eyebrowBn="অনুমোদিত প্রকাশ্য সম্পর্ক"
          titleEn="Organizations and collaborators"
          titleBn="সহযোগী প্রতিষ্ঠান ও সংগঠন"
          textEn="Only relationships approved for public display are listed."
          textBn="শুধু প্রকাশের অনুমোদনপ্রাপ্ত সম্পর্ক এখানে তালিকাভুক্ত।"
          titleId="verified-partners-title"
        />
        <div className="partner-logo-grid">{partners.map((partner) => <PartnerLogoCard key={partner.id} partner={partner} />)}</div>
      </Container>
    </section>
  );
}
