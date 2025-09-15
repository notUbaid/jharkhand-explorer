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
    <div className="fixed bottom-0 left-0 right-0 z-50 menu-overlay border-t">
      <div className="safe-area-bottom">
        <div className="flex items-center justify-around px-1 py-3">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-300 min-w-0 flex-1",
                  isActive 
                    ? "text-primary bg-primary/10 shadow-sm scale-105" 
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                )}
              >
                <Icon 
                  size={22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "transition-all duration-300 mb-1",
                    isActive ? "drop-shadow-sm" : ""
                  )}
                />
                <span className={cn(
                  "text-xs font-medium truncate text-center leading-tight",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};