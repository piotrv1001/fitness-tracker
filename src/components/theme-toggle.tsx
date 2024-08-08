
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <DropdownMenuItem className="p-2">
        <div className="w-4 h-4 animate-spin rounded-full border-b-2 border-foreground"></div>
        <span className="ml-2">Loading...</span>
      </DropdownMenuItem>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        toggleTheme();
      }}
      className="p-2"
    >
      {theme === "dark" && <Sun className="h-4 w-4" />}
      {theme === "light" && <Moon className="h-4 w-4" />}
      <span className="ml-2">
        {theme === "dark" ? "Light theme" : "Dark theme"}
      </span>
    </DropdownMenuItem>
  );
}