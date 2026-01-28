import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActiveCall } from "../model/types";

export function useActiveCall() {
  return useQuery<ActiveCall | null>({
    queryKey: ["activeCall"],
    queryFn: async () => {
      const response = await fetch("/api/active-call");
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch active call");
      }
      return response.json();
    },
  });
}

export function useInitiateCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await fetch("/api/calls/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate call");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeCall"] });
      queryClient.invalidateQueries({ queryKey: ["calls"] });
    },
  });
}

export function useEndCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/calls/end", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to end call");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeCall"] });
      queryClient.invalidateQueries({ queryKey: ["calls"] });
    },
  });
}
