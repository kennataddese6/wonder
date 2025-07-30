"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { name: "All", href: "/ma/leads", icon: "📊" },
  { name: "New", href: "/ma/leads/new", icon: "🆕" },
  { name: "Sent", href: "/ma/leads/sent", icon: "📤" },
  { name: "Followed Up", href: "/ma/leads/followed-up", icon: "🔄" },
  { name: "Failed", href: "/ma/leads/failed", icon: "❌" },
  { name: "Converted", href: "/ma/leads/converted", icon: "✅" },
  { name: "Deleted", href: "/ma/leads/deleted", icon: "🗑️" },
]

function TabNavigation() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <nav className="flex space-x-1" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10
                  ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-gray-700 border-b-2 border-transparent"
                  }
                `}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                </div>
                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
} 