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
import React from "react";
import { card_visibility, CountryDetailedViewContainer } from "@/components/ui/country-detailed-view"
import { HappinessScore, DetailedHappinessScore } from "@/components/ui/custom-card"
// import '@/styles/globals.css';

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

  const handleYear = (value :string) => {
    setYear(Number.parseInt(value));
  };
  
  const handleC1 = (value :string) => {
    setCountry1(value);
  };
  
  const handleC2 = (value :string) => {
    setCountry2(value);
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
          <SelectItem value="Germany">Germany</SelectItem>
          <SelectItem value="Russia">Russia</SelectItem>
          <SelectItem value="Switzerland">Switzerland</SelectItem>
          <SelectItem value="Finland">Finland</SelectItem>
          <SelectItem value="China">China</SelectItem>
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
          <SelectItem value="Germany">Germany</SelectItem>
          <SelectItem value="Russia">Russia</SelectItem>
          <SelectItem value="Switzerland">Switzerland</SelectItem>
          <SelectItem value="Finland">Finland</SelectItem>
          <SelectItem value="China">China</SelectItem>
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
    <CountryDetailedViewContainer 
      country_name='Finland'
      country_flag_emoji="&#127467;&#127470;"
      rank={1} 
      happinessScore={{year: happinessScore2024Finland.year, score: happinessScore2024Finland.score} as HappinessScore}
      happinessScoreHistory={happinessScoreHistory}
      card_visibility={card_v}
      // adjust_on_large_device = {true}
      detailedHappinessScore={happinessScore2024Finland}
    />
  </>
}