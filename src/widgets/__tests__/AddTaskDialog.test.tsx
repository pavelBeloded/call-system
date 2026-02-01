import { describe, it, expect } from "vitest";
import { Task } from "@/entities/task";

function generateTaskId(letter: string, existingTasks: Task[]) {
  const tasksWithLetter = existingTasks.filter((t) => t.id.startsWith(letter));
  const numbers = tasksWithLetter.map((t) => parseInt(t.id.slice(1)));
  const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
  const nextNumber = (maxNumber + 1).toString().padStart(2, "0");
  return `${letter}${nextNumber}`;
}

describe("generateTaskId", () => {
  it("should generate A01 when no tasks exist for letter A", () => {
    const tasks: Task[] = [];
    const result = generateTaskId("A", tasks);
    expect(result).toBe("A01");
  });

  it("should increment to A03 when A02 already exists", () => {
    const tasks: Task[] = [
      {
        id: "A01",
        customerId: "123456",
        request: "Change tariff",
        status: "pending",
        date: "2024-01-01",
        deadline: "2024-01-02",
        sendNotifications: true,
      },
      {
        id: "A02",
        customerId: "789012",
        request: "Technical support",
        status: "done",
        date: "2024-01-01",
        deadline: "2024-01-02",
        sendNotifications: false,
      },
    ];
    const result = generateTaskId("A", tasks);
    expect(result).toBe("A03");
  });
});
