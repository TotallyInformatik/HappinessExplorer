"use client";

import { Button } from "@/components/ui/button";
import { getAllCountries } from "@/lib/db_interface";

const testDb = async () => {
    const year = 2024;

    const data = await getAllCountries(year);

    console.log(data);
}

export default function Page() {
    return <div className="w-full flex flex-row justify-center p-10">
        <Button onClick={testDb}>
            Press me
        </Button>
    </div>
}