import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/site/Container";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Hisab Khata Privacy Policy",
  "Privacy Policy for the Hisab Khata mobile application by Rasel Innovation.",
  "/privacy/hisab-khata"
);

export default function Page() {
  return (
    <>
      <PageHeader />

      <main id="main-content">
        <PageHero
          eyebrowEn="Hisab Khata"
          eyebrowBn="হিসাব খাতা"
          titleEn="Privacy Policy"
          titleBn="গোপনীয়তা নীতি"
          textEn="Privacy Policy for the Hisab Khata mobile application provided by Rasel Innovation."
          textBn="Rasel Innovation কর্তৃক পরিচালিত হিসাব খাতা মোবাইল অ্যাপের গোপনীয়তা নীতি।"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy", href: "/privacy" },
            { label: "Hisab Khata" },
          ]}
        />

        <article className="site-section legal">
          <Container>
            <p>
              <strong>Last Updated:</strong> September 10, 2026
            </p>

            <p>
              Rasel Innovation (&quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) provides the <strong>Hisab Khata</strong> mobile
              application. This Privacy Policy explains how information may be
              collected, used, stored, and protected when you use the Hisab
              Khata application.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              Depending on the features you use, Hisab Khata may collect or
              process information necessary to provide the application&apos;s
              services. This may include account or login information,
              customer and transaction information entered by the user,
              device-related information, app usage information, diagnostic
              information, and advertising-related information where
              applicable.
            </p>

            <h2>2. Information Entered by Users</h2>
            <p>
              Users may enter customer names, transaction amounts, notes,
              dates, payment records, due amounts, and other account-related
              information into Hisab Khata. Users are responsible for ensuring
              that information they enter about other individuals is collected
              and used lawfully and appropriately.
            </p>

            <h2>3. How We Use Information</h2>
            <p>
              Information may be used to provide and maintain the application,
              manage user accounts and transactions, save and synchronize
              application data, improve performance and reliability, maintain
              security, prevent misuse, troubleshoot technical problems, and
              provide or measure advertising where applicable.
            </p>

            <h2>4. Data Storage and Synchronization</h2>
            <p>
              Hisab Khata may store application information locally on the
              user&apos;s device and may use cloud-based services for data
              synchronization, backup, authentication, or other application
              functionality where those features are enabled.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>
              Hisab Khata may use third-party technology and services required
              for application functionality, cloud services, authentication,
              diagnostics, advertising, or related operations. These service
              providers may process certain information according to their own
              privacy policies and applicable laws.
            </p>

            <h2>6. Advertising</h2>
            <p>
              Hisab Khata may display advertisements. Advertising service
              providers may process device identifiers, advertising
              identifiers, and other technical or usage information as
              permitted by applicable law and user consent requirements.
            </p>

            <h2>7. Data Security</h2>
            <p>
              We take reasonable administrative and technical measures to
              protect information handled through Hisab Khata. However, no
              method of electronic transmission or storage can be guaranteed
              to be completely secure.
            </p>

            <h2>8. Data Retention</h2>
            <p>
              Information may be retained for as long as reasonably necessary
              to provide application functionality, maintain security, comply
              with applicable obligations, and resolve legitimate technical
              or operational issues.
            </p>

            <h2>9. User Data Deletion</h2>
            <p>
              Users may request deletion of eligible account-related
              information associated with Hisab Khata. Detailed instructions
              for submitting a deletion request are available on our User Data
              Deletion page.
            </p>

            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Hisab Khata is not specifically designed for children under the
              age of 13. We do not knowingly seek to collect personal
              information from children under 13.
            </p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy when the application, our
              services, applicable requirements, or data practices change.
              The latest version will be published on this page with an
              updated revision date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or the Hisab
              Khata application, please contact Rasel Innovation through our
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