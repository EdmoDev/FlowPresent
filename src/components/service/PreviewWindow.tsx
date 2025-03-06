import React, { useState } from "react";
import {
  Play,
  MonitorPlay,
  Wand2,
  Palette,
  Type,
  Image,
  Gauge,
  Laptop2,
  Edit2,
  Pause,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Tooltip } from "../Tooltip";
import { useUI } from "../../contexts/UIContext";

interface QuickActionButton {
  icon: React.ElementType;
  label: string;
  tooltip: string;
  onClick?: () => void;
  shortcut?: string;
}

const PreviewWindow: React.FC = () => {
  const { helpMode, openRightPanel, displayMode } = useUI();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openSlideEditor = () => {
    openRightPanel("slide-editor");
  };

  const toggleControlsVisibility = () => {
    setShowControls(!showControls);
  };

  const quickActions: QuickActionButton[] = [
    {
      icon: Wand2,
      label: "AI Enhance",
      tooltip: "Enhance presentation with AI suggestions",
      shortcut: "Alt+A",
    },
    {
      icon: Palette,
      label: "Theme",
      tooltip: "Customize theme, colors, and transitions",
      shortcut: "Alt+T",
    },
    {
      icon: Type,
      label: "Typography",
      tooltip: "Adjust text styles and animations",
      shortcut: "Alt+F",
    },
    {
      icon: Image,
      label: "Media",
      tooltip: "Manage and edit media assets",
      shortcut: "Alt+M",
    },
  ];

  const QuickActions = () => (
    <div className="absolute bottom-full mb-2 left-0 right-0 glass-panel p-2 z-10">
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map(
          ({ icon: Icon, label, tooltip, onClick, shortcut }) => (
            <Tooltip
              content={
                <div>
                  <div>{tooltip}</div>
                  {shortcut && (
                    <div className="keyboard-shortcut">
                      <kbd>{shortcut}</kbd>
                    </div>
                  )}
                </div>
              }
              key={label}
            >
              <button
                className="glass-button flex flex-col items-center gap-1 p-2"
                onClick={onClick}
              >
                <Icon className="w-5 h-5 text-text-secondary" />
                <span className="text-xs text-text-secondary">{label}</span>
              </button>
            </Tooltip>
          ),
        )}
      </div>
    </div>
  );

  // In present mode, we'll show different controls
  const isPresentMode = displayMode === "present";

  return (
    <div
      className="glass-panel overflow-hidden relative group rounded-[32px]"
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      <div className="aspect-video flex items-center justify-center relative">
        <div className="absolute inset-0 bg-background-dark"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, #363636, var(--background-dark))",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-[72px] font-['Rubik'] font-bold text-text-primary mb-4 tracking-tight leading-none">
              Amazing Grace
            </h2>
            <p className="text-2xl text-text-secondary font-['Rubik'] tracking-wide">
              How sweet the sound
            </p>
          </div>
        </div>

        {/* Top-right status indicators */}
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <div className="glass-card px-2 py-1 flex items-center gap-2 text-xs backdrop-blur-sm border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-green-500" />
              <span className="text-xs text-text-secondary">60 FPS</span>
            </div>
          </div>
          <div className="glass-card px-2 py-1 flex items-center gap-2 text-xs backdrop-blur-sm border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5">
              <Laptop2 className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-text-secondary">Stage</span>
            </div>
          </div>
        </div>

        {/* Edit button that appears on hover - only in edit mode */}
        {!isPresentMode && showQuickActions && (
          <div className="absolute top-2 left-2 z-20">
            <Tooltip content="Edit slide content" position="bottom-left">
              <button
                className="p-2 glass-button rounded-full"
                onClick={openSlideEditor}
              >
                <Edit2 className="w-4 h-4 text-text-secondary" />
              </button>
            </Tooltip>
          </div>
        )}

        {/* Present mode controls (always visible in present mode) */}
        {isPresentMode && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center items-center gap-2 px-4 z-20">
            <div className="glass-panel py-2 px-4 rounded-full flex items-center gap-3">
              <Tooltip content="Previous slide" position="top">
                <button className="p-1.5 glass-button rounded-full">
                  <ArrowLeft className="w-5 h-5 text-text-secondary" />
                </button>
              </Tooltip>

              <Tooltip content={isPlaying ? "Pause" : "Play"} position="top">
                <button
                  className="p-2 glass-button rounded-full"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-text-secondary" />
                  ) : (
                    <Play className="w-5 h-5 text-text-secondary" />
                  )}
                </button>
              </Tooltip>

              <Tooltip content="Next slide" position="top">
                <button className="p-1.5 glass-button rounded-full">
                  <ArrowRight className="w-5 h-5 text-text-secondary" />
                </button>
              </Tooltip>

              <Tooltip
                content={showControls ? "Hide controls" : "Show controls"}
                position="top"
              >
                <button
                  className="p-1.5 glass-button rounded-full ml-4"
                  onClick={toggleControlsVisibility}
                >
                  {showControls ? (
                    <EyeOff className="w-4 h-4 text-text-secondary" />
                  ) : (
                    <Eye className="w-4 h-4 text-text-secondary" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>
        )}
      </div>

      {/* Overlay with actions - only in edit mode */}
      {!isPresentMode && showQuickActions && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <QuickActions />
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            <Tooltip content="Go live with this slide" position="top">
              <button className="p-4 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all group shadow-lg hover:shadow-blue-500/20">
                <Play className="w-6 h-6 text-white group-hover:scale-95 transition-transform" />
              </button>
            </Tooltip>

            <Tooltip content="Preview on stage display" position="top">
              <button className="glass-button p-4 hover:bg-white/5">
                <MonitorPlay className="w-6 h-6 text-white" />
              </button>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewWindow;
