"use client"

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Menu } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "../ThemeToggle";

import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";





// Header component with responsiveness implemented for small devices (sidebar)
export const Header = ({}: {}) => {
  // whether sidebar is closed or open on small devices
  const [sidebar, setSidebar] = useState<boolean>(false)
  


  return (
    <header className={clsx(
      "w-screen overflow-hidden",

      "md:bg-background md:sticky md:top-0 md:left-0 md:z-40"
    )}>
      {/* 
      On Large devices:
        Simple separation of navigation and language selection using flex and justify-content:between 
      On Small devices:
        Only 'open sidebar button' and website title (including icon), the rest is per default hidden
      */}
      <div className={clsx(
        "md:p-2 flex justify-between"
      )}>
        
        {/* 
        This section contains the 'open sidebar button', the website title (including icon) and the navigation menu
        */}
        <section className={clsx(
          "flex items-center gap-x-5",

          "",
        )}>
          <div className={clsx(
            "fixed top-0 left-0 right-0 w-screen p-2 z-50 flex items-center gap-x-5",
            sidebar ? "bg-transparent" : "bg-background",

            "md:static md:w-fit md:p-0",
          )}>
            {/* open sidebar button (hidden on larger devices) */}
            <button onClick={() => (setSidebar(!sidebar))} className={clsx(
              "pl-2 z-50",

              "md:hidden",
            )}>
              <Menu/>
            </button>
            <Link href={"/"} className={clsx(
              "flex gap-x-4 ",
            )}>
              {/* Website icon (dark and light version) hidden resp. visible depending on current theme of page */}
              <Image
                src="/icons/logo_onLight.svg"
                alt="A globe with a smiling face and a sun."
                width={30}
                height={30}
                className={clsx(
                  "dark:hidden transition-all duration-150 ease-in-out h-auto",
                  sidebar ? "translate-x-[5.5rem]" : "translate-x-0",

                  "md:translate-x-0",
                )}
              />
              <Image
                src="/icons/logo_onDark.svg"
                alt="A globe with a sleepy face and a moon."
                width={30}
                height={30}
                className={clsx(
                  "hidden dark:block transition-all duration-150 ease-in-out h-auto",
                  sidebar ? "translate-x-[5.5rem]" : "-translate-x-0",

                  "md:translate-x-0",
                )}
              />
              {/* website title/name (moves outside view when sidebar is opened) */}
              <h1 className={clsx(
                "text-2xl font-medium text-nowrap",
                "transition-transform duration-150 ease-in-out",
                sidebar ? "-translate-y-12" : "-translate-y-0",

                "md:translate-y-0"
              )}>
                Smiling Globe
              </h1>
            </Link>
          </div>

          {/* 
          This div contains the navigation menu
          Using NavigationMenu component of shadcn/ui
          On small devices:
            Navigation menu is hidden outside view (then sliding in with transition when sidebar is opened)
          */}
          <div className={clsx(
            "fixed top-0 left-0 pt-12 w-48 bg-background h-screen z-40 shadow-2xl",
            "transition-transform duration-150 ease-in-out",
            sidebar ? "translate-x-0" : "-translate-x-full",

            "md:static md:translate-x-0 md:w-fit md:pt-0 md:bg-transparent md:h-fit md:shadow-none",
          )}>
            <NavigationMenu className={clsx(
              "w-full [&>div]:w-full",

              "md:w-fit md:[&>div]:w-fit"
            )}>
              <NavigationMenuList className={clsx(
                "flex-col p-2 items-start w-full",

                "md:flex-row md:p-0 md:w-fit"
              )}>
                <NavigationMenuItem className={clsx(
                  "border-t-[1px] border-slate-300 dark:border-slate-800 w-full [&>a]:w-full [&>a]:justify-start",

                  "md:border-0 md:w-fit md:[&>a]:w-fit"
                )}>
                  <NavigationMenuLink href="/#world-map" className={clsx(navigationMenuTriggerStyle(), "p-2", {"bg-transparent": sidebar})}>
                    World Map
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className={clsx(
                  "border-t-[1px] border-slate-300 dark:border-slate-800 w-full [&>a]:w-full [&>a]:justify-start",

                  "md:border-0 md:w-fit md:[&>a]:w-fit"
                )}>
                  <NavigationMenuLink href="/compare" className={clsx(navigationMenuTriggerStyle(), "p-2", {"bg-transparent": sidebar})}>
                    Compare
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem className={clsx(
                  "border-y-[1px] border-slate-300 dark:border-slate-800 w-full [&>a]:w-full [&>a]:justify-start",

                  "md:border-0 md:w-fit md:[&>a]:w-fit"
                )}>
                  <NavigationMenuLink href="/leaderboard" className={clsx(navigationMenuTriggerStyle(), "p-2", {"bg-transparent": sidebar})}>
                    Leaderboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* div to be able to click beside the sidebar to close it */}
          <div onClick={() => setSidebar(false)} className={clsx(
            "fixed top-0 left-48 w-[calc(100%-12rem)] h-screen z-50 max-w-full",
            sidebar ? "block" : "hidden",

            "md:hidden md:static",
          )}/>
        </section>
        

        {/* This section contains the language and theme selection */}
        <section className={clsx(
          "fixed bottom-2 left-2 z-[51] transition-transform duration-150 ease-in-out",
          sidebar ? "translate-x-0" : "-translate-x-48",

          "md:static md:translate-x-0",
          "flex flex-col md:flex-row gap-5"
        )}>
          <ThemeToggle></ThemeToggle>
          {/*
          Using shadcn/ui component
          */}
          <Select defaultValue="en">
            <SelectTrigger className="w-[11rem]">
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
      {/* separator for visual clarity (separator below header) */}
      <Separator className={clsx(
        "w-screen h-px bg-slate-300 dark:bg-slate-800 fixed top-12 z-50 transition-transform duration-250 ease-in-out delay-100",
        sidebar ? "translate-x-full invisible" : "translate-x-0 visible",

        "md:static"
      )}/>
    </header>
  )
} 