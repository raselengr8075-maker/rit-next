import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/site/Container";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Hisab Khata Terms of Service",
  "Terms of Service for the Hisab Khata mobile application by Rasel Innovation.",
  "/terms/hisab-khata"
);

export default function Page() {
  return (
    <>
      <PageHeader />

      <main id="main-content">
        <PageHero
          eyebrowEn="Hisab Khata"
          eyebrowBn="হিসাব খাতা"
          titleEn="Terms of Service"
          titleBn="ব্যবহারের শর্তাবলি"
          textEn="Terms and conditions for using the Hisab Khata mobile application provided by Rasel Innovation."
          textBn="Rasel Innovation কর্তৃক পরিচালিত হিসাব খাতা মোবাইল অ্যাপ ব্যবহারের শর্তাবলি।"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Terms", href: "/terms" },
            { label: "Hisab Khata" },
          ]}
        />

        <article className="site-section legal">
          <Container>
            <p>
              <strong>Last Updated:</strong> September 10, 2026
            </p>

            <p>
              Welcome to <strong>Hisab Khata</strong>, a mobile application
              provided by Rasel Innovation. By downloading, accessing, or
              using Hisab Khata, you agree to these Terms of Service.
            </p>

            <h2>1. Use of the Application</h2>
            <p>
              Hisab Khata is designed to help users record, organize, and
              manage customer and transaction-related information. You agree
              to use the application only for lawful purposes.
            </p>

            <h2>2. User Responsibility</h2>
            <p>
              You are responsible for the accuracy of information entered
              into the application, maintaining the security of your account
              or login credentials, using customer or third-party information
              lawfully, and maintaining appropriate records or backups where
              necessary.
            </p>

            <h2>3. Financial Records</h2>
            <p>
              Hisab Khata is a record-keeping and account management tool.
              Information provided or displayed by the application should not
              be considered professional financial, accounting, tax, or legal
              advice. Users should independently verify important financial
              records when necessary.
            </p>

            <h2>4. Account and Data</h2>
            <p>
              Users are responsible for information entered through their
              account. You should not enter information that you do not have
              the right or lawful authority to use.
            </p>

            <h2>5. Application Availability</h2>
            <p>
              Rasel Innovation works to keep Hisab Khata available and
              reliable. However, uninterrupted or error-free operation cannot
              be guaranteed. Features may be updated, modified, added, or
              removed as the application develops.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>
              Certain application features may depend on third-party
              technology or services. Use of those services may also be
              subject to the respective provider&apos;s terms and policies.
            </p>

            <h2>7. Advertising</h2>
            <p>
              Hisab Khata may display advertisements provided through
              third-party advertising services. Advertising availability and
              content may vary.
            </p>

            <h2>8. Prohibited Use</h2>
            <p>
              You must not use Hisab Khata for illegal activities, attempt
              unauthorized access to application systems or services,
              interfere with normal application operation, misuse the
              application, or use it in a way that violates applicable laws
              or the rights of others.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              The Hisab Khata application, software, design, branding, and
              related materials are owned by or licensed to Rasel Innovation,
              except where otherwise stated.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              To the extent permitted by applicable law, Rasel Innovation
              will not be responsible for losses resulting from inaccurate
              information entered by users, misuse of the application, device
              failure, third-party service interruption, or circumstances
              outside our reasonable control.
            </p>

            <h2>11. Privacy</h2>
            <p>
              Use of Hisab Khata is also subject to the Hisab Khata Privacy
              Policy available on the Rasel Innovation website.
            </p>

            <h2>12. Changes to These Terms</h2>
            <p>
              We may update these Terms when necessary. The latest version
              will be published on this page with an updated revision date.
            </p>

            <h2>13. Contact</h2>
            <p>
              If you have questions regarding these Terms or the Hisab Khata
              application, please contact Rasel Innovation through our
              official website.
            </p>

            <p>
              <strong>Developer:</strong> Rasel Innovation
              <br />
              <strong>Country:</strong> Bangladesh
              <br />
              <strong>Website:</strong> raselinnovation.com
            </p>
          </Container>
        </article>
      </main>

      <Footer />
    </>
  );
}