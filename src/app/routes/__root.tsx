import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/widgets/AppSidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <SidebarProvider className="bg-gray-50">
        <AppSidebar />

        <main className="min-h-screen w-full bg-gray-50" >
          <div className="pt-16 px-6">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>

      <TanStackRouterDevtools />
    </>
  );
}
