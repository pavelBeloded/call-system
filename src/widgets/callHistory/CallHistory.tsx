import { useNavigate, useSearch } from "@tanstack/react-router"
import { useCalls } from "@/entities/call/api/useCalls"
import { DataTable } from "./DataTable"
import { columns } from "./columns"
import { Card } from "@/components/ui/card"

export function CallHistory() {
  const { data: calls, isLoading, error } = useCalls()

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

  if (isLoading) {
    return (
      <Card className="p-8 flex justify-center items-center min-h-100">
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

  return (
    <Card className="border-none shadow-none bg-transparent">
        <h1 className="text-3xl font-bold text-[#1a1c1e]">Call history</h1>

      <DataTable 
        columns={columns} 
        data={calls || []} 
        selectedId={search.callId}
        onRowClick={(row) => handleRowClick(row.id)}
      />
    </Card>
  )
}