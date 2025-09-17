import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { Button } from "@/components/ui/button";

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleDarkMode}
      className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 border-gray-300 dark:border-gray-600"
    >
      {isDarkMode ? (
        <>
          <Sun size={16} />
          Light
        </>
      ) : (
        <>
          <Moon size={16} />
          Dark
        </>
      )}
    </Button>
  );
};
