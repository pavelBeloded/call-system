"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Call } from "@/entities/call";
import { PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

/* ---------------- utils ---------------- */

function formatPhone(phone: string) {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

const accountStatusMap = {
  client: {
    label: "Client",
    className: "bg-green-100 text-green-700",
  },
  lead: {
    label: "Lead",
    className: "bg-blue-100 text-blue-700",
  },
  prospect: {
    label: "Prospect",
    className: "bg-yellow-100 text-yellow-800",
  },
  no_account: {
    label: "No Account Created",
    className: "bg-gray-100 text-gray-600",
  },
};

/* ---------------- columns ---------------- */

export const columns: ColumnDef<Call>[] = [
  {
    accessorKey: "type",
    enableHiding: true,
    enableSorting: false,
    enableColumnFilter: true,
    header: () => null,
    cell: () => null,
  },
  {
    accessorKey: "phoneNumber",
    header: "Recent",
    cell: ({ row }) => {
      const call = row.original;

      const Icon =
        call.type === "incoming"
          ? PhoneIncoming
          : call.type === "outgoing"
            ? PhoneOutgoing
            : PhoneMissed;

      const isMissed = call.type === "missed";

      return (
        <div className="flex items-center gap-3">
          <Icon
            className={`h-4 w-4 ${
              isMissed ? "text-red-500" : "text-muted-foreground"
            }`}
          />

          <div className="flex flex-col leading-tight">
            <span
              className={`font-medium ${
                isMissed ? "text-red-600" : "text-blue-600"
              }`}
            >
              {formatPhone(call.phoneNumber)}
            </span>

            {call.contactName && (
              <span className="text-xs text-muted-foreground">
                Name: {call.contactName}
              </span>
            )}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "time",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Time (EST)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "accountStatus",
    header: "Account Status",
    cell: ({ row }) => {
      const status = row.original.accountStatus;

      if (!status) {
        return (
          <span className="rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-500">
            No Information
          </span>
        );
      }

      const s = accountStatusMap[status];

      return (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.className}`}
        >
          {s.label}
        </span>
      );
    },
  },

  {
    id: "recording",
    header: "Recording",
    cell: ({ row }) => {
      const call = row.original;

      if (call.type === "missed" || !call.recording || !call.duration) {
        return <span className="text-muted-foreground">—</span>;
      }

      const m = Math.floor(call.duration / 60);
      const s = call.duration % 60;

      return (
        <span className="flex items-center gap-1 text-sm">
          ▶ {m}:{s.toString().padStart(2, "0")}
        </span>
      );
    },
  },
];
