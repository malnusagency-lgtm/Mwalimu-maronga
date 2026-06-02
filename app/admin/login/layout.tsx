import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Admin Login | Mwalimu Maronga",
  description: "Secure admin login for the Mwalimu Maronga educational platform.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
