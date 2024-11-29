"use client"


import { CartesianGrid, Label, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import clsx from "clsx"



export type YearLineChartData = {
  year: number | string,
  value: number,
}

export type YearLineChartConfig = {
  label: string,
}


export const YearLineChartDots = ({
  title = null,
  lineCount = 1,
  chartData,
  chartConfig,
  className,


  adjust_on_large_device = true,
}: {
  title?: string | null,
  lineCount?: 1 | 2 | 3 | 4,
  chartData: YearLineChartData[],
  chartConfig: YearLineChartConfig,
  className?: string,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  const padding = 1
  const maxData = getLargestValue(chartData)
  const upperBound = maxData + padding
  const minData = getSmallestValue(chartData)
  const lowerBound = minData - padding

  const tickCount = 5
  const tickInterval = (upperBound - lowerBound) / tickCount
  const ticks = Array.from({ length: tickCount + 2},(_, i) => lowerBound + i * tickInterval)



  const config = {
    value: {
      label: chartConfig.label,
      color: "hsl(var(--chart-1))"
    }
  }

  return (
    <Card className={clsx(
      "w-[435px] h-full p-3 flex flex-col shrink-0 gap-3",
      {
        "md:w-full md:h-[221px]": adjust_on_large_device,
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
          <ChartContainer config={config} className="h-full w-full text-black">
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
                tickMargin={16} 
                style={{fill: 'black', fontWeight: '500'}}/>
                
              <YAxis
                hide={true}
                type="number"
                domain={[lowerBound, upperBound]}
                ticks={ticks}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line"  />}
              />
              <Line 
                dataKey={'value'}
                type="natural"
                stroke="var(--color-value)"
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








function getSmallestValue(data: YearLineChartData[]): number {
  let smallest: number = 10;

  data.forEach((entry) => {
    smallest = smallest > entry.value ? entry.value : smallest
  });

  return (smallest);
}

function getLargestValue(data: YearLineChartData[]): number {
  let largest: number = 0;

  data.forEach((entry) => {
    largest = largest < entry.value ? entry.value : largest
  });

  return (largest);
}









