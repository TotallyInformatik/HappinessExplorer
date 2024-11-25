import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { YearLineChartDots, YearLineChartData, YearLineChartConfig } from "./custom-line-chart"
import { FactorsRadialBarChart } from "./custom-radial-bar-chart"




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
  return <Card className={"w-[172px] h-[221px] p-[1rem] flex flex-col gap-3 shrink-0" + (true ? " md:w-full" : '')}>
    <CardHeader className="p-0 grow-0 shrink">
      <CardTitle className="text-base font-normal">Rank (World)</CardTitle>
    </CardHeader>
    <CardContent className="flex justify-center items-center p-0 grow shrink">
      <p className="text-5xl p-0 font-extrabold inline">
        #{rank}
      </p>
    </CardContent>
  </Card>
}



const HappinessScoreProgressCard = ({score}: {score: HappinessScore}): React.ReactNode => {
  return <Card className={"w-[302px] h-[221px] p-[1rem] flex flex-col gap-3 shrink-0" + (true ? " md:w-full" : '')}>
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



const ScoreHistoryCard = ({scoreHistory, label}: {scoreHistory: HappinessScore[], label: string}): React.ReactNode => {

  const chartData: YearLineChartData[] = []
  const chartConfig: YearLineChartConfig = {label: label} as YearLineChartConfig
  const cardHeader = (
    <CardHeader className="p-0 grow-0 shrink">
      <CardTitle className="text-base font-normal">Score History</CardTitle>
    </CardHeader>)

  scoreHistory.forEach((score) => {
    chartData.push({
      year: score.year,
      value: score.score
    } as YearLineChartData)
  })

  return <YearLineChartDots chartData={chartData} chartConfig={chartConfig} cardHeader={cardHeader}/>
}



const ContributingFactorsCard = ({
  detailedHappinessScore,
}: {
  detailedHappinessScore: DetailedHappinessScore,
}): React.ReactNode => {

  /*const data = [
    { name: 'Log GDP per capita', value: detailedHappinessScore.logGDPPerCapita, fill: '--chart-1' },
    { name: 'Social support', value: detailedHappinessScore.socialSupport, fill: 'hsl(val(--chart-2))' },
    { name: 'Healthy life expectency', value: detailedHappinessScore.healthyLifeExpectency, fill: 'hsl(val(--chart-3))' },
    { name: 'Freedom to make life choices', value: detailedHappinessScore.freedomOfLifeChoices, fill: 'hsl(val(--chart-4))' },
    { name: 'Generosity', value: detailedHappinessScore.generosity, fill: 'hsl(val(--chart-5))' },
    { name: 'Perceptions of corruption', value: detailedHappinessScore.perceptionsOfCorruption, fill: 'hsl(val(--chart-1))' },
    { name: 'Dystopia + residual', value: detailedHappinessScore.dystopiaResidual, fill: 'hsl(val(--chart-2))' },
  ] */


  const data = [
    { name: 'Log GDP per capita', value: detailedHappinessScore.logGDPPerCapita, fill: '#000' },
    { name: 'Social support', value: detailedHappinessScore.socialSupport, fill: '#111' },
    { name: 'Healthy life expectency', value: detailedHappinessScore.healthyLifeExpectency, fill: '#222' },
    { name: 'Freedom to make life choices', value: detailedHappinessScore.freedomOfLifeChoices, fill: '#333' },
    { name: 'Generosity', value: detailedHappinessScore.generosity, fill: '#444' },
    { name: 'Perceptions of corruption', value: detailedHappinessScore.perceptionsOfCorruption, fill: '#555' },
    { name: 'Dystopia + residual', value: detailedHappinessScore.dystopiaResidual, fill: '#666' },
  ] 

  return (<FactorsRadialBarChart chartData={data} detailedHappinessScore={detailedHappinessScore}/>)
}









export {
  RankCard,
  HappinessScoreProgressCard,
  ScoreHistoryCard,
  ContributingFactorsCard
}