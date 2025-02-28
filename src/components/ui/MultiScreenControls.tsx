import React, { useState } from 'react';
import { Monitor, Plus, X, Edit, Settings } from 'lucide-react';
import { useUI, DisplayConfig } from '../../contexts/UIContext';
import MacOSWindow from './MacOSWindow';
import { Tooltip } from '../Tooltip';

interface DisplayCardProps {
  display: DisplayConfig;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

const DisplayCard: React.FC<DisplayCardProps> = ({ 
  display, 
  isActive, 
  onSelect, 
  onEdit, 
  onRemove 
}) => {
  return (
    <div 
      className={`relative border rounded-md p-3 ${
        isActive 
          ? 'border-accent-blue bg-accent-blue/5' 
          : 'border-[var(--border-subtle)] hover:border-[var(--border-subtle)]/80'
      } transition-colors cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2">
        <Monitor className={`w-5 h-5 ${isActive ? 'text-accent-blue' : 'text-text-secondary'}`} />
        <span className={`text-sm font-medium ${isActive ? 'text-accent-blue' : 'text-text-primary'}`}>
          {display.name}
        </span>
        
        <div className="ml-auto flex items-center gap-1">
          <Tooltip content="Edit Display" position="top">
            <button 
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              className="p-1 rounded hover:bg-background-glass/20 text-text-secondary hover:text-text-primary"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
          </Tooltip>
          
          {display.id !== 'main' && (
            <Tooltip content="Remove Display" position="top">
              <button 
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                className="p-1 rounded hover:bg-accent-red/10 text-text-secondary hover:text-accent-red"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
      
      <div className="mt-2 text-xs text-text-secondary">
        <div className="flex items-center justify-between">
          <span>Type: {display.type}</span>
          <span>{display.resolution.width} × {display.resolution.height}</span>
        </div>
        
        <div className="mt-1.5 flex items-center">
          <div className={`w-2 h-2 rounded-full ${display.active ? 'bg-accent-green' : 'bg-text-secondary/30'} mr-1.5`}></div>
          <span>{display.active ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>
    </div>
  );
};

const AddDisplayForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addDisplay } = useUI();
  const [name, setName] = useState('New Display');
  const [type, setType] = useState<DisplayConfig['type']>('preview');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDisplay({
      id: `display-${Date.now()}`,
      name,
      type,
      resolution: { width: 1920, height: 1080 },
      active: true
    });
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">Display Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full glass-input"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1.5">Display Type</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value as DisplayConfig['type'])}
          className="w-full glass-input"
        >
          <option value="preview">Preview</option>
          <option value="stage">Stage</option>
          <option value="lyrics">Lyrics</option>
        </select>
      </div>
      
      <div className="flex items-center gap-2 justify-end">
        <button 
          type="button" 
          onClick={onClose}
          className="px-3 py-1.5 rounded text-sm text-text-secondary hover:text-text-primary"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="px-3 py-1.5 rounded bg-accent-blue text-white text-sm"
        >
          Add Display
        </button>
      </div>
    </form>
  );
};

const MultiScreenControls: React.FC = () => {
  const { displays, activeDisplay, setActiveDisplay, removeDisplay } = useUI();
  const [showAddDisplay, setShowAddDisplay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-text-primary">Displays</h2>
        <div className="flex items-center gap-1.5">
          <Tooltip content="Display Settings" position="left">
            <button 
              onClick={() => setShowSettings(true)}
              className="p-1.5 rounded-full glass-button"
            >
              <Settings className="w-4 h-4 text-text-secondary" />
            </button>
          </Tooltip>
          
          <Tooltip content="Add Display" position="left">
            <button 
              onClick={() => setShowAddDisplay(true)}
              className="p-1.5 rounded-full glass-button"
            >
              <Plus className="w-4 h-4 text-text-secondary" />
            </button>
          </Tooltip>
        </div>
      </div>
      
      <div className="space-y-2">
        {displays.map(display => (
          <DisplayCard 
            key={display.id}
            display={display}
            isActive={display.id === activeDisplay}
            onSelect={() => setActiveDisplay(display.id)}
            onEdit={() => {/* TODO: Implement edit functionality */}}
            onRemove={() => removeDisplay(display.id)}
          />
        ))}
      </div>
      
      {/* Add Display Modal */}
      {showAddDisplay && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <MacOSWindow 
            title="Add New Display"
            width={400}
            height="auto"
            onClose={() => setShowAddDisplay(false)}
          >
            <AddDisplayForm onClose={() => setShowAddDisplay(false)} />
          </MacOSWindow>
        </div>
      )}
      
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <MacOSWindow 
            title="Display Settings"
            width={600}
            height={400}
            onClose={() => setShowSettings(false)}
          >
            <div className="p-4">
              <h3 className="text-base font-medium text-text-primary mb-4">Configure Displays</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="display-stage" defaultChecked />
                  <label htmlFor="display-stage" className="text-sm text-text-primary">Show Stage Display</label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="display-lyrics" defaultChecked />
                  <label htmlFor="display-lyrics" className="text-sm text-text-primary">Show Lyrics Display</label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="display-preview" defaultChecked />
                  <label htmlFor="display-preview" className="text-sm text-text-primary">Show Preview Display</label>
                </div>
              </div>
            </div>
          </MacOSWindow>
        </div>
      )}
    </div>
  );
};

export default MultiScreenControls;