import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Activity, ArrowLeft, SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
        <Activity className="w-8 h-8 text-primary" />
      </div>
      <div className="mb-2">
        <SearchX className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-foreground font-display mb-2">
          404
        </h1>
        <p className="text-lg font-semibold text-foreground font-display mb-2">
          Page Not Found
        </p>
        <p className="text-muted-foreground text-sm max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex gap-3 mt-8">
        <Button asChild variant="outline" data-ocid="not-found-back-btn">
          <Link to="..">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </Link>
        </Button>
        <Button asChild data-ocid="not-found-home-btn">
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </div>
  );
}
