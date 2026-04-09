import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const SIZES = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
const BORDER_SIZES = { sm: "border-2", md: "border-3", lg: "border-4" };

export function LoadingSpinner({
  size = "md",
  className,
  label = "Loading…",
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      aria-label={label}
    >
      <div
        className={cn(
          "rounded-full border-primary/20 border-t-primary animate-spin",
          SIZES[size],
          BORDER_SIZES[size],
        )}
      />
      {size !== "sm" && (
        <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
      )}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <LoadingSpinner size="lg" label="Loading your health portal…" />
    </div>
  );
}
