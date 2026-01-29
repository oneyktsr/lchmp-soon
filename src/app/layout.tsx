import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import { fontLausanne } from "@/config/fonts";
import SmoothScroll from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils/cn";
import "./globals.css";
import GridDebugger from "@/components/dev/grid-debugger";
import Preloader from "@/components/layout/preloader";
import Header from "@/components/layout/header";
import ScrollManager from "@/components/layout/scroll-manager";
import { LoadingProvider } from "@/context/loading-context";

export const viewport: Viewport = {
  themeColor: "#ebe7e1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: "Le Champ Studio",
      url: "https://le-champ.com",
    },
  ],
  creator: "Le Champ Studio",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "tr-TR": "/tr",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.defaultLocale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@lechampstudio",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.defaultLocale} suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground min-h-screen font-sans antialiased",
          fontLausanne.variable,
        )}
      >
        <LoadingProvider>
          <SmoothScroll>
            <ScrollManager />
            <Preloader />
            <Header />

            {/* DEĞİŞİKLİK BURADA: */}
            {/* Header dışarıda kaldı, sayfa içeriğini özel bir ID ile sarmaladık */}
            <div id="page-transition-container">{children}</div>
          </SmoothScroll>
        </LoadingProvider>

        <GridDebugger />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
