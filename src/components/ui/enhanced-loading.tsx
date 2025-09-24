import { cn } from "@/lib/utils";

interface EnhancedLoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "shimmer";
  className?: string;
}

export const EnhancedLoading = ({ 
  size = "md", 
  variant = "spinner", 
  className 
}: EnhancedLoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const Spinner = () => (
    <div className={cn(
      "animate-spin rounded-full border-2 border-muted border-t-primary",
      sizeClasses[size],
      className
    )} />
  );

  const Dots = () => (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full bg-primary animate-pulse",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3"
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s"
          }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <div className={cn(
      "rounded-full bg-primary animate-pulse",
      sizeClasses[size],
      className
    )} />
  );

  const Shimmer = () => (
    <div className={cn(
      "bg-gradient-to-r from-muted via-primary/20 to-muted bg-[length:200%_100%] animate-shimmer rounded-lg",
      size === "sm" ? "w-16 h-4" : size === "md" ? "w-24 h-6" : "w-32 h-8",
      className
    )} />
  );

  switch (variant) {
    case "dots":
      return <Dots />;
    case "pulse":
      return <Pulse />;
    case "shimmer":
      return <Shimmer />;
    default:
      return <Spinner />;
  }
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export const LoadingOverlay = ({ 
  isLoading, 
  children, 
  className 
}: LoadingOverlayProps) => {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="flex flex-col items-center space-y-4">
            <EnhancedLoading size="lg" variant="spinner" />
            <p className="text-sm text-muted-foreground animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  lines?: number;
}

export const Skeleton = ({ className, lines = 1 }: SkeletonProps) => {
  if (lines === 1) {
    return (
      <div className={cn(
        "skeleton rounded-lg",
        className
      )} />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "skeleton rounded-lg",
            i === lines - 1 ? "w-3/4" : "w-full",
            className
          )}
        />
      ))}
    </div>
  );
};
