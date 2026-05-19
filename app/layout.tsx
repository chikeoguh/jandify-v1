import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
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
    <html lang="en" className={`${poppins.variable} ${openSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900" style={{ fontFamily: "var(--font-open-sans), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
