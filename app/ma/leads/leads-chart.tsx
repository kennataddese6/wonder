"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface DailyLeadData {
  date: string
  leads: number
}

interface LeadsChartProps {
  data: DailyLeadData[]
}

export default function LeadsChart({ data }: LeadsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Lead Registrations (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value) => [`${value} leads`, "Leads"]}
            />
            <Line
              type="monotone"
              dataKey="leads"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
