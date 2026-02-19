import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import "./globals.css";
import { SessionProvider } from "./components/SessionProvider";
import { SaltAppProvider } from "./components/SaltProvider";
import { Analytics } from "./components/Analytics";

export const metadata: Metadata = {
  title: "Coord — B2B Sales Scheduling",
  description: "The scheduling layer built for complex B2B sales",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 — only injected when NEXT_PUBLIC_GA_ID is set */}
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="antialiased">
        <SaltAppProvider>
          <SessionProvider>
            {/* Route-change pageview tracker — Suspense required for useSearchParams */}
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            {children}
          </SessionProvider>
        </SaltAppProvider>
      </body>
    </html>
  );
}
