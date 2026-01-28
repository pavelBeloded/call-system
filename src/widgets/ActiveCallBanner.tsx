import { useActiveCall, useEndCall } from "@/entities/call";
import { Phone, MicOff, Pause, Grid3x3, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function ActiveCallBanner() {
  const { data: activeCall } = useActiveCall();
  const endCall = useEndCall();
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!activeCall) {
      setCallDuration(0);
      return;
    }

    const interval = setInterval(() => {
      const elapsed = Math.floor(
        (new Date().getTime() - new Date(activeCall.startTime).getTime()) /
          1000,
      );
      setCallDuration(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCall]);

  if (!activeCall) {
    return null;
  }

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}-${mins.toString().padStart(2, "0")}-${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gray-100 border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-gray-600" />
          <span className="text-sm text-gray-600">Speaking with</span>
          <span className="text-sm font-semibold text-gray-900">
            {activeCall.contactName}
          </span>
          <span className="text-sm text-gray-600">
            {formatDuration(callDuration)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <User className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Pause className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <MicOff className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 h-9 px-4"
          >
            <Pause className="h-4 w-4 mr-2" />
            Hold
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="h-9 px-4"
            onClick={() => endCall.mutate()}
            disabled={endCall.isPending}
          >
            End Call
          </Button>
        </div>
      </div>
    </div>
  );
}
