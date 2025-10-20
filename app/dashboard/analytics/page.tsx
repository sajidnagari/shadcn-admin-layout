import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Overview } from "@/components/dashboard/overview"
  import { TimeRangeSelector } from "@/components/dashboard/analytics/time-range-selector"
  import { VisitsChart } from "@/components/dashboard/analytics/visits-chart"
  
  type Metric = {
    title: string
    value: string
    changeText: string
  }

  function StatCard({ title, value, changeText }: Metric) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{changeText}</p>
        </CardContent>
      </Card>
    )
  }

  export default function AnalyticsPage() {
    const metrics: Metric[] = [
      { title: "Total Visits", value: "145,694", changeText: "+12.3% from last month" },
      { title: "Bounce Rate", value: "32.1%", changeText: "-2.4% from last month" },
      { title: "Average Session", value: "4m 32s", changeText: "+12.3% from last month" },
      { title: "Conversion Rate", value: "2.4%", changeText: "+4.1% from last month" },
    ]
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <TimeRangeSelector />
        </div>
  
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ title, value, changeText }) => (
            <StatCard key={title} title={title} value={value} changeText={changeText} />
          ))}
        </div>
  
        <div className="grid gap-6 md:grid-cols-2">
          <VisitsChart />
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }