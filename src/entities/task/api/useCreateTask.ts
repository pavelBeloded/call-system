import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../model/types";

export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (task: Task) => {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });
}