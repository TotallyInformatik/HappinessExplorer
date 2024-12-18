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

import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";






export const Header = ({}: {}) => {
  const [sidebar, setSidebar] = useState<boolean>(false)
  


  return (
    <header className={clsx(
      "w-screen overflow-hidden",

      "md:bg-background md:sticky md:top-0 md:left-0 md:z-40"
    )}>
      <div className={clsx(
        "md:p-2 flex justify-between"
      )}>
        <section className={clsx(
          "flex items-center gap-x-5",

          "",
        )}>

          <div className={clsx(
            "fixed top-0 left-0 right-0 w-screen p-2 z-50 flex items-center gap-x-5",
            sidebar ? "bg-transparent" : "bg-background",

            "md:static md:w-fit md:p-0",
          )}>
            <button onClick={() => (setSidebar(!sidebar))} className={clsx(
              "pl-2 z-50",

              "md:hidden",
            )}>
              <Menu/>
            </button>
            <Link href={"/"} className={clsx(
              "flex gap-x-4 ",
            )}>
              <Image
                src="/icons/logo_onLight.svg"
                alt="A globe with a smiling face and a sun."
                width={30}
                height={30}
                className={clsx(
                  "dark:hidden transition-all duration-150 ease-in-out",
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
                  "hidden dark:block transition-all duration-150 ease-in-out",
                  sidebar ? "translate-x-[5.5rem]" : "-translate-x-0",

                  "md:translate-x-0",
                )}
              />
              <h1 className={clsx(
                "text-2xl font-medium text-nowrap",
                "transition-transform duration-150 ease-in-out",
                sidebar ? "-translate-y-12" : "-translate-y-0",
              )}>
                Smiling Globe
              </h1>
            </Link>
          </div>

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
          <div onClick={() => setSidebar(false)} className={clsx(
            "fixed top-0 left-48 w-[calc(100%-12rem)] h-screen z-50 max-w-full",
            sidebar ? "block" : "hidden",

            "md:hidden md:static",
          )}/>
        </section>
        
        <section className={clsx(
          "fixed bottom-2 left-2 z-[51] translate-x-0 transition-transform duration-150 ease-in-out",
          sidebar ? "translate-x-0" : "-translate-x-48",

          "md:static md:translate-x-0"
        )}>
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
      <Separator className={clsx(
        "w-screen h-px bg-slate-300 dark:bg-slate-800 fixed top-12 z-50 transition-transform duration-250 ease-in-out delay-100",
        sidebar ? "translate-x-full invisible" : "translate-x-0 visible",

        "md:static"
      )}/>
    </header>
  )
} 