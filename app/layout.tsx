import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/header";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Medialityc | Data-Driven Media Intelligence",
    template: "%s | Medialityc"
  },
  description: "Plataforma de inteligencia de medios y analítica avanzada que transforma datos en decisiones estratégicas para marketing, comunicación y reputación.",
  applicationName: "Medialityc",
  keywords: [
    "medialityc",
    "media intelligence",
    "monitorización medios",
    "social listening",
    "reputación de marca",
    "analítica de marketing",
    "datos en tiempo real",
    "PR insights"
  ],
  authors: [{ name: "Medialityc" }],
  creator: "Medialityc",
  publisher: "Medialityc",
  metadataBase: new URL("https://www.medialityc.com"),
  openGraph: {
    title: "Medialityc | Media Intelligence & Real-Time Insights",
    description: "Unifica monitoreo, analítica y reporting en una sola plataforma para decisiones más rápidas y precisas.",
    url: "https://www.medialityc.com",
    siteName: "Medialityc",
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Medialityc | Media Intelligence",
    description: "Analítica y monitoreo de medios en tiempo real.",
    creator: "@medialityc" // ajustar si existe
  },
  category: "analytics",
  generator: 'nextjs'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
