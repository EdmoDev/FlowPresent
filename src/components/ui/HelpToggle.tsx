import React from "react";
import { HelpCircle } from "lucide-react";
import { useUI } from "../../contexts/UIContext";

interface HelpToggleProps {
  className?: string;
}

const HelpToggle: React.FC<HelpToggleProps> = ({ className }) => {
  const { helpMode, toggleHelpMode } = useUI();

  return (
    <button
      onClick={toggleHelpMode}
      className={`p-1.5 rounded-md ${helpMode ? "bg-accent-blue/10 text-accent-blue" : "hover:bg-background-glass/10 text-text-secondary"} ${className || ""}`}
      aria-label={helpMode ? "Disable help mode" : "Enable help mode"}
    >
      <HelpCircle className="w-4 h-4" />
    </button>
  );
};

export default HelpToggle;
