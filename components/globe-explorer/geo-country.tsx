// some countries have different names in the package 

import { CountryData, getCountryData } from "@/lib/db_interface";
import { Geography } from "react-simple-maps";
import { CountryChangeEvent, CountryIDs } from "./globe-explorer";
import { LegacyRef, RefObject, useRef, useState } from "react";

// compared to the data we have from the website.
const COUNTRY_MAPPING: {
  [key: string]: string
} = {
  "United States of America": "United States"
}

function getColor(result: CountryData | undefined) {

  if (!result) {
    return "#27272a"; // todo better color
  }

  const ladderscore = result.ladderScore;

  if (!ladderscore) {
    return "#27272a"
  }

  if (ladderscore < 1) {
    return "#cbd5e1";
  } else if (ladderscore < 2) {
    return "#94a3b8";
  } else if (ladderscore < 3) {
    return "#64748b";
  } else if (ladderscore < 4) {
    return "#475569";
  } else if (ladderscore < 5) {
    return "#334155";
  } else if (ladderscore < 6) {
    return "#1e293b";
  } else if (ladderscore < 7) {
    return "#0f172a";
  } else {
    return "#020617";
  }
} 


export default function GeoCountry({
  geo,
  report,
  countryIDs,
  setSelectedCountry,
  onCountryChange
}: { 
  geo: any,
  report: string,
  countryIDs: CountryIDs,
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>,
  onCountryChange?: (e: CountryChangeEvent) => void,
}) {

  //const ref = useRef<any>();

  const geoName = geo.properties.name;

  const correctName = COUNTRY_MAPPING[geoName] || geoName;
  /*
  getCountryData(parseInt(report), countryIDs[correctName])
    .then((result) => {
      const color = getColor(result);
      ref.current.setAttribute("fill", color)
    });
    */

  return <Geography
    fill="black"
    key={geo.rsmKey} 
    geography={geo} 
    onClick={(event) => {
      event.stopPropagation();
    
      setSelectedCountry(correctName);

      if (onCountryChange) {
        onCountryChange({
          country: correctName,
          report: report
        });
      }
    }}
  /> 

}