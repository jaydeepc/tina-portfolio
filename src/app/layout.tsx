import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./sections.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tina Maria Thomas — Tech Lead · Full-Stack Developer · AI Accelerator",
  description:
    "Building reliable software faster — with tests first, always. The cinematic portfolio of Tina Maria Thomas, Tech Lead & Full Stack Developer at Thoughtworks. Test-first builder. AI accelerator. Open-source contributor.",
  keywords: [
    "Tina Maria Thomas",
    "Tech Lead",
    "Full Stack Developer",
    "Thoughtworks",
    "AI Acceleration",
    "Test-Driven Development",
    "Contract Testing",
    "Open Source",
  ],
  openGraph: {
    title: "Tina Maria Thomas — The Test-First Builder",
    description:
      "I build intelligent systems, lead teams, and ship reliable software faster — with tests first, always.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070409",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
