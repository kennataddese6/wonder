import { getLeads } from "@/action/action"
import { CreateLead } from "@/components/molecules/create-lead"
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface LeadsContentProps {
  statusFilter?: string
}

export default async function LeadsContent({
  statusFilter,
}: LeadsContentProps) {
  const data = await getLeads(statusFilter)

  return (
    <div>
      <CreateLead />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
