import { useQuery } from "@tanstack/react-query";
import { Call } from "../model/types";

export function useCalls() {
    return useQuery<Call[]>({
        queryKey: ['calls'],
        queryFn: async () => {
            const response = await fetch('/api/calls');

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    })
}