import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIT | Rasel Innovation & Technology",
  description: "Rasel Innovation & Technology creates practical agricultural, engineering, software and research solutions from Bangladesh.",
  keywords: ["RIT", "agriculture technology", "engineering", "Bangladesh", "software", "innovation"],
  openGraph: { title: "Rasel Innovation & Technology (RIT)", description: "Practical innovation for a more capable future.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
