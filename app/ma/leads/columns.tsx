"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lead = {
  id: number
  email: string
  description: string
  status: "new" | "sent" | "followed_up" | "failed" | "deleted" | "converted" | null
  createdAt: Date
  updatedAt: Date
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-500 text-white hover:bg-blue-600"
    case "sent":
      return "bg-green-500 text-white hover:bg-green-600"
    case "followed_up":
      return "bg-yellow-500 text-white hover:bg-yellow-600"
    case "failed":
      return "bg-red-500 text-white hover:bg-red-600"
    case "deleted":
      return "bg-gray-500 text-white hover:bg-gray-600"
    case "converted":
      return "bg-purple-500 text-white hover:bg-purple-600"
    default:
      return "bg-gray-500 text-white hover:bg-gray-600"
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
      const status = row.getValue("status") as string | null
      if (!status) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500 text-white">
            new
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
