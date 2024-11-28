import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { YearLineChartDots, YearLineChartData, YearLineChartConfig } from "./custom-line-chart"
import { FactorsRadialBarChart } from "./custom-radial-bar-chart"
import clsx from "clsx"
import { DemographicComposition, DemographicCompositionBarChart } from "./custom-bar-chart"




export type HappinessScore = {
  year: number | string,
  score: number,
}

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



const RankCard = ({rank}: {rank: number | string}): React.ReactNode => {
  return <Card className={"w-[172px] h-[221px] p-[1rem] flex flex-col gap-3 shrink-0" + (false ? " md:w-full" : '')}>
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



const HappinessScoreProgressCard = ({score}: {score: HappinessScore}): React.ReactNode => {
  return <Card className={"w-[302px] h-[221px] p-[1rem] flex flex-col gap-3 shrink-0" + (false ? " md:w-full" : '')}>
  <CardHeader className="p-0 grow-0 shrink">
    <CardTitle className="text-base font-normal">Happiness Score</CardTitle>
  </CardHeader>
  <CardContent className="p-0 grow shrink flex items-center justify-center">
    <div className="w-[100%] max-w-[302px] gap-3 flex flex-col">
      <div className="flex justify-center items-center gap-3 w-[100%]">
        <span className="font-semibold text-lg grow-0">0</span>
        <Progress value={score.score * 10} className="grow"></Progress>
        <span className="font-semibold text-lg grow-0">10</span>
      </div>
      <div className="flex justify-center">
        <p className="font-semibold text-3xl">{score.score}</p>
      </div>
    </div>
  </CardContent>
</Card>
}



const ScoreHistoryCard = ({
  scoreHistory, 
  label,

  
  adjust_on_large_device = true,
}: {
  scoreHistory: HappinessScore[], 
  label: string,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  const chartData: YearLineChartData[] = []
  const chartConfig: YearLineChartConfig = {label: label} as YearLineChartConfig
  const cardHeader = (
    <CardHeader className="p-0 grow-0 shrink">
      <CardTitle className="text-base font-normal">Score History</CardTitle>
    </CardHeader>)

  scoreHistory.forEach((score) => {
    chartData.push({
      year: score.year,
      value: score.score,
    } as YearLineChartData)
  })

  return <YearLineChartDots chartData={chartData} chartConfig={chartConfig} cardHeader={cardHeader} adjust_on_large_device={adjust_on_large_device}/>
}




const ContributingFactorsCard = ({
  detailedHappinessScore,

  
  adjust_on_large_device = true,
}: {
  detailedHappinessScore: DetailedHappinessScore,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  // return (<FactorsRadialBarChart detailedHappinessScore={detailedHappinessScore} adjust_on_large_device={adjust_on_large_device}/>)

  return (<FactorsRadialBarChart detailedHappinessScore={detailedHappinessScore} adjust_on_large_device={adjust_on_large_device}/>)
}


const DemographicCompositionCard = ({
  demographicComposition,

  
  adjust_on_large_device = true,
}: {
  demographicComposition: DemographicComposition,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {
  return (<DemographicCompositionBarChart demographicComposition={demographicComposition} adjust_on_large_device={adjust_on_large_device}/>)
}






export {
  RankCard,
  HappinessScoreProgressCard,
  ScoreHistoryCard,
  ContributingFactorsCard,
  DemographicCompositionCard
}