import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  // Help mode: when true, tooltips are shown on hover
  helpMode: boolean;
  toggleHelpMode: () => void;
  
  // Sidebar state
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  
  // Right panel state (context panel for editing)
  rightPanelOpen: boolean;
  rightPanelContent: string | null;
  openRightPanel: (content: string) => void;
  closeRightPanel: () => void;
  
  // Active view
  activeView: 'service' | 'library' | 'media' | 'settings';
  setActiveView: (view: 'service' | 'library' | 'media' | 'settings') => void;
  
  // Display mode
  displayMode: 'edit' | 'present';
  setDisplayMode: (mode: 'edit' | 'present') => void;
  
  // Timeline view mode
  timelineView: 'compact' | 'detailed';
  toggleTimelineView: () => void;
  
  // Preview layout
  previewLayout: 'single' | 'grid' | 'comparison';
  setPreviewLayout: (layout: 'single' | 'grid' | 'comparison') => void;
  
  // Display configuration - multi-screen support
  activeDisplay: string;
  displays: DisplayConfig[];
  setActiveDisplay: (id: string) => void;
  addDisplay: (display: DisplayConfig) => void;
  removeDisplay: (id: string) => void;
  
  // Layout configuration
  layout: LayoutConfig;
  setLayout: (config: Partial<LayoutConfig>) => void;
  
  // Native-like window management
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  windowSize: { width: number; height: number };
  setWindowSize: (size: { width: number; height: number }) => void;
}

export interface DisplayConfig {
  id: string;
  name: string;
  type: 'main' | 'stage' | 'preview' | 'lyrics';
  resolution: { width: number; height: number };
  active: boolean;
}

export interface LayoutConfig {
  mainSplitRatio: number;
  showTimeline: boolean;
  showChat: boolean;
  showLibrary: boolean;
  rightPanelWidth: number;
  compactSidebar: boolean;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Help mode
  const [helpMode, setHelpMode] = useState(false);
  const toggleHelpMode = () => setHelpMode(prev => !prev);
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);
  
  // Right panel state
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [rightPanelContent, setRightPanelContent] = useState<string | null>(null);
  const openRightPanel = (content: string) => {
    setRightPanelContent(content);
    setRightPanelOpen(true);
  };
  const closeRightPanel = () => setRightPanelOpen(false);
  
  // Active view
  const [activeView, setActiveView] = useState<'service' | 'library' | 'media' | 'settings'>('service');
  
  // Display mode
  const [displayMode, setDisplayMode] = useState<'edit' | 'present'>('edit');
  
  // Timeline view mode
  const [timelineView, setTimelineView] = useState<'compact' | 'detailed'>('detailed');
  const toggleTimelineView = () => setTimelineView(prev => prev === 'compact' ? 'detailed' : 'compact');
  
  // Preview layout
  const [previewLayout, setPreviewLayout] = useState<'single' | 'grid' | 'comparison'>('single');
  
  // Display configuration - multi-screen support
  const [displays, setDisplays] = useState<DisplayConfig[]>([
    {
      id: 'main',
      name: 'Main Control',
      type: 'main',
      resolution: { width: 1920, height: 1080 },
      active: true
    },
    {
      id: 'stage',
      name: 'Stage Display',
      type: 'stage',
      resolution: { width: 1920, height: 1080 },
      active: false
    }
  ]);
  
  const [activeDisplay, setActiveDisplay] = useState('main');
  
  const addDisplay = (display: DisplayConfig) => {
    setDisplays(prev => [...prev, display]);
  };
  
  const removeDisplay = (id: string) => {
    setDisplays(prev => prev.filter(display => display.id !== id));
  };
  
  // Layout configuration
  const [layout, setLayoutState] = useState<LayoutConfig>({
    mainSplitRatio: 0.7,
    showTimeline: true,
    showChat: true,
    showLibrary: true,
    rightPanelWidth: 320,
    compactSidebar: false
  });
  
  const setLayout = (config: Partial<LayoutConfig>) => {
    setLayoutState(prev => ({ ...prev, ...config }));
  };
  
  // Native-like window management
  const [isFullscreen, setIsFullscreen] = useState(false);
  const toggleFullscreen = () => setIsFullscreen(prev => !prev);
  
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  return (
    <UIContext.Provider value={{
      helpMode,
      toggleHelpMode,
      sidebarCollapsed,
      toggleSidebar,
      rightPanelOpen,
      rightPanelContent,
      openRightPanel,
      closeRightPanel,
      activeView,
      setActiveView,
      displayMode,
      setDisplayMode,
      timelineView,
      toggleTimelineView,
      previewLayout,
      setPreviewLayout,
      activeDisplay,
      displays,
      setActiveDisplay,
      addDisplay,
      removeDisplay,
      layout,
      setLayout,
      isFullscreen,
      toggleFullscreen,
      windowSize,
      setWindowSize
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};