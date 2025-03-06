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
import { Button } from "./Button";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Input } from "./Input";

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

const MultiScreenControlsRedesigned: React.FC = () => {
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
    <div className="p-4 bg-neutral-800/50">
      <Card variant="glass" className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-accent-blue" />
            <CardTitle className="text-lg">Output Displays</CardTitle>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddingDisplay(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Display</span>
          </Button>
        </CardHeader>

        <CardContent>
          {/* Add display form */}
          {isAddingDisplay && (
            <Card variant="glass" className="mb-4">
              <CardHeader>
                <CardTitle className="text-base">Add New Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">
                    Display Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Main Screen, Stage Monitor"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-1">
                    Display Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {displayTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={
                          newDisplayType === type.id ? "primary" : "outline"
                        }
                        className="justify-start h-auto p-3"
                        onClick={() => setNewDisplayType(type.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-md ${newDisplayType === type.id ? "bg-blue-600" : "bg-neutral-700"}`}
                          >
                            <type.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 text-left">
                            <h4 className="text-sm font-medium">{type.name}</h4>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsAddingDisplay(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    variant="primary"
                    onClick={handleAddDisplay}
                    disabled={!newDisplayName.trim()}
                  >
                    Add Display
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Displays list */}
          <div className="space-y-3">
            {displays.map((display) => (
              <Card
                key={display.id}
                variant="glass"
                className={
                  display.active ? "border-blue-600/30 bg-blue-600/5" : ""
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md ${display.active ? "bg-blue-600 text-white" : "bg-neutral-700"}`}
                      >
                        {getDisplayIcon(display.type)}
                      </div>

                      <div>
                        <h3 className="text-white font-medium">
                          {display.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-neutral-400 capitalize">
                            {display.type}
                          </span>
                          <span className="text-xs text-neutral-400">•</span>
                          <span className="text-xs text-neutral-400">
                            {display.resolution.width} ×{" "}
                            {display.resolution.height}
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
                            <Button
                              variant="ghost"
                              size="icon"
                              className={display.active ? "text-blue-600" : ""}
                              onClick={() => {
                                // Toggle display active state
                                const updatedDisplays = displays.map((d) =>
                                  d.id === display.id
                                    ? { ...d, active: !d.active }
                                    : d,
                                );
                                // Update displays in context
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
                            </Button>
                          </Tooltip>

                          <Tooltip content="Edit" position="top">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingDisplay(display.id)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Tooltip>

                          <Tooltip content="Remove" position="top">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeDisplay(display.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </Tooltip>
                        </>
                      )}

                      <Tooltip content="Configure" position="top">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            // Open display settings
                            console.log("Configure display:", display.id);
                          }}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Display preview */}
                  <Card variant="solid" className="mt-3 overflow-hidden">
                    <div className="aspect-video bg-neutral-900 flex items-center justify-center">
                      {display.active ? (
                        <div className="text-center">
                          <div className="text-xs text-neutral-400 mb-1">
                            Live Preview
                          </div>
                          <div className="text-sm text-white font-medium">
                            {display.type === "stage"
                              ? "Stage Display"
                              : "Presentation Output"}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <EyeOff className="w-6 h-6 text-neutral-500/30 mx-auto mb-2" />
                          <div className="text-sm text-neutral-400">
                            Display Inactive
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </CardContent>
              </Card>
            ))}

            {displays.length === 0 && (
              <Card variant="glass" className="text-center p-6">
                <Monitor className="w-12 h-12 text-neutral-500/30 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-white mb-1">
                  No displays configured
                </h3>
                <p className="text-neutral-400 mb-4">
                  Add a display to start configuring your outputs.
                </p>
                <Button
                  variant="primary"
                  className="inline-flex items-center gap-2"
                  onClick={() => setIsAddingDisplay(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Display</span>
                </Button>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MultiScreenControlsRedesigned;
