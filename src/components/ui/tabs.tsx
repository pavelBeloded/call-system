"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsListVariants = cva(
  "inline-flex items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground group",
  {
    variants: {
      variant: {
        default: "h-9 w-fit",
        line: "bg-transparent border-b border-slate-200 rounded-none w-full justify-start h-auto p-0 space-x-8",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
  VariantProps<typeof tabsListVariants> { }

function TabsList({ className, variant, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant, className }))}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-foreground",

        "group-data-[variant=line]:rounded-none group-data-[variant=line]:border-b-2 group-data-[variant=line]:border-transparent group-data-[variant=line]:bg-transparent group-data-[variant=line]:px-0 group-data-[variant=line]:pb-3",
        "group-data-[variant=line]:data-[state=active]:border-blue-600 group-data-[variant=line]:data-[state=active]:bg-transparent group-data-[variant=line]:data-[state=active]:shadow-none",
        "group-data-[variant=line]:flex-none group-data-[variant=line]:h-auto",

        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };