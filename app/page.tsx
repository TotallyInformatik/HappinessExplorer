import dynamic from 'next/dynamic';
import React from 'react'; // This is the standard import
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator';
import { ArrowDown, Router } from 'lucide-react';
import GlobeExplorer from '@/components/globe-explorer/globe-explorer';
import { getCountriesByContinent, getListOfYears, Year } from '@/lib/db_interface';
import { useRouter } from 'next/navigation';
import VerySpecialButton from '@/components/globe-explorer/very-special-button';


export default async function Home() {

  const years: Year[] = await getListOfYears();

  return <>
    <section className="w-screen h-80 flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col items-center gap-14 p-4">
        <h2 className="text-4xl font-bold  text-center">A lens of joy for the world.</h2>
        <VerySpecialButton />
      </div>
    </section>
    <Separator className="w-screen h-px bg-slate-300"/>
    <GlobeExplorer years={years}/>
    <Separator className="w-screen h-px bg-slate-300"/>
    <section>
      <header className="w-screen h-auto overflow-x-auto no-scrollbar flex items-center px-5 py-3 justify-between gap-x-10 gap-y-5">
        <h3 className="text-2xl font-normal">Detail View</h3>
      </header>
      <Separator className="w-screen h-px bg-slate-300"/>
    </section>
  </>;
}
