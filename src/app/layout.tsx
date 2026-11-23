import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Human Civilization Atlas | Bản đồ Văn minh Nhân loại", template: "%s | Human Civilization Atlas" },
  description: "Explore the civilizations, people, books, and ideas that shaped our world. Khám phá các nền văn minh, danh nhân, tác phẩm và tư tưởng định hình thế giới.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-stone-50 text-slate-900 antialiased">
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
