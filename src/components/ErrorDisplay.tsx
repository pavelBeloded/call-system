import { AlertCircle, WifiOff, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  type?: "error" | "warning" | "network" | "not-found";
}

export function ErrorDisplay({
  title,
  message,
  onRetry,
  type = "error",
}: ErrorDisplayProps) {
  const config = {
    error: {
      icon: XCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      titleColor: "text-red-900",
      textColor: "text-red-700",
    },
    warning: {
      icon: AlertCircle,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconColor: "text-yellow-600",
      titleColor: "text-yellow-900",
      textColor: "text-yellow-700",
    },
    network: {
      icon: WifiOff,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      titleColor: "text-orange-900",
      textColor: "text-orange-700",
    },
    "not-found": {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      titleColor: "text-blue-900",
      textColor: "text-blue-700",
    },
  };

  const {
    icon: Icon,
    bgColor,
    borderColor,
    iconColor,
    titleColor,
    textColor,
  } = config[type];

  return (
    <div className={`rounded-lg border ${borderColor} ${bgColor} p-6`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-6 w-6 ${iconColor} mt-0.5 flex-shrink-0`} />
        <div className="flex-1 space-y-2">
          {title && <h3 className={`font-semibold ${titleColor}`}>{title}</h3>}
          <p className={`text-sm ${textColor}`}>{message}</p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function LoadingError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorDisplay
      title="Failed to load data"
      message="We couldn't load the requested data. Please check your connection and try again."
      onRetry={onRetry}
      type="network"
    />
  );
}

export function NotFoundError({ resource = "item" }: { resource?: string }) {
  return (
    <ErrorDisplay
      title="Not Found"
      message={`The ${resource} you're looking for doesn't exist or may have been removed.`}
      type="not-found"
    />
  );
}

export function GenericError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <ErrorDisplay
      title="Something went wrong"
      message={message || "An unexpected error occurred. Please try again."}
      onRetry={onRetry}
      type="error"
    />
  );
}
