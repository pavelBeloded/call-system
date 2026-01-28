import { useNavigate, useSearch } from "@tanstack/react-router"
import { useCalls, AccountStatus, CallType } from "@/entities/call"
import { DataTable } from "./DataTable"
import { columns } from "./columns"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { NewCallDialog } from "../NewCallDialog"

const filterOptions: { label: string; value: AccountStatus | CallType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Missed", value: "missed" },
  { label: "Prospect", value: "prospect" },
  { label: "Lead", value: "lead" },
  { label: "Client", value: "client" },
  { label: "No Account Created", value: "no_account" },
]

export function CallHistory() {
  const { data: calls, isLoading, error } = useCalls()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const search = useSearch({ from: '/communication' })
  const navigate = useNavigate({ from: '/communication' })

  const handleRowClick = (id: string) => {
    navigate({
      search: (prev) => ({ 
        ...prev, 
        callId: id 
      }),
    })
  }

  // Filter and search logic
  const filteredCalls = calls?.filter(call => {
    // Filter by status/type
    if (activeFilter !== "all") {
      if (call.type === activeFilter || call.accountStatus === activeFilter) {
        // Continue to search filter
      } else {
        return false
      }
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        call.phoneNumber.includes(query) ||
        call.contactName?.toLowerCase().includes(query)
      )
    }

    return true
  }) || []

  if (isLoading) {
    return (
      <Card className="p-8 flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <p className="text-sm text-slate-500">Loading call history...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-8 border-red-200 bg-red-50 text-red-700">
        <p className="font-semibold">Error loading data</p>
        <p className="text-sm">{error.message}</p>
      </Card>
    )
  }

  const activeCallCount = filteredCalls.filter(c => c.type === "incoming" || c.type === "outgoing").length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-bold text-gray-900">Call history</h2>
          <span className="text-sm text-gray-500">{activeCallCount} active call{activeCallCount !== 1 ? 's' : ''}</span>
        </div>
        <NewCallDialog />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {filterOptions.map((option) => (
          <Badge
            key={option.value}
            variant={activeFilter === option.value ? "default" : "outline"}
            className={`cursor-pointer px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === option.value
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setActiveFilter(option.value)}
          >
            {option.label}
          </Badge>
        ))}

        {/* Search */}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredCalls} 
        selectedId={search.callId}
        onRowClick={(row) => handleRowClick(row.id)}
      />
    </div>
  )
}
