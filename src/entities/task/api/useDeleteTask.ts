import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation({

        mutationFn: async (id: string) => {
            const response = await fetch("/api/tasks/" + id, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }

    })
}