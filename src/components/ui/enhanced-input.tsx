import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search, X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  animated?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    label, 
    error, 
    helperText, 
    icon, 
    clearable = false,
    animated = true,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setInputValue("");
      onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-foreground animate-slide-in-down">
            {label}
          </label>
        )}
        
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
              {icon}
            </div>
          )}
          
          <input
            type={inputType}
            className={cn(
              "flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
              icon && "pl-10",
              clearable && inputValue && "pr-20",
              type === "password" && "pr-20",
              animated && "luxury-input",
              isFocused && "scale-[1.02] shadow-lg",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          
          {/* Clear button */}
          {clearable && inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110"
            >
              <X size={16} />
            </button>
          )}
          
          {/* Password toggle */}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          
          {/* Focus indicator */}
          {animated && (
            <div className={cn(
              "absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 pointer-events-none",
              isFocused && "border-primary/20"
            )} />
          )}
        </div>
        
        {/* Helper text or error */}
        {(helperText || error) && (
          <p className={cn(
            "text-xs transition-colors duration-300 animate-slide-in-up",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// Search Input variant
export const SearchInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'icon'>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        icon={<Search size={16} />}
        placeholder="Search..."
        className={cn("w-full", className)}
        {...props}
      />
    );
  }
);
SearchInput.displayName = "SearchInput";

export { Input };
