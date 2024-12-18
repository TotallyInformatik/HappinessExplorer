import { ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Button } from "../ui/button";
import { ChartConfig, ChartContainer } from "../ui/chart";


const chartConfig = {
  score: {
    label: "",
    color: "red"
  }
} satisfies ChartConfig

/**
 * @author Rui Zhang
 * @param selectedCountry - the current selected country passed from the index page
 * @param report - the current selected year passed from the index page
 * @param score - the score of the selected country
 * @param rank - the rank of that country
 * @param selected - if any country is selected at all
 * @returns the react component for the map overlay, showing happiness score of the selected country
 */
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

  if (selected) {
    return <>
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
      <div className='w-[200px] aspect-square'>
        <ChartContainer
          config={chartConfig}
          className="mx-auto min-w-1 aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={[{
              score: score,
              // todo: do we need this line? fill: "hsl(var(--chart-1)",

            }]}
            startAngle={90}
            endAngle={450 * score / 10}
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
            <RadialBar dataKey="score" background cornerRadius={10} className="fill-foreground"/>
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
                          y={(viewBox.cy || 0) - 8}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {score?.toPrecision(3)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground"
                        >
                          Happiness Score
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 30}
                          className="fill-muted-foreground"
                        >
                          (1 - 10)
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
  } else {
    return <></>;
  }
}