import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { name: "All", href: "/ma/leads" },
  { name: "New", href: "/ma/leads/new" },
  { name: "Sent", href: "/ma/leads/sent" },
  { name: "Followed Up", href: "/ma/leads/followed-up" },
  { name: "Failed", href: "/ma/leads/failed" },
  { name: "Converted", href: "/ma/leads/converted" },
  { name: "Deleted", href: "/ma/leads/deleted" },
]

function TabNavigation() {
  const pathname = usePathname()

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm
                ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto py-10 px-24">
      <TabNavigation />
      <div className="mt-6">
        {children}
      </div>
    </div>
  )
} 