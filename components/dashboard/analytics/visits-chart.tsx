"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const visitData = [
  { date: "2024-03-01", visits: 2500 },
  { date: "2024-03-02", visits: 1498 },
  { date: "2024-03-03", visits: 9800 },
  { date: "2024-03-04", visits: 3908 },
  { date: "2024-03-05", visits: 4800 },
  { date: "2024-03-06", visits: 3800 },
  { date: "2024-03-07", visits: 4300 },
]

export function VisitsChart() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Daily Visits</CardTitle>
        <CardDescription>Number of daily visitors to your site</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={visitData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="visits" 
              stroke="#34ebba" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}