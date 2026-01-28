"use client"

import { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" 

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (data: TData) => void
  selectedId?: string
}

export function DataTable<TData extends { id: string; type: string; accountStatus?: string }, TValue>({
  columns,
  data,
  onRowClick,
  selectedId
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="w-full">
      {/* SEARCH */}
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Search by phone..."
          value={(table.getColumn("phoneNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("phoneNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-2 pb-4">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => {
            table.resetColumnFilters()
          }}
        >
          All
        </Button>
        <Button size="sm" variant="outline" onClick={() => table.getColumn("type")?.setFilterValue("missed")}>
          Missed
        </Button>
        <Button size="sm" variant="outline" onClick={() => table.getColumn("accountStatus")?.setFilterValue("prospect")}>
          Prospect
        </Button>
        <Button size="sm" variant="outline" onClick={() => table.getColumn("accountStatus")?.setFilterValue("lead")}>
          Lead
        </Button>
        <Button size="sm" variant="outline" onClick={() => table.getColumn("accountStatus")?.setFilterValue("client")}>
          Client
        </Button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs uppercase font-semibold text-slate-500">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    "cursor-pointer transition-colors border-b last:border-0",
                    row.original.id === selectedId && "bg-blue-50 hover:bg-blue-100",
                    row.original.type === "missed" && row.original.id !== selectedId && "bg-red-50 hover:bg-red-100",
                    row.original.id !== selectedId && row.original.type !== "missed" && "hover:bg-slate-50"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-slate-400">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}