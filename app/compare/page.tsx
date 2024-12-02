import { getCountriesByContinent, getListOfYears, Year } from "@/lib/db_interface";
import MyComponent from "./MyComponent";

export default async function page() {
    let tmp :Year[] = await getListOfYears()
    let countries = await getCountriesByContinent(2023, 'en');
    // console.log(countries[2]);
    return <MyComponent years={tmp} countries={countries} />

}