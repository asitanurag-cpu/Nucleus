import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Nucleus — European VC Ecosystem Intelligence",
  description:
    "The intelligence core of European venture capital. Startup analysis, signal tracking, and VC landscape intelligence for investors and founders.",
  openGraph: {
    title: "Nucleus — European VC Ecosystem Intelligence",
    description:
      "Startup analysis, signal tracking, and VC landscape intelligence for investors and founders operating in Europe.",
    type: "website",
    locale: "en_GB",
    siteName: "Nucleus",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nucleus — European VC Ecosystem Intelligence",
    description:
      "Startup analysis, signal tracking, and VC landscape intelligence for investors and founders operating in Europe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-nucleus-black text-nucleus-text-primary font-body antialiased">
        <Navbar />
        <main className="min-h-[calc(100vh-160px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
