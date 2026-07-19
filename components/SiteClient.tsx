'use client';

import { useEffect, useState } from "react";
import Logo from "./Logo";

type Lang = "en" | "bn";

const copy = {
  en: {
    nav: ["Home", "About", "Divisions", "Projects", "Apps", "Contact"],
    eyebrow: "Agriculture • Engineering • Digital Innovation",
    heroTitleA: "Innovating Today,",
    heroTitleB: "Building Tomorrow",
    heroText:
      "Rasel Innovation & Technology creates practical solutions in agricultural machinery, engineering design, mobile applications, research and smart technology.",
    explore: "Explore Our Work",
    contact: "Contact Us",
    trusted: ["Bangladesh Based", "Future Focused", "Practical Innovation"],
    aboutTag: "About RIT",
    aboutTitle: "One brand. Multiple innovation sectors.",
    aboutText:
      "RIT is being developed as a multidisciplinary technology brand connecting agriculture, engineering, software and research under one trusted platform.",
    divisionsTag: "Core Divisions",
    divisionsTitle: "Built to grow with your business",
    projectsTag: "Featured Projects",
    projectsTitle: "Practical ideas under development",
    appsTag: "Mobile Applications",
    appsTitle: "Digital products from RIT Apps",
    visionTag: "Our Vision",
    visionTitle: "Technology that improves real lives",
    visionText:
      "We aim to develop trusted solutions that support farmers, entrepreneurs, students and communities.",
    contactTag: "Contact",
    contactTitle: "Let’s build something useful",
    contactText:
      "Replace the sample phone, email and address with your official business information.",
    send: "Send Message",
    demo: "Thank you. We will connect this form to your real email in the next phase.",
  },
  bn: {
    nav: ["হোম", "আমাদের সম্পর্কে", "বিভাগসমূহ", "প্রকল্প", "অ্যাপস", "যোগাযোগ"],
    eyebrow: "কৃষি • প্রকৌশল • ডিজিটাল উদ্ভাবন",
    heroTitleA: "আজকের উদ্ভাবন,",
    heroTitleB: "আগামীর নির্মাণ",
    heroText:
      "রাসেল ইনোভেশন অ্যান্ড টেকনোলজি কৃষিযন্ত্র, প্রকৌশল নকশা, মোবাইল অ্যাপ, গবেষণা ও স্মার্ট প্রযুক্তিতে বাস্তবসম্মত সমাধান তৈরি করে।",
    explore: "আমাদের কাজ দেখুন",
    contact: "যোগাযোগ করুন",
    trusted: ["বাংলাদেশভিত্তিক", "ভবিষ্যতমুখী", "বাস্তব উদ্ভাবন"],
    aboutTag: "আরআইটি সম্পর্কে",
    aboutTitle: "একটি ব্র্যান্ড। উদ্ভাবনের একাধিক ক্ষেত্র।",
    aboutText:
      "আরআইটি একটি বহুমুখী প্রযুক্তি ব্র্যান্ড হিসেবে গড়ে উঠছে, যেখানে কৃষি, প্রকৌশল, সফটওয়্যার ও গবেষণাকে একটি বিশ্বস্ত প্ল্যাটফর্মে যুক্ত করা হবে।",
    divisionsTag: "মূল বিভাগসমূহ",
    divisionsTitle: "আপনার ব্যবসার সঙ্গে বিকশিত হওয়ার জন্য তৈরি",
    projectsTag: "নির্বাচিত প্রকল্প",
    projectsTitle: "উন্নয়নাধীন বাস্তবমুখী ধারণা",
    appsTag: "মোবাইল অ্যাপ্লিকেশন",
    appsTitle: "আরআইটি অ্যাপসের ডিজিটাল পণ্য",
    visionTag: "আমাদের ভিশন",
    visionTitle: "বাস্তব জীবন উন্নত করে এমন প্রযুক্তি",
    visionText:
      "আমরা কৃষক, উদ্যোক্তা, শিক্ষার্থী ও সমাজের জন্য বিশ্বস্ত প্রযুক্তি সমাধান তৈরি করতে চাই।",
    contactTag: "যোগাযোগ",
    contactTitle: "চলুন কার্যকর কিছু তৈরি করি",
    contactText:
      "নমুনা ফোন, ইমেইল ও ঠিকানার জায়গায় আপনার অফিসিয়াল ব্যবসায়িক তথ্য বসানো হবে।",
    send: "বার্তা পাঠান",
    demo: "ধন্যবাদ। পরবর্তী ধাপে ফর্মটি আপনার আসল ইমেইলের সঙ্গে যুক্ত করা হবে।",
  },
};

