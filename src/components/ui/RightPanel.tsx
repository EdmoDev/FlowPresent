import React from 'react';
import { X } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';

interface RightPanelContentProps {
  type: string;
}

// This would be expanded with different panel content types
const RightPanelContent: React.FC<RightPanelContentProps> = ({ type }) => {
  switch (type) {
    case 'slide-editor':
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Slide Editor</h2>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Slide Title</label>
            <input className="glass-input w-full" defaultValue="Amazing Grace" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Content</label>
            <textarea className="glass-input w-full h-32" defaultValue="How sweet the sound" />
          </div>
        </div>
      );
    case 'song-properties':
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Song Properties</h2>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Song Title</label>
            <input className="glass-input w-full" defaultValue="Amazing Grace" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Key</label>
            <select className="glass-input w-full">
              <option>G Major</option>
              <option>A Major</option>
              <option>B Major</option>
              <option>C Major</option>
              <option>D Major</option>
              <option>E Major</option>
              <option>F Major</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">BPM</label>
            <input type="number" className="glass-input w-full" defaultValue="80" />
          </div>
        </div>
      );
    case 'timeline-item':
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Timeline Item</h2>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Item Name</label>
            <input className="glass-input w-full" defaultValue="Worship Set" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Duration</label>
            <input className="glass-input w-full" defaultValue="20:00" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-text-secondary">Notes</label>
            <textarea className="glass-input w-full h-32" />
          </div>
        </div>
      );
    default:
      return (
        <div>
          <h2 className="text-xl font-semibold">Unknown Panel Type</h2>
          <p>No content defined for panel type: {type}</p>
        </div>
      );
  }
};

const RightPanel: React.FC = () => {
  const { rightPanelOpen, rightPanelContent, closeRightPanel } = useUI();

  if (!rightPanelOpen || !rightPanelContent) {
    return null;
  }

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 w-80 glass-panel p-6 border-l border-[var(--border-subtle)] z-30"
      style={{
        animation: 'slideInRight 250ms ease-out forwards'
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={closeRightPanel}
          className="p-2 glass-button rounded-full"
          aria-label="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {rightPanelContent && <RightPanelContent type={rightPanelContent} />}
    </div>
  );
};

export default RightPanel;