import { useQuery } from "@tanstack/react-query";
import { Call } from "../model/types";

export function useCall(id?: string) {
  return useQuery<Call>({
    queryKey: ["calls", id], 
    
    queryFn: async () => {
      const response = await fetch(`/api/calls/${id}`);

      if (!response.ok) {
        throw new Error("Call not found");
      }
      return response.json();
    },
    
    enabled: !!id, 
  });
}