const divisions = [
  { icon: "🌾", title: "RIT Agro", en: "Agricultural machinery, grain processing and smart farming solutions.", bn: "কৃষিযন্ত্র, শস্য প্রক্রিয়াজাতকরণ ও স্মার্ট কৃষি সমাধান।" },
  { icon: "⚙️", title: "RIT Engineering", en: "Machine concepts, fabrication support and engineering design.", bn: "মেশিন ধারণা, ফ্যাব্রিকেশন সহায়তা ও প্রকৌশল নকশা।" },
  { icon: "📱", title: "RIT Apps", en: "Useful applications for accounting, agriculture, education and daily life.", bn: "হিসাব, কৃষি, শিক্ষা ও দৈনন্দিন জীবনের জন্য কার্যকর অ্যাপ।" },
  { icon: "🧪", title: "RIT Research", en: "Prototype development, testing, documentation and technology research.", bn: "প্রোটোটাইপ উন্নয়ন, পরীক্ষা, ডকুমেন্টেশন ও প্রযুক্তি গবেষণা।" },
];

const projects = [
  { no: "01", en: "Grain Drying Technology", bn: "শস্য শুকানোর প্রযুক্তি", enText: "Cost-effective drying, stirring and grain handling concepts.", bnText: "সাশ্রয়ী শুকানো, নাড়াচাড়া ও শস্য ব্যবস্থাপনার ধারণা।" },
  { no: "02", en: "Vacuum Paddy Collector", bn: "ভ্যাকুয়াম ধান সংগ্রাহক", enText: "A self-operated machine concept for collecting paddy from drying yards.", bnText: "চাতাল বা খলা থেকে ধান সংগ্রহের জন্য স্বচালিত মেশিন ধারণা।" },
  { no: "03", en: "Digital Business Tools", bn: "ডিজিটাল ব্যবসায়িক টুল", enText: "Mobile applications for simple, secure and accessible record keeping.", bnText: "সহজ, নিরাপদ ও ব্যবহারযোগ্য হিসাব সংরক্ষণের মোবাইল অ্যাপ।" },
];

const apps = [
  { icon: "হি", title: "হিসাব খাতা", en: "Personal and business transaction management.", bn: "ব্যক্তিগত ও ব্যবসায়িক লেনদেন ব্যবস্থাপনা।" },
  { icon: "কৃ", title: "কৃষি বন্ধু", en: "Useful agricultural information and services.", bn: "কৃষিবিষয়ক তথ্য ও প্রয়োজনীয় সেবা।" },
  { icon: "নূ", title: "নূরানী শিশু", en: "Fun Islamic learning for children.", bn: "শিশুদের আনন্দময় ইসলামিক শিক্ষা।" },
];

