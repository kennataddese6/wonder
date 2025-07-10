"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lead = {
  id: number
  email: string
  description: string
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
]
