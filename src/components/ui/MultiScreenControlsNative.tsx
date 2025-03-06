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
  Layout,
  Layers,
  Type,
  Clock,
  Image,
  Video,
  Save,
  Copy,
  AlertCircle,
  Check,
  X,
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

const MultiScreenControlsNative: React.FC = () => {
  const { displays, setActiveDisplay, addDisplay, removeDisplay } = useUI();
  const [isAddingDisplay, setIsAddingDisplay] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newDisplayType, setNewDisplayType] = useState<string>("main");
  const [editingDisplay, setEditingDisplay] = useState<string | null>(null);
  const [selectedDisplay, setSelectedDisplay] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"layout" | "content" | "settings">(
    "layout",
  );

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
    <div className="flex h-full bg-neutral-900">
      {/* Displays list sidebar */}
      <div className="w-72 border-r border-neutral-800 flex flex-col bg-neutral-800/50">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <h2 className="text-lg font-medium text-white">Output Displays</h2>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddingDisplay(true)}
            className="flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </Button>
        </div>

        {/* Displays list */}
        <div className="flex-1 overflow-y-auto p-2">
          {displays.length > 0 ? (
            <div className="space-y-2">
              {displays.map((display) => (
                <div
                  key={display.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${selectedDisplay === display.id ? "bg-blue-500/20 border border-blue-500/30" : "hover:bg-neutral-700/50"}`}
                  onClick={() => setSelectedDisplay(display.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-md ${display.active ? "bg-green-500/20" : "bg-neutral-700"}`}
                    >
                      {getDisplayIcon(display.type)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {display.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-neutral-400 capitalize">
                          {display.type}
                        </span>
                        {display.active && (
                          <>
                            <span className="text-xs text-neutral-500">•</span>
                            <span className="text-xs text-green-400">
                              Active
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-4">
                <Monitor className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                <p className="text-neutral-400 text-sm">
                  No displays configured
                </p>
                <p className="text-neutral-500 text-xs mt-1">
                  Add a display to get started
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Add display form */}
        {isAddingDisplay && (
          <div className="p-4 border-t border-neutral-800 bg-neutral-800/80">
            <h3 className="text-sm font-medium text-white mb-3">
              Add New Display
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Display Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Main Screen"
                  className="bg-neutral-700/50 border-neutral-600"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Display Type
                </label>
                <select
                  className="w-full bg-neutral-700/50 border border-neutral-600 rounded-md px-3 py-1.5 text-sm text-white"
                  value={newDisplayType}
                  onChange={(e) => setNewDisplayType(e.target.value)}
                >
                  {displayTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingDisplay(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddDisplay}
                  disabled={!newDisplayName.trim()}
                >
                  Add Display
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Display configuration area */}
      <div className="flex-1 overflow-hidden">
        {selectedDisplay ? (
          <div className="h-full flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-neutral-800 bg-neutral-800/50">
              <button
                className={`px-4 py-3 text-sm font-medium ${activeTab === "layout" ? "text-white border-b-2 border-blue-500" : "text-neutral-400 hover:text-white"}`}
                onClick={() => setActiveTab("layout")}
              >
                Layout
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${activeTab === "content" ? "text-white border-b-2 border-blue-500" : "text-neutral-400 hover:text-white"}`}
                onClick={() => setActiveTab("content")}
              >
                Content
              </button>
              <button
                className={`px-4 py-3 text-sm font-medium ${activeTab === "settings" ? "text-white border-b-2 border-blue-500" : "text-neutral-400 hover:text-white"}`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
            </div>

            {/* Content based on active tab */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "layout" && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Layout Configuration
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-neutral-800 border-neutral-700">
                      <CardHeader>
                        <CardTitle className="text-base">
                          Display Preview
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-neutral-900 rounded-md flex items-center justify-center border border-neutral-700">
                          <div className="text-center">
                            <div className="text-sm text-neutral-400 mb-1">
                              Preview
                            </div>
                            <div className="text-white font-medium">
                              {
                                displays.find((d) => d.id === selectedDisplay)
                                  ?.name
                              }
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between">
                          <div>
                            <div className="text-sm text-neutral-400">
                              Resolution
                            </div>
                            <div className="text-white">
                              {
                                displays.find((d) => d.id === selectedDisplay)
                                  ?.resolution.width
                              }{" "}
                              ×
                              {
                                displays.find((d) => d.id === selectedDisplay)
                                  ?.resolution.height
                              }
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-neutral-400">
                              Status
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`w-2 h-2 rounded-full ${displays.find((d) => d.id === selectedDisplay)?.active ? "bg-green-500" : "bg-neutral-500"}`}
                              ></div>
                              <span className="text-white">
                                {displays.find((d) => d.id === selectedDisplay)
                                  ?.active
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-neutral-800 border-neutral-700">
                      <CardHeader>
                        <CardTitle className="text-base">
                          Layout Elements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-2 bg-neutral-700/30 rounded-md">
                            <div className="flex items-center gap-2">
                              <Layout className="w-4 h-4 text-blue-400" />
                              <span className="text-white">Main Content</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2 bg-neutral-700/30 rounded-md">
                            <div className="flex items-center gap-2">
                              <Type className="w-4 h-4 text-green-400" />
                              <span className="text-white">Lower Thirds</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2 bg-neutral-700/30 rounded-md">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-400" />
                              <span className="text-white">Timer</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <EyeOff className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-2 bg-neutral-700/30 rounded-md">
                            <div className="flex items-center gap-2">
                              <Image className="w-4 h-4 text-purple-400" />
                              <span className="text-white">Logo</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Settings className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                          >
                            <Plus className="w-3.5 h-3.5 mr-1.5" />
                            <span>Add Element</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "content" && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Content Configuration
                  </h2>

                  <Card className="bg-neutral-800 border-neutral-700 mb-6">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Display Type Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayTypes.map((type) => (
                          <Button
                            key={type.id}
                            variant={
                              displays.find((d) => d.id === selectedDisplay)
                                ?.type === type.id
                                ? "primary"
                                : "outline"
                            }
                            className="justify-start h-auto p-3"
                            onClick={() => {
                              // Update display type
                              console.log("Update display type:", type.id);
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-md ${displays.find((d) => d.id === selectedDisplay)?.type === type.id ? "bg-blue-600" : "bg-neutral-700"}`}
                              >
                                <type.icon className="w-5 h-5" />
                              </div>
                              <div className="flex-1 text-left">
                                <h4 className="text-sm font-medium">
                                  {type.name}
                                </h4>
                                <p className="text-xs text-neutral-400 mt-0.5">
                                  {type.description}
                                </p>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader>
                      <CardTitle className="text-base">
                        Content Visibility
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-blue-400" />
                            <span className="text-white">Show Videos</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Image className="w-4 h-4 text-green-400" />
                            <span className="text-white">Show Images</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Type className="w-4 h-4 text-amber-400" />
                            <span className="text-white">Show Text</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                              defaultChecked
                            />
                            <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-400" />
                            <span className="text-white">Show Timers</span>
                          </div>
                          <div className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              value=""
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Display Settings
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-neutral-800 border-neutral-700">
                      <CardHeader>
                        <CardTitle className="text-base">
                          General Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-neutral-400 mb-1">
                              Display Name
                            </label>
                            <Input
                              type="text"
                              className="bg-neutral-700/50 border-neutral-600"
                              value={
                                displays.find((d) => d.id === selectedDisplay)
                                  ?.name || ""
                              }
                              onChange={() => {}}
                            />
                          </div>

                          <div>
                            <label className="block text-sm text-neutral-400 mb-1">
                              Resolution
                            </label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                className="bg-neutral-700/50 border-neutral-600"
                                value={
                                  displays.find((d) => d.id === selectedDisplay)
                                    ?.resolution.width || 1920
                                }
                                onChange={() => {}}
                              />
                              <span className="flex items-center text-neutral-400">
                                ×
                              </span>
                              <Input
                                type="number"
                                className="bg-neutral-700/50 border-neutral-600"
                                value={
                                  displays.find((d) => d.id === selectedDisplay)
                                    ?.resolution.height || 1080
                                }
                                onChange={() => {}}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-white">Active</span>
                            <div className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={
                                  displays.find((d) => d.id === selectedDisplay)
                                    ?.active || false
                                }
                                onChange={() => {}}
                              />
                              <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-neutral-800 border-neutral-700">
                      <CardHeader>
                        <CardTitle className="text-base">
                          Advanced Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm text-neutral-400 mb-1">
                              Background Color
                            </label>
                            <div className="flex gap-2">
                              <div className="w-10 h-10 rounded-md bg-black border border-neutral-700"></div>
                              <Input
                                type="text"
                                className="bg-neutral-700/50 border-neutral-600"
                                value="#000000"
                                onChange={() => {}}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm text-neutral-400 mb-1">
                              Refresh Rate
                            </label>
                            <select className="w-full bg-neutral-700/50 border border-neutral-600 rounded-md px-3 py-1.5 text-sm text-white">
                              <option value="60">60 Hz</option>
                              <option value="50">50 Hz</option>
                              <option value="30">30 Hz</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-white">
                              Hardware Acceleration
                            </span>
                            <div className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                defaultChecked
                              />
                              <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        // Remove display
                        removeDisplay(selectedDisplay);
                        setSelectedDisplay(null);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove Display</span>
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        className="flex items-center gap-1.5"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Duplicate</span>
                      </Button>

                      <Button
                        variant="primary"
                        className="flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md p-6">
              <Monitor className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">
                No Display Selected
              </h2>
              <p className="text-neutral-400 mb-6">
                Select a display from the sidebar to configure its settings, or
                add a new display to get started.
              </p>
              <Button
                variant="primary"
                onClick={() => setIsAddingDisplay(true)}
                className="flex items-center gap-1.5 mx-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Display</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiScreenControlsNative;
