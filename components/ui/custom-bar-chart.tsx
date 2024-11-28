"use client"


import clsx from "clsx"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"


export type DemographicComposition = {
  happinessScore_young: number,
  happinessScore_lower_middle: number,
  happinessScore_upper_middle: number,
  happinessScore_old: number,
}

type DemographicChartDataEntry = {
  age_group: 'Young' | 'Lower Middle' | 'Upper Middle' | 'Old',
  happiness_score: number,
}



export const DemographicCompositionBarChart = ({
  demographicComposition,

  
  adjust_on_large_device = true,
}: {
  demographicComposition: DemographicComposition,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  const chartData = [
    {age_group: 'Young', happiness_score: demographicComposition.happinessScore_young},
    {age_group: 'Lower Middle', happiness_score: demographicComposition.happinessScore_lower_middle},
    {age_group: 'Upper Middle', happiness_score: demographicComposition.happinessScore_upper_middle},
    {age_group: 'Old', happiness_score: demographicComposition.happinessScore_old},
  ] as DemographicChartDataEntry[]

  const chartConfig = {
    happiness_score: {
      label: "Happiness score",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig







  return (
    <Card className={clsx(
      "w-[425px] h-full p-[1rem] flex flex-col gap-3 shrink-0",
      {
        "md:w-full md:h-[221px]": adjust_on_large_device,
      }
    )}>
      <CardHeader className="p-0 grow-0 shrink">
        <CardTitle className="text-base font-normal">Demographic Composition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-[425px] p-0 h-[calc(100%-2.25rem)]">
          <ChartContainer config={chartConfig} className="h-full w-full text-black">
            <BarChart
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="age_group"
                type="category"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                hide={true}
                type="number"
                domain={[0, 10]}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey={"happiness_score"}
                fill="var(--color-happiness_score)"
                radius={16}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>

            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}




function getSmallestValue(data: DemographicChartDataEntry[]): number {
  let smallest: number = 10;

  data.forEach((entry) => {
    smallest = smallest > entry.happiness_score ? entry.happiness_score : smallest
  });

  return (smallest);
}

function getLargestValue(data: DemographicChartDataEntry[]): number {
  let largest: number = 10;

  data.forEach((entry) => {
    largest = largest > entry.happiness_score ? entry.happiness_score : largest
  });

  return (largest);
}