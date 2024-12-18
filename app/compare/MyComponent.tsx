'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"
import {Chart1} from "@/app/compare/linechart_natural"
import {Chart2} from "@/app/compare/linechart_linear"
import React, { ReactNode } from "react";
import { card_visibility, CountryDetailedViewContainer } from "@/components/ui/country-detailed-view"
import { HappinessScore, DetailedHappinessScore } from "@/components/ui/custom-card"
import { ContinentGroup, CountryData, getCountryData, getCountryEmoji, getListOfYears, Year } from "@/lib/db_interface"
import { DemographicComposition } from "@/components/ui/custom-bar-chart"
// import '@/styles/globals.css';

const Africa = Array.from(`Algeria
Angola
Benin
Botswana
Burkina Faso
Burundi
Cameroon
Cape Verde
Central African Republic
Chad
Comoros
Congo
Cote d'Ivoire
Democratic Republic of Congo
Djibouti
Egypt
Equatorial Guinea
Eritrea
Eswatini (Swaziland)
Swaziland
Ethiopia
Gabon
Gambia
Ghana
Guinea
Guinea-Bissau
Kenya
Mombassa
Lesotho
Liberia
Libya
Madagascar
Malawi
Mali
Mauritania
Mauritius
Mayotte
Morocco
Western Sahara
Mozambique
Namibia
Niger
Nigeria
Réunion
Rwanda
Saint Helena
São Tomé and Príncipe
Senegal
Seychelles
Sierra Leone
Somalia
South Africa
South Sudan
Sudan
Togo
Tunisia
Uganda
United Republic of Tanzania
Zambia
Zimbabwe`.split("\n"))

const Asia = Array.from(`Afghanistan
Kazakhstan
Kyrgyzstan
Pakistan
Tajikistan
Turkmenistan
Uzbekistan
Bangladesh
Bhutan
Borneo
Brunei Darussalam
Cambodia
Kampuchea
China
Democratic People's Republic of Korea
Hong Kong
India
Indonesia
Japan
Laos
Macao
Malaysia
Maldives
Mongolia
Myanmar
Burma
Nepal
Philippines
Republic of Korea
Singapore
Sri Lanka
Taiwan
Thailand
Timor-Leste
Vietnam`.split("\n"))

const America = Array.from(`Bermuda
Canada
Greenland
Mexico
Saint Pierre and Miquelon
United States of America`.split("\n"))

const Europe = Array.from(`Albania
Latvia
Andorra
Liechtenstein
Armenia
Lithuania
Austria
Luxembourg
Azerbaijan
Malta
Belarus
Moldova
Belgium 
Monaco
Bosnia and Herzegovina
Montenegro
Bulgaria
Netherlands
Croatia
Norway
Cyprus
Poland
Czechia
Portugal
Denmark
Romania
Estonia
Russia
Finland
San Marino
Former Yugoslav Republic of Macedonia
Serbia
France
Slovakia
Georgia
Slovenia
Germany
Spain
Greece
Hungary
Sweden
Iceland
Switzerland
Ireland
Turkey
Italy
Ukraine
Kosovo
United Kingdom`.split("\n"))

