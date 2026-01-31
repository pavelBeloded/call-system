import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useCreateTask,
  useTasks,
  TaskRequestType,
  Task,
} from "@/entities/task";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
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
import { Plus, CalendarIcon } from "lucide-react";
import { useState } from "react";
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

const TASK_LETTERS = ["A", "B", "C", "D"];

export function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const { data: existingTasks } = useTasks();
  const createTask = useCreateTask();

  const [formData, setFormData] = useState({
    customerId: "",
    request: "" as TaskRequestType | "",
    taskIdLetter: "A",
    date: new Date().toISOString().split("T")[0],
    deadline: new Date().toISOString().split("T")[0],
    sendNotifications: true,
  });

  const generatedTaskId = generateTaskId(formData.taskIdLetter, existingTasks);

  const handleSubmit = async () => {
    if (!formData.customerId || !formData.request || !generatedTaskId) {
      return;
    }

    const newTask: Task = {
      id: generatedTaskId,
      customerId: formData.customerId,
      request: formData.request,
      status: "pending",
      date: formData.date,
      deadline: formData.deadline,
      sendNotifications: formData.sendNotifications,
    };

    try {
      await createTask.mutateAsync(newTask);
      setOpen(false);
      setFormData({
        customerId: "",
        request: "",
        taskIdLetter: "A",
        date: new Date().toISOString().split("T")[0],
        deadline: new Date().toISOString().split("T")[0],
        sendNotifications: true,
      });
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-blue-600 border-2 text-blue-600 font-semibold hover:bg-blue-50"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-110 ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Add task</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 text-right">
            Today {format(new Date(), "dd/MM/yyyy")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="customerId" className="text-sm font-medium">
              Customer ID
            </Label>
            <Input
              id="customerId"
              placeholder="Enter customer ID"
              value={formData.customerId}
              onChange={(e) => {
                const value = e.target.value.trim();
                if (/^\d{0,7}$/.test(value)) {
                  setFormData((prev) => ({ ...prev, customerId: value }));
                }
              }}
            />
          </div>

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
                  <SelectValue placeholder="Select request" />
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
              <Label htmlFor="taskId" className="text-sm font-medium">
                Task ID
              </Label>
              <div className="flex gap-2">
                <Select
                  value={formData.taskIdLetter}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, taskIdLetter: value }))
                  }
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_LETTERS.map((letter) => (
                      <SelectItem key={letter} value={letter}>
                        {letter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="taskId"
                  value={generatedTaskId}
                  disabled
                  className="flex-1 bg-gray-50"
                />
              </div>
            </div>
          </div>

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
                    {formData.date ? (
                      format(formData.date, "dd/MM/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
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
                    {formData.deadline ? (
                      format(formData.deadline, "dd/MM/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
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
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

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
            disabled={
              !formData.customerId || !formData.request || createTask.isPending
            }
            className="bg-blue-600 hover:bg-blue-700 w-30 m-auto "
          >
            {createTask.isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="w-30 m-auto"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function generateTaskId(letter: string, existingTasks: Task[] | undefined) {
  if (!existingTasks) return `${letter}01`;

  const tasksWithLetter = existingTasks.filter((t) => t.id.startsWith(letter));
  const numbers = tasksWithLetter.map((t) => parseInt(t.id.slice(1)));
  const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNumber = (maxNumber + 1).toString().padStart(2, "0");
  return `${letter}${nextNumber}`;
}
