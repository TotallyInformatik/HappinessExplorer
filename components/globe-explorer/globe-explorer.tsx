"use client";
import { Separator } from '@/components/ui/separator';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue } from "@/components/ui/select";
import React, { useEffect, useState } from 'react';
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
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCountriesByContinent, getCountryData, Year } from '@/lib/db_interface';
import GeoCountry from './geo-country';
import CountryDetailsShort from './country-details-short';
import { Card, CardContent } from '../ui/card';

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

const GlobeExplorer = ({ 
  onCountryChange,
  years
} : GlobeExplorerProps) => {
  const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


  // select a report has no external events, just changes the heatmap
  // select a country has an external event, the same as the country click event.
  // this event also tells which report is currently selected.
  // todo: heatmap
  
  const [report, setReport] = useState("");
  const [position, setPosition] = useState<MapPosition>({ coordinates: [0, 0], zoom: 1.3 });
  const [open, setOpen] = React.useState(false)
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countries, setCountries] = useState<Countries>([]);
  const [countryIDs, setCountryIDs] = useState<CountryIDs>({});
  const [rank, setRank] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [dataExists, setDataExists] = useState<boolean>(false);
  const [allowZoom, setAllowZoom] = useState(false); // State to track Ctrl/Command key
  


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


  // Listen for keydown and keyup to track Ctrl/Command state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) setAllowZoom(true);
    };

    const handleKeyUp = () => {
      setAllowZoom(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);


  const filterZoomEvent = (event: unknown): boolean => {
    if (event?.constructor?.name === "MouseEvent") {
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
                        gap-y-5 flex-col md:flex-row "
      >
        <h3 className="text-2xl font-normal">Globe Explorer</h3>
        <section className='flex md:items-center flex-col md:flex-row h-full gap-x-10 gap-y-2'>
          <Separator orientation='vertical' className='bg-slate-300 h-10 hidden md:block'/>
          <Select value={report} onValueChange={(value) => {
            setReport(value);
            setSelectedCountry("");
            getCountriesByContinent(parseInt(value), "en").then((result) => {
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
          }}>
            <SelectTrigger className="w-[180px]">
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
              <PopoverTrigger asChild disabled={report == ""}>
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
                  <CommandInput placeholder="Search a country..." className="h-9" />
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
            <kbd className="pointer-events-none inline-flex h-5 select-none text-[14px] font-medium text-muted-foreground items-center gap-1 rounded bg-muted px-1.5 font-mono opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </section>
        </section>
      </header>
      <Separator className="w-screen h-px bg-slate-300"/>
      <main className="w-full aspect-[4/3] overflow-hidden bg-slate-200 relative">
        {
          report == "" ? 
            <div className='w-full h-full flex items-center justify-center'>
              <p className="font-medium text-center">Select Report to View Map</p> 
            </div>
            : 
            <>
              <ComposableMap 
                onClick={(event) => {
                  setSelectedCountry("");
                }}>
                <ZoomableGroup translateExtent={[[-200, 65], [900, 540]]} minZoom={1.3} center={position.coordinates} zoom={position.zoom} filterZoomEvent={filterZoomEvent}>
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        return <GeoCountry 
                          key={geo.rsmKey}
                          geo={geo}
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