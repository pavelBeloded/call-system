import { useState, useRef, useEffect } from "react";
import { useWebSocketChat } from "@/hooks/useWebSocketChat";
import { ChatMessage } from "./ChatMessage";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Wifi, WifiOff } from "lucide-react";

interface ChatPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WS_URL = "wss://ws.ifelse.io";

export function ChatPanel({ open, onOpenChange }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, connectionStatus, connect, disconnect, sendMessage } =
    useWebSocketChat(WS_URL);

  useEffect(() => {
    if (open) {
      connect();
    } else {
      disconnect();
    }
  }, [open, connect, disconnect]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    sendMessage(inputValue);
    setInputValue("");
  };

  const isConnected = connectionStatus === "connected";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle>WebSocket Chat</SheetTitle>
          <SheetDescription className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-green-600">Connected</span>
              </>
            ) : connectionStatus === "connecting" ? (
              <>
                <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-blue-600">Connecting...</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-600" />
                <span className="text-red-600">Disconnected</span>
              </>
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-sm mt-8">
              No messages yet. Send a message to start!
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              placeholder={isConnected ? "Type a message..." : "Connecting..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!isConnected}
            />
            <Button
              onClick={handleSend}
              disabled={!isConnected || !inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
