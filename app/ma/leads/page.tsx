import { CreateLead } from "@/components/molecules/create-lead"
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10 px-24">
      <CreateLead />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
