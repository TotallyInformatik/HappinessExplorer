// some countries have different names in the package 

import { getCorrectCountryName } from "@/lib/utils";
import { Geography } from "react-simple-maps";
import { CountryIDs, GlobeSelection } from "./globe-explorer";

/**
 * @author Rui Zhang
 * @param score - the ladder score of some country
 * @returns color corresponding to the country that should be displayed on the map
 */
function getColor(score: number | undefined) {
  
  if (!score) {
    return "#9E9E9E";
  }

  if (score < 1) {
    return "#EC7373";
  } else if (score < 2) {
    return "#EC7373";
  } else if (score < 3) {
    return "#EC8B73";
  } else if (score < 4) {
    return "#EC8B73";
  } else if (score < 5) {
    return "#EC9F73";
  } else if (score < 6) {
    return "#EDD086";
  } else if (score < 7) {
    return "#A3E378";
  } else {
    return "#78C154";
  }
} 

/**
 * @author Rui Zhang
 * @param geo - the geo property passed from react simple maps library
 * @param report - the year which has been selected in the globe-explorer 
 * @param countryIDs - a map from country name to its ID for the supabase
 * @param score - the ladderscore of the country
 * @param setSelectedCountry - callback passed from globe-explorer which is called
 * when a country is selected
 * @param onCountryChange - callback
 * @returns 
 */
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
    className="stroke-slate-200 dark:stroke-slate-900 fill"
    fill={getColor(score)}
    strokeWidth={0.2}
    tabIndex={-1} // Disable tab focus
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