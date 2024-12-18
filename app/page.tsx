"use client"

import AnimatedGlobe from '@/components/AnimatedGlobe';
import GlobeExplorer, { GlobeSelection } from '@/components/globe-explorer/globe-explorer';
import { Button } from '@/components/ui/button';
import { CountryDetailedViewContainer } from '@/components/ui/country-detailed-view';
import { HappinessScore } from '@/components/ui/custom-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CountryData, getCountryData, getCountryEmoji, getListOfYears, Year } from '@/lib/db_interface';
import { ArrowDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react'; // This is the standard import




/**
 * @author Rui Zhang
 * @returns the index page of the website.
 */
export default function Home() {

  // loading in the years from the backend
  const [years, setYears] = useState<Year[]>([]);
  useEffect(() => {
    getListOfYears().then(setYears);
  }, [])

  // this state is for the detailed content showed when we select a country
  // initially, it is just a disclaimer to select a year and a country
  const [detailedContent, setDetailedContent] = useState<ReactNode>(
    <div className='w-screen h-40 flex items-center justify-center'>
      <p className=''>
        Please select a report and a country.
      </p>
    </div>
  );

  const router = useRouter();

  return <>
    
    { /* landing section */ }
    <section className="w-screen flex items-center justify-center">
      <div className="w-fit h-fit flex flex-col items-center gap-5 p-10">
        <h2 className="text-4xl font-bold  text-center">A lens of joy for the world.</h2>
        <AnimatedGlobe size={300}/>
        <Button onClick={() => {
          // clicking this button will jump you to the world map
          router.push("#world-map");
        }} aria-label='Activating this button will cause the view to jump to the world map and its associated interactions.'><ArrowDown />Discover</Button>
      </div>
    </section>

    
    <Separator className="w-screen h-px bg-slate-300"/>


    { 
    /**
     * Globe Explorer Component, see components/globe-explorer/globe-explorer.tsx
     * 
     * The main part of this code consists of the "onCountryChange" function
     * which is called by GlobeExplorer whenever we select a country.
     * 
     */ 
    }
    <GlobeExplorer years={years} onCountryChange={async (selection: GlobeSelection) => {

      if (selection.country) {

        const countryData: {
          [year: number]: CountryData
        } = {}

        const scoreHistory: HappinessScore[] = [];
        
        // for each year / report we have, we will fetch the data for the country we have 
        // selected, under "selection.countryId"
        // thereby constructing the scoreHistory
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
        // reversing it so that the UI shows the scoreHistory from left to right
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


        // setting the contents of the detailed view. See components/ui/country-detailed-view.tsx
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



    { /* Detailed View Section. */ }
    <section>
      <header className="w-screen h-auto overflow-x-auto no-scrollbar flex items-center px-5 py-3 justify-between gap-x-10 gap-y-5">
        <h3 className="text-2xl font-normal">Detail View</h3>
      </header>
      <Separator className="w-screen h-px bg-slate-300"/>
      <section className="h-fit w-screen" id='details'>
        {detailedContent}
      </section>
    </section>
  </>;
}
