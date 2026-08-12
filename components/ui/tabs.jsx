"use client"

import * as React from "react"
import { cva } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn("group/tabs flex gap-3 data-horizontal:flex-col", className)}
      {...props} />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-full border-2 border-[#1a1a1a] p-1 text-[#6d6d63] group-data-horizontal/tabs:h-12 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none data-[variant=line]:border-x-0 data-[variant=line]:border-t-0",
  {
    variants: {
      variant: {
        default: "bg-[#e4e4d0]/55",
        line: "gap-2 bg-transparent px-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props} />
  );
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-transparent px-4 py-1 text-sm font-medium whitespace-nowrap text-[#6d6d63] transition-[background-color,border-color,color] duration-200 group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-[#1a1a1a] focus-visible:border-[#034f46] focus-visible:ring-2 focus-visible:ring-[#034f46]/25 disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 group-data-[variant=default]/tabs-list:data-active:border-[#1a1a1a] group-data-[variant=default]/tabs-list:data-active:bg-[#f0d7ff] group-data-[variant=default]/tabs-list:data-active:text-[#1a1a1a] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-1 group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:text-primary",
        "after:absolute after:bg-primary after:opacity-0 after:transition-opacity after:duration-200 group-data-horizontal/tabs:after:inset-x-1 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-px group-data-vertical/tabs:after:inset-y-1 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-px group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props} />
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props} />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
