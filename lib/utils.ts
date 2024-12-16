import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// compared to the data we have from the website.
export const COUNTRY_MAPPING: {
  [key: string]: string
} = {
  "United States of America": "United States"
}

export const getCorrectCountryName = (geo: any) => {
  const geoName = geo.properties.name;
  return COUNTRY_MAPPING[geoName] || geoName;
}