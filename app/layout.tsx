import type { Metadata } from "next";

import "./globals.css";
import Head from "next/head";
import { Header } from "@/components/ui/header";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Smiling Globe",
  description: "See how happy the world is.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body>
        <Header/>
        <main className={clsx(
          "relative top-12",
          "md:top-0"
        )}>
          {children}
        </main>
        <footer>

        </footer>
      </body>
    </html>
  );
}
