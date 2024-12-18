import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { YearLineChartDots, YearLineChartData, YearLineChartConfig } from "./custom-line-chart"
import { FactorsRadialBarChart } from "./custom-radial-bar-chart"
import clsx from "clsx"
import { DemographicComposition, DemographicCompositionBarChart } from "./custom-bar-chart"


// custom type for simple happiness score data
export type HappinessScore = {
  year: number | string,
  score: number,
}

// more detailed happiness score including contributing factors
export type DetailedHappinessScore = {
  year: number | string,
  score: number,
  logGDPPerCapita: number,
  socialSupport: number,
  healthyLifeExpectency: number,
  freedomOfLifeChoices: number,
  generosity: number,
  perceptionsOfCorruption: number,
  dystopiaResidual: number,
}

/*
  Some initial words regarding all the Cards components:
  As one will see, every card component has the adjust_on_large_device variable
  This variable does not affect the functionallity of the cards but rather their appearance
*/

// TitleCard Component
// only '*Card' Component not using the Card Component of shadcn/ui
const TitleCard = ({
  country_flag_emoji,
  country_name,
  happinessScore,
  show_year_in_title = true,
  adjust_on_large_device = true,
}: {
  country_flag_emoji: string,
  country_name: string,
  happinessScore: HappinessScore,
  show_year_in_title?: boolean,
  adjust_on_large_device?: boolean
}) => {
  return (
    <div className={clsx(
      "w-[158px] h-fit min-h-[7.75rem] shrink-0 flex flex-col justify-center",
      {
        "md:block": adjust_on_large_device,
      }
    )}>
      <p className="text-5xl">{country_flag_emoji}</p>
      <p className="text-2xl font-semibold">{country_name}</p>
      {show_year_in_title && <p className="text-sm text-slate-500 leading-3">in {happinessScore.year}</p>}
    </div>
  )
}



// RankCard Component
const RankCard = ({
  rank,

  
  adjust_on_large_device = true,
}: {
  rank: number | string, // number and strings accepted for simplicity in usage


  adjust_on_large_device?: boolean
}): React.ReactNode => {
  // using the Card Component of shadcn/ui as well as it's associated Components
  return (
  <Card className={clsx(
    "w-[172px] h-full p-[1rem] flex flex-col gap-3 shrink-0",
    {
      "lg:min-w-[490px] md:h-[221px] md:w-full md:min-w-[260px]": adjust_on_large_device
    }
    )}>
    <CardHeader className="p-0 grow-0 shrink">
      <CardTitle className="text-base font-normal">Rank (World)</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-center items-center p-0 grow shrink">
      <p className="text-5xl p-0 font-extrabold inline">
        #{rank}
      </p>
    </CardContent>
  </Card>)
}


// HappinessScoreProgressCard Component
// Provides a Progress-bar view of a Happiness Score. Progress-bar ranges from 0 to 10
const HappinessScoreProgressCard = ({
  score,

  
  adjust_on_large_device = true,
}: {
  score: HappinessScore,
  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {
  // using the Card Component of shadcn/ui as well as it's associated Components
  return (
    <Card className={clsx(
      "w-[302px] h-full p-[1rem] flex flex-col gap-3 shrink-0",
      {
        "lg:min-w-[490px] md:h-[221px] md:w-full md:min-w-[260px]": adjust_on_large_device,
      }
    )}>
      <CardHeader className="p-0 grow-0 shrink">
        <CardTitle className="text-base font-normal">Happiness Score</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grow shrink flex items-center justify-center">
        <div className="w-full max-w-[302px] gap-3 flex flex-col">
          <div className="flex justify-center items-center gap-3 w-[100%]">
            <span className="font-semibold text-lg grow-0">0</span>
            {/* Progress-bar component provided by shadcn/ui */}
            <Progress value={score.score * 10} className="grow [&_div]:bg-chart-1"></Progress>
            <span className="font-semibold text-lg grow-0">10</span>
          </div>
          <div className="flex justify-center">
            <p className="font-semibold text-3xl">{score.score.toFixed(3)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



// ScoreHistoryCard component
const ScoreHistoryCard = ({
  scoreHistory, 
  label,
  adjust_on_large_device = true,
}: {
  scoreHistory: HappinessScore[], 
  label: string,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  // Initialize Data and Config
  const chartData: YearLineChartData[] = []
  const chartConfig: YearLineChartConfig = {label: label} as YearLineChartConfig

  // Format data to required type
  scoreHistory.forEach((score) => {
    chartData.push({
      year: score.year,
      value: score.score,
    } as YearLineChartData)
  })

  // Use custom YearLineChartDots component (see custom-line-chart.tsx)
  return <YearLineChartDots chartData={chartData} chartConfig={chartConfig} adjust_on_large_device={adjust_on_large_device}/>
}



// ContributingFactorsCard component
const ContributingFactorsCard = ({
  detailedHappinessScore,

  
  adjust_on_large_device = true,
}: {
  detailedHappinessScore: DetailedHappinessScore,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {
  // Use custom FactorsRadialBarChart component (see custom-radial-bar-chart.tsx)
  return (<FactorsRadialBarChart detailedHappinessScore={detailedHappinessScore} adjust_on_large_device={adjust_on_large_device}/>)
}



// DemographicCompositionCard component
const DemographicCompositionCard = ({
  demographicComposition,

  
  adjust_on_large_device = true,
}: {
  demographicComposition: DemographicComposition,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {
  // Use custom DemographicCompositionBarChart component (see custom-bar-chart.tsx)
  return (<DemographicCompositionBarChart demographicComposition={demographicComposition} adjust_on_large_device={adjust_on_large_device}/>)
}





// exported Cards
export {
  TitleCard,
  RankCard,
  HappinessScoreProgressCard,
  ScoreHistoryCard,
  ContributingFactorsCard,
  DemographicCompositionCard
}
