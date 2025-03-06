import React from "react";
import { HelpCircle } from "lucide-react";
import { useUI } from "../../contexts/UIContext";
import { Toggle } from "./Toggle";

interface HelpModeToggleProps {
  className?: string;
}

const HelpModeToggle: React.FC<HelpModeToggleProps> = ({ className }) => {
  const { helpMode, toggleHelpMode } = useUI();

  return (
    <Toggle
      pressed={helpMode}
      onClick={toggleHelpMode}
      variant="glass"
      className={className}
      aria-label={helpMode ? "Disable help mode" : "Enable help mode"}
    >
      <HelpCircle className="w-4 h-4 mr-2" />
      Help Mode
    </Toggle>
  );
};

export default HelpModeToggle;
