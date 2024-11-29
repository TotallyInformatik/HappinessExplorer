"use client"

import clsx from "clsx";
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { DetailedHappinessScore } from "./custom-card";
// import { useEffect, useState } from "react";



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
  /*
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [openedUsingFocus, setOpenedUsingFocus] = useState<boolean>(false);
  const [mouseHover, setMouseHover] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [popoverPosition, setPopoverPosition] = useState<'left' | 'right' | 'middle'>('middle');
  


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
  */

  
  const data = [
    { name: 'Log GDP per capita', value: detailedHappinessScore.logGDPPerCapita, color: '-chart-1' },
    { name: 'Social support', value: detailedHappinessScore.socialSupport, color: '-chart-2' },
    { name: 'Healthy life expectency', value: detailedHappinessScore.healthyLifeExpectency, color: '-chart-3' },
    { name: 'Freedom to make life choices', value: detailedHappinessScore.freedomOfLifeChoices, color: '-chart-4' },
    { name: 'Generosity', value: detailedHappinessScore.generosity, color: '-chart-5' },
    { name: 'Perceptions of corruption', value: detailedHappinessScore.perceptionsOfCorruption, color: '-chart-6' },
    { name: 'Dystopia + residual', value: detailedHappinessScore.dystopiaResidual, color: '-chart-7' },
  ] as FactorsRadialBarChartData[]

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
      "h-full w-[490px] p-0 shrink-0",
      {
        "md:w-full md:h-[221px]": adjust_on_large_device,
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
        <CardContent className="p-0 grow shrink h-full flex flex-row justify-center items-center gap-3">
          <div>
            <SVGContainer radius={radius} >
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
                  />
                );
              })}
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
            {/*<CustomPopover 
              data={data} 
              visible={isPopoverVisible}
              openedUsingFocus={openedUsingFocus}
              mousePosition={mousePosition}
            />*/}
          </div>
          <CustomLegend
            data={data}
          />
          
        </CardContent>
      </div>
      
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
      role="img" aria-label="[title + description]"
    >
      <title>[Contributing Factors to Happiness Score]</title>
      <desc>[This is a radial chart, that visually shows the composition of the happiness score of a country]</desc>
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
  label: string; // used for aria label
};

export const HalfRadialPath: React.FC<RadialPathProps> = ({
  color = '#000000',
  startAngle,
  endAngle,
  radius,
  strokeWidth = 16,
  label

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
      aria-label={label}
    />
  );
};




const CustomLegend = ({
  data,
}: {
  data: FactorsRadialBarChartData[],
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
      <ul className="space-y-1">
        {data.map((factor, index) => (
          <li key={index} className="flex justify-between items-center text-xs">
            <div className="flex items-center leading-[13px]">
              <div className={`w-[10px] h-[10px] rounded-[2px] inline-block mr-[5px]`} style={{background: `hsl(var(-${factor.color}))`}}/>
              {factor.name}
            </div>
            <span className="font-semibold leading-[13px]">
              {factor.value.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}


/*
const CustomPopover = ({
  data,
  visible,
  openedUsingFocus,
  mousePosition,
}: {
  data: FactorsRadialBarChartData[],
  visible: boolean,
  openedUsingFocus: boolean,
  mousePosition: { x: number, y: number},
}): React.ReactNode => {
  return (
    <div
      className={clsx(
        "absolute p-3 bg-white border rounded-lg shadow-lg w-[256px] translate-x-[-100%] transition-transform ease-out duration-500 translate-y-[-20px]",
        {
          'opacity-0 ': !visible,
          'translate-y-[0px]': visible,
        }
      )}
      style={{
        top: -20,
        left: -20,
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
  )
}
*/



