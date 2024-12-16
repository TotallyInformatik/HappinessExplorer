"use client"


import clsx from "clsx"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./chart"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"


// public custom type for demographic composition data
export type DemographicComposition = {
  happinessScore_young: number,
  happinessScore_lower_middle: number,
  happinessScore_upper_middle: number,
  happinessScore_old: number,
}

// private custom type for chart data entry
type DemographicChartDataEntry = {
  age_group: 'Young' | 'Lower Middle' | 'Upper Middle' | 'Old',
  happiness_score: number,
}


// DemographicCompositionBarChart Component
export const DemographicCompositionBarChart = ({
  demographicComposition,

  
  adjust_on_large_device = true,
}: {
  demographicComposition: DemographicComposition,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  // create chart data (as list of DemographicChartDataEntry)
  const chartData = [
    {age_group: 'Young', happiness_score: demographicComposition.happinessScore_young},
    {age_group: 'Lower Middle', happiness_score: demographicComposition.happinessScore_lower_middle},
    {age_group: 'Upper Middle', happiness_score: demographicComposition.happinessScore_upper_middle},
    {age_group: 'Old', happiness_score: demographicComposition.happinessScore_old},
  ] as DemographicChartDataEntry[]


  // create chartConfig (required by shadcn/ui chart implementation)
  const chartConfig = {
    happiness_score: {
      label: "Happiness score",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig


  // custom ticks for horizontal orientation lines in chart
  const tickCount = 5 // 5 horizontal orientation lines in the chart
  const tickInterval = 10 / tickCount // calculate tickInterval ( = 2)
  const ticks = Array.from({ length: tickCount + 2},(_, i) => i * tickInterval) // create ticks array ranging from 0 to 10





  // using the Card component of shadcn/ui and it's associated components (e.g. CardHeader, CardContent, ...)
  return (
    <Card className={clsx(
      "w-[425px] h-full p-3 flex flex-col gap-3 shrink-0",
      {
        "lg:min-w-[490px] md:h-[221px] md:w-full md:min-w-[260px]": adjust_on_large_device,
      }
    )}>
      <CardHeader className="p-0 grow-0 shrink">
        <CardTitle className="text-base font-normal">Demographic Composition</CardTitle>
      </CardHeader>
      <CardContent className={clsx(
        "p-0 w-full grow shrink-0 h-[calc(100%-2.25rem)]",
        {
          "md:flex md:justify-center md:w-full": adjust_on_large_device
        }
      )}>
        <div className="max-w-[425px] w-full p-0 shrink-0 grow-0 h-full">
          {/* ChartContainer (required and provided by shadcn/ui) */}
          <ChartContainer config={chartConfig} className="h-full w-full"> 
            {/* reacharts (library) bar chart*/}
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{ bottom: -8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="age_group"
                type="category"
                tickLine={false}
                axisLine={false}
                style={{fill: 'black', fontWeight: '500'}}
              />
              <YAxis
                hide={true}
                type="number"
                domain={[0, 10]}
                ticks={ticks} // calculated ticks
              />
              {/* ChartTooltip of shadcn/ui (internally just a RechartsPrimitive.Tooltip element) */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent // Component provided by shadcn/ui (defines look of the tooltip) 
                  indicator="line"/>}
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