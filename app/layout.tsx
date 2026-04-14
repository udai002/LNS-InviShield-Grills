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
  description: "LNS InviShield Grills, we combine expertise, innovation, and a deep understanding of safety to offer the most reliable invisible grille systems on the market. With years of experience in the industry, we’ve helped hundreds of homeowners transform their spaces into safe yet open environments​",
  keywords:"Invisible grills in bangalore, invisible grills for balcony in Bangalore, safety grills near me, balcony safety nets in bangalore, invisible grills for windows, safety nets for balcony, safety nets for windows, staircase grills in Bangalore,"
}

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