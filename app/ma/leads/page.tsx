import { Suspense } from "react"
import LeadsContent from "./leads-content"

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <LeadsContent />
    </Suspense>
  )
}

function Loading() {
  return (
    <div className="container mx-auto py-10 px-24">
      {/* Create Lead Button Skeleton */}
      <div className="my-5 flex justify-end">
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded" />
      </div>
      
      {/* Table Skeleton */}
      <div className="rounded-md border">
        <div className="border-b">
          <div className="flex h-12 items-center px-4">
            <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
            <div className="flex-1 space-y-2 px-4">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex-1 space-y-2 px-4">
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex-1 space-y-2 px-4">
              <div className="h-4 w-20 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
        
        {/* Table Rows Skeleton */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex h-16 items-center px-4 border-b">
            <div className="h-4 w-4 bg-gray-200 animate-pulse rounded" />
            <div className="flex-1 space-y-2 px-4">
              <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex-1 space-y-2 px-4">
              <div className="h-4 w-64 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="flex-1 space-y-2 px-4">
              <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
