"use cache"
import { getLeads } from "@/action/action"
import { CreateLead } from "@/components/molecules/create-lead"
import LeadSearchInput from "@/components/ui/lead-search-input"
import LeadSizeInput from "@/components/ui/lead-size-input"
import Pagination from "@/components/ui/pagination"
import { unstable_cacheLife as cacheLife } from "next/cache"
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface LeadsContentProps {
  status: string
  search?: string
  pageSize?: number
  page?: number
}

export default async function LeadsContent({
  status,
  search,
  page,
  pageSize,
}: LeadsContentProps) {
  cacheLife("minutes")
  const { leads, total } = await getLeads({ status, page, pageSize, search })
  return (
    <div className="space-y-4">
      <CreateLead />
      <div className="flex items-center gap-2 mb-2">
        <LeadSearchInput />
        <LeadSizeInput />
      </div>
      <DataTable columns={columns} data={leads} />
      <Pagination total={total} />
    </div>
  )
}
