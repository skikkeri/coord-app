import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./components/SessionProvider";
import { SaltAppProvider } from "./components/SaltProvider";

export const metadata: Metadata = {
  title: "Coord — B2B Sales Scheduling",
  description: "The scheduling layer built for complex B2B sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SaltAppProvider>
          <SessionProvider>{children}</SessionProvider>
        </SaltAppProvider>
      </body>
    </html>
  );
}
