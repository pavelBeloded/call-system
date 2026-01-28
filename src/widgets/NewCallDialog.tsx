import { useState } from "react";
import { useInitiateCall } from "@/entities/call";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Loader2 } from "lucide-react";

export function NewCallDialog() {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const initiateCall = useInitiateCall();

  const handleCall = async () => {
    if (!phoneNumber.trim()) return;

    try {
      await initiateCall.mutateAsync(phoneNumber);
      setOpen(false);
      setPhoneNumber("");
    } catch (error) {
      console.error("Failed to initiate call:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Phone className="h-4 w-4" />
          New Call
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start New Call</DialogTitle>
          <DialogDescription>
            Enter a phone number to start a new call
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Enter phone number (e.g., 8831240087)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(prev => /^\d{0,15}$/g.test(e.target.value.trim()) ? e.target.value : prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !initiateCall.isPending) {
                handleCall();
              }
            }}
            disabled={initiateCall.isPending}
          />
          {initiateCall.isPending && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Initiating call...</span>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={initiateCall.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCall}
            disabled={!phoneNumber.trim() || initiateCall.isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {initiateCall.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Calling...
              </>
            ) : (
              <>
                <Phone className="h-4 w-4 mr-2" />
                Call
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
