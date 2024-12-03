"use client"

import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { DetailedHappinessScore } from "./custom-card";
import { useEffect, useState } from "react";



type FactorsRadialBarChartData = {
  name: string,
  value: number,
  color: string,
}



export const FactorsRadialBarChart = ({
  detailedHappinessScore,

  
  adjust_on_large_device = true,
}: {
  detailedHappinessScore: DetailedHappinessScore

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [openedUsingFocus, setOpenedUsingFocus] = useState<boolean>(false);
  const [mouseHover, setMouseHover] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [popoverPosition, setPopoverPosition] = useState<'left' | 'right' | 'middle'>('middle');

  
  const data = [
    { name: 'Log GDP per capita', value: detailedHappinessScore.logGDPPerCapita, color: '-chart-1' },
    { name: 'Social support', value: detailedHappinessScore.socialSupport, color: '-chart-2' },
    { name: 'Healthy life expectency', value: detailedHappinessScore.healthyLifeExpectency, color: '-chart-3' },
    { name: 'Freedom to make life choices', value: detailedHappinessScore.freedomOfLifeChoices, color: '-chart-4' },
    { name: 'Generosity', value: detailedHappinessScore.generosity, color: '-chart-5' },
    { name: 'Perceptions of corruption', value: detailedHappinessScore.perceptionsOfCorruption, color: '-chart-1' },
    { name: 'Dystopia + residual', value: detailedHappinessScore.dystopiaResidual, color: '-chart-2' },
  ] as FactorsRadialBarChartData[]


  useEffect(() => {
    const popoverWidth = 256; // Width of the popover
    const offset = 10; // Offset from the cursor
    const windowWidth = window.innerWidth;

    if (mousePosition.x - popoverWidth / 2 + offset > 0 && mousePosition.x + popoverWidth / 2 + offset < windowWidth) {
      setPopoverPosition('middle');
    } else if (mousePosition.x + popoverWidth + offset > windowWidth) {
      setPopoverPosition('left');
    } else {
      setPopoverPosition('right');
    }
  }, [mousePosition]);


  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const reversed_data = data.slice().reverse();

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

  
  const radius = 97
  const multiplier = 180 / detailedHappinessScore.score;
  let cumulativeAngle = 0;


  return (
    <Card className={clsx(
      "h-[200px] w-[302px] p-0 shrink-0",
      {
        "md:w-full": adjust_on_large_device,
        'relative': openedUsingFocus && !mouseHover,
      }
    )}
    >
      <div
        className={clsx(
          "w-full h-full p-3 overflow-hidden",
        )}
        tabIndex={0}
        onMouseEnter={() => {setIsPopoverVisible(true); setMouseHover(true); }}
        onMouseLeave={() => {setIsPopoverVisible(false); setMouseHover(false); }}
        onFocus={() => { setIsPopoverVisible(true); setOpenedUsingFocus(true); }}
        onBlur={() => { setIsPopoverVisible(false); setOpenedUsingFocus(false); }}
        onMouseMove={handleMouseMove}
      >
        <CardHeader className="p-0 grow-0 shrink">
          <CardTitle className="text-base font-normal">Contributing Factors</CardTitle>
        </CardHeader>
        <CardContent className="p-0 grow shrink h-full flex justify-center items-center">
          <div>
            <SVGContainer radius={radius} >
              {reversed_data.map((segment, index) => {
                const startAngle = cumulativeAngle;
                const endAngle = startAngle + segment.value * multiplier;
                cumulativeAngle = endAngle;

                return (
                  <HalfRadialPath
                    key={index}
                    color={segment.color}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    radius={radius}
                  />
                );
              })}
              <text
                x={"50%"}
                y={radius - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-3xl font-bold cursor-default"
              >
                {detailedHappinessScore.score.toFixed(2)}
              </text>
              <text
                x={"50%"}
                y={radius+10}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-normal cursor-default"
                fill={'hsl(var(--slate-500))'}
              >
                Total score
              </text>
            </SVGContainer>
          </div>
          
        </CardContent>
      </div>
      {(isPopoverVisible) && (
        <div
          className="absolute p-3 bg-white border rounded-lg shadow-lg w-[256px]"
          style={{
            top: mouseHover ? mousePosition.y - 10 : 0,
            left: mouseHover ? (popoverPosition === 'middle' ? mousePosition.x - 128 : (popoverPosition === "right" ? mousePosition.x + 10 : mousePosition.x - 266)) : 0,
            transform: `translate(0, -100%)`,
          }}
        >
          <ul className="space-y-1">
            {data.map((factor, index) => (
              <li key={index} className="flex justify-between items-center text-xs">
                <div className="flex items-center">
                  <div className={`w-[10px] h-[10px] rounded-[2px] inline-block mr-[5px]`} style={{background: `hsl(var(-${factor.color}))`}}/>
                  {factor.name}
                </div>
                <span className="font-semibold">
                  {factor.value.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}





type SVGContainerProps = {
  radius: number,
  strokeWidth?: number,
  className?: string,
  children: React.ReactNode,
};

export const SVGContainer: React.FC<SVGContainerProps> = ({
  radius,
  strokeWidth = 16,
  className,
  children,
}) => {
  const width = radius * 2 + strokeWidth;
  const height = radius + strokeWidth

  return (
    <svg
      width={width}
      height={height}
      className={clsx(
        "",
        className
      )}
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
  strokeWidth = 16,
}) => {
  if (startAngle > 180 || startAngle < 0 || endAngle > 180 || endAngle < 0) {
    return null
  }

  // Convert degrees to radians
  const toRadians = (angle: number) => (angle * Math.PI) / 180;

  // Calculate the center of the circle (SVG coordinate system)
  const center_x = radius + strokeWidth / 2;
  const center_y = radius + strokeWidth / 2;

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
      stroke={`hsl(var(-${color}))`}
    />
  );
};








/*
"use client"
import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DetailedHappinessScore } from "./custom-card"
import clsx from "clsx"





export const FactorsRadialBarChart = ({
  detailedHappinessScore,

  
  adjust_on_large_device = true,
}: {
  detailedHappinessScore: DetailedHappinessScore;

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {

  const chartConfig = {
    logGDPPerCapita: {
      label: 'Log GDP per capita',
      color: 'hsl(val(--chart-1))'
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
  } satisfies ChartConfig


  const chartData = [detailedHappinessScore]


  return (
    <Card className={clsx(
      "max-w-[302px] w-full h-full p-3 flex flex-col shrink-0 gap-3",
      {
        "md:max-w-full": adjust_on_large_device,
      }
    )}>
      <CardHeader className="p-0">
        <CardTitle className="text-base font-normal">Contributing Factors</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <div className="max-w-[435px] p-0 h-[calc(100%-2.25rem)]">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full"
          >
            <RadialBarChart
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius={82}
              outerRadius={97}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              
              <PolarAngleAxis
                type="number"
                domain={[0, detailedHappinessScore.score]}
                angleAxisId={0}
                tick={false} // Remove tick labels
              />

              <PolarRadiusAxis 
                tick={false} 
                tickLine={false} 
                axisLine={false}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-2xl font-bold"
                          >
                            {detailedHappinessScore.score}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Total Score
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
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
                fill="hsl(var(--chart-1))"
              />
              <RadialBar
                dataKey="dystopiaResidual"
                stackId="a" // Stack all bars in the same space
                cornerRadius={10} // Rounded corners
                fill="hsl(var(--chart-2))"
              />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

*/