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
  title: "safety nets and balcony grills in puri, bhubaneswar, cuttack, balasore",
  description: " elishasafetynetsandinvisiblegrills offers Balcony safety nets, invisible grills, pigeon nets, mosquito nets & sports nets in Bhubaneswar, Cuttack, Puri, Berhampur, Rourkela & Odisha.",
  keywords:"Invisible grills in Puri, Bhubaneswar,cuttack ,balasore, invisible grills for balcony in Puri, Bhubaneswar,cuttack ,balasore, safety grills near me, balcony safety nets in Puri, Bhubaneswar,cuttack ,balasore, invisible grills for windows, safety nets for balcony, safety nets for windows, staircase grills in Puri, Bhubaneswar,cuttack ,balasore,"
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