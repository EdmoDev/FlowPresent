import React, { useState } from "react";
import {
  Play,
  BrainCircuit,
  LayoutGrid,
  Mic2,
  Radio,
  Clock,
  Keyboard,
  Maximize,
  Save,
  Monitor,
  Palette,
} from "lucide-react";
import { Tooltip } from "../components/Tooltip";
import { useTheme } from "../contexts/ThemeContext";
import { useUI } from "../contexts/UIContext";
import HelpToggle from "../components/ui/HelpToggle";
import KeyboardShortcutsList from "../components/ui/KeyboardShortcutsList";
import MacOSWindow from "../components/ui/MacOSWindow";
import ThemeToggle from "../components/ui/ThemeToggle";
import HelpModeToggle from "../components/ui/HelpModeToggle";
import { Link } from "react-router-dom";

const TopBar: React.FC = () => {
  const { theme } = useTheme();
  const { displayMode, setDisplayMode, toggleFullscreen, displays, helpMode } =
    useUI();

  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  const isLightMode = theme === "light";
  const isPresentMode = displayMode === "present";
  const hasMultipleDisplays = displays.length > 1;

  // Get current date in macOS format
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Status indicator colors
  const liveColor = isPresentMode ? "bg-accent-red" : "bg-accent-green";

  return (
    <div className="h-[var(--header-height)] bg-background-elevated border-b border-[var(--border-subtle)] flex items-center px-3">
      <div className="flex-1 flex items-center gap-2">
        {/* Go Live button */}
        <Tooltip
          content={
            <div>
              <div>
                {isPresentMode
                  ? "Stop presentation"
                  : "Start broadcasting to all outputs"}
              </div>
              <div className="keyboard-shortcut">
                <kbd>F5</kbd>
              </div>
            </div>
          }
          position="bottom"
        >
          <button
            className={`px-3 py-1.5 ${isPresentMode ? "bg-accent-red" : "bg-accent-blue"} text-white rounded-md hover:opacity-90 transition-all flex items-center gap-1.5`}
            onClick={() => setDisplayMode(isPresentMode ? "edit" : "present")}
          >
            <Play className="w-3.5 h-3.5" />
            <span className="text-sm font-medium">
              {isPresentMode ? "Stop" : "Go Live"}
            </span>
          </button>
        </Tooltip>

        {/* AI Assistant button */}
        <Tooltip
          content={
            <div>
              AI-powered suggestions
              <div className="keyboard-shortcut">
                <kbd>⌥A</kbd>
              </div>
            </div>
          }
          position="bottom"
        >
          <button className="px-3 py-1.5 text-text-secondary rounded-md hover:bg-black/5 flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 text-accent-purple" />
            <span className="text-sm">AI Assistant</span>
          </button>
        </Tooltip>

        {/* Layouts button */}
        <Tooltip content="Manage screen layouts" position="bottom">
          <button className="px-3 py-1.5 text-text-secondary rounded-md hover:bg-black/5 flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="text-sm">Layouts</span>
          </button>
        </Tooltip>

        {/* Design System Link */}
        <Tooltip content="View Design System" position="bottom">
          <Link
            to="/design-system"
            className="px-3 py-1.5 text-text-secondary rounded-md hover:bg-black/5 flex items-center gap-1.5"
          >
            <Palette className="w-3.5 h-3.5 text-accent-orange" />
            <span className="text-sm">Design System</span>
          </Link>
        </Tooltip>

        {/* Separator */}
        <div className="h-[18px] w-px bg-text-secondary/20 mx-1" />

        {/* Current service indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-background-glass/10">
          <div
            className={`w-2 h-2 ${liveColor} rounded-full ${isPresentMode ? "animate-pulse" : ""}`}
          />
          <span className="text-sm text-text-primary font-medium">
            Sunday Service
          </span>
          <span className="text-text-secondary/60 text-sm mx-1">•</span>
          <span className="text-sm text-text-secondary">{currentDate}</span>
        </div>

        {/* Actions toolbar */}
        <div className="ml-auto flex items-center gap-1">
          <Tooltip
            content={
              <div>
                Save service
                <div className="keyboard-shortcut">
                  <kbd>⌘S</kbd>
                </div>
              </div>
            }
            position="bottom"
          >
            <button className="p-1.5 rounded-md hover:bg-black/5">
              <Save className="w-4 h-4 text-text-secondary" />
            </button>
          </Tooltip>

          <Tooltip
            content={
              <div>
                Toggle fullscreen
                <div className="keyboard-shortcut">
                  <kbd>F11</kbd>
                </div>
              </div>
            }
            position="bottom"
          >
            <button
              className="p-1.5 rounded-md hover:bg-black/5"
              onClick={toggleFullscreen}
            >
              <Maximize className="w-4 h-4 text-text-secondary" />
            </button>
          </Tooltip>

          {hasMultipleDisplays && (
            <Tooltip content="Display controls" position="bottom">
              <button className="p-1.5 rounded-md hover:bg-background-glass/10">
                <Monitor className="w-4 h-4 text-text-secondary" />
              </button>
            </Tooltip>
          )}

          <Tooltip
            content={
              <div>
                Keyboard shortcuts
                <div className="keyboard-shortcut">
                  <kbd>?</kbd>
                </div>
              </div>
            }
            position="bottom"
          >
            <button
              className="p-1.5 rounded-md hover:bg-background-glass/10"
              onClick={() => setShowKeyboardShortcuts(true)}
            >
              <Keyboard className="w-4 h-4 text-text-secondary" />
            </button>
          </Tooltip>

          <div className="h-[18px] w-px bg-text-secondary/20 mx-1" />

          {/* Status indicators */}
          <Tooltip content="Microphone active" position="bottom">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-background-glass/10">
              <Mic2 className="w-3.5 h-3.5 text-accent-green" />
              <span className="text-xs text-text-secondary">Audio</span>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* System controls */}
      <div className="flex items-center gap-2 ml-2">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background-glass/10">
          <Clock className="w-3.5 h-3.5 text-text-secondary" />
          <span className="text-sm text-text-primary">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <HelpModeToggle className="text-xs" />
        <ThemeToggle className="text-xs" />
      </div>

      {/* Keyboard shortcuts modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <MacOSWindow
            title="Keyboard Shortcuts"
            width={500}
            height={600}
            onClose={() => setShowKeyboardShortcuts(false)}
          >
            <KeyboardShortcutsList />
          </MacOSWindow>
        </div>
      )}
    </div>
  );
};

export default TopBar;
