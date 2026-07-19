import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rasel Innovation & Technology (RIT)",
  description:
    "Rasel Innovation & Technology — agriculture, engineering, software and research innovation from Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
