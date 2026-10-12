import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
  weight:["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-serif-bengali",
});

export const metadata: Metadata = {
  title: {
    default: "আজকের বাজার-দর",
    template: "%s | আজকের বাজার-দর",
  },
  description:
    "বাংলাদেশের চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর দেখুন এক জায়গায়।",
  applicationName: "আজকের বাজার-দর",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" data-theme="light" data-scroll-behavior="smooth">
      <body
        className={`${notoSansBengali.className} flex min-h-screen flex-col bg-slate-100 antialiased`}
      >
        <main className="w-full flex-1">{children}</main>
      </body>
    </html>
  );
}
