import { useQuery } from "@tanstack/react-query";
import { Task } from "../model/types";

export function useTask(id?: string) {
    return useQuery<Task>({
        queryKey: ["tasks", id],

        queryFn: async () => {
            const response = await fetch(`/api/tasks/${id}`);

            if (!response.ok) {
                throw new Error("Task not found");
            }
            return response.json();
        },

        enabled: !!id,
    });
}
