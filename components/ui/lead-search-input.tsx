"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

const LeadSearchInput = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <input
      type="text"
      placeholder="Search leads..."
      defaultValue={searchParams.get("query")?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value)
      }}
      className="border rounded px-2 py-1 text-sm"
    />
  )
}

export default LeadSearchInput
