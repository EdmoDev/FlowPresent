import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Toggle } from "./Toggle";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === "light";

  return (
    <Toggle
      pressed={isLightMode}
      onClick={toggleTheme}
      variant="glass"
      className={className}
      aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLightMode ? (
        <Sun className="w-4 h-4 mr-2" />
      ) : (
        <Moon className="w-4 h-4 mr-2" />
      )}
      {isLightMode ? "Light" : "Dark"}
    </Toggle>
  );
};

export default ThemeToggle;
