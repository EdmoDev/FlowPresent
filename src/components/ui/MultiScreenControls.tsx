import React, { useState } from "react";
import {
  Monitor,
  Laptop,
  Tv,
  Projector,
  Edit2,
  Trash2,
  Plus,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { useUI, DisplayConfig } from "../../contexts/UIContext";
import { Tooltip } from "../Tooltip";

interface DisplayTypeOption {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const displayTypes: DisplayTypeOption[] = [
  {
    id: "main",
    name: "Main Output",
    icon: Monitor,
    description: "Primary presentation output for audience",
  },
  {
    id: "stage",
    name: "Stage Display",
    icon: Laptop,
    description: "Shows notes, lyrics, and timers for presenters",
  },
  {
    id: "preview",
    name: "Preview",
    icon: Eye,
    description: "Preview upcoming slides and content",
  },
  {
    id: "lyrics",
    name: "Lyrics Only",
    icon: Tv,
    description: "Shows only lyrics without backgrounds or other elements",
  },
];

const MultiScreenControls: React.FC = () => {
  const { displays, setActiveDisplay, addDisplay, removeDisplay } = useUI();
  const [isAddingDisplay, setIsAddingDisplay] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newDisplayType, setNewDisplayType] = useState<string>("main");
  const [editingDisplay, setEditingDisplay] = useState<string | null>(null);

  // Handle adding a new display
  const handleAddDisplay = () => {
    if (!newDisplayName.trim()) return;

    const displayId = `display-${Date.now()}`;

    addDisplay({
      id: displayId,
      name: newDisplayName,
      type: newDisplayType as "main" | "stage" | "preview" | "lyrics",
      resolution: { width: 1920, height: 1080 }, // Default resolution
      active: false,
    });

    // Reset form
    setNewDisplayName("");
    setNewDisplayType("main");
    setIsAddingDisplay(false);
  };

  // Get icon for display type
  const getDisplayIcon = (type: string) => {
    const displayType = displayTypes.find((t) => t.id === type);
    const Icon = displayType?.icon || Monitor;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-accent-blue" />
          <h2 className="text-lg font-medium text-text-primary">
            Output Displays
          </h2>
        </div>

        <button
          className="px-3 py-1.5 text-sm bg-accent-blue text-white rounded-md flex items-center gap-1.5 hover:bg-accent-blue/90 transition-colors"
          onClick={() => setIsAddingDisplay(true)}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Display</span>
        </button>
      </div>

      {/* Add display form */}
      {isAddingDisplay && (
        <div className="mb-4 p-4 border border-[var(--border-subtle)] rounded-lg bg-background-glass/10">
          <h3 className="text-sm font-medium text-text-primary mb-3">
            Add New Display
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Display Name
              </label>
              <input
                type="text"
                className="glass-input w-full"
                placeholder="e.g., Main Screen, Stage Monitor"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-text-secondary mb-1">
                Display Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {displayTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`p-3 border rounded-lg flex items-start gap-3 ${newDisplayType === type.id ? "border-accent-blue bg-accent-blue/5" : "border-[var(--border-subtle)] hover:bg-background-glass/10"}`}
                    onClick={() => setNewDisplayType(type.id)}
                  >
                    <div
                      className={`p-2 rounded-md ${newDisplayType === type.id ? "bg-accent-blue text-white" : "bg-background-glass/20 text-text-secondary"}`}
                    >
                      <type.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-text-primary">
                        {type.name}
                      </h4>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {type.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-1.5 text-sm bg-background-glass/10 text-text-secondary rounded-md hover:bg-background-glass/20"
                onClick={() => setIsAddingDisplay(false)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1.5 text-sm bg-accent-blue text-white rounded-md hover:bg-accent-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddDisplay}
                disabled={!newDisplayName.trim()}
              >
                Add Display
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Displays list */}
      <div className="space-y-3">
        {displays.map((display) => (
          <div
            key={display.id}
            className={`p-4 border rounded-lg ${display.active ? "border-accent-blue bg-accent-blue/5" : "border-[var(--border-subtle)] bg-background-glass/5"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-md ${display.active ? "bg-accent-blue text-white" : "bg-background-glass/20 text-text-secondary"}`}
                >
                  {getDisplayIcon(display.type)}
                </div>

                <div>
                  <h3 className="text-text-primary font-medium">
                    {display.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-text-secondary capitalize">
                      {display.type}
                    </span>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary">
                      {display.resolution.width} × {display.resolution.height}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {display.id !== "main" && (
                  <>
                    <Tooltip
                      content={display.active ? "Deactivate" : "Activate"}
                      position="top"
                    >
                      <button
                        className={`p-1.5 rounded-md ${display.active ? "bg-accent-blue/10 text-accent-blue" : "hover:bg-background-glass/10 text-text-secondary"}`}
                        onClick={() => {
                          // Toggle display active state
                          const updatedDisplays = displays.map((d) =>
                            d.id === display.id
                              ? { ...d, active: !d.active }
                              : d,
                          );
                          // Update displays in context
                          // This is a simplified approach - in a real app you'd have a proper setDisplays function
                          console.log(
                            "Toggling display active state:",
                            display.id,
                          );
                        }}
                      >
                        {display.active ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                    </Tooltip>

                    <Tooltip content="Edit" position="top">
                      <button
                        className="p-1.5 rounded-md hover:bg-background-glass/10 text-text-secondary"
                        onClick={() => setEditingDisplay(display.id)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </Tooltip>

                    <Tooltip content="Remove" position="top">
                      <button
                        className="p-1.5 rounded-md hover:bg-background-glass/10 text-text-secondary"
                        onClick={() => removeDisplay(display.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </>
                )}

                <Tooltip content="Configure" position="top">
                  <button
                    className="p-1.5 rounded-md hover:bg-background-glass/10 text-text-secondary"
                    onClick={() => {
                      // Open display settings
                      console.log("Configure display:", display.id);
                    }}
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Display preview */}
            <div className="mt-3 border border-[var(--border-subtle)] rounded-md overflow-hidden">
              <div className="aspect-video bg-background-dark flex items-center justify-center">
                {display.active ? (
                  <div className="text-center">
                    <div className="text-xs text-text-secondary mb-1">
                      Live Preview
                    </div>
                    <div className="text-sm text-text-primary font-medium">
                      {display.type === "stage"
                        ? "Stage Display"
                        : "Presentation Output"}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <EyeOff className="w-6 h-6 text-text-secondary/30 mx-auto mb-2" />
                    <div className="text-sm text-text-secondary">
                      Display Inactive
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {displays.length === 0 && (
          <div className="p-6 border border-[var(--border-subtle)] rounded-lg bg-background-glass/10 text-center">
            <Monitor className="w-12 h-12 text-text-secondary/30 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-text-primary mb-1">
              No displays configured
            </h3>
            <p className="text-text-secondary mb-4">
              Add a display to start configuring your outputs.
            </p>
            <button
              className="px-4 py-2 bg-accent-blue text-white rounded-md inline-flex items-center gap-2 hover:bg-accent-blue/90"
              onClick={() => setIsAddingDisplay(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Add Display</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiScreenControls;
