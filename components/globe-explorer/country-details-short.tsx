import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";


const chartConfig = {
  score: {
    label: "",
    color: "red"
  }
} satisfies ChartConfig

export default function CountryDetailsShort({
  selectedCountry,
  report,
  score,
  rank,
  selected,
} : {
  selectedCountry: string,
  report: string,
  score: number,
  rank: number,
  selected: boolean
}) {

  const router = useRouter();

  return <>
      {
        selected && <>
        <header className='flex justify-between items-start'>
          <section>
            <h2 className='text-xl'>{selectedCountry}</h2>
            <p className='text-sm opacity-50'>in {report}</p>
          </section>
        </header>
        <section className='flex flex-col gap-y-4 items-center justify-evenly p-5'>
          <p>Rank (World)</p>
          <p className="text-5xl p-0 font-extrabold inline">
            #{rank}
          </p>
          <p>
            Happiness Score
            <span className='text-sm opacity-50 block text-center'>from 0 to 10</span>
          </p>
          <div className='w-[200px] aspect-square'>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <RadialBarChart
                data={[{
                  score: score,
                  // todo: do we need this line? fill: "hsl(var(--chart-1)",

                }]}
                startAngle={0}
                endAngle={360 * score / 10}
                innerRadius={80}
                outerRadius={110}
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="first:fill-muted last:fill-background"
                  polarRadius={[86, 74]}
                />
                <RadialBar dataKey="score" background cornerRadius={10} />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-4xl font-bold"
                            >
                              {score?.toPrecision(3)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              ladderscore
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
              </RadialBarChart>
            </ChartContainer>
          </div>
          <Button onClick={() => {
            router.push("#details");
          }}><ArrowDown />See details</Button>
        </section>
        </>
      }
  </>
}