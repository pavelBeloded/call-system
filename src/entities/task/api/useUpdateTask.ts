import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../model/types";

export function useUpdateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
            const response = await fetch(`/api/tasks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            return response.json();
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["tasks", variables.id] });
        },
    });
}