import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "./ErrorBoundary";
import { ReactNode } from "react";
import { GenericError } from "./ErrorDisplay";

interface Props {
  children: ReactNode;
}

export function QueryBoundary({ children }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={
            <div className="p-8">
              <GenericError onRetry={reset} />
            </div>
          }
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
