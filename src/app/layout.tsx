import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Symbio AI Academy — The Future of AI-Driven Secondary Education",
  description:
    "An innovative 100% AI-delivered high school (Grades 9–12) built on four core pillars: AI Mastery & Tech Literacy, Human Edge Skills, Ethics & Society, and Interdisciplinary Domains.",
  keywords: [
    "AI high school",
    "online academy",
    "artificial intelligence education",
    "Symbio AI Academy",
    "grades 9-12",
    "future-ready education",
  ],
  icons: {
    icon: "/symbio-logo.jpg",
    shortcut: "/symbio-logo.jpg",
    apple: "/symbio-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
