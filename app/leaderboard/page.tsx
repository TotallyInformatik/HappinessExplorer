import Leaderboard from "@/components/Leaderboard"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  return <>
    <div className="w-full flex flex-col items-center my-8 gap-4">
      <h1 className="text-3xl font-extrabold">Leaderboard</h1>
      <p className="text-sm text-muted-foreground">See the world champions at a glance</p>
    </div>
    <Separator/>
    <Leaderboard />
  </>
}