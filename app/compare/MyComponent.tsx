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
import { ContinentGroup, CountryData, getCountryData, getCountryEmoji, Year } from "@/lib/db_interface"
import { DemographicComposition } from "@/components/ui/custom-bar-chart"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"



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

export default function MyComponent({years, countries} :{years : Year[], countries : ContinentGroup[]}) {

  const card_v = {
    show_title: true,
    show_score_history_card: true,
    show_demographic_composition_card: false,
    show_delete_button: false
  } as card_visibility
  


  const [year, setYear] = React.useState(2024);
  const [country1, setCountry1] = React.useState("")
  const [country2, setCountry2] = React.useState("")
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



  const handleYear = async (value :string) => {
    setYear(Number.parseInt(value));
    let tmp = await getCountryData(Number.parseInt(value), id1);
    setData1(tmp)
    tmp = await getCountryData(Number.parseInt(value), id2);
    setData2(tmp)
  };
  
  const handleC1 = async (value :string) => {
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
  };
  
  const handleC2 = async (value :string) => {
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
  };


  return <>
    <div className="flex flex-wrap md:flex-nowrap md:flex-row px-5 py-2 gap-2 md:gap-8 md:items-center">
      <Select onValueChange={(value) => {handleYear(value)}}>
        <SelectTrigger className="w-[180px]" defaultChecked aria-label="Select a report (which year?)">
          <SelectValue placeholder={years[0].year.toString()} defaultValue={years[0].year.toString()} defaultChecked />
        </SelectTrigger>
        <SelectContent defaultChecked>
          <SelectGroup defaultChecked>
            <SelectLabel defaultChecked>Year</SelectLabel>
            {years.map(e => (<SelectItem value={e.year.toString()} key={e.year.toString()}>{e.year}</SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block w-64, h-16"/>
      <Select onValueChange={handleC1}>
        <SelectTrigger className="w-[250px]" aria-label="Select a first country for the comparison">
          <SelectValue placeholder="Add a country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map(a => {
            return <SelectGroup key={a.continentName}>
              <SelectLabel>{a.continentName}</SelectLabel>
              {a.countries.map(e => (<SelectItem key={a.continentName + "-" + e.countryId} value={e.countryId.toString()+','+e.countryName} className={a.continentName}>{e.countryName}</SelectItem>))}
            </SelectGroup>
          })}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block w-64, h-16"/>
      <Select onValueChange={handleC2}>
        <SelectTrigger className="w-[250px]"  aria-label="Select a second country for the comparison">
          <SelectValue placeholder="Add another country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map(a => {
            return <SelectGroup key={a.continentName}>
              <SelectLabel>{a.continentName}</SelectLabel>
              {a.countries.map(e => (<SelectItem key={a.continentName + "-" + e.countryId} value={e.countryId.toString()+','+e.countryName} className={a.continentName}>{e.countryName}</SelectItem>))}
            </SelectGroup>
          })}
        </SelectContent>
      </Select>
    </div>
    <Separator/>
    <div className="flex flex-col px-5 py-8 gap-4 w-full justify-center md:flex-row">
      <div className="md:w-1/2">
        <Chart2 year={year} country1={country1} country2={country2} chartData={chartData2 ? chartData2 : []} />
      </div>
      <div className="md:w-1/2">
        <Chart1 year={year} country1={country1} country2={country2} chartData={chartData ? chartData : []}/>
      </div>
    </div>
    <Separator/>
    <div className="flex flex-col w-full justify-evenly md:flex-row">
      {country1 == "" ? '' : 
        <ScrollArea className="whitespace-nowrap p-4 md:p-0 md:m-auto">
          <div className="">
            <CountryDetailedViewContainer 
              country_name={country1}
              country_flag_emoji={emoji1}
              rank={data1 ? (data1!.rank ? data1!.rank : 0) :0} 
              happinessScore={{year: year, score: data1 ? (data1!.ladderScore ? data1!.ladderScore : 0) :0} as HappinessScore}
              happinessScoreHistory={history1 ? history1 : [{year:0, score:0}]}
              card_visibility={card_v}
              adjust_on_large_device = {true}
              demographicComposition={demographicComposition}
              detailedHappinessScore={{
                year : year,
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
          </div>
          <ScrollBar orientation="horizontal" className="md:hidden"/>
        </ScrollArea>
      }
      {country1 && country2 ? 
        <Separator orientation="vertical" className="w-64, h-auto"/> : ''
      }
      {country2 == "" ? '' : 
        <ScrollArea className="whitespace-nowrap p-4 md:p-0 md:m-auto">
          <div className="">
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
          </div>
          <ScrollBar orientation="horizontal" className="md:hidden"/>
        </ScrollArea>
      }
    </div>
    <Separator/>
  </>
}