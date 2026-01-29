import { AddTaskDialog } from "@/widgets/taskTable/AddTaskDialog";
import { TaskTable } from "@/widgets/taskTable/TaskTable";

export function TaskManagmentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1>Task management</h1>
          <AddTaskDialog />
        </div>

        {/* Table */}
        <TaskTable />
      </div>
    </div>
  );
}
