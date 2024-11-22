import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Separator } from "@radix-ui/react-separator";
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
                <svg fill="#000000" width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <g id="Planet_sustainability">
                  <path d="M254.09,114.26c-78.18,0-141.78,63.61-141.78,141.79s63.6,141.79,141.78,141.79,141.79-63.61,141.79-141.79S332.28,114.26,254.09,114.26ZM130.31,256.05A123,123,0,0,1,146,195.77a87.75,87.75,0,0,0,45.81,12.46c42.14,0,76.3-27.8,76.3-62.08a51.19,51.19,0,0,0-1.77-13.29A124,124,0,0,1,377.58,247.39c-21,3.06-52.52,13.8-62.11,46.75-11,37.75-62.24,20.81-70.57,85.36A124,124,0,0,1,130.31,256.05Z"/>
                  <path d="M254.68,306.74c19.1,0,27.68-13.23,30-23.41a4.66,4.66,0,0,0-4.54-5.72h-51a4.66,4.66,0,0,0-4.54,5.72C227,293.51,235.59,306.74,254.68,306.74Z"/>
                  <path d="M214.75,236.59a12.77,12.77,0,1,0,12.76,12.77A12.77,12.77,0,0,0,214.75,236.59Z"/>
                  <path d="M294.62,262.13a12.77,12.77,0,1,0-12.77-12.77A12.77,12.77,0,0,0,294.62,262.13Z"/>
                  <path d="M404.15,404.18A210.8,210.8,0,0,0,450,180.41C407.9,72.21,285.61,18.43,177.4,60.54l6.53,16.78c99-38.51,210.79,10.66,249.3,109.62a192.77,192.77,0,0,1-42,204.68l-12.8-12.47a9.51,9.51,0,0,0-16.15,6.94l.48,33.89a9.51,9.51,0,0,0,9.62,9.37l33.89-.4a9.51,9.51,0,0,0,6.52-16.32Z"/>
                  <path d="M181.85,431a192.44,192.44,0,0,1-60-311l11.34,11a9.51,9.51,0,0,0,16.15-6.94l-.48-33.89a9.49,9.49,0,0,0-9.62-9.37l-33.89.4A9.51,9.51,0,0,0,98.8,97.58l10.13,9.87A210.53,210.53,0,0,0,335.69,451.07l-6.52-16.77A191.29,191.29,0,0,1,181.85,431Z"/>
                  </g>
                </svg>
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
