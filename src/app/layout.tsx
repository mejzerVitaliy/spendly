import { ReactNode } from "react";

import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";

import "./styles/global.css";
import { QueryProvider } from "@/shared/providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spendly",
  description:
    "Spendly is a personal finance app that helps you track your expenses and manage your budget effectively.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.className} ${lato.className}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-right" richColors duration={5000} closeButton />
      </body>
    </html>
  );
}
