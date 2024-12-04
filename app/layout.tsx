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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Link from "next/link";

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
      <body>
        <header className="w-screen h-auto overflow-x-auto no-scrollbar">
          <div className="flex w-auto items-center h-auto px-5 py-3 justify-between gap-x-10 gap-y-5">
            <section className="flex items-center gap-x-10 gap-y-5">
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
                    <NavigationMenuLink href="/#worldmap" className={navigationMenuTriggerStyle()}>
                      World Map
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/compare" className={navigationMenuTriggerStyle()}>
                      Compare
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/leaderboard" className={navigationMenuTriggerStyle()}>
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
        </header>
        <Separator className="w-screen h-px bg-slate-300"/>
        <main>
          {children}
        </main>
        <footer>

        </footer>
      </body>
    </html>
  );
}
