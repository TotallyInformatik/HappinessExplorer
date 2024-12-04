import type { Metadata } from "next";
import Image from "next/image";

import "./globals.css";
import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Link from "next/link";
import Head from "next/head";
import { cn } from "@/lib/utils";

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
        <header className="w-[100%] h-auto overflow-x-auto no-scrollbar sticky top-0 bg-white z-50">
          <div className="flex w-auto items-center h-auto px-5 py-3 justify-between gap-x-10 gap-y-5 flex-wrap">
            <section className="flex items-center gap-x-10 gap-y-5 flex-wrap">
              <Link href="/" className="flex items-center gap-4 cursor-pointer">
                <Image
                  src="/icons/logo_onLight.svg"
                  alt="A globe with a smiling face and a sun."
                  width={30}
                  height={30}
                  className="dark:hidden"
                />
                <Image
                  src="/icons/logo_onDark.svg"
                  alt="A globe with a sleepy face and a moon."
                  width={30}
                  height={30}
                  className="hidden dark:block"
                />
                <h1 className="text-2xl font-medium text-nowrap">Smiling Globe</h1>
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/#world-map" className={cn(navigationMenuTriggerStyle(), "p-2")}>
                      World Map
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/compare" className={cn(navigationMenuTriggerStyle(), "p-2")}>
                      Compare
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/leaderboard" className={cn(navigationMenuTriggerStyle(), "p-2")}>
                      Leaderboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </section>
            <section className="flex items-center gap-4">
              <p>Language: </p>
              <Select defaultValue="en">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="English"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="en">English</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
          </div>
          <Separator className="w-screen h-px bg-slate-300"/>
        </header>
        <main>
          {children}
        </main>
        <footer>

        </footer>
      </body>
    </html>
  );
}
