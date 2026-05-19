import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jandify Global – Study Abroad, Universities & Visa Guidance",
    template: "%s | Jandify Global",
  },
  description:
    "Find universities worldwide, explore study abroad programs, get visa guidance and free expert consultation. 10,000+ universities across 60+ countries.",
  keywords: [
    "study abroad",
    "universities abroad",
    "international student",
    "university search",
    "scholarship",
    "visa guidance",
    "bachelor master PhD",
    "Jandify Global",
  ],
  authors: [{ name: "Jandify Global" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Jandify Global",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://jandifyglobal.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
