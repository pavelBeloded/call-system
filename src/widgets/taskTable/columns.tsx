"use client";
import { Task } from "@/entities/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import { useDeleteTask } from "@/entities/task";
import { useState } from "react";
import { EditTaskDialog } from "./EditTaskDialog";

const statusMap = {
  in_progress: "In Progress",
  done: "Completed",
  pending: "Pending",
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Task ID",
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
  },
  {
    accessorKey: "request",
    header: "Request",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <span>{statusMap[status]}</span>;
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      const date = new Date(row.original.deadline);
      return date.toLocaleDateString("en-GB");
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <TaskActions task={row.original} />;
    },
  },
];

function TaskActions({ task }: { task: Task }) {
  const deleteTask = useDeleteTask();
  const [isDeleting, setIsDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete task ${task.id}?`)) return;

    setIsDeleting(true);
    try {
      await deleteTask.mutateAsync(task.id);
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setEditOpen(true)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-600 focus:text-red-600"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
      <EditTaskDialog task={task} open={editOpen} onOpenChange={setEditOpen} />
    </DropdownMenu>
  );
}
