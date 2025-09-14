import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LuxuryCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const LuxuryCard = ({ 
  children, 
  className, 
  onClick, 
  hoverable = true 
}: LuxuryCardProps) => {
  return (
    <div 
      className={cn(
        "luxury-card p-4",
        hoverable && "cursor-pointer hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};