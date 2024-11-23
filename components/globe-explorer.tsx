"use client";
import { Separator } from '@/components/ui/separator';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue } from "@/components/ui/select";
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { ChevronsUpDown } from 'lucide-react';

interface MapPosition {
  coordinates: [number, number],
  zoom: number
};

interface CountryChangeEvent {
  country: string,
  report: string
}

interface GlobeExplorerProps { onCountryChange?: (e: CountryChangeEvent) => void }

const GlobeExplorer = ({ 
  onCountryChange 
} : GlobeExplorerProps) => {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


  // select a report has no external events, just changes the heatmap
  // select a country has an external event, the same as the country click event.
  // this event also tells which report is currently selected.
  // todo: heatmap

  const [report, setReport] = useState("");
  const [position, setPosition] = useState<MapPosition>({ coordinates: [0, 0], zoom: 1.3 });
  /*
  function handleZoom(event: React.WheelEvent<SVGSVGElement>) {

    if (event.shiftKey) {

      if (event.deltaX > 0) {
        position.zoom /= 1.1;
        setPosition({...position});
      }
      if (event.deltaX < 0) {
        position.zoom *= 1.1;
        setPosition({...position});
      }
    }

    console.log(position);

  }
    */

  return <>
    <section id='world-map'>
      <header className="w-screen h-auto overflow-x-auto no-scrollbar flex items-center px-5 py-3 justify-between gap-x-10 gap-y-5">
        <h3 className="text-2xl font-normal">Globe Explorer</h3>
        <section className='flex items-center h-full gap-10'>
          <Separator orientation='vertical' className='bg-slate-300 h-10'/>
          <Select value={report} onValueChange={setReport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a report"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Separator orientation='vertical' className='bg-slate-300 h-10'/>
          <section className='flex items-center gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between"
                >
                  <span className='font-normal opacity-90'>Select a country...</span>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search a country..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      { /* // todo */ }
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <span className='text-[14px] text-muted-foreground'>
              or press
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none text-[14px] font-medium text-muted-foreground items-center gap-1 rounded bg-muted px-1.5 font-mono opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </section>
        </section>
      </header>
      <Separator className="w-screen h-px bg-slate-300"/>
      <main className="w-full  aspect-[4/3] overflow-hidden bg-slate-200">
        {
          report == "" ? 
            <div className='w-full h-full flex items-center justify-center'>
              <p className="font-medium text-center">Select Report to View Map</p> 
            </div>
            : 
            <ComposableMap>
              <ZoomableGroup translateExtent={[[0, 65], [900, 535]]} minZoom={1.3} center={position.coordinates} zoom={position.zoom}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map(geo => (
                      <Geography 
                        
                        fill='black'
                        key={geo.rsmKey} 
                        geography={geo} 
                        onClick={(event) => {

                          event.preventDefault();
                          console.log(report);

                          if (onCountryChange) {
                            onCountryChange({
                              country: geo.properties.name,
                              report: report
                            });
                          }
                        }}
                      />
                    ))
                  }
                </Geographies> 
              </ZoomableGroup>
            </ComposableMap>
        }
      </main>
    </section>
  </>
};

export default GlobeExplorer;