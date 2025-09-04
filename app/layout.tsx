import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://prettyplease.vercel.app/'), // Replace with your actual domain
  title: "ফারহনা হক লুসি - ক্ষতিগ্রস্তদের তথ্য সংগ্রহ",
  description: "ফারহনা হক লুসি এর  শিকার ব্যক্তিদের তথ্য সংগ্রহ এবং মোট ক্ষতির হিসাব",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
