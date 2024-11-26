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
Czech Republic
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
Zimbabwe`.split("\n"))

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

export default function Page() {

  const card_v = {
    show_title: true,
    show_score_history_card: true,
  } as card_visibility
  
  // Write code here
  const [year, setYear] = React.useState(2024);
  const [country1, setCountry1] = React.useState("Finland")
  const [country2, setCountry2] = React.useState("Switzerland")
  const [sameContinent, setSameContinent] = React.useState(false);

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

  const handleYear = (value :string) => {
    setYear(Number.parseInt(value));
  };
  
  const handleC1 = (value :string) => {
    setCountry1(value);
    checkContinent1(value);
  };
  
  const handleC2 = (value :string) => {
    setCountry2(value);
    checkContinent2(value);
  };

  return <>
    <div className="flex flex-row px-5 py-2 gap-8 items-center">
    <Select onValueChange={handleYear}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a report" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
          <SelectItem value="2020">2020</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Separator orientation="vertical" className="w-64, h-16"/>
    <Select onValueChange={handleC1}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Add a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Country1</SelectLabel>
          {allCountries.map(e => (<SelectItem value={e}>{e}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <Separator orientation="vertical" className="w-64, h-16"/>
    <Select onValueChange={handleC2}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Add another country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Country2</SelectLabel>
          {allCountries.map(e => (<SelectItem value={e}>{e}</SelectItem>))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    <Separator/>
    <div className="flex flex-row px-5 py-8 gap-4 w-full justify-center">
      <div className="w-1/2">
      <Chart2 year={year} country1={country1} country2={country2}/>
      </div>
      <div className="w-1/2">
      <Chart1 year={year} country1={country1} country2={country2}/>
      </div>
    </div>
    <Separator/>
    <div className="flex flex-row w-full justify-evenly">
      <div className="w-1/3">
    <CountryDetailedViewContainer 
      country_name='Finland'
      country_flag_emoji="&#127467;&#127470;"
      rank={1} 
      happinessScore={{year: happinessScore2024Finland.year, score: happinessScore2024Finland.score} as HappinessScore}
      happinessScoreHistory={happinessScoreHistory}
      card_visibility={card_v}
      adjust_on_large_device = {true}
      detailedHappinessScore={happinessScore2024Finland}
    />
    </div>
    <Separator orientation="vertical" className="w-64, h-auto"/>
    <div className="w-1/3">
    <CountryDetailedViewContainer 
      country_name='Finland'
      country_flag_emoji="&#127467;&#127470;"
      rank={1} 
      happinessScore={{year: happinessScore2024Finland.year, score: happinessScore2024Finland.score} as HappinessScore}
      happinessScoreHistory={happinessScoreHistory}
      card_visibility={card_v}
      adjust_on_large_device = {true}
      detailedHappinessScore={happinessScore2024Finland}
    />
    </div>
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
      detailedHappinessScore={happinessScore2024Finland}
    /> 
    </div>
    </>) : ''}
    </div>
    <Separator/>
  </>
}