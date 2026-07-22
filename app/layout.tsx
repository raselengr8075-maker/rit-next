import type { Metadata } from "next";
import "./globals.css";
import "./phase3.css";
import "./assistant-local.css";
import "./admin-supabase.css";
import "./corporate.css";
import BackToTop from "@/components/site/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "RIT | Rasel Innovation & Technology", template: "%s | RIT" },
  description: "Rasel Innovation & Technology develops practical agricultural engineering, machinery, software and research solutions from Bangladesh.",
  keywords: ["RIT", "agriculture technology", "engineering", "Bangladesh", "software", "innovation"],
  openGraph: { title: "Rasel Innovation & Technology (RIT)", description: "Practical innovation for a more capable future.", type: "website" },
  twitter: { card: "summary_large_image", title: "Rasel Innovation & Technology", description: "Practical innovation for a more capable future." },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-language="en" suppressHydrationWarning><body><script dangerouslySetInnerHTML={{__html:`try{const l=localStorage.getItem('rit-lang')==='bn'?'bn':'en';document.documentElement.dataset.language=l;document.documentElement.lang=l;const d=localStorage.getItem('rit-theme')==='dark';document.documentElement.classList.toggle('dark',d);document.body.classList.toggle('dark',d)}catch(e){}`}}/>{children}<BackToTop/></body></html>;
}
