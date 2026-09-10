import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/site/Container";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Hisab Khata User Data Deletion",
  "Instructions for requesting deletion of user data associated with the Hisab Khata mobile application.",
  "/data-deletion/hisab-khata"
);

export default function Page() {
  return (
    <>
      <PageHeader />

      <main id="main-content">
        <PageHero
          eyebrowEn="Hisab Khata"
          eyebrowBn="হিসাব খাতা"
          titleEn="User Data Deletion"
          titleBn="ব্যবহারকারীর তথ্য মুছে ফেলার নির্দেশনা"
          textEn="Instructions for requesting deletion of eligible account-related data associated with the Hisab Khata application."
          textBn="হিসাব খাতা অ্যাপের সঙ্গে সম্পর্কিত যোগ্য অ্যাকাউন্ট ও ব্যবহারকারীর তথ্য মুছে ফেলার অনুরোধের নির্দেশনা।"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Data Deletion" },
            { label: "Hisab Khata" },
          ]}
        />

        <article className="site-section legal">
          <Container>
            <p>
              <strong>Last Updated:</strong> September 10, 2026
            </p>

            <p>
              Rasel Innovation respects the privacy of users of the{" "}
              <strong>Hisab Khata</strong> mobile application. This page
              explains how users can request deletion of eligible
              account-related information associated with Hisab Khata.
            </p>

            <h2>1. How to Request Data Deletion</h2>
            <p>
              If you want to request deletion of your Hisab Khata account
              information and associated eligible data, please contact Rasel
              Innovation through the Contact page of our official website.
            </p>

            <p>
              When submitting your request, please clearly mention{" "}
              <strong>&quot;Hisab Khata Data Deletion Request&quot;</strong>{" "}
              and provide enough information for us to identify the relevant
              account.
            </p>

            <h2>2. Information to Include</h2>
            <p>
              Where applicable, please provide the phone number or email
              address associated with your Hisab Khata account. Do not send
              passwords, PINs, verification codes, or other sensitive login
              credentials.
            </p>

            <h2>3. Account Verification</h2>
            <p>
              For security and privacy protection, we may need to verify that
              the person requesting deletion is the owner of the relevant
              account before processing the request.
            </p>

            <h2>4. What Data May Be Deleted</h2>
            <p>
              After a valid request is verified, eligible account-related
              information and associated application data under our control
              may be deleted in accordance with applicable requirements and
              our technical capabilities.
            </p>

            <h2>5. Information That May Be Retained</h2>
            <p>
              Certain limited information may be retained when reasonably
              necessary for security, fraud prevention, dispute resolution,
              technical integrity, legal compliance, or other legitimate
              obligations.
            </p>

            <h2>6. Data Stored on Your Device</h2>
            <p>
              Information stored only on your device may need to be removed
              directly from the device. Depending on your device and
              application settings, this may include clearing Hisab Khata
              application data or uninstalling the application.
            </p>

            <h2>7. Contact Rasel Innovation</h2>
            <p>
              To submit a data deletion request, please use the Contact page
              on the Rasel Innovation website and identify your request as a
              Hisab Khata data deletion request.
            </p>

            <p>
              <strong>Developer:</strong> Rasel Innovation
              <br />
              <strong>Application:</strong> Hisab Khata (হিসাব খাতা)
              <br />
              <strong>Country:</strong> Bangladesh
              <br />
              <strong>Website:</strong> raselinnovation.com
              <br />
              <strong>Contact page:</strong> raselinnovation.com/contact
            </p>

            <h2>8. Processing of Requests</h2>
            <p>
              We will review verified deletion requests and take reasonable
              steps to process eligible deletion requests as appropriate.
              Users may be contacted if additional information is required to
              identify or verify the relevant account.
            </p>
          </Container>
        </article>
      </main>

      <Footer />
    </>
  );
}