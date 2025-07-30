"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lead = {
  id: number
  email: string
  description: string
  status: "New" | "Sent" | "Followed Up" | "Failed" | "Deleted" | "Converted" | null
  createdAt: Date
  updatedAt: Date
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-500 text-white hover:bg-blue-600"
    case "Sent":
      return "bg-green-500 text-white hover:bg-green-600"
    case "Followed Up":
      return "bg-yellow-500 text-white hover:bg-yellow-600"
    case "Failed":
      return "bg-red-500 text-white hover:bg-red-600"
    case "Deleted":
      return "bg-red-500 text-white hover:bg-red-600"
    case "Converted":
      return "bg-purple-500 text-white hover:bg-purple-600"
    default:
      return "bg-gray-500 text-white hover:bg-gray-600"
  }
}

export const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        aria-label="Select all"
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
        className="h-4 w-4 rounded border-gray-300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string | null
      if (!status) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
            New
          </span>
        )
      }
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      )
    },
  },
]
