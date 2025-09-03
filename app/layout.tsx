import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

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
  title: "ফারহানা হক লুসি - ক্ষতিগ্রস্তদের তথ্য সংগ্রহ",
  description: "ফারহানা আখতার লুসি এর  শিকার ব্যক্তিদের তথ্য সংগ্রহ এবং মোট ক্ষতির হিসাব",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-B5L4W62GRW" />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B5L4W62GRW');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
