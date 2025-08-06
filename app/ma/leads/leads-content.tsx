"use client"

import { getLeads } from "@/action/action"
import { CreateLead } from "@/components/molecules/create-lead"
import { useEffect, useState } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface LeadsContentProps {
  statusFilter?: string
}

export default function LeadsContent({ statusFilter }: LeadsContentProps) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("")
  const [leads, setLeads] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getLeads({ status: statusFilter, page, pageSize, search }).then((res) => {
      setLeads(res.leads)
      setTotal(res.total)
      setLoading(false)
    })
  }, [statusFilter, page, pageSize, search])

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="space-y-4">
      <CreateLead />
      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => {
            setPage(1)
            setSearch(e.target.value)
          }}
          className="border rounded px-2 py-1 text-sm"
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPage(1)
            setPageSize(Number(e.target.value))
          }}
          className="border rounded px-2 py-1 text-sm"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
      <DataTable columns={columns} data={leads} />
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages || 1} ({total} leads)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            className="border rounded px-2 py-1 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || loading || totalPages === 0}
            className="border rounded px-2 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
