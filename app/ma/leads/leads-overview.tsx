import { getLeadStats } from "@/action/action"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function LeadsOverview() {
  const stats = await getLeadStats()

  const statusColors = {
    New: "bg-blue-100 text-blue-800",
    Sent: "bg-yellow-100 text-yellow-800",
    "Followed Up": "bg-orange-100 text-orange-800",
    Failed: "bg-red-100 text-red-800",
    Deleted: "bg-gray-100 text-gray-800",
    Converted: "bg-green-100 text-green-800",
  }

  return (
    <div className="space-y-6 w-full mt-8">
      {/* Total Leads Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Lead Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900">
            {stats.total} Total Leads
          </div>
        </CardContent>
      </Card>

      {/* Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(stats.statusStats).map(([status, count]) => (
          <Card key={status}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {status}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[status as keyof typeof statusColors] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {((count / stats.total) * 100).toFixed(1)}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.total > 0
                ? (
                    ((stats.statusStats["Converted"] || 0) / stats.total) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {(stats.statusStats["New"] || 0) +
                (stats.statusStats["Sent"] || 0) +
                (stats.statusStats["Followed Up"] || 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Failed Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.total > 0
                ? (
                    ((stats.statusStats["Failed"] || 0) / stats.total) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
