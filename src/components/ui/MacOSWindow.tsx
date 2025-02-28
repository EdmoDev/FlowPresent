import React from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface MacOSWindowProps {
  title: string;
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  resizable?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  className?: string;
}

const MacOSWindow: React.FC<MacOSWindowProps> = ({
  title,
  children,
  width = '100%',
  height = '100%',
  resizable = true,
  onClose,
  onMinimize,
  onMaximize,
  className = ''
}) => {
  return (
    <div 
      className={`rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-background-card shadow-glass flex flex-col ${className}`}
      style={{ width, height }}
    >
      {/* Window title bar */}
      <div className="px-3 h-9 flex items-center bg-[rgba(253,253,253,0.025)] border-b border-[var(--border-subtle)]">
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-accent-red flex items-center justify-center group"
            aria-label="Close"
          >
            <X className="w-2 h-2 text-[#F1F1F1]/40 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-accent-orange flex items-center justify-center group"
            aria-label="Minimize"
          >
            <Minus className="w-2 h-2 text-[#F1F1F1]/40 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            onClick={onMaximize}
            className="w-3 h-3 rounded-full bg-accent-green flex items-center justify-center group"
            aria-label="Maximize"
          >
            <Maximize2 className="w-2 h-2 text-[#F1F1F1]/40 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        
        {/* Window title */}
        <div className="absolute left-0 right-0 text-center pointer-events-none">
          <h1 className="text-xs font-medium text-text-secondary font-['JetBrains Mono'] tracking-[-0.02em]">{title}</h1>
        </div>
      </div>
      
      {/* Window content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
      
      {/* Resize handle */}
      {resizable && (
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" />
      )}
    </div>
  );
};

export default MacOSWindow;
