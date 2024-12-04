"use client"
import dynamic from 'next/dynamic';
import React, { ReactNode, useEffect, useState } from 'react'; // This is the standard import
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator';
import { ArrowDown, Router } from 'lucide-react';
import GlobeExplorer, { GlobeSelection } from '@/components/globe-explorer/globe-explorer';
import { CountryData, getCountriesByContinent, getCountryData, getCountryEmoji, getListOfYears, Year } from '@/lib/db_interface';
import { useRouter } from 'next/navigation';
import VerySpecialButton from '@/components/globe-explorer/very-special-button';
import { CountryDetailedViewContainer } from '@/components/ui/country-detailed-view';
import { YearLineChartDots } from '@/components/ui/custom-line-chart';
import { HappinessScore } from '@/components/ui/custom-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function Home() {

  useEffect(() => {
    getListOfYears().then(setYears);
  }, [])

  const [years, setYears] = useState<Year[]>([]);
  const [detailedContent, setDetailedContent] = useState<ReactNode>(
    <div className='w-screen h-40 flex items-center justify-center'>
      <p className=''>
        Please select a report and a country.
      </p>
    </div>
  );


  return <>
    <section className="w-screen h-80 flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col items-center gap-14 p-4">
        <h2 className="text-4xl font-bold  text-center">A lens of joy for the world.</h2>
        <VerySpecialButton />
      </div>
    </section>
    <Separator className="w-screen h-px bg-slate-300"/>
    <GlobeExplorer years={years} onCountryChange={async (selection: GlobeSelection) => {

      if (selection.country) {
        const countryData: {
          [year: number]: CountryData
        } = {}
        const scoreHistory: HappinessScore[] = [];
        for (let year of years) {
          const result = await getCountryData(year.year, selection.countryId);
          if (result) {
            countryData[year.year] = result;
            scoreHistory.push({
              year: year.year,
              score: result.ladderScore!,
            });
          }
        }
        scoreHistory.reverse();

        const selectedYear = parseInt(selection.report);
        const selectedData = countryData[selectedYear];
        if (!selectedData) {
          setDetailedContent(
            <div className='w-screen h-40 flex items-center justify-center'>
              <p className=''>
                No data available for this country.
              </p>
            </div>
          )
          return;
        }
        const emoji = await getCountryEmoji(selection.countryId);

        setDetailedContent(
          <ScrollArea className='whitespace-nowrap'>
            <CountryDetailedViewContainer
              country_name={selection.country}
              country_flag_emoji={emoji || ""}
              rank={selectedData.rank!}
              happinessScore={{
                year: selection.report,
                score: selectedData.ladderScore!
              }}
              happinessScoreHistory={scoreHistory}
              detailedHappinessScore={{
                year: selection.report,
                score: selectedData.ladderScore!,
                logGDPPerCapita: selectedData.logGdpPerCapita!,
                socialSupport: selectedData.socialSupport!,
                healthyLifeExpectency: selectedData.healthyLifeExpectancy!,
                freedomOfLifeChoices: selectedData.freedomToMakeLifeChoices!,
                generosity: selectedData.generosity!,
                perceptionsOfCorruption: selectedData.perceptionsOfCorruption!,
                dystopiaResidual: selectedData.dystopiaResidual!,
              }}
              demographicComposition={{
                happinessScore_young: selectedData.ladderScore!,
                happinessScore_lower_middle: selectedData.ladderScore!,
                happinessScore_upper_middle: selectedData.ladderScore!,
                happinessScore_old: selectedData.ladderScore!,
              }}
              card_visibility={{
                show_title: true,
                show_delete_button: false,
                show_rank_card: true,
                show_happiness_score_progress_card: true,
                show_score_history_card: true,
                show_contributing_factors_card: true,
                show_demographic_composition_card: false,
              }}
              adjust_on_large_device={false}
            />
            <ScrollBar orientation="horizontal"/>
          </ScrollArea>
        )

      }

    }}/>
    <Separator className="w-screen h-px bg-slate-300"/>
    <section>
      <header className="w-screen h-auto overflow-x-auto no-scrollbar flex items-center px-5 py-3 justify-between gap-x-10 gap-y-5">
        <h3 className="text-2xl font-normal">Detail View</h3>
      </header>
      <section className="h-fit w-screen" id='details'>
        {detailedContent}
      </section>
    </section>
  </>;
}
