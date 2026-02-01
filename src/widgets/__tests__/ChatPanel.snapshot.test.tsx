import { render } from "@testing-library/react";
import { ChatPanel } from "../chat/ChatPanel";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useWebSocketChat", () => ({
  useWebSocketChat: () => ({
    messages: [
      {
        id: "1",
        text: "Hello",
        isEcho: false,
        timestamp: new Date("2024-01-01T12:00:00Z"),
      },
      {
        id: "2",
        text: "Hi back",
        isEcho: true,
        timestamp: new Date("2024-01-01T12:00:00Z"),
      },
    ],
    connectionStatus: "connected",
    connect: vi.fn(),
    disconnect: vi.fn(),
    sendMessage: vi.fn(),
  }),
}));

describe("Snapshot: ChatPanel", () => {
  it("renders correctly with messages", () => {
    const { asFragment } = render(
      <ChatPanel open={true} onOpenChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
