// some countries have different names in the package 

import { CountryData, getCountryData } from "@/lib/db_interface";
import { Geography } from "react-simple-maps";
import { GlobeSelection, CountryIDs } from "./globe-explorer";
import { LegacyRef, RefObject, useRef, useState } from "react";
import { COUNTRY_MAPPING, getCorrectCountryName } from "@/lib/utils";

function getColor(score: number | undefined) {

  if (!score) {
    return "#27272a"; // todo better color
  }

  if (score < 1) {
    return "#020617";
  } else if (score < 2) {
    return "#0f172a";
  } else if (score < 3) {
    return "#1e293b";
  } else if (score < 4) {
    return "#334155";
  } else if (score < 5) {
    return "#475569";
  } else if (score < 6) {
    return "#64748b";
  } else if (score < 7) {
    return "#94a3b8";
  } else {
    return "#cbd5e1";
  }
} 


export default function GeoCountry({
  geo,
  report,
  countryIDs,
  score,
  setSelectedCountry,
  onCountryChange
}: { 
  geo: any,
  report: string,
  countryIDs: CountryIDs,
  score: number | undefined,
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>,
  onCountryChange?: (e: GlobeSelection) => void,
}) {

  return <Geography
    fill={getColor(score)}
    key={geo.rsmKey} 
    geography={geo} 
    onClick={(event) => {
      event.stopPropagation();
      const correctName = getCorrectCountryName(geo);

      setSelectedCountry(correctName);

      if (onCountryChange) {
        onCountryChange({
          country: correctName,
          report: report,
          countryId: countryIDs[correctName]
        });
      }
    }}
  /> 

}