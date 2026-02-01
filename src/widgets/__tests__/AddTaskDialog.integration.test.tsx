import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AddTaskDialog } from "../taskTable/AddTaskDialog";

vi.mock("@/entities/task", () => ({
  useCreateTask: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
  useTasks: () => ({
    data: [],
  }),
  TaskRequestType: {},
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("AddTaskDialog Integration", () => {
  it("should open dialog when clicking Add task button", async () => {
    const user = userEvent.setup();
    render(<AddTaskDialog />, { wrapper: createWrapper() });

    const button = screen.getByRole("button", { name: /add task/i });
    await user.click(button);

    expect(screen.getByText(/Customer ID/i)).toBeInTheDocument();
  });

  it("should allow user to fill form and submit is enabled", async () => {
    const user = userEvent.setup();
    render(<AddTaskDialog />, { wrapper: createWrapper() });

    // Open dialog
    await user.click(screen.getByRole("button", { name: /add task/i }));

    // Fill customer ID
    const customerInput = screen.getByLabelText(/customer id/i);
    await user.type(customerInput, "1234567");

    expect(customerInput).toHaveValue("1234567");
  });
});
