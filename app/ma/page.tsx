import { Suspense } from "react"
import LeadsOverview from "./leads/leads-overview"

const page = () => {
  return (
    <Suspense fallback={<OverviewLoading />}>
      <LeadsOverview />
    </Suspense>
  )
}

export default page
function OverviewLoading() {
  return (
    <div className="space-y-6 w-full mt-8">
      {/* Overview Cards Skeleton */}
      <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-24 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-20 bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </div>
    </div>
  )
}