const allCountries = Array.from(`Afghanistan
Albania
Algeria
Andorra
Angola
Antigua and Barbuda
Argentina
Armenia
Australia
Austria
Azerbaijan
Bahamas
Bahrain
Bangladesh
Barbados
Belarus
Belgium
Belize
Benin
Bhutan
Bolivia
Bosnia and Herzegovina
Botswana
Brazil
Brunei
Bulgaria
Burkina Faso
Burundi
Cabo Verde
Cambodia
Cameroon
Canada
Central African Republic
Chad
Chile
China
Colombia
Comoros
Congo, Democratic Republic of the
Congo, Republic of the
Costa Rica
Cote d'Ivoire
Croatia
Cuba
Cyprus
Czechia
Denmark
Djibouti
Dominica
Dominican Republic
Ecuador
Egypt
El Salvador
Equatorial Guinea
Eritrea
Estonia
Eswatini
Ethiopia
Fiji
Finland
France
Gabon
Gambia
Georgia
Germany
Ghana
Greece
Grenada
Guatemala
Guinea
Guinea-Bissau
Guyana
Haiti
Honduras
Hungary
Iceland
India
Indonesia
Iran
Iraq
Ireland
Israel
Italy
Jamaica
Japan
Jordan
Kazakhstan
Kenya
Kiribati
Kosovo
Kuwait
Kyrgyzstan
Laos
Latvia
Lebanon
Lesotho
Liberia
Libya
Liechtenstein
Lithuania
Luxembourg
Madagascar
Malawi
Malaysia
Maldives
Mali
Malta
Marshall Islands
Mauritania
Mauritius
Mexico
Micronesia
Moldova
Monaco
Mongolia
Montenegro
Morocco
Mozambique
Myanmar
Namibia
Nauru
Nepal
Netherlands
New Zealand
Nicaragua
Niger
Nigeria
North Korea
North Macedonia
Norway
Oman
Pakistan
Palau
Palestine
Panama
Papua New Guinea
Paraguay
Peru
Philippines
Poland
Portugal
Qatar
Romania
Russia
Rwanda
Saint Kitts and Nevis
Saint Lucia
Saint Vincent and the Grenadines
Samoa
San Marino
Sao Tome and Principe
Saudi Arabia
Senegal
Serbia
Seychelles
Sierra Leone
Singapore
Slovakia
Slovenia
Solomon Islands
Somalia
South Africa
South Korea
South Sudan
Spain
Sri Lanka
Sudan
Suriname
Sweden
Switzerland
Syria
Taiwan
Tajikistan
Tanzania
Thailand
Timor-Leste
Togo
Tonga
Trinidad and Tobago
Tunisia
Turkey
Turkmenistan
Tuvalu
Uganda
Ukraine
United Arab Emirates
United Kingdom
United States of America
Uruguay
Uzbekistan
Vanuatu
Vatican City
Venezuela
Vietnam
Yemen
Zambia
Zimbabwe`.split("\n"));

// console.log(Europe);

const happinessScoreHistory = [
  { year: "2019", score: 7.76 } as HappinessScore,
  { year: "2020", score: 7.8 } as HappinessScore,
  { year: "2021", score: 7.84 } as HappinessScore,
  { year: "2022", score: 7.82 } as HappinessScore,
  { year: "2023", score: 7.8 } as HappinessScore,
  { year: "2024", score: 7.74 } as HappinessScore,
]



const happinessScore2024Finland = {
  year: 2024,
  score: 7.74,
  logGDPPerCapita: 1.844,
  socialSupport: 1.572,
  healthyLifeExpectency: 0.695, 
  freedomOfLifeChoices: 0.859,
  generosity: 0.142,
  perceptionsOfCorruption:0.546, 
  dystopiaResidual: 2.082
} as DetailedHappinessScore

const demographicComposition = {
  happinessScore_young: 5.1,
  happinessScore_lower_middle: 7.8,
  happinessScore_upper_middle: 7.9,
  happinessScore_old: 6.9,
} as DemographicComposition

// const tmp :Promise<Year[]> = getListOfYears()

// type chartDataType = {year : number, c1 : number, c2 : number}[] | undefined

