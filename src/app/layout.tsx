import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { AuthProvider } from "@/components/shared/auth-provider";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ogImage =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3694eddf-e1d3-4524-97ed-be3ce7c07612/id-preview-0c53f299--d93c0f47-3e93-4491-b289-41260e053533.lovable.app-1784135126965.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ATS India — Automated Vehicle Fitness Testing",
    template: "%s — ATS India",
  },
  description:
    "Book a fully automated, VAHAN-integrated vehicle fitness test. 10-minute testing, government-approved, transparent results.",
  keywords: ["ATS", "automated testing station", "vehicle fitness", "VAHAN", "MoRTH", "brake test", "emission test", "India"],
  openGraph: {
    siteName: "ATS India Testing Services",
    type: "website",
    title: "ATS India — Automated Vehicle Fitness Testing",
    description:
      "Book a fully automated, VAHAN-integrated vehicle fitness test. 10-minute testing, government-approved, transparent results.",
    images: [{ url: ogImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS India — Automated Vehicle Fitness Testing",
    description:
      "Book a fully automated, VAHAN-integrated vehicle fitness test. 10-minute testing, government-approved, transparent results.",
    images: [ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
