"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Chart({ className, children, ...props }: ChartProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
}
