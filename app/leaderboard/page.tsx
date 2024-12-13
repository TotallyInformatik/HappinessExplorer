import Leaderboard from "@/components/Leaderboard"
import { getListOfYears, getTopTenCountries } from "@/lib/db_interface";

export default async function Page() {
  const years = await getListOfYears();
  const currentYear = years[0];

  const countries = await getTopTenCountries(currentYear.year, "en");

  return <>
    <div className="w-full flex flex-col items-left my-8 gap-4 px-6">
      <h1 className="text-3xl font-extrabold">Leaderboard</h1>
      <p className="text-sm text-muted-foreground">See the world champions at a glance</p>
    </div>
    <Leaderboard
      years={years}
      defaultYear={currentYear}
      countries={countries}
    />
  </>
}