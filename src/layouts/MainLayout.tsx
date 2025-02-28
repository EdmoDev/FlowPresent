import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useTheme } from '../contexts/ThemeContext';
import { useUI, DisplayConfig } from '../contexts/UIContext';
import MacOSWindow from '../components/ui/MacOSWindow';
import MultiScreenControls from '../components/ui/MultiScreenControls';
import { Tooltip } from '../components/Tooltip';
import { Monitor, X } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

// Secondary display window component
const DisplayWindow: React.FC<{ display: DisplayConfig; onClose: () => void }> = ({ 
  display, 
  onClose 
}) => {
  let content;
  
  switch (display.type) {
    case 'stage':
      content = (
        <div className="flex items-center justify-center h-full bg-black">
          <h2 className="text-3xl text-white">Stage Display</h2>
          <div className="absolute top-0 left-0 p-4 text-white text-xl">
            Currently Showing: Amazing Grace
          </div>
        </div>
      );
      break;
    case 'lyrics':
      content = (
        <div className="flex items-center justify-center h-full bg-black">
          <div className="text-center">
            <h2 className="text-6xl text-white font-bold mb-4">Amazing Grace</h2>
            <p className="text-3xl text-white">How sweet the sound</p>
          </div>
        </div>
      );
      break;
    case 'preview':
    default:
      content = (
        <div className="flex items-center justify-center h-full">
          <h2 className="text-2xl">Preview Window</h2>
        </div>
      );
  }
  
  return (
    <MacOSWindow 
      title={`${display.name} (${display.resolution.width}x${display.resolution.height})`}
      width={800}
      height={500}
      onClose={onClose}
    >
      {content}
    </MacOSWindow>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const { 
    displays, 
    sidebarCollapsed, 
    layout, 
    isFullscreen,
    removeDisplay
  } = useUI();
  
  // Track which secondary displays are shown in separate windows
  const [openDisplays, setOpenDisplays] = useState<string[]>([]);
  
  // Toggle a secondary display window
  const toggleDisplay = (displayId: string) => {
    setOpenDisplays(prev => 
      prev.includes(displayId)
        ? prev.filter(id => id !== displayId)
        : [...prev, displayId]
    );
  };
  
  // Effect to handle fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  }, [isFullscreen]);
  
  // Get secondary displays (not the main control display)
  const secondaryDisplays = displays.filter(d => d.id !== 'main');
  
  return (
    <div className={`min-h-screen bg-background-dark text-text-primary overflow-hidden ${theme === 'light' ? 'light-mode' : 'dark-mode'}`}>
      {/* Main application interface */}
      <div className="flex h-screen">
        {/* Sidebar - conditionally collapsed */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-[var(--sidebar-width)]'} transition-all duration-300`}>
          <Sidebar />
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
      
      {/* Display controls - fixed to the bottom right corner */}
      {secondaryDisplays.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <Tooltip content="Manage Displays" position="left" alwaysShow={true}>
            <button
              onClick={() => toggleDisplay('display-controls')}
              className="w-10 h-10 rounded-full bg-accent-blue text-white flex items-center justify-center shadow-lg"
            >
              <Monitor className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      )}
      
      {/* Secondary display windows */}
      {secondaryDisplays.map(display => (
        openDisplays.includes(display.id) && (
          <div 
            key={display.id}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
          >
            <DisplayWindow 
              display={display} 
              onClose={() => toggleDisplay(display.id)} 
            />
          </div>
        )
      ))}
      
      {/* Display controls panel */}
      {openDisplays.includes('display-controls') && (
        <div className="fixed bottom-16 right-4 w-80 z-40">
          <MacOSWindow
            title="Output Displays"
            onClose={() => toggleDisplay('display-controls')}
          >
            <div className="p-4">
              <MultiScreenControls />
            </div>
          </MacOSWindow>
        </div>
      )}
    </div>
  );
};

export default MainLayout;