import { useTasks } from "@/entities/task";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { Card } from "@/components/ui/card";
import { LoadingError } from "@/components/ErrorDisplay";

export function TaskTable() {
  const { data: tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return (
      <Card className="p-8 flex justify-center items-center min-h-100">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <p className="text-sm text-slate-500">Loading call history...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return <LoadingError onRetry={() => window.location.reload()} />;
  }

  return (
    <>
      <DataTable columns={columns} data={tasks!} />
    </>
  );
}
