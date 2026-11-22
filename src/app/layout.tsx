import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Human Civilization Atlas", template: "%s | Human Civilization Atlas" },
  description: "Explore the civilizations, people, books, and ideas that shaped our world.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body className="min-h-screen bg-stone-50 text-slate-900 antialiased"><Header /><main>{children}</main><Footer /></body></html>;
}
