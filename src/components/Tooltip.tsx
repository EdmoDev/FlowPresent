import { useState, useRef, useEffect } from 'react';
import { useUI } from '../contexts/UIContext';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  alwaysShow?: boolean;
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  delay = 400,
  alwaysShow = false
}: TooltipProps) {
  const { helpMode } = useUI();
  const [show, setShow] = useState(false);
  const [showDelayed, setShowDelayed] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shouldShow = (helpMode || alwaysShow) && (showDelayed || show);

  // Handle mouse enter
  const handleMouseEnter = () => {
    setShow(true);
    timerRef.current = setTimeout(() => {
      setShowDelayed(true);
    }, delay);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setShow(false);
    setShowDelayed(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Clean up timer
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Calculate tooltip position
  useEffect(() => {
    if (shouldShow && tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const offset = 8;
      
      switch (position) {
        case 'top':
          setCoords({ x: -rect.width / 2, y: -(rect.height + offset) });
          break;
        case 'bottom':
          setCoords({ x: -rect.width / 2, y: offset });
          break;
        case 'left':
          setCoords({ x: -(rect.width + offset), y: -rect.height / 2 });
          break;
        case 'right':
          setCoords({ x: offset, y: -rect.height / 2 });
          break;
      }
    }
  }, [shouldShow, position]);

  return (
    <div 
      className="relative inline-flex" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {shouldShow && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-2.5 py-1.5 text-xs font-medium text-text-primary bg-background-card rounded-lg shadow-lg border border-[var(--border-subtle)] backdrop-blur-sm max-w-xs"
          style={{
            transform: `translate(${coords.x}px, ${coords.y}px)`,
            transformOrigin: 'center',
            animation: 'tooltip-fade 150ms ease-out'
          }}
        >
          {content}
          <div 
            className="absolute w-2 h-2 bg-background-card border border-[var(--border-subtle)] rotate-45"
            style={{
              [position === 'bottom' ? 'top' : 'bottom']: position === 'bottom' ? '-4px' : '-4px',
              [position === 'right' ? 'left' : 'right']: position === 'right' ? '-4px' : 'calc(50% - 4px)',
            }}
          />
        </div>
      )}
    </div>
  );
}