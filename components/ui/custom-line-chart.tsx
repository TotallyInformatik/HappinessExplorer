"use client"


import { CartesianGrid, Label, LabelList, Line, LineChart, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import clsx from "clsx"



export type YearLineChartData = {
  year: number | string,
  value: number,
  value2?: number,
  value3?: number,
  value4?: number,
}

export type YearLineChartConfig = {
  label: string,
  label2?: string,
  label3?: string,
  label4?: string,
}


export const YearLineChartDots = ({
  title = null,
  lineCount = 1,
  chartData,
  chartConfig,
  className,
  cardHeader,


  adjust_on_large_device = true,
}: {
  title?: string | null,
  lineCount?: 1 | 2 | 3 | 4,
  chartData: YearLineChartData[],
  chartConfig: YearLineChartConfig,
  className?: string,
  cardHeader?: React.ReactNode,

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  const padding = 1
  const maxData = getLargestValue(chartData)
  const upperBound = maxData + padding
  const minData = getSmallestValue(chartData)
  const lowerBound = minData - padding

  const tickCount = 5
  const tickInterval = (upperBound - lowerBound) / tickCount
  const ticks = Array.from({ length: tickCount },(_, i) => lowerBound + i * tickInterval)



  const config = {
    value: {
      label: chartConfig.label,
      color: "hsl(var(--chart-1))"
    }
  }

  return (
    <Card className={clsx(
      "max-w-[435px] w-full h-full p-3 flex flex-col shrink-0 gap-3",
      {
        "md:max-w-full": adjust_on_large_device,
      }
    )}>
      {(cardHeader ? cardHeader : (title ? (
        <CardHeader className="p-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      ) : null))}

      <CardContent className={clsx(
        "p-0 max-w-[435px] h-full",
        {
          "md:flex md:justify-center md:max-w-full md:w-full": adjust_on_large_device
        }
      )}>
        <div className="max-w-[435px] p-0 h-[calc(100%-2.25rem)]">
          <ChartContainer config={config} className="h-full w-full text-black">
            <LineChart
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
  let smallest: number | null = null;

  data.forEach((entry) => {
    // Collect all defined numeric values in the entry
    const values = [entry.value, entry.value2, entry.value3, entry.value4].filter(
      (v): v is number => v !== undefined
    );

    // Find the smallest value in the current entry
    const minInEntry = Math.min(...values);

    // Update the smallest value found so far
    if (smallest === null || minInEntry < smallest) {
      smallest = minInEntry;
    }
  });

  return (smallest ? smallest : 0);
}

function getLargestValue(data: YearLineChartData[]): number {
  let largest: number | null = null;

  data.forEach((entry) => {
    // Collect all defined numeric values in the entry
    const values = [entry.value, entry.value2, entry.value3, entry.value4].filter(
      (v): v is number => v !== undefined
    );

    // Find the smallest value in the current entry
    const maxInEntry = Math.max(...values);

    // Update the smallest value found so far
    if (largest === null || maxInEntry > largest) {
      largest = maxInEntry;
    }
  });

  return (largest ? largest : 10);
}









