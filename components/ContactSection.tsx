"use client";

import { FormEvent, useEffect, useState } from "react";
import type { SiteText } from "./SiteClient";
import BilingualText from "./site/BilingualText";

const inquiryTypes = [
  { value: "general", en: "General inquiry", bn: "সাধারণ অনুসন্ধান" },
  { value: "project", en: "Project consultation", bn: "প্রকল্প পরামর্শ" },
  { value: "partnership", en: "Partnership / collaboration", bn: "অংশীদারত্ব / সহযোগিতা" },
  { value: "app-support", en: "Application support", bn: "অ্যাপ্লিকেশন সহায়তা" },
] as const;

export default function ContactSection({ text: t }: { text: SiteText }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [locale, setLocale] = useState<"en" | "bn">("en");

  useEffect(() => {
    const updateLocale = () => setLocale(document.documentElement.dataset.language === "bn" ? "bn" : "en");
    updateLocale();
    const observer = new MutationObserver(updateLocale);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-language"] });
    return () => observer.disconnect();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    const form = event.currentTarget;
    const data: Record<string, unknown> = Object.fromEntries(new FormData(form));
    data.consent = data.consent === "on";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(locale === "bn" ? (result.errorBn || result.error) : (result.error || "Unable to send"));
      }
      setMessage(locale === "bn" ? (result.messageBn || t.success) : (result.message || t.success));
      setState("success");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : locale === "bn" ? "আবার চেষ্টা করুন।" : "Please retry.");
      setState("error");
    }
  }

  return (
    <section className="section site-contact" id="contact">
      <div className="site-container contactGrid">
        <div className="contact-intro">
          <div className="section-heading">
            <span className="site-eyebrow"><BilingualText en="Contact RIT" bn="RIT-এর সঙ্গে যোগাযোগ" /></span>
            <h2><BilingualText en={t.contact} bn="লক্ষ্যভিত্তিক আলোচনা শুরু করুন" /></h2>
          </div>
          <p className="lead">
            <BilingualText
              en="Tell us what you are trying to solve. We will review the scope and respond when the contact service is configured."
              bn="আপনি কী সমাধান করতে চান তা জানান। যোগাযোগ সেবা কনফিগার করা থাকলে আমরা পরিধি পর্যালোচনা করে উত্তর দেব।"
            />
          </p>
          <p className="privacy-note">
            <BilingualText
              en="Your submission is used only to respond to your inquiry. See our privacy notice for details."
              bn="আপনার তথ্য শুধু অনুসন্ধানের উত্তর দেওয়ার জন্য ব্যবহৃত হয়। বিস্তারিত গোপনীয়তা নীতিতে দেখুন।"
            />
          </p>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          <div className="form-row">
            <label><BilingualText en="Your name" bn="আপনার নাম" /><input name="name" required minLength={2} maxLength={100} /></label>
            <label><BilingualText en="Email address" bn="ইমেইল" /><input name="email" type="email" required maxLength={200} /></label>
          </div>
          <div className="form-row">
            <label><BilingualText en="Phone (optional)" bn="ফোন (ঐচ্ছিক)" /><input name="phone" inputMode="tel" maxLength={40} /></label>
            <label><BilingualText en="Organization (optional)" bn="প্রতিষ্ঠান (ঐচ্ছিক)" /><input name="organization" maxLength={150} /></label>
          </div>
          <label>
            <BilingualText en="Inquiry type" bn="অনুসন্ধানের ধরন" />
            <select name="inquiryType" required defaultValue="general">
              {inquiryTypes.map((item) => <option key={item.value} value={item.value}>{item[locale]}</option>)}
            </select>
          </label>
          <label><BilingualText en="Subject" bn="বিষয়" /><input name="subject" required minLength={2} maxLength={150} /></label>
          <label><BilingualText en="How can we help?" bn="আমরা কীভাবে সহায়তা করতে পারি?" /><textarea name="message" rows={5} required minLength={10} maxLength={5000} /></label>
          <label className="consent">
            <input name="consent" type="checkbox" required />
            <span><BilingualText en="I agree that RIT may use this information to respond to my inquiry." bn="আমার অনুসন্ধানের উত্তর দিতে RIT এই তথ্য ব্যবহার করতে পারে—আমি সম্মতি দিচ্ছি।" /></span>
          </label>
          <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <button className="btn primary" type="submit" disabled={state === "loading"}>
            {state === "loading"
              ? <BilingualText en="Sending…" bn="পাঠানো হচ্ছে…" />
              : <><BilingualText en={t.send} bn="অনুসন্ধান পাঠান" /> →</>}
          </button>
          {state !== "idle" && state !== "loading" ? (
            <p className={state === "success" ? "success" : "formError"} role="status" aria-live="polite">{message}</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
