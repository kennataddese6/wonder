"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const Pagination = ({ total }: { total: number }) => {
  const searchParams = useSearchParams()

  const pathname = usePathname()
  const { replace } = useRouter()
  const [page, setPage] = useState(1)
  const pageSize = Number(searchParams.get("size")?.toString()) || 10
  const totalPages = Math.ceil(total / pageSize)

  function handlePage(term: number) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("page", term.toString())
    } else {
      params.delete("page")
    }
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="flex items-center justify-between mt-2">
      <span className="text-sm text-gray-600">
        Page {Number(searchParams.get("page")?.toString()) || 1} of{" "}
        {totalPages || 1} ({total} leads)
      </span>
      <div className="flex gap-2">
        <button
          onClick={() =>
            handlePage(
              searchParams.get("page")
                ? Number(searchParams.get("page")) - 1
                : 1,
            )
          }
          disabled={Number(searchParams.get("page")?.toString()) === 1}
          className="border rounded px-2 py-1 text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() =>
            handlePage(
              searchParams.get("page")
                ? Number(searchParams.get("page")) + 1
                : 1,
            )
          }
          disabled={
            Number(searchParams.get("page")?.toString()) === totalPages ||
            totalPages === 0
          }
          className="border rounded px-2 py-1 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
