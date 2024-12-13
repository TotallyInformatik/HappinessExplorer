"use client";

import { useState } from "react";

import { Separator } from "./ui/separator";
import { Year, Country } from "@/lib/db_interface";
import LeaderboardRow from "./LeaderboardRow";
import YearSelection from "./YearSelection";


type LeaderboardProps = {
    years: Year[],
    defaultYear: Year,
    countries: Country[],
}

export default function Leaderboard(props: LeaderboardProps) {
    const [topTenCountries, setTopTenCountries] = useState<Country[]>(props.countries);

    return <div className="flex flex-col">
        <Separator/>
        <YearSelection
            years={props.years}
            defaultYear={props.defaultYear}
        />
        <Separator />
        <div className="p-6">
            {props.countries.map((country) => (
                <div key={country.countryId}>
                    <LeaderboardRow
                        countryName={country.countryName}
                        countryId={country.countryId}
                        countryCode={country.countryCode ?? ""}
                        flagEmoji={country.flagEmoji ?? ""}
                        year={props.defaultYear.year}
                    />
                    <Separator className="my-4" />
                </div>
            ))}
        </div>
    </div>
}