import React from "react";

interface ShortcutCategory {
  name: string;
  shortcuts: {
    key: string;
    description: string;
  }[];
}

const shortcutCategories: ShortcutCategory[] = [
  {
    name: "General",
    shortcuts: [
      { key: "⌘S", description: "Save service" },
      { key: "⌘Z", description: "Undo" },
      { key: "⌘⇧Z", description: "Redo" },
      { key: "⌘F", description: "Find" },
      { key: "F1", description: "Show help" },
      { key: "F11", description: "Toggle fullscreen" },
      { key: "Esc", description: "Close dialog / Cancel action" },
    ],
  },
  {
    name: "Navigation",
    shortcuts: [
      { key: "⌘1", description: "Go to Service Plan" },
      { key: "⌘2", description: "Go to Library" },
      { key: "⌘3", description: "Go to Media" },
      { key: "⌘4", description: "Go to Displays" },
      { key: "⌘,", description: "Open Settings" },
      { key: "⌘⇧B", description: "Toggle sidebar" },
    ],
  },
  {
    name: "Presentation",
    shortcuts: [
      { key: "F5", description: "Start/Stop presentation" },
      { key: "Space", description: "Next slide" },
      { key: "←", description: "Previous slide" },
      { key: "→", description: "Next slide" },
      { key: "B", description: "Black screen" },
      { key: "W", description: "White screen" },
      { key: "T", description: "Show/hide timer" },
    ],
  },
  {
    name: "Editing",
    shortcuts: [
      { key: "⌘A", description: "Select all" },
      { key: "⌘C", description: "Copy" },
      { key: "⌘X", description: "Cut" },
      { key: "⌘V", description: "Paste" },
      { key: "⌘D", description: "Duplicate" },
      { key: "Delete", description: "Delete selected item" },
      { key: "⌘G", description: "Group items" },
      { key: "⌘⇧G", description: "Ungroup items" },
    ],
  },
  {
    name: "Bible",
    shortcuts: [
      { key: "⌘B", description: "Open Bible" },
      { key: "⌘⇧F", description: "Bible search" },
      { key: "⌘⇧V", description: "Add verse to presentation" },
      { key: "⌘⇧B", description: "Add bookmark" },
    ],
  },
];

const KeyboardShortcutsList: React.FC = () => {
  return (
    <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
      <h2 className="text-xl font-medium text-text-primary mb-6">
        Keyboard Shortcuts
      </h2>

      <div className="space-y-8">
        {shortcutCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-lg font-medium text-text-primary mb-3">
              {category.name}
            </h3>

            <div className="space-y-2">
              {category.shortcuts.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] last:border-0"
                >
                  <span className="text-text-primary">
                    {shortcut.description}
                  </span>
                  <kbd className="px-2.5 py-1.5 bg-background-glass/20 border border-[var(--border-subtle)] rounded-md text-sm font-mono text-text-secondary">
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
