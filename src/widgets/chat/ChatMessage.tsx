import { ChatMessage as ChatMessageType } from "@/hooks/useWebSocketChat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const time = message.timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-3 rounded-lg max-w-[80%]",
        message.isEcho
          ? "bg-gray-100 self-start"
          : "bg-blue-600 text-white self-end",
      )}
    >
      <div className="text-sm font-medium">
        {message.isEcho ? "Echo" : "You"}
      </div>
      <div className="text-sm">{message.text}</div>
      <div
        className={cn(
          "text-xs mt-1",
          message.isEcho ? "text-gray-500" : "text-blue-100",
        )}
      >
        {time}
      </div>
    </div>
  );
}
