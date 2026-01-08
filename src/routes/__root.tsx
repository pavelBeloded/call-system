import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="p-2 flex gap-2 border-b">
        <Link to="." className="[&.active]:font-bold">
          Home
        </Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
