"use client"


import { Cell, Customized, Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DetailedHappinessScore, HappinessScore } from "./custom-card"




type FactorsRadialBarChartData = {
  name: string,
  value: number,
  fill: string
}

export const FactorsRadialBarChart = ({
  chartData,
  detailedHappinessScore,
}: {
  chartData: FactorsRadialBarChartData[];
  detailedHappinessScore: DetailedHappinessScore;
}): React.ReactNode => {
  // Prepare data for radial segments
  let data: FactorsRadialBarChartData[] = [];
  let sum = detailedHappinessScore.score;
  for (let i = 0; i < chartData.length; i++) {
    data.push({
      name: chartData[i].name,
      value: chartData[i].value,
      fill: chartData[i].fill,
    });
  }

  // Cumulative end angles
  const multiplier = 180 / detailedHappinessScore.score;
  let cumulativeAngle = 0;

  return (
    <Card className={"w-[302px] h-[221px] p-[1rem] flex flex-col gap-3 shrink-0"}>
      <CardHeader className="p-0 grow-0 shrink">
        <CardTitle className="text-base font-normal">Main Contributing Factors</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grow shrink flex justify-center items-end">
        <SVGContainer radius={50} strokeWidth={10}>
          {data.map((segment, index) => {
            const startAngle = cumulativeAngle;
            const endAngle = startAngle + segment.value * multiplier;
            cumulativeAngle = endAngle;

            return (
              <HalfRadialPath
                key={index}
                color={segment.fill}
                startAngle={startAngle}
                endAngle={endAngle}
                radius={50}
                strokeWidth={10}
              />
            );
          })}
        </SVGContainer>
      </CardContent>
    </Card>
  );
};




/*export const FactorsRadialBarChart = ({
  chartData,
  detailedHappinessScore
}: {
  chartData: FactorsRadialBarChartData[],
  detailedHappinessScore: DetailedHappinessScore,
}): React.ReactNode => {

  let data: FactorsRadialBarChartData[] = []
  let sum = detailedHappinessScore.score
  for (let i = 0; i < 7; i++) {
    data.push({
      name: chartData[i].name,
      value: sum,
      fill: chartData[i].fill
    } as FactorsRadialBarChartData)
    
    sum -= chartData[i].value
  }

  const dataTest = [detailedHappinessScore]

  const config = {
    logGDPPerCapita: {
      label: 'Log GDP per capita',
      fill: 'hsl(val(--chart-1))'
    },
    socialSupport: {
      label: 'Social support',
      color: 'hsl(val(--chart-2))'
    },
    healthyLifeExpectency: {
      label: 'Healthy life expectency',
      color: 'hsl(val(--chart-3))'
    },
    freedomOfLifeChoices: {
      label: 'Freedom to make life choices',
      color: 'hsl(val(--chart-4))'
    },
    generosity: {
      label: 'Generosity',
      color: 'hsl(val(--chart-5))'
    },
    perceptionsOfCorruption: {
      label: 'Perceptions of corruption',
      color: 'hsl(val(--chart-1))'
    },
    dystopiaResidual: {
      label: 'Dystopia + residual',
      color: 'hsl(val(--chart-2))'
    },
  }



  const multiplier = 180 / detailedHappinessScore.score


  
  

  return (
    <Card className={"w-[302px] h-[221px] p-[1rem] flex flex-col gap-3 shrink-0" + (false ? " md:w-full" : '')}>
      <CardHeader className="p-0 grow-0 shrink">
        <CardTitle className="text-base font-normal">Main Contributing Factors</CardTitle>
      </CardHeader>
      <CardContent className="p-0 grow shrink flex justify-center items-end">
      <ChartContainer config={config} className="h-full w-full ">
          <RadialBarChart
            innerRadius="80%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Customized component={
              <SVGContainer radius={50} strokeWidth={10}>
                {data.map((arc, index) => (
                  <HalfRadialPath
                    key={index}
                    color={arc.fill}
                    startAngle={180 - (arc.value * multiplier) }
                    endAngle={180}
                    radius={50}
                    strokeWidth={10}
                  />
                ))}
              </SVGContainer>}/>
          </RadialBarChart>
        </ChartContainer>
        
      </CardContent>
    </Card>
  )
}*/


