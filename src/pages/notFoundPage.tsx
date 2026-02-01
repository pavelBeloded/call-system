import { Link } from "@tanstack/react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Image/Icon */}
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/communication">
              <Button variant="link" className="text-blue-600">
                Communication
              </Button>
            </Link>
            <Link to="/task-managment">
              <Button variant="link" className="text-blue-600">
                Task Management
              </Button>
            </Link>
            <Link to="/statistics">
              <Button variant="link" className="text-blue-600">
                Statistics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
