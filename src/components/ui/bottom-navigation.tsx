import { Home, MapPin, Package, ShoppingBag, Calendar, Car, Building, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const navigationItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/destinations", icon: MapPin, label: "Destinations" },
  { path: "/packages", icon: Package, label: "Packages" },
  { path: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { path: "/events", icon: Calendar, label: "Events" },
  { path: "/transport", icon: Car, label: "Transport" },
  { path: "/stays", icon: Building, label: "Stays" },
  { path: "/profile", icon: User, label: "Profile" },
];

export const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-nav-background backdrop-blur-md border-t border-nav-border">
      <div className="flex items-center justify-around px-2 py-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center px-2 py-1 rounded-lg transition-all duration-300 min-w-0 flex-1",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  isActive ? "scale-110" : "scale-100"
                )}
              />
              <span className={cn(
                "text-xs font-medium mt-1 truncate text-center",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};