import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/widgets/AppSidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <main className="min-h-screen">

          <div className="pt-16 px-6">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>

      <TanStackRouterDevtools />
    </>
  );
}