type SVGContainerProps = {
  radius: number; // Radius of the container
  strokeWidth?: number; // Padding for the container
  children: React.ReactNode; // Path components
};

export const SVGContainer: React.FC<SVGContainerProps> = ({
  radius,
  strokeWidth = 10,
  children,
}) => {
  const size = radius * 2 + strokeWidth;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      {children}
    </svg>
  );
};





type RadialPathProps = {
  color?: string; // Color of the path
  startAngle: number; // Starting angle in degrees
  endAngle: number; // Ending angle in degrees
  radius: number; // Radius of the arc
  strokeWidth?: number; // Thickness of the arc
};

export const HalfRadialPath: React.FC<RadialPathProps> = ({
  color = '#000000',
  startAngle,
  endAngle,
  radius,
  strokeWidth = 10,
}) => {
  if (startAngle > 180 || startAngle < 0 || endAngle > 180 || endAngle < 0) {
    return null
  }

  // Convert degrees to radians
  const toRadians = (angle: number) => (angle * Math.PI) / 180;

  // Calculate the center of the circle (SVG coordinate system)
  const center_x = radius + strokeWidth / 2;
  const center_y = 2*radius

  // Calculate start and end coordinates of the arc
  const x1 = center_x + radius * Math.cos(toRadians(endAngle));
  const y1 = center_y - radius * Math.sin(toRadians(endAngle)); // SVG Y-axis is flipped
  const x2 = center_x + radius * Math.cos(toRadians(startAngle));
  const y2 = center_y - radius * Math.sin(toRadians(startAngle));

  // Large arc flag (1 if the angle > 180°, 0 otherwise)
  const largeArcFlag = startAngle - endAngle > 180 ? 1 : 0;

  // Create the arc path
  const pathData = `
    M ${x1},${y1}
    A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}
  `;

  return (
    <path
      d={pathData}
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      stroke={color}
    />
  );
};







/*



        <ChartContainer config={config} className="h-full w-full ">
          <RadialBarChart
            innerRadius="80%"
            outerRadius="100%"
            data={dataTest}
            startAngle={180}
            endAngle={0}
          >
            <Customized component={}/>

          </RadialBarChart>
        </ChartContainer>




            <PolarAngleAxis
              type="number"
              domain={[0, detailedHappinessScore.score]}
              angleAxisId={0}
              tick={false} // Remove tick labels
            />
            <RadialBar
              background // Adds a background to bars
              dataKey="logGDPPerCapita"
              stackId="a" // Stack all bars in the same space
              cornerRadius={10} // Rounded corners
              fill="hsl(var(--chart-1))"
            />
            <RadialBar
              dataKey="socialSupport"
              stackId="a" // Stack all bars in the same space
              cornerRadius={10} // Rounded corners
              fill="hsl(var(--chart-2))"
            />
            <RadialBar
              dataKey="healthyLifeExpectency"
              stackId="a" // Stack all bars in the same space
              cornerRadius={10} // Rounded corners
              fill="hsl(var(--chart-3))"
            />
            <RadialBar
              dataKey="freedomOfLifeChoices"
              stackId="a" // Stack all bars in the same space
              cornerRadius={10} // Rounded corners
              fill="hsl(var(--chart-4))"
            />
            <RadialBar
              dataKey="generosity"
              stackId="a" // Stack all bars in the same space
              cornerRadius={10} // Rounded corners
              fill="hsl(var(--chart-5))"
            />
            <RadialBar
              dataKey="perceptionsOfCorruption"
              stackId="a" // Stack all bars in the same space
              cornerRadius={10} // Rounded corners
              fill="hsl(var(--chart-6))"
            />
            <RadialBar
              dataKey="dystopiaResidual"
              stackId="a" // Stack all bars in the same space
              cornerRadius={10} // Rounded corners
              fill="hsl(var(--chart-7))"
            />*/


            /*const data = [
    { startAngle: 0, endAngle: 45, color: "#4F46E5" },
    { startAngle: 90, endAngle: 180, color: "#10B981" },
    { startAngle: 180, endAngle: 270, color: "#F97316" },
    { startAngle: 270, endAngle: 360, color: "#FACC15" },
  ];*/