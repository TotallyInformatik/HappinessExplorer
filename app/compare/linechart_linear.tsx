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
}

export function Chart2({year, country1, country2} :ChildProps) {

  const chartData = [
    { month: "2019", desktop: 186, mobile: 80 },
    { month: "2020", desktop: 305, mobile: 200 },
    { month: "2021", desktop: 237, mobile: 120 },
    { month: "2022", desktop: 73, mobile: 190 },
    { month: "2023", desktop: 209, mobile: 130 },
    { month: "2024", desktop: 214, mobile: 140 },
  ]
  const chartConfig = {
    desktop: {
      label: country1,
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: country2,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rank (World) History</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-44 w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 14,
              right: 14,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            />
            <Line
              dataKey="mobile"
              type="linear"
              stroke="blue"
              strokeWidth={2}
              dot={{
                fill: "blue",
              }}
              activeDot={{
                r: 6,
              }}
            />
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