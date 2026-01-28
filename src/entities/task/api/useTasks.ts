import { useQuery } from "@tanstack/react-query";
import { Task } from "../model/types";

export function useTasks() {
    return useQuery<Task[]>({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await fetch("/api/tasks");

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        },
    });
}
