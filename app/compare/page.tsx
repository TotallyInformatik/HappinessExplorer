'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "@/components/ui/separator"
import {Chart1} from "@/app/compare/linechart_natural"
import {Chart2} from "@/app/compare/linechart_linear"
import React from "react";
// import '@/styles/globals.css';


export default function Page() {
  
  // Write code here
  const [year, setYear] = React.useState(2024);
  const [country1, setCountry1] = React.useState("Finland")
  const [country2, setCountry2] = React.useState("Switzerland")

  const handleYear = (value :string) => {
    setYear(Number.parseInt(value));
  };
  
  const handleC1 = (value :string) => {
    setCountry1(value);
  };
  
  const handleC2 = (value :string) => {
    setCountry2(value);
  };

  return <>
    <div className="flex flex-row px-5 py-2 gap-8 items-center">
    <Select onValueChange={handleYear}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a report" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
          <SelectItem value="2021">2021</SelectItem>
          <SelectItem value="2020">2020</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Separator orientation="vertical" className="w-64, h-16"/>
    <Select onValueChange={handleC1}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Add a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Country1</SelectLabel>
          <SelectItem value="Germany">Germany</SelectItem>
          <SelectItem value="Russia">Russia</SelectItem>
          <SelectItem value="Switzerland">Switzerland</SelectItem>
          <SelectItem value="Finland">Finland</SelectItem>
          <SelectItem value="China">China</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Separator orientation="vertical" className="w-64, h-16"/>
    <Select onValueChange={handleC2}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Add another country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Country2</SelectLabel>
          <SelectItem value="Germany">Germany</SelectItem>
          <SelectItem value="Russia">Russia</SelectItem>
          <SelectItem value="Switzerland">Switzerland</SelectItem>
          <SelectItem value="Finland">Finland</SelectItem>
          <SelectItem value="China">China</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    <Separator/>
    <div className="flex flex-row px-5 py-8 gap-4 w-full justify-center">
      <div className="w-1/2">
      <Chart2 year={year} country1={country1} country2={country2}/>
      </div>
      <div className="w-1/2">
      <Chart1 year={year} country1={country1} country2={country2}/>
      </div>
    </div>
    <Separator/>
  </>
}