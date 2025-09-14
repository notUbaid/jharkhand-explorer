import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchBar = ({ 
  placeholder = "Search destinations, experiences...", 
  className = "",
  value,
  onChange 
}: SearchBarProps) => {
  return (
    <div className={`relative ${className}`}>
      <Search 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        size={20} 
      />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="luxury-input pl-12 pr-4 py-4 text-lg font-medium rounded-2xl border-0 bg-card shadow-lg focus:shadow-xl transition-all duration-300"
      />
    </div>
  );
};