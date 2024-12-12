"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

type ChildProps= {
  year: number
  country1 : string
  country2: string
  chartData : {year : number, c1 : number, c2 : number}[]
}

export function Chart1({year, country1, country2, chartData} :ChildProps) {

  // const chartData = [
  //   { month: "2019", desktop: 186, mobile: 80 },
  //   { month: "2020", desktop: 305, mobile: 200 },
  //   { month: "2021", desktop: 237, mobile: 120 },
  //   { month: "2022", desktop: 73, mobile: 190 },
  //   { month: "2023", desktop: 209, mobile: 130 },
  //   { month: "2024", desktop: 214, mobile: 140 },
  // ]
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
        <CardTitle>Score history</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
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
              // tickFormatter={(value) => value}
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
              type="natural"
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
              type="natural"
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
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}