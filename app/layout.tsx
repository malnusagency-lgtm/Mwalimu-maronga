import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          {!isAdmin && <Navbar />}
          <main className={isAdmin ? "flex-1" : "flex-1 pt-16 md:pt-20"}>{children}</main>
          {!isAdmin && <Footer />}
        </LanguageProvider>
      </body>
    </html>
  );
}
