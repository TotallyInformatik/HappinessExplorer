"use client"


import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import clsx from "clsx"


// custom type for chart data entry
export type YearLineChartData = {
  year: number | string,
  value: number,
}

// custom type for required config
export type YearLineChartConfig = {
  label: string,
}


// YearLineChartDots component
// provides a line chart with label year on the x axis and dots at the value points
export const YearLineChartDots = ({
  chartData,
  chartConfig,


  adjust_on_large_device = true,
}: {
  chartData: YearLineChartData[],
  chartConfig: YearLineChartConfig,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {


  // custom ticks for better visual experience
  const padding = 1 // padding for chart
  const maxData = getLargestValue(chartData) // get largest value in chartData
  const upperBound = maxData + padding // calculate upper bound
  const minData = getSmallestValue(chartData) // get smallest value in chartData
  const lowerBound = minData - padding // calculate lower bound

  const tickCount = 5 // 5 horizontal orientation lines
  const tickInterval = (upperBound - lowerBound) / tickCount // calculate tick (line) intervall
  const ticks = Array.from({ length: tickCount + 2},(_, i) => lowerBound + i * tickInterval) // create list ticks



  const config = {
    value: {
      label: chartConfig.label,
      color: "hsl(var(--chart-1))" // --chart-1 is provided by shadcn/ui
    }
  }

  // using the Card Component of shadcn/ui as well as it's associated Components
  return (
    <Card className={clsx(
      "w-[435px] h-full p-3 flex flex-col shrink-0 gap-3",
      {
        "lg:min-w-[490px] md:h-[221px] md:w-full md:min-w-[260px]": adjust_on_large_device,
      }
    )}>
      <CardHeader className="p-0 grow-0 shrink-0">
        <CardTitle className="text-base font-normal">Score History</CardTitle>
      </CardHeader>
      <CardContent className={clsx(
        "p-0 w-full grow-0 shrink-0 h-[calc(100%-2.25rem)]",
        {
          "md:flex md:justify-center md:w-full": adjust_on_large_device
        }
      )}>
        <div className="max-w-[435px] w-full p-0 h-full">
          {/* ChartContainer (required and provided by shadcn/ui) */}
          <ChartContainer config={config} className="h-full w-full text-black">
            {/* reacharts (library) line chart*/}
            <LineChart
              accessibilityLayer
              data={chartData}
            >
              <CartesianGrid vertical={false}/>
              <XAxis 
                dataKey="year"
                tickLine={false} 
                axisLine={false} 
                type="category" 
                padding={{left: 12, right: 12}}
                tickMargin={16} // add tick margin on x axis, to make sure the labels can be printed
                className="font-medium fill-black dark:fill-white"
              />
              <YAxis
                hide={true}
                type="number"
                domain={[lowerBound, upperBound]}
                ticks={ticks} // use calculated ticks array
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line"  labelClassName="dark:text-white"/>}
              />
              <Line // draw line
                dataKey={'value'}
                type="natural"
                stroke="var(--color-value)" // use set color (the one that is set in chartConfig)
                strokeWidth={2}
                dot={{
                  fill: "var(--color-value)",
                }}
                activeDot={{
                  r: 6,
                }}
              > 
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                /> 
              </Line>
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}







// simple function to get the smallest score value of a list of YearLineChartData elements
function getSmallestValue(data: YearLineChartData[]): number {
  let smallest: number = 10; // initial value is 10, as the max score is 10

  data.forEach((entry) => {
    smallest = smallest > entry.value ? entry.value : smallest
  });

  return (smallest);
}


// simple function to get the largest score value of a list of YearLineChartData elements
function getLargestValue(data: YearLineChartData[]): number {
  let largest: number = 0; // initial value is 0, as the min score is 0

  data.forEach((entry) => {
    largest = largest < entry.value ? entry.value : largest
  });

  return (largest);
}









