"use client";

import { Button } from "@/components/ui/button"
import { getListOfYears, getCountriesByContinent } from "@/lib/db_interface"


async function getYears() {
  const list = await getListOfYears();
  console.log(list);
}

async function getCountries() {
  const list = await getCountriesByContinent(2021, "de");
  console.log(list);
}

export default function Page() {
  return <>
    <h2>Leaderboard Page</h2>
    <div className="w-full flex flex-col items-center gap-5 m-5">
      <Button onClick={() => getYears()}>
        Get list of years
      </Button>
      <Button onClick={() => getCountries()}>
        Get list of countries by continent
      </Button>
    </div>
  </>
}