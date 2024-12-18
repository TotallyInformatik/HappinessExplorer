"use client";

import { Year } from "@/lib/db_interface";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";


type YearSelectionProps = {
    years: Year[],
    value: number,
    setValue: (v: number) => void,
    onChange: (year: number) => Promise<void>,
}

export default function YearSelection(props: YearSelectionProps) {

    return <div className="px-6 py-3 flex gap-5 items-center" >
        <Label htmlFor="year-select">Select a year:</Label>
        <div id="year-select">
            <Select value={props.value.toString()} onValueChange={async (value) => {
                console.log("Changed");
                const newValue = parseInt(value);
                props.setValue(newValue);
                await props.onChange(newValue);
            }}>
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
        </div>
    </div>;
}