"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend, ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

type ChildProps= {
  year: number
  country1 : string
  country2: string
  chartData : {year : number, c1 : number, c2 : number}[]
}

export function Chart2({year, country1, country2, chartData} :ChildProps) {
  const chartConfig = {
    c1: {
      label: country1,
      color: "hsl(var(--chart-1))",
    },
    c2: {
      label: country2,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rank (World) History</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 14,
              right: 14,
              top: 4,
              bottom: 2
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{left: 12, right: 12}}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {country1 || country2 ?
            <ChartLegend content={<ChartLegendContent />} /> : ''}
            {country1 == "" ? '' :
            <Line
              dataKey="c1"
              type="linear"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-1))",
              }}
              activeDot={{
                r: 6,
              }}
            />}
            {country2 == "" ? '' :
            <Line
              dataKey="c2"
              type="linear"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{
                fill: "hsl(var(--chart-2))",
              }}
              activeDot={{
                r: 6,
              }}
            />}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}