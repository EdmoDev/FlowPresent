import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (show && tooltipRef.current) {
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
  }, [show, position]);

  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-[#282828] rounded-lg shadow-lg border border-[var(--border-subtle)] backdrop-blur-sm"
          style={{
            transform: `translate(${coords.x}px, ${coords.y}px)`,
            transformOrigin: 'center',
            animation: 'tooltip-fade 150ms ease-out'
          }}
        >
          {content}
          <div className="absolute w-2 h-2 bg-[#282828] border border-[var(--border-subtle)] rotate-45"
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