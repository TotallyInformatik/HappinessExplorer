import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";

import "./globals.css";
import Head from "next/head";
import { Header } from "@/components/ui/header";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Smiling Globe",
  description: "See how happy the world is.",
};


/**
 * @author Rui Zhang
 * @param children - these are the React Children that will be inserted into the layout 
 * @returns the layout for the website, which entails a header with the navigation menu
 */
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main className={clsx(
            "relative top-12",
            "md:top-0"
          )}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
