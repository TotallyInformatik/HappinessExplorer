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
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { useState } from "react";






export const Header = ({}: {}) => {
  const [sidebar, setSidebar] = useState<boolean>(false)

  return (<>
    <header 
      className={clsx(
        "sticky top-0 w-full h-full z-50",
        "md:sticky md:bg-white md:h-auto md:overflow-x-auto md:no-scrollbar md:z-50"
    )}>
      <div className={clsx(
        "",
        "md:flex md:flex-wrap md:flex-row md:w-auto md:items-center md:h-auto md:justify-between md:gap-x-5 md:gap-y-5 md:px-5 md:py-3 ",
      )}>
        <section className={clsx(
          "absolute top-0 z-50 w-screen h-auto flex gap-x-5 p-2",
          "md:relative md:top-auto md:w-auto md:flex md:items-center md:gap-x-10 md:gap-y-5 md:flex-wrap",
          {
            "bg-transparent": sidebar,
            "bg-white": !sidebar
          }
        )}>
          <button className="md:hidden" onClick={() => (setSidebar(!sidebar))}>
            <Menu/>
          </button>
          <Link href="/" className="flex items-center gap-4 cursor-pointer">
            <Image
              src="/icons/logo_onLight.svg"
              alt="A globe with a smiling face and a sun."
              width={30}
              height={30}
              className={clsx(
                "dark:hidden transition-all duration-150 ease-in-out",
                "md:translate-x-0",
                {
                  "translate-x-24": sidebar
                }
              )}
            />
            <Image
              src="/icons/logo_onDark.svg"
              alt="A globe with a sleepy face and a moon."
              width={30}
              height={30}
              className={clsx(
                "hidden dark:block transition-all duration-150 ease-in-out",
                "md:translate-x-0",
                {
                  "translate-x-24": sidebar
                }
              )}
            />
            <h1 className={clsx(
              "text-2xl font-medium text-nowrap",
              "transition-all duration-150 ease-in-out translate-y-0",
              "md:translate-y-0",
              {
                "-translate-y-10": sidebar
              }
            )}>Smiling Globe</h1>
          </Link>
        </section>
        <section className={clsx(
          "absolute pt-12 top-0 -translate-x-full transition-all duration-150 ease-in-out h-screen w-[196px] shadow-2xl bg-slate-100 z-40",
          "md:relative md:pt-0 md:w-fit md:top-auto md:left-auto md:translate-x-0 md:flex md:items-center md:gap-x-10 md:gap-y-5 md:flex-wrap md:h-auto md:shadow-none md:bg-transparent",
          {
            "translate-x-0": sidebar,
          }
        )}>
          
          <NavigationMenu className={clsx(
            "md:inline-flex",
            {
              "inline-flex": sidebar
            }
          )}>
            <NavigationMenuList className={clsx(
              "flex-col p-2 items-start",
              "md:flex-row md:p-0"
            )}>
              <NavigationMenuItem className={cn({"ml-1": sidebar})}>
                <NavigationMenuLink href="/#world-map" className={cn(navigationMenuTriggerStyle(), "p-2", {"bg-transparent": sidebar})}>
                  World Map
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/compare" className={cn(navigationMenuTriggerStyle(), "p-2", {"bg-transparent": sidebar})}>
                  Compare
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/leaderboard" className={cn(navigationMenuTriggerStyle(), "p-2", {"bg-transparent": sidebar})}>
                  Leaderboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {/* div to be able to click beside the sidebar to close it */}
          <div 
            onClick={() => setSidebar(false)}
            className={clsx(
              "fixed top-0 block w-screen h-full",
              "md:hidden",
              {
                "left-[196px]": sidebar,
                "hidden": !sidebar
              }
          )}></div>
        </section>
        <section className={clsx(
          "absolute bottom-0 -translate-x-48 z-50 transition-all duration-150 ease-in-out m-2",
          "md:relative md:bottom-auto md:left-auto md:translate-x-0 md:flex md:items-center md:gap-4 md:visible md:m-0",
          {
            "translate-x-0": sidebar,
          }
        )}>
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
      <Separator className={clsx(
        "w-screen h-px bg-slate-300 absolute top-12 z-50 translate-x-0 transition-transform duration-250 ease-in-out delay-100 visible",
        "md:visible md:relative md:top-auto md:bottom-0 md:translate-x-0",
        {
          "translate-x-full invisible": sidebar
        }
      )}/>
    </header>
  </>)
} 