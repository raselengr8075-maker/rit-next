'use client';

import { useEffect, useState } from "react";
import Logo from "./Logo";

type Lang = "en" | "bn";

const content = {
  en: {
    nav: ["Home","About","Divisions","Projects","Apps","News","Founder","Contact"],
    heroA: "Practical innovation",
    heroB: "for a better future",
    heroText: "Rasel Innovation & Technology connects agriculture, engineering, software and research to develop practical solutions for real-world needs.",
    aboutTitle: "A multidisciplinary technology brand from Bangladesh",
    aboutText: "RIT is being developed as a trusted platform for agricultural technology, engineering design, digital products and applied research.",
    divisions: "Core Divisions",
    projects: "Featured Projects",
    apps: "Mobile Applications",
    news: "News & Updates",
    founder: "Founder & Leadership",
    founderText: "Md. Rasel Ahmed is developing RIT as a platform for practical innovation in agriculture, engineering and digital technology.",
    contact: "Contact RIT",
    send: "Send Message",
  },
  bn: {
    nav: ["হোম","পরিচিতি","বিভাগসমূহ","প্রকল্প","অ্যাপস","সংবাদ","প্রতিষ্ঠাতা","যোগাযোগ"],
    heroA: "বাস্তবমুখী উদ্ভাবন",
    heroB: "উন্নত ভবিষ্যতের জন্য",
    heroText: "রাসেল ইনোভেশন অ্যান্ড টেকনোলজি কৃষি, প্রকৌশল, সফটওয়্যার ও গবেষণাকে যুক্ত করে বাস্তব সমস্যার কার্যকর সমাধান তৈরি করে।",
    aboutTitle: "বাংলাদেশের একটি বহুমুখী প্রযুক্তি ব্র্যান্ড",
    aboutText: "আরআইটি কৃষি প্রযুক্তি, প্রকৌশল নকশা, ডিজিটাল পণ্য ও প্রয়োগমূলক গবেষণার একটি বিশ্বস্ত প্ল্যাটফর্ম হিসেবে গড়ে উঠছে।",
    divisions: "মূল বিভাগসমূহ",
    projects: "নির্বাচিত প্রকল্প",
    apps: "মোবাইল অ্যাপ্লিকেশন",
    news: "সংবাদ ও আপডেট",
    founder: "প্রতিষ্ঠাতা ও নেতৃত্ব",
    founderText: "মো. রাসেল আহমেদ কৃষি, প্রকৌশল ও ডিজিটাল প্রযুক্তিতে বাস্তবমুখী উদ্ভাবনের প্ল্যাটফর্ম হিসেবে আরআইটি গড়ে তুলছেন।",
    contact: "আরআইটির সঙ্গে যোগাযোগ",
    send: "বার্তা পাঠান",
  },
};

const divisions = [
  ["🌾","RIT Agro","Agricultural machinery, grain processing and smart farming.","কৃষিযন্ত্র, শস্য প্রক্রিয়াজাতকরণ ও স্মার্ট কৃষি।"],
  ["⚙️","RIT Engineering","Machine concepts, fabrication and engineering design.","মেশিন ধারণা, ফ্যাব্রিকেশন ও প্রকৌশল নকশা।"],
  ["📱","RIT Apps","Useful apps for business, agriculture and education.","ব্যবসা, কৃষি ও শিক্ষার জন্য কার্যকর অ্যাপ।"],
  ["🧪","RIT Research","Prototype development, testing and applied research.","প্রোটোটাইপ উন্নয়ন, পরীক্ষা ও প্রয়োগমূলক গবেষণা।"],
];

const projects = [
  ["Grain Drying Technology","শস্য শুকানোর প্রযুক্তি"],
  ["Vacuum Paddy Collector","ভ্যাকুয়াম ধান সংগ্রাহক"],
  ["Smart Seed Systems","স্মার্ট বীজ ব্যবস্থা"],
];

const apps = [
  ["হি","হিসাব খাতা"],
  ["কৃ","কৃষি বন্ধু"],
  ["নূ","নূরানী শিশু"],
];

