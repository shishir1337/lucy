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
  metadataBase: new URL('https://your-domain.com'), // Replace with your actual domain
  title: "ফারহানা হক লুসি - ক্ষতিগ্রস্তদের তথ্য সংগ্রহ",
  description: "ফারহানা আখতার লুসি এর  শিকার ব্যক্তিদের তথ্য সংগ্রহ এবং মোট ক্ষতির হিসাব",
  openGraph: {
    title: "ফারহানা হক লুসি  - ক্ষতিগ্রস্তদের তথ্য সংগ্রহ",
    description: "ফারহানা আখতার লুসি এর  শিকার ব্যক্তিদের তথ্য সংগ্রহ এবং মোট ক্ষতির হিসাব",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ফারহানা হক লুসি ",
      },
    ],
    type: "website",
    locale: "bn_BD",
  },
  twitter: {
    card: "summary_large_image",
    title: "ফারহানা হক লুসি  - ক্ষতিগ্রস্তদের তথ্য সংগ্রহ",
    description: "ফারহানা আখতার লুসি এর  শিকার ব্যক্তিদের তথ্য সংগ্রহ এবং মোট ক্ষতির হিসাব",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
