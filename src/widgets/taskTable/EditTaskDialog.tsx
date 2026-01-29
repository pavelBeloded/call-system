import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Task, TaskRequestType, useUpdateTask } from "@/entities/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const REQUEST_OPTIONS: TaskRequestType[] = [
  "Change tariff",
  "Internet troubleshooting",
  "Technical support",
  "Billing inquiry",
  "Service upgrade",
  "Account closure",
];

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Completed" },
] as const;

interface EditTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
}: EditTaskDialogProps) {
  const updateTask = useUpdateTask();

  const [formData, setFormData] = useState({
    customerId: task.customerId,
    request: task.request,
    status: task.status,
    date: task.date,
    deadline: task.deadline,
    sendNotifications: task.sendNotifications,
  });

  useEffect(() => {
    setFormData({
      customerId: task.customerId,
      request: task.request,
      status: task.status,
      date: task.date,
      deadline: task.deadline,
      sendNotifications: task.sendNotifications,
    });
  }, [task]);

  const handleSubmit = async () => {
    try {
      await updateTask.mutateAsync({
        id: task.id,
        updates: formData,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Edit task {task.id}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 text-right">
            Today {format(new Date(), "dd/MM/yyyy")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Customer ID */}
          <div className="space-y-2">
            <Label htmlFor="customerId" className="text-sm font-medium">
              Customer ID
            </Label>
            <Input
              id="customerId"
              value={formData.customerId}
              onChange={(e) => {
                const value = e.target.value.trim();
                if (/^\d{0,8}$/.test(value)) {
                  setFormData((prev) => ({ ...prev, customerId: value }));
                }
              }}
            />
          </div>

          {/* Request and Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="request" className="text-sm font-medium">
                Request
              </Label>
              <Select
                value={formData.request}
                onValueChange={(value: TaskRequestType) =>
                  setFormData((prev) => ({ ...prev, request: value }))
                }
              >
                <SelectTrigger id="request">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REQUEST_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value as Task["status"],
                  }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Deadline row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(formData.date), "dd/MM/yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(formData.date)}
                    onSelect={(date) =>
                      date &&
                      setFormData((prev) => ({
                        ...prev,
                        date: date.toISOString().split("T")[0],
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium">
                Deadline
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="deadline"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.deadline && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(formData.deadline), "dd/MM/yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(formData.deadline)}
                    onSelect={(date) =>
                      date &&
                      setFormData((prev) => ({
                        ...prev,
                        deadline: date.toISOString().split("T")[0],
                      }))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Send notifications toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-sm font-medium">
              Send notifications
            </Label>
            <Switch
              id="notifications"
              checked={formData.sendNotifications}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, sendNotifications: checked }))
              }
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleSubmit}
            disabled={!formData.customerId || updateTask.isPending}
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            {updateTask.isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
