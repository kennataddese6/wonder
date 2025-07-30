import { getLeads } from "@/action/action"
import { CreateLead } from "@/components/molecules/create-lead"
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface LeadsContentProps {
  statusFilter?: string
}

export default async function LeadsContent({ statusFilter }: LeadsContentProps) {
  const allData = await getLeads()
  
  // Filter data based on status if provided
  const data = statusFilter 
    ? allData.filter(lead => lead.status === statusFilter)
    : allData

  return (
    <div>
      <CreateLead />
      <DataTable columns={columns} data={data} />
    </div>
  )
} 