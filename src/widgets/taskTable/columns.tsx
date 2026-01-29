"use client";
import { Task } from "@/entities/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";

function handleEdit(task: Task) {
  console.log("Edit task:", task);
}

function handleDelete(id: string) {
  console.log("Delete task:", id);
}

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
      return <span>{statusMap[row.original.status]}</span>;
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
