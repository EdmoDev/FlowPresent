import React from 'react';

interface KeyboardShortcut {
  key: string;
  description: string;
  category: string;
}

const shortcuts: KeyboardShortcut[] = [
  { key: 'Space', description: 'Play/Pause current slide', category: 'Playback' },
  { key: '→', description: 'Next slide', category: 'Navigation' },
  { key: '←', description: 'Previous slide', category: 'Navigation' },
  { key: 'Ctrl+N', description: 'New item', category: 'Timeline' },
  { key: 'Ctrl+S', description: 'Save service', category: 'File' },
  { key: 'Ctrl+O', description: 'Open service', category: 'File' },
  { key: 'F1', description: 'Toggle help mode', category: 'Help' },
  { key: 'F11', description: 'Toggle fullscreen', category: 'Display' },
  { key: 'B', description: 'Black screen', category: 'Display' },
  { key: 'W', description: 'White screen', category: 'Display' },
  { key: 'Esc', description: 'Clear screen/Exit fullscreen', category: 'Display' },
  { key: 'F5', description: 'Start presentation', category: 'Display' },
  { key: 'Ctrl+Alt+P', description: 'Show/Hide presenter view', category: 'Display' },
  { key: 'F2', description: 'Rename selected item', category: 'Timeline' },
  { key: 'Delete', description: 'Delete selected item', category: 'Timeline' },
  { key: 'Ctrl+Z', description: 'Undo', category: 'Edit' },
  { key: 'Ctrl+Y', description: 'Redo', category: 'Edit' },
  { key: 'Ctrl+D', description: 'Duplicate item', category: 'Timeline' },
  { key: 'Ctrl+F', description: 'Find', category: 'Edit' },
  { key: 'Ctrl+G', description: 'Group selected items', category: 'Timeline' },
];

const KeyboardShortcutsList: React.FC = () => {
  // Group shortcuts by category
  const categories = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
      
      <div className="space-y-6">
        {Object.entries(categories).map(([category, categoryShortcuts]) => (
          <div key={category}>
            <h3 className="text-md font-medium text-blue-500 mb-2">{category}</h3>
            <div className="space-y-1">
              {categoryShortcuts.map((shortcut) => (
                <div key={shortcut.key} className="flex justify-between py-1">
                  <span className="text-text-primary">{shortcut.description}</span>
                  <kbd className="px-2 py-0.5 rounded bg-background-glass text-xs font-mono text-text-secondary border border-[var(--border-subtle)]">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardShortcutsList;