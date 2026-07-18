import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mwalimu Maronga | Premium Kiswahili Education",
    template: "%s | Mwalimu Maronga",
  },
  description:
    "Premium Kiswahili learning materials and personalized tutoring from a certified KCSE examiner. Shop PDFs, book 1-on-1 sessions, and master Kiswahili.",
  keywords: [
    "Kiswahili",
    "KCSE",
    "Kiswahili tutor",
    "Kiswahili notes",
    "Mwalimu Maronga",
    "Kenya education",
    "Set book analysis",
  ],
  authors: [{ name: "Mwalimu Maronga" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Mwalimu Maronga",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className={`antialiased min-h-screen flex flex-col overflow-x-hidden ${isAdmin ? "bg-[#0f1117]" : "bg-white"}`}>
        <LanguageProvider>
          {!isAdmin && <Navbar />}
          <main className={isAdmin ? "flex-1" : "flex-1 pt-16 md:pt-20"}>{children}</main>
          {!isAdmin && <Footer />}
        </LanguageProvider>
      </body>
    </html>
  );
}

