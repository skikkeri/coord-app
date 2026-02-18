import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "./components/SessionProvider";

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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
