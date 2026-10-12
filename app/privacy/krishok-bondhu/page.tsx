import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/site/Container";
import { pageMetadata } from "@/lib/seo/metadata";

const contactEmail = "raselengr8075@gmail.com";

export const metadata = pageMetadata(
  "কৃষক বন্ধু Privacy Policy | Krishok Bondhu",
  "কৃষক বন্ধু (Krishok Bondhu) কৃষি প্রযুক্তি ও কৃষিতাত্ত্বিক তথ্যভিত্তিক অ্যাপের গোপনীয়তা নীতি।",
  "/privacy/krishok-bondhu"
);

export default function Page() {
  return (
    <>
      <PageHeader />

      <main id="main-content">
        <PageHero
          eyebrowEn="Krishok Bondhu"
          eyebrowBn="কৃষক বন্ধু"
          titleEn="Privacy Policy"
          titleBn="গোপনীয়তা নীতি"
          textEn="Privacy Policy for the independently published Krishok Bondhu agricultural information application."
          textBn="স্বতন্ত্রভাবে প্রকাশিত কৃষি প্রযুক্তি ও কৃষিতাত্ত্বিক তথ্যভিত্তিক কৃষক বন্ধু অ্যাপের গোপনীয়তা নীতি।"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "Privacy", href: "/privacy" },
            { label: "Krishok Bondhu" },
          ]}
        />

        <article className="site-section legal" lang="bn">
          <Container>
            <p>
              <strong>কার্যকর হওয়ার তারিখ (Effective date):</strong> 12 October
              2026
            </p>

            <p>
              এই গোপনীয়তা নীতি <strong>কৃষক বন্ধু (Krishok Bondhu)</strong>{" "}
              মোবাইল অ্যাপের ক্ষেত্রে প্রযোজ্য। অ্যাপটির package name হলো{" "}
              <code>com.rasel.krishi_bondhu</code>। কৃষক বন্ধু কৃষি প্রযুক্তি,
              কৃষিযন্ত্র ও কৃষিতাত্ত্বিক তথ্য উপস্থাপনের জন্য তৈরি একটি
              ব্যক্তিগতভাবে প্রকাশিত অ্যাপ। এটি কোনো সরকারি প্রতিষ্ঠান বা
              বাংলাদেশ ধান গবেষণা ইনস্টিটিউটের (BRRI) অফিসিয়াল অ্যাপ নয়।
            </p>

            <h2>1. অ্যাপ সরাসরি যে তথ্য সংগ্রহ করে</h2>
            <p>
              কৃষক বন্ধুর মূল তথ্যভিত্তিক কনটেন্ট ব্যবহার করার জন্য অ্যাপটি
              সরাসরি আপনার নাম, ইমেইল ঠিকানা, ফোন নম্বর, ডাক ঠিকানা, আর্থিক
              তথ্য বা সরকারি পরিচয়পত্রের তথ্য চায় না। অ্যাপটিতে ব্যবহারকারী
              অ্যাকাউন্ট তৈরি বা ব্যক্তিগত তথ্য জমা দেওয়ার ব্যবস্থা না থাকলে
              RIT এ ধরনের তথ্য সরাসরি সংগ্রহ করে না। আপনি ইমেইল বা ওয়েবসাইটের
              মাধ্যমে স্বেচ্ছায় যোগাযোগ করলে, আপনার পাঠানো তথ্য কেবল অনুরোধের
              উত্তর ও প্রয়োজনীয় সহায়তা দেওয়ার জন্য ব্যবহার করা হতে পারে।
            </p>

            <h2>2. বিজ্ঞাপন-সম্পর্কিত ও স্বয়ংক্রিয়ভাবে প্রক্রিয়াকৃত তথ্য</h2>
            <p>
              অ্যাপটিতে Google AdMob-এর Banner এবং Native বিজ্ঞাপন রয়েছে।
              বিজ্ঞাপন প্রদর্শন, পরিমাপ, জালিয়াতি প্রতিরোধ, নিরাপত্তা এবং
              বিজ্ঞাপন সেবার কার্যকারিতা বজায় রাখতে Google Mobile Ads SDK
              বিজ্ঞাপন আইডি, IP address, device identifiers, app interactions
              এবং diagnostic data প্রক্রিয়া করতে পারে। এই প্রক্রিয়াকরণ Google
              কর্তৃক পরিচালিত হয় এবং Google-এর প্রযোজ্য নীতি ও আপনার privacy
              choices-এর অধীন।
            </p>

            <h2>3. ব্যক্তিগতকৃত ও অ-ব্যক্তিগতকৃত বিজ্ঞাপন</h2>
            <p>
              আপনার অঞ্চল, সম্মতি, ডিভাইসের privacy settings এবং প্রযোজ্য
              আইনের ভিত্তিতে বিজ্ঞাপন ব্যক্তিগতকৃত (personalized) অথবা
              অ-ব্যক্তিগতকৃত (non-personalized) হতে পারে। ব্যক্তিগতকৃত
              বিজ্ঞাপনে আপনার আগ্রহ বা পূর্বের ব্যবহারসংক্রান্ত সংকেত ব্যবহৃত
              হতে পারে; অ-ব্যক্তিগতকৃত বিজ্ঞাপন সাধারণত সীমিত contextual তথ্য
              ব্যবহার করে প্রদর্শিত হয়।
            </p>

            <h2>4. Consent ও privacy choices</h2>
            <p>
              যেখানে প্রয়োজন, Google User Messaging Platform (UMP) ব্যবহার
              করে বিজ্ঞাপন ও সংশ্লিষ্ট data processing-এর জন্য আপনার সম্মতি
              বা privacy choice নেওয়া হবে। প্রদর্শিত consent message-এর মাধ্যমে
              আপনি প্রযোজ্য বিকল্প নির্বাচন করতে পারবেন। ডিভাইস বা Google
              account-এর বিজ্ঞাপন settings থেকেও কিছু পছন্দ নিয়ন্ত্রণ করা যেতে
              পারে। সম্মতি প্রত্যাহার বা পরিবর্তনের সুযোগ অ্যাপ বা consent
              interface-এ উপলভ্য থাকলে সেখান থেকে তা করা যাবে।
            </p>

            <h2>5. তৃতীয় পক্ষের সেবা</h2>
            <p>
              কৃষক বন্ধু Google AdMob এবং Google User Messaging Platform-এর
              মতো তৃতীয় পক্ষের সেবা ব্যবহার করে। এসব সেবা তাদের নিজস্ব
              গোপনীয়তা নীতি অনুযায়ী তথ্য প্রক্রিয়া করতে পারে। বিস্তারিত জানতে{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>{" "}
              এবং{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google-এর বিজ্ঞাপনসংক্রান্ত তথ্য
              </a>{" "}
              পর্যালোচনা করতে পারেন।
            </p>

            <h2>6. Cookies ও অনুরূপ প্রযুক্তি</h2>
            <p>
              মোবাইল অ্যাপটি প্রচলিত browser cookie সরাসরি ব্যবহার নাও করতে
              পারে। তবে Google Mobile Ads SDK এবং সংশ্লিষ্ট সেবা বিজ্ঞাপন
              প্রদান, frequency control, consent সংরক্ষণ, নিরাপত্তা ও পরিমাপের
              জন্য advertising identifiers, local storage, SDK data বা অনুরূপ
              প্রযুক্তি ব্যবহার করতে পারে।
            </p>

            <h2>7. তথ্য সংরক্ষণ</h2>
            <p>
              RIT সরাসরি পাওয়া যোগাযোগের তথ্য কেবল অনুরোধের উত্তর, নিরাপত্তা,
              বিরোধ নিষ্পত্তি বা প্রযোজ্য আইনগত প্রয়োজন পূরণের জন্য যতদিন
              যুক্তিসঙ্গতভাবে প্রয়োজন ততদিন সংরক্ষণ করতে পারে। বিজ্ঞাপন সেবার
              মাধ্যমে প্রক্রিয়াকৃত তথ্যের retention Google-এর নিজস্ব নীতি ও
              configuration অনুযায়ী পরিচালিত হয়।
            </p>

            <h2>8. তথ্যের নিরাপত্তা</h2>
            <p>
              আমাদের নিয়ন্ত্রণাধীন তথ্য সুরক্ষায় যুক্তিসঙ্গত প্রশাসনিক ও
              প্রযুক্তিগত ব্যবস্থা গ্রহণ করা হয়। তবে internet transmission,
              mobile device বা electronic storage-এর কোনো পদ্ধতিই সম্পূর্ণ
              নিরাপদ—এমন নিশ্চয়তা দেওয়া যায় না।
            </p>

            <h2>9. শিশুদের গোপনীয়তা</h2>
            <p>
              কৃষক বন্ধু 13 বছরের কম বয়সী শিশুদের লক্ষ্য করে তৈরি নয় এবং RIT
              জেনেশুনে তাদের ব্যক্তিগত তথ্য সরাসরি সংগ্রহ করে না। কোনো অভিভাবক
              মনে করলে যে শিশু আমাদের কাছে ব্যক্তিগত তথ্য পাঠিয়েছে, নিচের
              contact email-এ জানালে যাচাই করে প্রয়োজনীয় ব্যবস্থা নেওয়া হবে।
            </p>

            <h2>10. External links</h2>
            <p>
              কৃষক বন্ধুতে কৃষি, কৃষিযন্ত্র বা অন্যান্য তথ্যের জন্য বাইরের
              website বা service-এর link থাকতে পারে। ওই external service-এর
              content, security বা privacy practices RIT নিয়ন্ত্রণ করে না। কোনো
              link খোলার আগে সংশ্লিষ্ট সেবার গোপনীয়তা নীতি পর্যালোচনা করুন।
            </p>

            <h2>11. ব্যবহারকারীর অধিকার</h2>
            <p>
              প্রযোজ্য আইন অনুযায়ী আপনি আমাদের নিয়ন্ত্রণে থাকা আপনার ব্যক্তিগত
              তথ্য সম্পর্কে জানতে, সংশোধন করতে বা মুছে ফেলার অনুরোধ করতে পারেন।
              বিজ্ঞাপন consent ও personalization-এর পছন্দ UMP message, device
              settings অথবা Google-এর বিজ্ঞাপন settings থেকে পরিচালনা করা যেতে
              পারে। অনুরোধ যাচাই ও সম্পন্ন করার জন্য প্রয়োজনীয় সীমিত তথ্য চাওয়া
              হতে পারে।
            </p>

            <h2>12. এই নীতির পরিবর্তন</h2>
            <p>
              অ্যাপের feature, third-party service, data practice বা প্রযোজ্য
              প্রয়োজন পরিবর্তিত হলে এই Privacy Policy হালনাগাদ করা হতে পারে।
              পরিবর্তিত নীতি এই URL-এ প্রকাশ করা হবে এবং পেজের effective date
              সংশোধন করা হবে। গুরুত্বপূর্ণ পরিবর্তন হলে অ্যাপ বা website-এ
              উপযুক্তভাবে জানানো হতে পারে।
            </p>

            <h2>13. যোগাযোগ</h2>
            <p>
              কৃষক বন্ধু অথবা এই Privacy Policy সম্পর্কে প্রশ্ন, privacy
              request বা অভিযোগের জন্য যোগাযোগ করুন:
            </p>
            <p>
              <strong>অ্যাপ:</strong> কৃষক বন্ধু (Krishok Bondhu)
              <br />
              <strong>Package:</strong> <code>com.rasel.krishi_bondhu</code>
              <br />
              <strong>প্রকাশক:</strong> Rasel Innovation
              <br />
              <strong>ইমেইল:</strong>{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <br />
              <strong>Website:</strong>{" "}
              <a href="https://www.raselinnovation.com">
                www.raselinnovation.com
              </a>
            </p>
          </Container>
        </article>
      </main>

      <Footer />
    </>
  );
}
