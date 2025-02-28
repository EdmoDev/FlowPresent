import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { Tooltip } from '../Tooltip';

const HelpToggle: React.FC = () => {
  const { helpMode, toggleHelpMode } = useUI();

  return (
    <Tooltip 
      content="Toggle help mode - when enabled, hover over items to see tooltips"
      position="bottom"
      alwaysShow={true}
    >
      <button
        onClick={toggleHelpMode}
        className={`p-1.5 rounded-full transition-colors ${
          helpMode 
            ? 'bg-blue-500 text-white' 
            : 'glass-button text-text-secondary hover:text-blue-500'
        }`}
        aria-label="Toggle help mode"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
    </Tooltip>
  );
};

export default HelpToggle;