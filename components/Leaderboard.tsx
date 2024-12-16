"use client";

import { useState } from "react";

import { Separator } from "./ui/separator";
import { Year, Country, getTopTenCountries } from "@/lib/db_interface";
import LeaderboardRow from "./LeaderboardRow";
import YearSelection from "./YearSelection";


type LeaderboardProps = {
    years: Year[],
    defaultYear: Year,
    countries: Country[],
}

export default function Leaderboard(props: LeaderboardProps) {
    const [topTenCountries, setTopTenCountries] = useState<Country[]>(props.countries);
    const [selectedYear, setSelectedYear] = useState<number>(props.defaultYear.year);

    const queryNewTopTen = async (year: number) => {
        const newCountries = await getTopTenCountries(year, "en");
        console.log(newCountries);
        setTopTenCountries(newCountries);
    }

    return <div className="flex flex-col">
        <Separator/>
        <YearSelection
            years={props.years}
            value={selectedYear}
            setValue={setSelectedYear}
            onChange={queryNewTopTen}
        />
        <Separator />
        <div className="p-6">
            {topTenCountries.map((country) => (
                <div key={country.countryId}>
                    <LeaderboardRow
                        countryName={country.countryName}
                        countryId={country.countryId}
                        countryCode={country.countryCode ?? ""}
                        flagEmoji={country.flagEmoji ?? ""}
                        year={selectedYear}
                    />
                    <Separator className="my-4" />
                </div>
            ))}
        </div>
    </div>
}