import { Separator } from "./ui/separator";
import { getListOfYears, getTopTenCountries } from "@/lib/db_interface";
import LeaderboardRow from "./LeaderboardRow";


export default async function Leaderboard() {
    const years = await getListOfYears();
    const currentYear = years[0].year;

    const countries = await getTopTenCountries(currentYear, "en");
    console.log(countries);

    return <div className="p-6">
        {countries.map((country) => (
            <div key={country.countryId}>
                <LeaderboardRow
                    countryName={country.countryName}
                    countryId={country.countryId}
                    countryCode={country.countryCode ?? ""}
                    flagEmoji={country.flagEmoji ?? ""}
                    year={currentYear}
                />
                <Separator className="my-4"/>
            </div>
        ))}
    </div>
}