export default function SiteClient() {
  const [lang,setLang] = useState<Lang>("en");
  const [dark,setDark] = useState(false);
  const [menu,setMenu] = useState(false);
  const t = content[lang];

  useEffect(() => {
    setLang((localStorage.getItem("rit-lang") as Lang) || "en");
    setDark(localStorage.getItem("rit-theme") === "dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("rit-lang", lang);
    localStorage.setItem("rit-theme", dark ? "dark" : "light");
  }, [lang, dark]);

  return (
    <>
      <header className="header">
        <div className="container nav">
          <a href="#home"><Logo /></a>
          <button className="menuBtn" onClick={() => setMenu(!menu)}>☰</button>
          <nav className={menu ? "open" : ""}>
            {["home","about","divisions","projects","apps","news","founder","contact"].map((id,i) =>
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{t.nav[i]}</a>
            )}
            <button onClick={() => setLang(lang === "en" ? "bn" : "en")}>{lang === "en" ? "বাংলা" : "English"}</button>
            <button onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container heroGrid">
            <div>
              <span className="tag">Agriculture • Engineering • Software • Research</span>
              <h1>{t.heroA}<br/><em>{t.heroB}</em></h1>
              <p>{t.heroText}</p>
              <div className="actions">
                <a className="btn primary" href="#about">{lang === "en" ? "Explore RIT" : "আরআইটি সম্পর্কে জানুন"}</a>
                <a className="btn secondary" href="#contact">{lang === "en" ? "Contact Us" : "যোগাযোগ করুন"}</a>
              </div>
            </div>
            <div className="heroCard"><Logo compact /><b>Innovating Today, Building Tomorrow</b></div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container split">
            <div><span className="tag">About RIT</span><h2>{t.aboutTitle}</h2></div>
            <p className="lead">{t.aboutText}</p>
          </div>
        </section>

        <section className="section shade" id="divisions">
          <div className="container"><span className="tag">{t.divisions}</span><h2>{t.divisions}</h2>
            <div className="grid four">{divisions.map(d =>
              <article className="card" key={d[1]}><div className="icon">{d[0]}</div><h3>{d[1]}</h3><p>{lang === "en" ? d[2] : d[3]}</p></article>
            )}</div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container"><span className="tag">{t.projects}</span><h2>{t.projects}</h2>
            <div className="grid three">{projects.map((p,i) =>
              <article className="project" key={p[0]}><span>0{i+1}</span><h3>{lang === "en" ? p[0] : p[1]}</h3><p>{lang === "en" ? "Practical solution under development." : "উন্নয়নাধীন বাস্তবমুখী সমাধান।"}</p></article>
            )}</div>
          </div>
        </section>

        <section className="section shade" id="apps">
          <div className="container"><span className="tag">{t.apps}</span><h2>{t.apps}</h2>
            <div className="grid three">{apps.map(a =>
              <article className="appCard" key={a[1]}><div className="appIcon">{a[0]}</div><div><h3>{a[1]}</h3><p>{lang === "en" ? "A useful digital product from RIT Apps." : "আরআইটি অ্যাপসের একটি কার্যকর ডিজিটাল পণ্য।"}</p></div></article>
            )}</div>
          </div>
        </section>

        <section className="section" id="news">
          <div className="container"><span className="tag">{t.news}</span><h2>{t.news}</h2>
            <div className="grid three">
              {["Corporate Website Launched","App Portfolio Expanding","Research Ideas in Progress"].map((n,i) =>
                <article className="newsCard" key={n}><span>RIT Update</span><h3>{lang === "en" ? n : ["কর্পোরেট ওয়েবসাইট চালু","অ্যাপ পোর্টফোলিও সম্প্রসারণ","গবেষণা ধারণা উন্নয়নাধীন"][i]}</h3></article>
              )}
            </div>
          </div>
        </section>

        <section className="section founder" id="founder">
          <div className="container founderGrid">
            <div className="avatar">MR</div>
            <div><span className="tag light">{t.founder}</span><h2>{t.founder}</h2><h3>Md. Rasel Ahmed</h3><p>{t.founderText}</p></div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contactGrid">
            <div><span className="tag">{t.contact}</span><h2>{t.contact}</h2>
              <p><b>Company:</b> Rasel Innovation & Technology (RIT)</p>
              <p><b>Location:</b> Bangladesh</p>
              <p><b>Email:</b> info@example.com</p>
              <p><b>Phone:</b> +880 1XXX-XXXXXX</p>
            </div>
            <form className="form" onSubmit={e => e.preventDefault()}>
              <label>{lang === "en" ? "Your Name" : "আপনার নাম"}<input required /></label>
              <label>{lang === "en" ? "Phone or Email" : "ফোন বা ইমেইল"}<input required /></label>
              <label>{lang === "en" ? "Message" : "বার্তা"}<textarea rows={5} required /></label>
              <button className="btn primary">{t.send}</button>
            </form>
          </div>
        </section>
      </main>

      <footer><div className="container footer"><b>Rasel Innovation & Technology (RIT)</b><span>© {new Date().getFullYear()} RIT</span></div></footer>
    </>
  );
}
