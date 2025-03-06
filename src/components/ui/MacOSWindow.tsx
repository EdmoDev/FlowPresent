import React, { useState, useRef, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";

interface MacOSWindowProps {
  title: string;
  children: React.ReactNode;
  width?: number;
  height?: number;
  onClose?: () => void;
}

const MacOSWindow: React.FC<MacOSWindowProps> = ({
  title,
  children,
  width = 600,
  height = 400,
  onClose,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Center the window on mount
  useEffect(() => {
    if (windowRef.current) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setPosition({
        x: (windowWidth - width) / 2,
        y: (windowHeight - height) / 2,
      });
    }
  }, [width, height]);

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Handle mouse move for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - startPos.x,
          y: e.clientY - startPos.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startPos]);

  return (
    <div
      ref={windowRef}
      className="glass-panel shadow-large overflow-hidden absolute"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 50,
      }}
    >
      {/* Window title bar */}
      <div
        className="h-10 bg-background-elevated border-b border-[var(--border-subtle)] flex items-center px-3"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <button
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
            onClick={onClose}
          >
            <X className="w-2 h-2 text-red-800 opacity-0 hover:opacity-100" />
          </button>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"></div>
        </div>

        {/* Window title */}
        <div className="flex-1 text-center text-sm font-medium text-text-secondary">
          {title}
        </div>

        {/* Placeholder for symmetry */}
        <div className="w-12"></div>
      </div>

      {/* Window content */}
      <div className="h-[calc(100%-2.5rem)] overflow-auto">{children}</div>
    </div>
  );
};

export default MacOSWindow;
