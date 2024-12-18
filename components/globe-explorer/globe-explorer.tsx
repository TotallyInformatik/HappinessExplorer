"use client";
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { getAllCountries, getCountriesByContinent, getCountryData, MapCountries, Year } from '@/lib/db_interface';
import { cn, getCorrectCountryName } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, ZoomableGroup } from 'react-simple-maps';
import { Card, CardContent } from '../ui/card';
import CountryDetailsShort from './country-details-short';
import GeoCountry from './geo-country';

interface MapPosition {
  coordinates: [number, number],
  zoom: number
};

export interface GlobeSelection {
  country: string,
  report: string,
  countryId: number
}

interface GlobeExplorerProps { 
  onCountryChange?: (e: GlobeSelection) => void ,
  years: Year[]
}

type Countries = {
  label: string,
  value: string
}[]

export type CountryIDs = {
  [countryName: string]: number
}

/**
 * @author Rui Zhang
 * @param 
 * @returns 
 */
const GlobeExplorer = ({ 
  onCountryChange,
  years
} : GlobeExplorerProps) => {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


  // select a report has no external events, just changes the heatmap
  // select a country has an external event, the same as the country click event.
  // this event also tells which report is currently selected.
  
  const [report, setReport] = useState("");
  const [position] = useState<MapPosition>({ coordinates: [0, 0], zoom: 1.3 });
  const [open, setOpen] = React.useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countries, setCountries] = useState<Countries>([]);
  const [countryIDs, setCountryIDs] = useState<CountryIDs>({});
  const [rank, setRank] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [dataExists, setDataExists] = useState<boolean>(false);
  const [heatMapData, setHeatMapData] = useState<MapCountries | undefined>(undefined);
  const containerRef = useRef<HTMLElement | null>(null);
  
  function fetchCountries(yearValue: string) {
    getCountriesByContinent(parseInt(yearValue), "en").then((result) => {
      let allCountries: Countries = [];
      let newCountryData: CountryIDs = {};
      for (let continents of result) { 
        continents.countries.forEach((country) => {
          allCountries.push({
            label: country.countryName,
            value: country.countryName
          });
          newCountryData[country.countryName] = country.countryId;
        })
      }

      allCountries.sort((a, b) => {
        return a.label.localeCompare(b.label);
      });

      setCountries(allCountries);
      setCountryIDs(newCountryData);

    });

    getAllCountries(parseInt(yearValue)).then((result) => {
      setHeatMapData(result);
    })
  }


  useEffect(() => {

    const inputCountry = (event: KeyboardEvent) => {

      if (event.key == "k" && (event.ctrlKey || event.metaKey)) {
        setOpen(true);
        const element = document.querySelector(".searchBar");
        const clientRect = element?.getBoundingClientRect();
        const bodyRect = document.querySelector("body")?.getBoundingClientRect();
        window.scrollTo({
          top: (clientRect?.top || 0) - (bodyRect?.top || 0) - 100
        });
      }
    }

    window.addEventListener("keydown", inputCountry);

    return () => {
      window.removeEventListener("keydown", inputCountry);
    }
  }, [])

  useEffect(() => {
    if (years[0]) {
      const yearValue = years[0].year.toString();
      setReport(yearValue); 
      fetchCountries(yearValue);
    }
  }, [years])

  useEffect(() => {

    if (selectedCountry && report) {
      getCountryData(parseInt(report), countryIDs[selectedCountry])
        .then((result) => {
          if (result) {
            setRank(result.rank || 0);
            setScore(result.ladderScore || 0);
            setDataExists(true);
          } else {
            setDataExists(false);
          }
        })
    }

  }, [selectedCountry])


  useEffect(() => {
    const preventZoom = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault(); // Prevent zooming
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", preventZoom, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", preventZoom);
      }
    };
  }, []);

  const filterZoomEvent = (event: unknown): boolean => {
    if (event?.constructor?.name === "TouchEvent") {
      return true;
    } else if (event?.constructor?.name === "MouseEvent") {
      return true;
    } else if (event?.constructor?.name === "WheelEvent") {
      const e = event as WheelEvent
      if (e?.ctrlKey || e?.metaKey) {
        return true
      }
    }
    return false
  };


  return <>
    <section id='world-map'>
      <header className="w-screen h-auto overflow-x-auto no-scrollbar 
                        flex md:items-center px-5 py-3 justify-between gap-x-10 
                        gap-y-5 flex-col md:flex-row searchBar"
      >
        <h3 className="text-2xl font-normal">Globe Explorer</h3>
        <section className='flex md:items-center flex-col md:flex-row h-full gap-x-10 gap-y-2'>
          <Separator orientation='vertical' className='bg-slate-300 h-10 hidden md:block'/>
          <Select value={report} onValueChange={(value) => {
            setReport(value);
            setSelectedCountry("");
            fetchCountries(value);
          }}>
            <SelectTrigger className="w-[180px]" aria-label="Select a report (which year?). Selecting a report might load new data.">
              <SelectValue placeholder="Select a report"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {
                  years.map((year) => {
                    return <SelectItem key={year.year} value={year.year.toString()}>{year.year}</SelectItem>;
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <Separator orientation='vertical' className='bg-slate-300 h-10 hidden md:block'/>
          <section className='flex items-center gap-2'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild disabled={report == ""} aria-label='Select a country. Selecting a country will load detailed information about said country.'>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-[200px] justify-between"
                >
                  {selectedCountry != "" ? countries.find((country) => country.value === selectedCountry)?.label
                    : "Select Country..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search a country..." className="h-9" aria-label='Search for a country. Inputing text in this input field will cause the list of countries to be filtered.'/>
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          key={country.value}
                          value={country.value}
                          onSelect={(currentValue: any) => {
                            setSelectedCountry(currentValue === selectedCountry ? "" : currentValue)
                            setOpen(false)
                            if (onCountryChange) {
                              onCountryChange({
                                country: currentValue,
                                report: report,
                                countryId: countryIDs[currentValue]
                              });
                            }
                          }}
                        >
                          {country.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              selectedCountry === country.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <span className='text-[14px] text-muted-foreground text-nowrap'>
              or press
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none text-[14px] font-medium dark:text-slate-200 text-slate-800 items-center gap-1 rounded bg-slate-200 dark:bg-slate-800 px-1.5 font-mono opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </section>
        </section>
      </header>
      <Separator className="w-screen h-px bg-slate-300"/>
      <main className="w-full aspect-[4/3] overflow-hidden bg-slate-200 relative" ref={containerRef} aria-label='interactable map for country selection'>
        {
          report == "" ? 
            <div className='w-full h-full flex items-center justify-center'>
              <p className="font-medium text-center">Select Report to View Map</p> 
            </div>
            : 
            <>
              <ComposableMap 
                className="fill-background [&>g>rect]:dark:fill-slate-900 [&>g>rect]:fill-slate-200"
                onClick={() => {
                  setSelectedCountry("");
                }}>
                <ZoomableGroup translateExtent={[[-200, 65], [900, 540]]} minZoom={1.3} center={position.coordinates} zoom={position.zoom} filterZoomEvent={filterZoomEvent}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        
                        const correctName = getCorrectCountryName(geo);

                        let countryScore = undefined;
                        if (heatMapData && heatMapData[correctName] && heatMapData[correctName].ladderScore) {
                          countryScore = heatMapData[correctName].ladderScore || undefined;
                        } 

                        return <GeoCountry 
                          key={geo.rsmKey}
                          geo={geo}
                          score={countryScore}
                          countryIDs={countryIDs}
                          onCountryChange={onCountryChange}
                          setSelectedCountry={setSelectedCountry}
                          report={report}
                        />
                      })
                    }
                  </Geographies> 
                </ZoomableGroup>
              </ComposableMap>
              <div className="absolute top-2 left-2">
                {
                  selectedCountry != "" && <Card>
                      <CardContent className='px-5 w-[30vw] max-w-[400px] z-0 hidden md:block py-5'>
                        {
                          dataExists ? 
                            <CountryDetailsShort 
                              selected={selectedCountry != ""}
                              score={score}
                              report={report || ""}
                              selectedCountry={selectedCountry}
                              rank={rank}
                            /> : <div>
                              <p>No data available for {selectedCountry}</p>
                            </div>
                        }
                        <Separator className="w-full h-px bg-slate-300 block md:hidden"/>
                      </CardContent>
                </Card>
                }
              </div>
          </>
        }
      </main>
    </section>
    <div className='p-5 block md:hidden'>
    {
      dataExists ? 
        <CountryDetailsShort 
          selected={selectedCountry != ""}
          score={score}
          report={report || ""}
          selectedCountry={selectedCountry}
          rank={rank}
        /> : <div>
          <p>No data available for {selectedCountry}</p>
        </div>
    }
    </div>
    <Separator className="w-screen h-px bg-slate-300"/>
  </>
};

export default GlobeExplorer;