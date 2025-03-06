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
  Menu,
  ChevronDown,
  Settings,
  HelpCircle,
  Users,
  Bell,
  Search,
} from "lucide-react";
import { Tooltip } from "../components/Tooltip";
import { useTheme } from "../contexts/ThemeContext";
import { useUI } from "../contexts/UIContext";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import ThemeToggle from "../components/ui/ThemeToggle";
import HelpModeToggle from "../components/ui/HelpModeToggle";
import { Link } from "react-router-dom";

const TopBarRedesigned: React.FC = () => {
  const { theme } = useTheme();
  const { displayMode, setDisplayMode, toggleFullscreen, displays, helpMode } =
    useUI();
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isLightMode = theme === "light";
  const isPresentMode = displayMode === "present";
  const hasMultipleDisplays = displays.length > 1;

  // Get current date in macOS format
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="h-14 bg-neutral-800 border-b border-neutral-700 flex items-center px-3 justify-between">
      {/* Left section - App menu */}
      <div className="flex items-center gap-2">
        <div className="relative group">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
          >
            <Menu className="w-4 h-4" />
            <span>ProFlow</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </Button>

          {/* App menu dropdown - would be implemented with proper dropdown component */}
          <div className="hidden group-hover:block absolute top-full left-0 mt-1 w-48 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-50">
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
              >
                New Service
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
              >
                Open Service
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
              >
                Save Service
              </a>
              <div className="border-t border-neutral-700 my-1"></div>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
              >
                Preferences
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
              >
                Exit
              </a>
            </div>
          </div>
        </div>

        {/* Quick access buttons */}
        <div className="flex items-center gap-1 ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white"
          >
            <Save className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Center section - Service info and controls */}
      <div className="flex items-center gap-3">
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
          <Button
            variant={isPresentMode ? "secondary" : "primary"}
            size="sm"
            onClick={() => setDisplayMode(isPresentMode ? "edit" : "present")}
            className="flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isPresentMode ? "Stop" : "Go Live"}</span>
          </Button>
        </Tooltip>

        {/* Service info */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-700/30">
          <div
            className={`w-2 h-2 ${isPresentMode ? "bg-red-500" : "bg-green-500"} rounded-full ${isPresentMode ? "animate-pulse" : ""}`}
          />
          <span className="text-sm font-medium text-white">Sunday Service</span>
          <span className="text-neutral-400/60 text-sm mx-1">•</span>
          <span className="text-sm text-neutral-400">{currentDate}</span>
        </div>

        {/* Display controls */}
        {hasMultipleDisplays && (
          <Link to="/displays">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
            >
              <Monitor className="w-4 h-4" />
              <span>{displays.length} Displays</span>
            </Button>
          </Link>
        )}
      </div>

      {/* Right section - User and system controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-white"
          >
            <Bell className="w-4 h-4" />
          </Button>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold">3</span>
          </div>
        </div>

        {/* Team */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
        >
          <Users className="w-4 h-4" />
          <span>Team</span>
        </Button>

        {/* User profile */}
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-medium">GC</span>
            </div>
          </button>

          {showUserMenu && (
            <Card
              variant="glass"
              className="absolute top-full right-0 mt-1 w-48 z-50"
            >
              <div className="py-1">
                <div className="px-4 py-2 border-b border-neutral-700">
                  <p className="text-sm font-medium">Grace Church</p>
                  <p className="text-xs text-neutral-400">
                    admin@gracechurch.org
                  </p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                >
                  Account Settings
                </a>
                <div className="border-t border-neutral-700 my-1"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                >
                  Sign Out
                </a>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBarRedesigned;
