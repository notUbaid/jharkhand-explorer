import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        outline: "text-foreground border-border hover:bg-accent hover:text-accent-foreground hover:scale-105 hover:-translate-y-0.5",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80 hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        warning:
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80 hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        animated: "badge-animated",
        glow: "border-transparent bg-primary text-primary-foreground hover:animate-glow hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
        pulse: "border-transparent bg-primary text-primary-foreground hover:animate-pulse hover:scale-105 hover:-translate-y-0.5 shadow-sm hover:shadow-md",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  removable?: boolean;
  onRemove?: () => void;
  animated?: boolean;
  delay?: number;
}

function Badge({ 
  className, 
  variant, 
  size, 
  removable = false, 
  onRemove,
  animated = true,
  delay = 0,
  children,
  ...props 
}: BadgeProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated, delay]);

  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        animated && !isVisible && "opacity-0 scale-0",
        animated && isVisible && "animate-bounce-in",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:scale-110 transition-transform duration-200 hover:text-destructive"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
