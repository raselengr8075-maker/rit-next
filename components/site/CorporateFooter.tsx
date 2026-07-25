import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import RitAssistant from "@/components/assistant/RitAssistant";
import Container from "./Container";
import BilingualText from "./BilingualText";
import { getPublicSiteSettings } from "@/lib/content/site-settings";

const groups = [
  {
    title: "Company",
    titleBn: "প্রতিষ্ঠান",
    links: [["About RIT", "/about"], ["Founder", "/founder"], ["Achievements", "/achievements"], ["Contact", "/contact"]],
  },
  {
    title: "Work",
    titleBn: "কাজ",
    links: [["Divisions", "/divisions"], ["Services", "/services"], ["Projects", "/projects"], ["Applications", "/apps"], ["Research", "/research"]],
  },
  {
    title: "Resources",
    titleBn: "রিসোর্স",
    links: [["News & Insights", "/news"], ["Media & Gallery", "/gallery"], ["Downloads", "/resources"], ["Search", "/search"]],
  },
];

export default async function CorporateFooter() {
  const settings = await getPublicSiteSettings();
  return (
    <>
      <section className="corporate-footer-cta">
        <Container>
          <div>
            <span className="site-eyebrow"><BilingualText en="Work with RIT" bn="RIT-এর সঙ্গে কাজ করুন" /></span>
            <h2><BilingualText en="Have a practical problem worth solving?" bn="সমাধানযোগ্য কোনো বাস্তব সমস্যা আছে?" /></h2>
          </div>
          <div className="hero-actions">
            <Link className="site-button" href="/contact">
              <BilingualText en="Start a conversation" bn="আলোচনা শুরু করুন" /><ArrowUpRight size={17} />
            </Link>
            <Link className="hero-tertiary" href="/services">
              <BilingualText en="Explore capabilities" bn="সক্ষমতা দেখুন" />
            </Link>
          </div>
        </Container>
      </section>
      <footer className="corporate-footer">
        <Container>
          <div className="footer-grid">
            <div className="footer-brand">
              <Logo />
              <p>
                <BilingualText
                  en="Practical engineering and digital innovation developed responsibly from Bangladesh."
                  bn="বাংলাদেশ থেকে দায়িত্বশীলভাবে গড়া ব্যবহারিক প্রকৌশল ও ডিজিটাল উদ্ভাবন।"
                />
              </p>
              {settings.contactEmail || settings.phone || settings.address ? (
                <address className="footer-contact">
                  {settings.contactEmail ? <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a> : null}
                  {settings.phone ? <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>{settings.phone}</a> : null}
                  {settings.address ? <span>{settings.address}</span> : null}
                  {settings.workingHours ? <span>{settings.workingHours}</span> : null}
                </address>
              ) : null}
            </div>
            {groups.map((group) => (
              <div key={group.title}>
                <h2><BilingualText en={group.title} bn={group.titleBn} /></h2>
                {group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Rasel Innovation & Technology</span>
            <div>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/accessibility">Accessibility</Link>
              <Link href="/sitemap.xml">Sitemap</Link>
            </div>
            <span>Built and maintained by RIT</span>
          </div>
        </Container>
      </footer>
      {settings.assistantVisible ? <RitAssistant /> : null}
    </>
  );
}
