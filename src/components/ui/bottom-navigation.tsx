import { Home, MapPin, Package, ShoppingBag, Calendar, Car, Building, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const getNavigationItems = (t: any) => [
  { path: "/", icon: Home, label: t("navigation.home") },
  { path: "/destinations", icon: MapPin, label: t("navigation.destinations") },
  { path: "/packages", icon: Package, label: t("navigation.packages") },
  { path: "/marketplace", icon: ShoppingBag, label: t("navigation.marketplace") },
  { path: "/events", icon: Calendar, label: t("navigation.events") },
  { path: "/transport", icon: Car, label: t("navigation.transport") },
  { path: "/stays", icon: Building, label: t("navigation.stays") },
  { path: "/profile", icon: User, label: t("navigation.profile") },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigationItems = getNavigationItems(t);

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
                  "flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-300 min-w-0 flex-1 relative",
                  isActive 
                    ? "text-primary bg-primary/10 shadow-sm scale-105" 
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                )}
              >
                <div className="relative">
                  <Icon 
                    size={22} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn(
                      "transition-all duration-300 mb-1",
                      isActive ? "drop-shadow-sm" : ""
                    )}
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
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