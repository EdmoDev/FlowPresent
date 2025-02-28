import React, { useState } from 'react';
import ServiceTimeline from './ServiceTimeline';
import PreviewWindow from './PreviewWindow';
import SlideCarousel from './SlideCarousel';
import TeamChat from './TeamChat';
import { Clock, Settings, Bell, SplitSquareVertical, Maximize2, ChevronRight, ChevronLeft } from 'lucide-react';
import { Tooltip } from '../Tooltip';
import { useUI } from '../../contexts/UIContext';

interface ServicePlanViewProps {
  // Add props as needed
}

const ServicePlanView: React.FC<ServicePlanViewProps> = () => {
  const { layout, setLayout } = useUI();
  const [rightPanelVisible, setRightPanelVisible] = useState(true);
  
  // Toggle right panel visibility
  const toggleRightPanel = () => {
    setRightPanelVisible(!rightPanelVisible);
  };
  
  return (
    <div className="flex flex-1 h-[calc(100vh-var(--header-height))]">
      {/* Main content area - resizable */}
      <div className={`flex-1 flex flex-col overflow-hidden ${rightPanelVisible ? 'pr-4' : ''}`}>
        {/* Main stage preview */}
        <div className="bg-background-card border border-[var(--border-subtle)] rounded-[var(--border-radius-md)] overflow-hidden flex-1 flex flex-col">
          <div className="px-4 py-2 border-b border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-medium text-text-primary">Main Stage</h2>
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full bg-background-glass/50">
                <div className="w-1.5 h-1.5 bg-accent-green rounded-full" />
                <span className="text-xs text-text-secondary">Live</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">1920 × 1080</span>
              <Tooltip content="View fullscreen" position="left">
                <button className="p-1 hover:bg-black/5 rounded transition-colors">
                  <Maximize2 className="w-3.5 h-3.5 text-text-secondary" />
                </button>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <PreviewWindow />
          </div>
        </div>
        
        {/* Slides carousel */}
        <div className="h-48 mt-4 bg-background-card border border-[var(--border-subtle)] rounded-[var(--border-radius-md)] overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
            <h3 className="text-sm font-medium text-text-primary">Slides</h3>
            <button className="p-1 hover:bg-black/5 rounded transition-colors">
              <SplitSquareVertical className="w-3.5 h-3.5 text-text-secondary" />
            </button>
          </div>
          
          <div className="p-3">
            <SlideCarousel />
          </div>
        </div>
      </div>
      
      {/* Toggle button for right panel */}
      <div className="relative">
        <button 
          onClick={toggleRightPanel}
          className="absolute top-1/2 -translate-y-1/2 -left-4 w-5 h-16 bg-background-card border border-[var(--border-subtle)] rounded-l-md flex items-center justify-center shadow-sm z-10"
        >
          {rightPanelVisible ? (
            <ChevronRight className="w-3 h-3 text-text-secondary" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-text-secondary" />
          )}
        </button>
      </div>
      
      {/* Right panel (timeline and chat) */}
      {rightPanelVisible && (
        <div className="w-80 h-full pl-4 flex flex-col space-y-4 overflow-hidden">
          {/* Service timeline */}
          <div className="bg-background-card border border-[var(--border-subtle)] rounded-[var(--border-radius-md)] overflow-hidden flex-1">
            <div className="px-4 py-2 border-b border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent-blue" />
                <h3 className="text-sm font-medium text-text-primary">Service Timeline</h3>
                <span className="text-xs text-text-secondary">(1:35:00)</span>
              </div>
              <div className="flex items-center gap-1">
                <Tooltip content="Timeline settings" position="bottom">
                  <button className="p-1 hover:bg-black/5 rounded transition-colors">
                    <Settings className="w-3.5 h-3.5 text-text-secondary" />
                  </button>
                </Tooltip>
                <Tooltip content="Timeline notifications" position="bottom">
                  <button className="p-1 hover:bg-black/5 rounded transition-colors">
                    <Bell className="w-3.5 h-3.5 text-text-secondary" />
                  </button>
                </Tooltip>
              </div>
            </div>
            
            <div className="p-3 h-[calc(100%-40px)] overflow-hidden">
              <ServiceTimeline />
            </div>
          </div>
          
          {/* Team chat */}
          <div className="bg-background-card border border-[var(--border-subtle)] rounded-[var(--border-radius-md)] overflow-hidden h-1/3">
            <TeamChat />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePlanView;