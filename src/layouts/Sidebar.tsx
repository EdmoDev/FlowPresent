import React, { useState } from 'react';
import {
  Layout,
  BookOpen,
  Music,
  FileVideo,
  Video,
  Sliders,
  Timer,
  BrainCircuit,
  Sparkles,
  Settings,
  CloudIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Tooltip } from '../components/Tooltip';
import { useUI } from '../contexts/UIContext';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  description: string;
  shortcut?: string;
}

const mainNavItems: NavItem[] = [
  {
    id: 'service',
    icon: Layout,
    label: 'Service Plan',
    color: 'text-accent-blue',
    description: 'Plan and run your service',
    shortcut: '⌘1'
  },
  {
    id: 'library',
    icon: BookOpen,
    label: 'Library',
    color: 'text-accent-green',
    description: 'Manage reusable content',
    shortcut: '⌘2'
  },
  {
    id: 'media',
    icon: FileVideo,
    label: 'Media',
    color: 'text-accent-orange',
    description: 'Organize your media files',
    shortcut: '⌘3'
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Settings',
    color: 'text-text-secondary',
    description: 'Configure preferences',
    shortcut: '⌘,'
  }
];

const moduleNavItems: NavItem[] = [
  {
    id: 'worship',
    icon: Music,
    label: 'Worship',
    color: 'text-accent-purple',
    description: 'Worship service management'
  },
  {
    id: 'production',
    icon: Video,
    label: 'Production',
    color: 'text-accent-red',
    description: 'Live production suite'
  },
  {
    id: 'audio',
    icon: Sliders,
    label: 'Audio',
    color: 'text-accent-blue',
    description: 'Advanced audio control'
  },
  {
    id: 'flow',
    icon: Timer,
    label: 'Flow',
    color: 'text-accent-green',
    description: 'Service flow automation'
  },
  {
    id: 'ai',
    icon: BrainCircuit,
    label: 'AI Studio',
    color: 'text-accent-purple',
    description: 'AI-powered creative tools'
  }
];

const Sidebar: React.FC = () => {
  const { activeView, setActiveView, sidebarCollapsed, toggleSidebar } = useUI();
  
  return (
    <div className={`h-full glass-panel border-r border-[var(--border-subtle)] flex flex-col ${
      sidebarCollapsed ? 'p-2' : 'p-4'
    }`}>
      {/* Logo area */}
      <Tooltip content="ProFlow Church Presentation Software" position="right">
        <div className={`flex items-center gap-2 mb-6 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <Layout className="w-8 h-8 text-accent-blue" />
          {!sidebarCollapsed && (
            <h1 className="text-xl font-semibold text-text-primary">
              Pro<span className="text-accent-blue">Flow</span>
            </h1>
          )}
        </div>
      </Tooltip>
      
      {/* Main navigation */}
      <div className={`mb-4 border-b border-[var(--border-subtle)] pb-4 ${sidebarCollapsed ? '' : ''}`}>
        {!sidebarCollapsed && (
          <h2 className="text-xs uppercase text-text-secondary font-medium mb-2 px-2">Main</h2>
        )}
        <nav className="space-y-1">
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
      
      {/* Modules */}
      <div>
        {!sidebarCollapsed && (
          <h2 className="text-xs uppercase text-text-secondary font-medium mb-2 px-2">Modules</h2>
        )}
        <nav className="space-y-1">
          {moduleNavItems.map((item) => (
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
      
      {/* User account / organization */}
      <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue/90 to-accent-purple/90 flex items-center justify-center shadow-md">
              <span className="text-white font-medium">GC</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Grace Church</p>
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <CloudIcon className="w-3 h-3" />
                <span>Connected</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue/90 to-accent-purple/90 flex items-center justify-center shadow-md">
              <span className="text-white font-medium">GC</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Collapse/expand button */}
      <Tooltip content={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} position="right">
        <button 
          onClick={toggleSidebar}
          className="absolute top-1/2 -right-3 w-6 h-12 bg-background-card border border-[var(--border-subtle)] rounded-r-md flex items-center justify-center shadow-sm"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-text-secondary" />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

interface NavButtonProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ item, isActive, onClick, collapsed }) => {
  const { icon: Icon, label, color, description, shortcut } = item;
  
  if (collapsed) {
    // Collapsed view - icon only
    return (
      <Tooltip content={<div>{label}{shortcut && <div className="mt-1 text-xs opacity-70">{shortcut}</div>}</div>} position="right">
        <button
          onClick={onClick}
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200
            ${isActive ? 'bg-accent-blue/10' : 'hover:bg-black/5'}`}
          aria-label={label}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </button>
      </Tooltip>
    );
  }
  
  // Full view with text
  return (
    <Tooltip content={description} position="right">
      <button
        onClick={onClick}
        className={`relative flex items-center gap-3 w-full px-3 py-2 rounded-lg text-text-secondary group transition-all duration-200
          ${isActive ? 'bg-accent-blue/10 text-text-primary' : 'hover:bg-black/5'}`}
      >
        <Icon className={`w-5 h-5 ${color}`} />
        <span className="text-sm font-medium">{label}</span>
        
        {shortcut && !isActive && (
          <span className="ml-auto text-xs text-text-secondary opacity-60">{shortcut}</span>
        )}
        
        {isActive && (
          <div className="absolute right-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-blue"></div>
          </div>
        )}
      </button>
    </Tooltip>
  );
};

export default Sidebar;