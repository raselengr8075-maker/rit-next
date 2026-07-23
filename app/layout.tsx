import type { Metadata } from "next";
import "./globals.css";
import "./phase3.css";
import "./assistant-local.css";
import "./admin-supabase.css";
import "./corporate.css";

import BackToTop from "@/components/site/BackToTop";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.raselinnovation.com"
  ),

  title: {
    default: "RIT | Rasel Innovation & Technology",
    template: "%s | RIT",
  },

  description:
    "Rasel Innovation & Technology develops practical agricultural engineering, machinery, software and research solutions from Bangladesh.",

  keywords: [
    "RIT",
    "Rasel Innovation & Technology",
    "Agricultural Engineering",
    "Agricultural Machinery",
    "Bangladesh",
    "Research",
    "Innovation",
    "Software",
    "IoT",
    "Rice Technology",
    "Engineering",
  ],

  authors: [
    {
      name: "Md. Rasel Ahmed",
    },
  ],

  creator: "Md. Rasel Ahmed",

  publisher: "Rasel Innovation & Technology",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Rasel Innovation & Technology (RIT)",
    description:
      "Practical innovation for a more capable future.",
    url: "https://www.raselinnovation.com",
    siteName: "RIT",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rasel Innovation & Technology",
    description:
      "Practical innovation for a more capable future.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-language="en"
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try{
                const l=localStorage.getItem('rit-lang')==='bn'?'bn':'en';
                document.documentElement.dataset.language=l;
                document.documentElement.lang=l;

                const d=localStorage.getItem('rit-theme')==='dark';
                document.documentElement.classList.toggle('dark',d);
                document.body.classList.toggle('dark',d);
              }catch(e){}
            `,
          }}
        />

        {children}

        <BackToTop />

        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!}
        />
      </body>
    </html>
  );
}