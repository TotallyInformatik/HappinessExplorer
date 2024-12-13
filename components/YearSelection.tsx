"use client";

import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from "./ui/select"
import { Year } from "@/lib/db_interface"


type YearSelectionProps = {
    years: Year[],
    defaultYear: Year,
}

export default function YearSelection(props: YearSelectionProps) {
    const [selectedYear, setSelectedYear] = useState<string>(props.defaultYear.toString());

    return <div className="px-6 py-3">
        <Select value={selectedYear}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {props.years.map((year) => (
                        <SelectItem key={year.year} value={year.year.toString()}>{year.year}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>;
}