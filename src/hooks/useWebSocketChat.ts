// src/hooks/useWebSocketChat.ts

import { useEffect, useState, useRef, useCallback } from "react";

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isEcho: boolean;
}

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export function useWebSocketChat(url: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("disconnected");
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus("connecting");

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setConnectionStatus("connected");
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);

      const echoMessage: ChatMessage = {
        id: `echo-${Date.now()}`,
        text: event.data,
        timestamp: new Date(),
        isEcho: true,
      };

      setMessages((prev) => [...prev, echoMessage]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("error");
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setConnectionStatus("disconnected");
    };

    wsRef.current = ws;
  }, [url]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text,
      timestamp: new Date(),
      isEcho: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    wsRef.current.send(text);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    messages,
    connectionStatus,
    connect,
    disconnect,
    sendMessage,
  };
}
