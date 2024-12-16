"use client";

import { useEffect, useState } from "react";

import { CountryData, getCountryData } from "@/lib/db_interface";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

import { ContributingFactorsCard, HappinessScoreProgressCard, ScoreHistoryCard } from "./ui/custom-card";
import { Skeleton } from "./ui/skeleton";


type LeaderboardRowProps = {
    countryName: string,
    countryCode: string,
    countryId: number,
    flagEmoji: string,
    year: number,
}

export default function LeaderboardRow(props: LeaderboardRowProps) {
    const [countryData, setCountryData] = useState<CountryData | undefined>(undefined);

    useEffect(() => {
        async function fetchData() {
            const data = await getCountryData(props.year, props.countryId);
            setCountryData(data);
        }

        fetchData();
    }, [props.year, props.countryId]);


    return <ScrollArea className="whitespace-nowrap p-4">
        <div className="flex w-full space-x-4 h-[221px]">
            <div className="w-[158px] h-full min-h-[7.75rem] shrink-0 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold my-4">#{countryData?.rank}</h1>
                <h2 className="text-4xl">{props.flagEmoji}</h2>
                <h2 className="text-2xl font-medium">{props.countryName}</h2>
            </div>
            
            {countryData ? <HappinessScoreProgressCard
                score={{year: "", score: countryData.ladderScore ?? 0}}
                adjust_on_large_device={false}
            /> : <Skeleton className="w-[302px] h-full rounded-xl" />}
            {countryData ? <ContributingFactorsCard
                detailedHappinessScore={{
                    year: "",
                    score: countryData.ladderScore ?? 0,
                    logGDPPerCapita: countryData.logGdpPerCapita ?? 0,
                    dystopiaResidual: countryData.dystopiaResidual ?? 0,
                    freedomOfLifeChoices: countryData.freedomToMakeLifeChoices ?? 0,
                    generosity: countryData.generosity ?? 0,
                    healthyLifeExpectency: countryData.healthyLifeExpectancy ?? 0,
                    perceptionsOfCorruption: countryData.perceptionsOfCorruption ?? 0,
                    socialSupport: countryData.socialSupport ?? 0,
                }}
                adjust_on_large_device={false}
            /> : <Skeleton className="w-[490px] h-full rounded-xl" />}
            {countryData ? <ScoreHistoryCard
                scoreHistory={countryData.scoreHistory}
                label={props.countryName}
                adjust_on_large_device={false}
            /> : <Skeleton className="w-[435px] h-full rounded-xl" />}
        </div>
        <ScrollBar orientation="horizontal"/>
    </ScrollArea>
}