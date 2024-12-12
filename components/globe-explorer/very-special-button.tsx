'use client'
import { ArrowDown } from "lucide-react"
import { Button } from "../ui/button"

import { useRouter } from "next/navigation";

export default function VerySpecialButton() {
  const router = useRouter();
  return <Button onClick={() => {
    // todo: implement discover button functionality
    router.push("#world-map");
  }}><ArrowDown />Discover</Button>
}