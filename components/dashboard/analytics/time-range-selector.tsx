"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TimeRangeSelector() {
  return (
    <Select defaultValue="7days">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select timeframe" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="3months">Last 3 months</SelectItem>
        <SelectItem value="12months">Last 12 months</SelectItem>
      </SelectContent>
    </Select>
  )
}