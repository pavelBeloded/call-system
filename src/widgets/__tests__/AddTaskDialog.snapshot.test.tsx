import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddTaskDialog } from "../taskTable/AddTaskDialog";

vi.mock("@/entities/task", () => ({
  useCreateTask: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useTasks: () => ({ data: [] }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("AddTaskDialog Snapshots", () => {
  it("should match snapshot when closed", () => {
    const { container } = render(<AddTaskDialog />, {
      wrapper: createWrapper(),
    });
    expect(container).toMatchSnapshot();
  });
});
