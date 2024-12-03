import TestCard from "./TestCard"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { getCountryData, getCountryEmoji } from "@/lib/db_interface"


type LeaderboardRowProps = {
    countryName: string,
    countryCode: string,
    countryId: number,
    flagEmoji: string,
    year: number,
}

export default async function LeaderboardRow(props: LeaderboardRowProps) {
    const countryData = await getCountryData(props.year, props.countryId);

    return <ScrollArea className="whitespace-nowrap p-4">
        <div className="flex w-full space-x-4">
            <div className="w-40 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-extrabold my-4">#{countryData?.rank}</h1>
                <h2 className="text-4xl">{props.flagEmoji}</h2>
                <h2 className="text-2xl font-medium">{props.countryName}</h2>
                <p className="text-sm text-muted-foreground">{countryData?.ladderScore} points</p>
            </div>

            <TestCard/>
            <TestCard/>
            <TestCard/>
            <TestCard/>
            <TestCard/>
        </div>
        <ScrollBar orientation="horizontal"/>
    </ScrollArea>
}