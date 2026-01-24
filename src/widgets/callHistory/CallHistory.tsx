import { useNavigate, useSearch } from "@tanstack/react-router"
import { useCalls } from "@/entities/call/api/useCalls"
import { DataTable } from "./DataTable"
import { columns } from "./columns"
import { Card } from "@/components/ui/card"

export function CallHistory() {
  // 1. Получаем данные из кэша TanStack Query
  const { data: calls, isLoading, error } = useCalls()

  // 2. Работаем с URL через TanStack Router
  // 'from' гарантирует строгую типизацию параметров из роута /communication
  const search = useSearch({ from: '/communication' })
  const navigate = useNavigate({ from: '/communication' })

  // 3. Обработчик клика: обновляем только callId в URL, сохраняя остальные параметры
  const handleRowClick = (id: string) => {
    navigate({
      search: (prev) => ({ 
        ...prev, 
        callId: id 
      }),
    })
  }

  // Обработка состояний загрузки и ошибки
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

  return (
    <Card className="border-none shadow-none bg-transparent">
      {/* 
        Передаем callId в таблицу для подсветки активной строки.
        DataTable должен принимать selectedId и onRowClick.
      */}
      <DataTable 
        columns={columns} 
        data={calls || []} 
        // selectedId={search.callId}
        onRowClick={(row) => handleRowClick(row.id)}
      />
    </Card>
  )
}