import { getDailyLeadStats } from "@/action/action"
import { Suspense } from "react"
import LeadsChart from "./leads/leads-chart"
import LeadsOverview from "./leads/leads-overview"

export default async function Page() {
  const dailyData = await getDailyLeadStats()

  return (
    <div className="space-y-8 w-full">
      <Suspense fallback={<div>Loading overview...</div>}>
        <LeadsOverview />
      </Suspense>

      <Suspense fallback={<div>Loading chart...</div>}>
        <LeadsChart data={dailyData} />
      </Suspense>
    </div>
  )
}
