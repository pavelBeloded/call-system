"use client";
import { Task } from "@/entities/task";

import { ColumnDef } from "@tanstack/react-table";
import { TaskActions } from "./TaskActions";

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
