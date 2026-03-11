import LayoutWrapper from "@/components/LayoutWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masum's Dental Clinic | An Exclusive Dental Solution",
  description: "Comprehensive dental care by Dr. Abdullah Al Masum. Expert in Oral Surgery, Dental Implants, and Aesthetic Dentistry in Chattogram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth font-sans">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased min-h-screen bg-slate-50 relative`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
