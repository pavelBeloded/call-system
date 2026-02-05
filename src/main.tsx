import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./app/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { apolloClient } from "./lib/apolloClient";
import { ApolloProvider } from "@apollo/client/react";

console.log("VITE_ENABLE_MOCKS =", import.meta.env.VITE_ENABLE_MOCKS);
console.log("DEV =", import.meta.env.DEV);
console.log("MODE =", import.meta.env.MODE);

/**
 * Чистим старые Service Worker (если они есть),
 * чтобы они не ломали новый билд
 */
async function cleanupServiceWorkers() {
  if (!("serviceWorker" in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((reg) => reg.unregister()));
    console.log("🧹 Old Service Workers cleaned");
  } catch (e) {
    console.warn("⚠️ Failed to cleanup Service Workers", e);
  }
}

/**
 * Запускаем MSW, но НИКОГДА не блокируем рендер
 */
async function enableMocking() {
  const isMockingEnabled = import.meta.env.VITE_ENABLE_MOCKS === "true";

  if (!isMockingEnabled) {
    console.log("⏭️ Mocking disabled");
    return;
  }

  try {
    await cleanupServiceWorkers();

    const { worker } = await import("./mocks/browser");

    worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
    });

    console.log("✅ MSW starting...");
  } catch (error) {
    console.warn("⚠️ MSW failed, app continues without mocks", error);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

// 👉 MSW стартует в фоне
enableMocking();

// 👉 Приложение рендерится ВСЕГДА
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
