import React from "react";
import {
  Layout,
  BookOpen,
  Music,
  FileVideo,
  Video,
  Sliders,
  Timer,
  BrainCircuit,
  Settings,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Home,
  Calendar,
  Users,
  MessageSquare,
  Image,
  Layers,
  PanelLeft,
} from "lucide-react";
import { Tooltip } from "../components/Tooltip";
import { useUI } from "../contexts/UIContext";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  description: string;
  shortcut?: string;
  path?: string;
}

const mainNavItems: NavItem[] = [
  {
    id: "home",
    icon: Home,
    label: "Home",
    color: "text-blue-400",
    description: "Dashboard overview",
    path: "/",
  },
  {
    id: "service",
    icon: Layout,
    label: "Service Plan",
    color: "text-blue-400",
    description: "Plan and run your service",
    shortcut: "⌘1",
    path: "/service",
  },
  {
    id: "library",
    icon: Layers,
    label: "Media Library",
    color: "text-green-400",
    description: "Manage reusable content",
    shortcut: "⌘2",
    path: "/library",
  },
  {
    id: "bible",
    icon: BookOpen,
    label: "Bible",
    color: "text-amber-400",
    description: "Bible search and presentation",
    path: "/bible",
  },
  {
    id: "displays",
    icon: Monitor,
    label: "Displays",
    color: "text-purple-400",
    description: "Manage output displays",
    shortcut: "⌘4",
    path: "/displays",
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendar",
    color: "text-red-400",
    description: "Schedule services and events",
    path: "/calendar",
  },
  {
    id: "team",
    icon: Users,
    label: "Team",
    color: "text-indigo-400",
    description: "Manage team members",
    path: "/team",
  },
  {
    id: "chat",
    icon: MessageSquare,
    label: "Team Chat",
    color: "text-pink-400",
    description: "Communicate with your team",
    path: "/chat",
  },
];

const SidebarRedesigned: React.FC = () => {
  const { activeView, setActiveView, sidebarCollapsed, toggleSidebar } =
    useUI();

  return (
    <div className="h-full bg-neutral-800 border-r border-neutral-700 flex flex-col">
      {/* Main navigation */}
      <div className="flex-1 py-3 overflow-y-auto custom-scrollbar">
        <nav className="px-2 space-y-1">
          {mainNavItems.map((item) => (
            <NavButton
              key={item.id}
              item={item}
              isActive={activeView === item.id}
              onClick={() => setActiveView(item.id)}
              collapsed={sidebarCollapsed}
            />
          ))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-2 border-t border-neutral-700">
        <Button
          variant="ghost"
          size={sidebarCollapsed ? "icon" : "default"}
          className={`w-full justify-start ${sidebarCollapsed ? "px-0" : "px-3"}`}
          onClick={toggleSidebar}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5 text-neutral-400" />
          ) : (
            <>
              <PanelLeft className="w-5 h-5 text-neutral-400 mr-2" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  item,
  isActive,
  onClick,
  collapsed,
}) => {
  const { icon: Icon, label, color, description, shortcut, path } = item;

  if (collapsed) {
    // Collapsed view - icon only
    return (
      <Tooltip content={label} position="right">
        {path ? (
          <Link
            to={path}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${isActive ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-700/50"}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? color : ""}`} />
          </Link>
        ) : (
          <button
            onClick={onClick}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${isActive ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-700/50"}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? color : ""}`} />
          </button>
        )}
      </Tooltip>
    );
  }

  // Full view with text
  return (
    <Tooltip content={description} position="right">
      {path ? (
        <Link
          to={path}
          className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${isActive ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-700/50"}`}
        >
          <Icon className={`w-5 h-5 ${isActive ? color : ""} mr-3`} />
          <span className="text-sm">{label}</span>
          {shortcut && (
            <span className="ml-auto text-xs text-neutral-500">{shortcut}</span>
          )}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={`flex items-center w-full px-3 py-2 rounded-md transition-colors ${isActive ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white hover:bg-neutral-700/50"}`}
        >
          <Icon className={`w-5 h-5 ${isActive ? color : ""} mr-3`} />
          <span className="text-sm">{label}</span>
          {shortcut && (
            <span className="ml-auto text-xs text-neutral-500">{shortcut}</span>
          )}
        </button>
      )}
    </Tooltip>
  );
};

export default SidebarRedesigned;
