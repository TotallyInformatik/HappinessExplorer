"use client"

import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { DetailedHappinessScore } from "./custom-card";
import { SetStateAction, useEffect, useState } from "react";


// custom type for contributing factors data
type FactorsRadialBarChartData = {
  name: string,
  value: number,
  color: string,
}



// FactorsRadialBarchart
export const FactorsRadialBarChart = ({
  detailedHappinessScore,

  
  adjust_on_large_device = true,
}: {
  detailedHappinessScore: DetailedHappinessScore

  
  adjust_on_large_device?: boolean,
}): React.ReactNode => {
  // which bar part (if any) is hovered?
  const [hoverBar, setHoverBar] = useState<string | boolean>(false)
  
  // generate chart data in correct format
  const data = [
    { name: 'Log GDP per capita', value: detailedHappinessScore.logGDPPerCapita, color: '-chart-1' },
    { name: 'Social support', value: detailedHappinessScore.socialSupport, color: '-chart-2' },
    { name: 'Healthy life expectency', value: detailedHappinessScore.healthyLifeExpectency, color: '-chart-3' },
    { name: 'Freedom to make life choices', value: detailedHappinessScore.freedomOfLifeChoices, color: '-chart-4' },
    { name: 'Generosity', value: detailedHappinessScore.generosity, color: '-chart-5' },
    { name: 'Perceptions of corruption', value: detailedHappinessScore.perceptionsOfCorruption, color: '-chart-6' },
    { name: 'Dystopia + residual', value: detailedHappinessScore.dystopiaResidual, color: '-chart-7' },
  ] as FactorsRadialBarChartData[]

  // reverse for drawing order
  const reversed_data = data.slice().reverse();

  
  // set necessary variables
  const radius = 97 // radius of radial bar
  const multiplier = 180 / detailedHappinessScore.score;
  let cumulativeAngle = 0;


  // using the Card Component of shadcn/ui as well as it's associated Components
  return (
    <Card className={clsx(
      "h-full w-[490px] p-0 shrink-0",
      {
        "lg:min-w-[490px] lg:h-[221px] md:w-full md:min-w-[260px] md:h-[330px] ": adjust_on_large_device,
      }
    )}
    >
      <div
        className={clsx(
          "w-full h-full p-3 overflow-hidden",
        )}
      >
        <CardHeader className="p-0 grow-0 shrink">
          <CardTitle className="text-base font-normal">Contributing Factors</CardTitle>
        </CardHeader>
        <CardContent className={clsx(
          "p-0 grow shrink h-full flex flex-row justify-center items-center gap-3",
          {
            "md:flex-col lg:flex-row": adjust_on_large_device,
          }
        )}>
          <div>
            {/* use custom SVGContainer (see below) */}
            <SVGContainer radius={radius} >
              {/* generate the different parts of the radial bar using the custom HalfRadialPath component (see below) */}
              {reversed_data.map((segment, index) => {
                const startAngle = cumulativeAngle;
                const endAngle = Math.round((startAngle + segment.value * multiplier));
                cumulativeAngle = endAngle;
                
                return (
                  <HalfRadialPath
                    key={index}
                    color={segment.color}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    radius={radius}
                    label={segment.name}
                    currentHover={hoverBar}
                    setOnHover={setHoverBar}
                  />
                );
              })}
              {/* text in the middle of the half circle */}
              <text
                x={"50%"}
                y={radius-10}
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
          {/* custom legend using the CustomLegend component (see below) */}
          <CustomLegend
            data={data}
            currentHover={hoverBar}
            setOnHover={setHoverBar}
          />
          
        </CardContent>
      </div>
      
    </Card>
  )
}



// SVGContainer component
// custom component for custom radial bar
export const SVGContainer = ({
  radius,
  strokeWidth = 16,
  className,
  children,
}: {
  radius: number,
  strokeWidth?: number,
  className?: string,
  children: React.ReactNode,
}) => {
  // calculate size
  const width = radius * 2 + strokeWidth;
  const height = radius + strokeWidth

  // return a svg (container) (including an accessible description)
  return (
    <svg
      width={width}
      height={height}
      className={clsx(
        "",
        className
      )}
      role="img" aria-label="[title + description]"
    >
      <title>[Contributing Factors to Happiness Score]</title>
      <desc>[This is a radial chart, that visually shows the composition of the happiness score of a country]</desc>
      {children}
    </svg>
  );
};



// HalfRadialPath component
// custom component to draw part (or a full) of a half circle
export const HalfRadialPath = ({
  color = '#000000', // default is black
  startAngle,
  endAngle,
  radius,
  strokeWidth = 16,
  label,
  currentHover,
  setOnHover,

}: {
  color?: string; // Color of the path
  startAngle: number; // Starting angle in degrees
  endAngle: number; // Ending angle in degrees
  radius: number; // Radius of the arc
  strokeWidth?: number; // Thickness of the arc
  label: string; // Used for aria label
  currentHover: string | boolean; // Use for on hover color changes
  setOnHover: React.Dispatch<SetStateAction<string | boolean>>; // Used for on hover interactions
}) => {
  // Prevent rendering when startAngle or endAngle is not yet calculated
  if (String(startAngle) === "NaN" || String(endAngle) === "NaN") {
    return <></>
  }

  // Make sure angles are in allowed range (if not adjust them)
  startAngle = (startAngle > 180) ? 180 : (startAngle < 0 ? 0 : startAngle) 
  endAngle = (endAngle > 180) ? 180 : (endAngle < 0 ? 0 : endAngle)

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

  // returns path for an arc that is part of the radial bar
  return (
    <path
      d={pathData}
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      stroke={`hsl(var(-${color}))`}
      style={{
        filter: `saturate(${(currentHover === label || currentHover === false) ? 1 : 0.2}) contrast(${(currentHover === label || currentHover === false) ? 1 : 0.2})`, // greyed out if another part is hovered
        cursor: 'default',
      }}
      aria-label={label} // accessibility support
      onMouseEnter={() => setOnHover(label)} // implement the on hover functionality
      onMouseLeave={() => setOnHover(false)} // implement the on hover functionality
    />
  );
};



// CustomLegend component
const CustomLegend = ({
  data,
  currentHover,
  setOnHover,
}: {
  data: FactorsRadialBarChartData[],
  currentHover: string | boolean
  setOnHover: React.Dispatch<SetStateAction<string | boolean>>
}): React.ReactNode => {

  return (
    <div
      className={clsx(
        "p-3 w-[256px]",
      )}
      style={{
        top: -20,
        left: -20,
      }}
    >
      <ul>
        {data.map((factor, index) => (
          <li key={index} className="flex justify-between items-center text-xs pt-1"
            onMouseEnter={() => setOnHover(factor.name)} // implement the on hover functionality
            onMouseLeave={() => setOnHover(false)} // implement the on hover functionality
          >
            <div className="flex items-center leading-[13px] cursor-default">
              {/* colored square in front of label */}
              <div className={`w-[10px] h-[10px] rounded-[2px] inline-block mr-[5px]`} style={{
                background: `hsl(var(-${factor.color}))`,
                filter: `saturate(${(currentHover === factor.name || currentHover === false) ? 1 : 0.2}) contrast(${(currentHover === factor.name || currentHover === false) ? 1 : 0.2})`, // greyed out if another part is hovered
              }}/>
              {/* label */}
              {factor.name}
            </div>
            {/* score */}
            <span className="font-semibold leading-[13px] cursor-default">
              {factor.value.toFixed(2) /* fixed to two floating pointes */}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}