export default function SiteClient() {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedLang = (localStorage.getItem("rit-lang") as Lang) || "en";
    const storedTheme = localStorage.getItem("rit-theme") === "dark";
    setLang(storedLang);
    setDark(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("rit-lang", lang);
    localStorage.setItem("rit-theme", dark ? "dark" : "light");
  }, [lang, dark]);

  const t = copy[lang];

  return (
    <>
      <header className="header">
        <div className="container nav">
          <a href="#home"><Logo /></a>
          <button className="menuButton" onClick={() => setMenu(!menu)}>☰</button>
          <nav className={menu ? "open" : ""}>
            {["home","about","divisions","projects","apps","contact"].map((id, i) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{t.nav[i]}</a>
            ))}
            <button className="toolButton" onClick={() => setLang(lang === "en" ? "bn" : "en")}>
              {lang === "en" ? "বাংলা" : "English"}
            </button>
            <button className="toolButton" onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container heroGrid">
            <div className="heroCopy">
              <span className="eyebrow">{t.eyebrow}</span>
              <h1>{t.heroTitleA}<br/><em>{t.heroTitleB}</em></h1>
              <p>{t.heroText}</p>
              <div className="actions">
                <a className="button primary" href="#divisions">{t.explore}</a>
                <a className="button secondary" href="#contact">{t.contact}</a>
              </div>
              <div className="trust">
                {t.trusted.map(item => <span key={item}>✓ {item}</span>)}
              </div>
            </div>
            <div className="heroVisual">
              <div className="logoPanel"><Logo compact /></div>
              <div className="floating f1">🌾 RIT Agro</div>
              <div className="floating f2">⚙️ Engineering</div>
              <div className="floating f3">📱 RIT Apps</div>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container split">
            <div><span className="tag">{t.aboutTag}</span><h2>{t.aboutTitle}</h2></div>
            <p className="lead">{t.aboutText}</p>
          </div>
        </section>

        <section id="divisions" className="section shade">
          <div className="container">
            <div className="sectionHead"><span className="tag">{t.divisionsTag}</span><h2>{t.divisionsTitle}</h2></div>
            <div className="grid four">
              {divisions.map(item => (
                <article className="card" key={item.title}>
                  <div className="icon">{item.icon}</div><h3>{item.title}</h3><p>{item[lang]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="container">
            <div className="sectionHead"><span className="tag">{t.projectsTag}</span><h2>{t.projectsTitle}</h2></div>
            <div className="grid three">
              {projects.map(item => (
                <article className="project" key={item.no}>
                  <span>{item.no}</span><h3>{lang === "en" ? item.en : item.bn}</h3><p>{lang === "en" ? item.enText : item.bnText}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="apps" className="section shade">
          <div className="container">
            <div className="sectionHead"><span className="tag">{t.appsTag}</span><h2>{t.appsTitle}</h2></div>
            <div className="grid three">
              {apps.map(item => (
                <article className="appCard" key={item.title}>
                  <div className="appIcon">{item.icon}</div>
                  <div><h3>{item.title}</h3><p>{item[lang]}</p><small>{lang === "en" ? "In development" : "উন্নয়নাধীন"}</small></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section vision">
          <div className="container visionBox">
            <div><span className="tag light">{t.visionTag}</span><h2>{t.visionTitle}</h2><p>{t.visionText}</p></div>
            <a className="button white" href="#contact">{t.contact}</a>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container contactGrid">
            <div>
              <span className="tag">{t.contactTag}</span><h2>{t.contactTitle}</h2><p className="lead">{t.contactText}</p>
              <div className="contactInfo">
                <p><b>{lang === "en" ? "Company" : "প্রতিষ্ঠান"}</b><span>Rasel Innovation & Technology (RIT)</span></p>
                <p><b>{lang === "en" ? "Location" : "অবস্থান"}</b><span>Bangladesh</span></p>
                <p><b>{lang === "en" ? "Email" : "ইমেইল"}</b><span>info@example.com</span></p>
                <p><b>{lang === "en" ? "Phone" : "ফোন"}</b><span>+880 1XXX-XXXXXX</span></p>
              </div>
            </div>
            <form className="form" onSubmit={(e) => { e.preventDefault(); setMessage(t.demo); }}>
              <label>{lang === "en" ? "Your Name" : "আপনার নাম"}<input required /></label>
              <label>{lang === "en" ? "Phone or Email" : "ফোন বা ইমেইল"}<input required /></label>
              <label>{lang === "en" ? "Message" : "বার্তা"}<textarea rows={5} required /></label>
              <button className="button primary" type="submit">{t.send}</button>
              {message && <p className="status">{message}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer">
          <div><b>Rasel Innovation & Technology (RIT)</b><p>{lang === "en" ? "Innovating Today, Building Tomorrow." : "আজকের উদ্ভাবন, আগামীর নির্মাণ।"}</p></div>
          <p>© {new Date().getFullYear()} RIT</p>
        </div>
      </footer>
      <a className="whatsapp" href="https://wa.me/8801000000000" target="_blank" rel="noreferrer">💬</a>
    </>
  );
}
