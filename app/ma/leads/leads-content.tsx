import { getLeads } from "@/action/action"
import { CreateLead } from "@/components/molecules/create-lead"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function LeadsContent() {
  const data = await getLeads()
  
  return (
    <div className="container mx-auto py-10 px-24">
      <CreateLead />
      <DataTable columns={columns} data={data} />
    </div>
  )
} 