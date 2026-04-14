import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Provider";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LNS InviShield Grills",
  description: "LNS InviShield Grills...",
  keywords: "Invisible grills in bangalore...",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18089747395"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18089747395');
          `}
        </Script>

        <AuthProvider>
          <Providers>
            {children}
          </Providers>
        </AuthProvider>

      </body>
    </html>
  );
}