export default function MyComponent({years, countries} :{years : Year[], countries : ContinentGroup[]}) {

  const card_v = {
    show_title: true,
    show_score_history_card: true,
    show_demographic_composition_card: false,
    show_delete_button: false
  } as card_visibility
  
  // Write code here
  // let a = [{ year:1}]
  // const [allYears,setAllYears] = React.useState(a)
  const [year, setYear] = React.useState(2024);
  const [country1, setCountry1] = React.useState("")
  const [country2, setCountry2] = React.useState("")
  const [sameContinent, setSameContinent] = React.useState(false);
  const [data1, setData1] = React.useState<CountryData>();
  const [data2, setData2] = React.useState<CountryData>();
  const [history1, setHistory1] = React.useState<HappinessScore[]>();
  const [history2, setHistory2] = React.useState<HappinessScore[]>();
  const [id1, setId1] = React.useState<number>(0);
  const [id2, setId2] = React.useState<number>(0);
  const [chartData, setChartData] = React.useState<{year : number, c1 : number, c2 : number}[]> ()
  const [chartData2, setChartData2] = React.useState<{year : number, c1 : number, c2 : number}[]>()
  const [emoji1, setemoji1] = React.useState("")
  const [emoji2, setemoji2] = React.useState("")


  const checkContinent1 = (value:string) => {
    if (Europe.includes(value) && Europe.includes(country2)) {
      setSameContinent(true);
    }
    else {
      setSameContinent(false);
    }
  }

  const checkContinent2 = (value:string) => {
    if (Europe.includes(country1) && Europe.includes(value)) {
      setSameContinent(true);
    }
    else {
      setSameContinent(false);
    }
  }

  const handleYear = async (value :string) => {
    setYear(Number.parseInt(value));
    let tmp = await getCountryData(Number.parseInt(value), id1);
    setData1(tmp)
    tmp = await getCountryData(Number.parseInt(value), id2);
    setData2(tmp)
  };
  
  const handleC1 = async (value :string) => {
    // setCountry1(value);
    // checkContinent1(value);
    let t = value.split(',')
    setCountry1(t[1])
    setId1(Number.parseInt(t[0]))
    let tmp = await getCountryData(year, Number.parseInt(t[0]));
    setData1(tmp!)
    let c = 0;
    let arr : HappinessScore[] = Array(years.length)
    let chartData = Array(years.length)
    let chartData2 = Array(years.length)
    for (let i = years.length-1; i>=0; i--) {
      let ic = years.length-i-1;
      tmp = await getCountryData(years[ic].year, Number.parseInt(t[0]))
      let tmp2 = await getCountryData(years[ic].year, id2)
      arr[i] = {year : years[ic].year, score : (tmp? (tmp.ladderScore ? tmp.ladderScore : 0): 0)}
      chartData[i] = {year : years[ic].year, c1 : tmp?.ladderScore, c2 : tmp2?.ladderScore}
      chartData2[i] = {year : years[ic].year, c1 : tmp?.rank, c2 : tmp2?.rank}
    }
    setHistory1(arr)
    setChartData(chartData)
    setChartData2(chartData2)
    const emoji1 = await getCountryEmoji(Number.parseInt(t[0]));
    setemoji1(emoji1 || "")
  // const emoji2 = await getCountryEmoji(id2);
  };
  
  const handleC2 = async (value :string) => {
    // setCountry1(value);
    // checkContinent1(value);
    let t = value.split(',')
    setCountry2(t[1])
    setId2(Number.parseInt(t[0]))
    let tmp = await getCountryData(year, Number.parseInt(t[0]));
    setData2(tmp!)
    let c = 0;
    let arr : HappinessScore[] = Array(years.length)
    let chartData = Array(years.length)
    let chartData2 = Array(years.length)
    for (let i = years.length-1; i>=0; i--) {
      let ic = years.length-i-1;
      tmp = await getCountryData(years[ic].year, Number.parseInt(t[0]))
      let tmp2 = await getCountryData(years[ic].year, id1)
      arr[i] = {year : years[ic].year, score : (tmp? (tmp.ladderScore ? tmp.ladderScore : 0): 0)}
      chartData[i] = {year : years[ic].year, c1 : tmp2?.ladderScore, c2 : tmp?.ladderScore}
      chartData2[i] = {year : years[ic].year, c1 : tmp2?.rank, c2 : tmp?.rank}
    }
    setHistory2(arr)
    setChartData(chartData)
    setChartData2(chartData2)
    const emoji2 = await getCountryEmoji(Number.parseInt(t[0]));
    setemoji2(emoji2 || "")
    // const emoji1 = await getCountryEmoji(id1);
  // const emoji2 = await getCountryEmoji(id2);
  };

  // async function g(){
  //   let tmp :Year[] = await getListOfYears()
  //   return tmp
  // }

  // console.log(years);
  // async function getYears() {
  //   setAllYears(await getListOfYears())
  // }

  // const emoji1 = await getCountryEmoji(id1);
  // const emoji2 = await getCountryEmoji(id2);

  return <>
    <div className="flex flex-row px-5 py-2 gap-8 items-center">
    <Select onValueChange={(value) => {handleYear(value)}}>
      <SelectTrigger className="w-[180px]" defaultChecked>
        <SelectValue placeholder={years[0].year.toString()} defaultValue={years[0].year.toString()} defaultChecked />
      </SelectTrigger>
      <SelectContent defaultChecked>
        <SelectGroup defaultChecked>
          <SelectLabel defaultChecked>Year</SelectLabel>
          {years.map(e => (<SelectItem value={e.year.toString()} key={e.year.toString()}>{e.year}</SelectItem>))}
          {/* <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
          <SelectItem value="2020">2020</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
    <Separator orientation="vertical" className="w-64, h-16"/>
    <Select onValueChange={handleC1}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Add a country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map(a => {
          return <SelectGroup>
            <SelectLabel>{a.continentName}</SelectLabel>
            {a.countries.map(e => (<SelectItem key={a.continentName + "-" + e.countryId} value={e.countryId.toString()+','+e.countryName} className={a.continentName}>{e.countryName}</SelectItem>))}
          </SelectGroup>
        })}
      </SelectContent>
    </Select>
    <Separator orientation="vertical" className="w-64, h-16"/>
    <Select onValueChange={handleC2}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Add another country" />
      </SelectTrigger>
      <SelectContent>
        {countries.map(a => {
          return <SelectGroup>
            <SelectLabel>{a.continentName}</SelectLabel>
            {a.countries.map(e => (<SelectItem key={a.continentName + "-" + e.countryId} value={e.countryId.toString()+','+e.countryName} className={a.continentName}>{e.countryName}</SelectItem>))}
          </SelectGroup>
        })}
      </SelectContent>
    </Select>
    </div>
    <Separator/>
    <div className="flex flex-row px-5 py-8 gap-4 w-full justify-center">
      <div className="w-1/2">
      <Chart2 year={year} country1={country1} country2={country2} chartData={chartData2 ? chartData2 : []} />
      </div>
      <div className="w-1/2">
      <Chart1 year={year} country1={country1} country2={country2} chartData={chartData ? chartData : []}/>
      </div>
    </div>
    <Separator/>
    <div className="flex flex-row w-full justify-evenly">
      {country1 == "" ? '' : 
      <div className="w-1/3">
    <CountryDetailedViewContainer 
      country_name={country1}
      country_flag_emoji={emoji1}
      rank={data1 ? (data1!.rank ? data1!.rank : 0) :0} 
      happinessScore={{year: year, score: data1 ? (data1!.ladderScore ? data1!.ladderScore : 0) :0} as HappinessScore}
      happinessScoreHistory={history1 ? history1 : [{year:0, score:0}]}
      card_visibility={card_v}
      adjust_on_large_device = {true}
      demographicComposition={demographicComposition}
      detailedHappinessScore={{year : year,
                               score : data1?.ladderScore ? data1.ladderScore : 0,
                               logGDPPerCapita : data1?.logGdpPerCapita ? data1.logGdpPerCapita : 0,
                               socialSupport : data1?.socialSupport ? data1.socialSupport : 0,
                               healthyLifeExpectency : data1?.healthyLifeExpectancy ? data1.healthyLifeExpectancy : 0,
                               freedomOfLifeChoices : data1?.freedomToMakeLifeChoices ? data1.freedomToMakeLifeChoices : 0,
                               generosity : data1?.generosity ? data1.generosity : 0,
                               perceptionsOfCorruption : data1?.perceptionsOfCorruption ? data1.perceptionsOfCorruption : 0,
                               dystopiaResidual : data1?.dystopiaResidual ? data1.dystopiaResidual : 0   
      }}
    />
    </div>}
    {country1 && country2 ? 
    <Separator orientation="vertical" className="w-64, h-auto"/> : ''}
    {country2 == "" ? '' : 
    <div className="w-1/3">
    <CountryDetailedViewContainer 
      country_name={country2}
      country_flag_emoji={emoji2}
      rank={data2 ? (data2!.rank ? data2!.rank : 0) :0} 
      happinessScore={{year: year, score: data2 ? (data2!.ladderScore ? data2!.ladderScore : 0) :0} as HappinessScore}
      happinessScoreHistory={history2 ? history2 : [{year:0, score:0}]}
      card_visibility={card_v}
      demographicComposition={demographicComposition}
      adjust_on_large_device = {true}
      detailedHappinessScore={{year : year,
        score : data2?.ladderScore ? data2.ladderScore : 0,
        logGDPPerCapita : data2?.logGdpPerCapita ? data2.logGdpPerCapita : 0,
        socialSupport : data2?.socialSupport ? data2.socialSupport : 0,
        healthyLifeExpectency : data2?.healthyLifeExpectancy ? data2.healthyLifeExpectancy : 0,
        freedomOfLifeChoices : data2?.freedomToMakeLifeChoices ? data2.freedomToMakeLifeChoices : 0,
        generosity : data2?.generosity ? data2.generosity : 0,
        perceptionsOfCorruption : data2?.perceptionsOfCorruption ? data2.perceptionsOfCorruption : 0,
        dystopiaResidual : data2?.dystopiaResidual ? data2.dystopiaResidual : 0   
}}
    />
    </div>}
      {sameContinent ? (<>
        <Separator orientation="vertical" className="w-64, h-auto"/>
        <div className="w-1/3"><CountryDetailedViewContainer 
      country_name='Continent'
      country_flag_emoji="&#127467;&#127470;"
      rank={1} 
      happinessScore={{year: happinessScore2024Finland.year, score: happinessScore2024Finland.score} as HappinessScore}
      happinessScoreHistory={happinessScoreHistory}
      card_visibility={card_v}
      adjust_on_large_device = {true}
      demographicComposition={demographicComposition}
      detailedHappinessScore={happinessScore2024Finland}
    /> 
    </div>
    </>) : ''}
    </div>
    <Separator/>
  </>
}