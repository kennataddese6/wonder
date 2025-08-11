"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const LeadSizeInput = () => {
  const searchParams = useSearchParams()

  const pathname = usePathname()
  const { replace } = useRouter()
  function handleLeadSize(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("size", term)
    } else {
      params.delete("size")
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <select
      defaultValue={searchParams.get("size")?.toString()}
      onChange={(e) => {
        handleLeadSize(e.target.value)
      }}
      className="border rounded px-2 py-1 text-sm"
    >
      {[10, 20, 50].map((size) => (
        <option key={size} value={size}>
          {size} / page
        </option>
      ))}
    </select>
  )
}

export default LeadSizeInput
