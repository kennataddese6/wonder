"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lead = {
  id: number
  email: string
  description: string
  status: "new" | "sent" | "followed_up" | "failed" | "deleted" | "converted"
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "sent":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "followed_up":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "failed":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    case "deleted":
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    case "converted":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

export const columns: ColumnDef<Lead>[] = [
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
      const status = row.getValue("status") as string
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      )
    },
  },
]
