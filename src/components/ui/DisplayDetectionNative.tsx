import React, { useState, useEffect } from "react";
import {
  Monitor,
  ExternalLink,
  RefreshCw,
  X,
  Settings,
  Check,
  Laptop,
  Tv,
  Smartphone,
  Info,
  AlertCircle,
  Plus,
  ArrowUp,
} from "lucide-react";
import { useUI } from "../../contexts/UIContext";
import { Button } from "./Button";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

interface DisplayInfo {
  id: string;
  name: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

const DisplayDetectionNative: React.FC = () => {
  const { addDisplay, displays } = useUI();
  const [detectedDisplays, setDetectedDisplays] = useState<DisplayInfo[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Mock function to detect displays
  // In a real implementation, this would use the Screen Capture API or similar
  const detectDisplays = () => {
    setIsDetecting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate mock display data
      const mockDisplays: DisplayInfo[] = [
        {
          id: "display-1",
          name: "Main Display",
          width: 1920,
          height: 1080,
          isPrimary: true,
        },
        {
          id: "display-2",
          name: "Secondary Display",
          width: 1280,
          height: 720,
          isPrimary: false,
        },
        {
          id: "display-3",
          name: "Projector",
          width: 1024,
          height: 768,
          isPrimary: false,
        },
      ];

      setDetectedDisplays(mockDisplays);
      setIsDetecting(false);
    }, 1500);
  };

  // Add a display to the UI context
  const handleAddDisplay = (display: DisplayInfo) => {
    // Check if display already exists in the UI context
    const existingDisplay = displays.find((d) => d.id === display.id);

    if (!existingDisplay) {
      addDisplay({
        id: display.id,
        name: display.name,
        type: "main", // Default type
        resolution: { width: display.width, height: display.height },
        active: false,
      });
    }
  };

  // Detect displays on component mount
  useEffect(() => {
    detectDisplays();
  }, []);

  return (
    <div className="p-6 bg-neutral-900">
      <div className="max-w-5xl mx-auto">
        {/* Header with info */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-1">
              Display Detection
            </h1>
            <p className="text-neutral-400">
              Detect and configure external displays for your presentations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center gap-1.5"
            >
              <Info className="w-4 h-4" />
              <span>Help</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={detectDisplays}
              disabled={isDetecting}
              className="flex items-center gap-1.5"
            >
              <RefreshCw
                className={`w-4 h-4 ${isDetecting ? "animate-spin" : ""}`}
              />
              <span>Refresh Displays</span>
            </Button>
          </div>
        </div>

        {/* Help panel */}
        {showHelp && (
          <Card className="mb-6 bg-blue-500/10 border border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white mb-1">
                    About Display Detection
                  </h3>
                  <p className="text-neutral-300 mb-2">
                    ProFlow can detect and use multiple displays for your
                    presentations. This allows you to show different content on
                    each screen, such as:
                  </p>
                  <ul className="list-disc pl-5 text-neutral-300 space-y-1">
                    <li>Main presentation output for your audience</li>
                    <li>Stage display with notes and timers for presenters</li>
                    <li>Preview screens for operators</li>
                    <li>Lobby displays with announcements</li>
                  </ul>
                  <p className="text-neutral-300 mt-2">
                    Connect your displays, click "Refresh Displays" to detect
                    them, then add them to your configuration.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detected displays */}
        <h2 className="text-lg font-medium text-white mb-3">
          Detected Displays
        </h2>

        {isDetecting ? (
          <Card className="bg-neutral-800 border-neutral-700 mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-neutral-300 text-lg">
                  Scanning for displays...
                </p>
                <p className="text-neutral-500 mt-1">
                  This may take a few moments
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {detectedDisplays.map((display) => {
              const isAdded = displays.some((d) => d.id === display.id);
              const displayIcon = display.isPrimary
                ? Monitor
                : display.width > 1000
                  ? Tv
                  : Laptop;

              return (
                <Card
                  key={display.id}
                  className={`bg-neutral-800 border-neutral-700 ${isAdded ? "ring-2 ring-blue-500/50" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-3 rounded-md ${display.isPrimary ? "bg-blue-500/20" : "bg-neutral-700"}`}
                      >
                        {React.createElement(displayIcon, {
                          className: "w-6 h-6 text-white",
                        })}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">
                            {display.name}
                          </h3>
                          {display.isPrimary && (
                            <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 mt-1">
                          {display.width} × {display.height}
                        </p>

                        <div className="mt-4 flex justify-between items-center">
                          <div className="text-xs text-neutral-500">
                            {isAdded
                              ? "Already added to configuration"
                              : "Available for use"}
                          </div>

                          <Button
                            variant={isAdded ? "secondary" : "primary"}
                            size="sm"
                            onClick={() => handleAddDisplay(display)}
                            disabled={isAdded}
                            className="flex items-center gap-1.5"
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Display</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* No displays card */}
            {detectedDisplays.length === 0 && (
              <Card className="col-span-full bg-neutral-800 border-neutral-700">
                <CardContent className="p-8 text-center">
                  <Monitor className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white mb-1">
                    No displays detected
                  </h3>
                  <p className="text-neutral-400 max-w-md mx-auto">
                    Make sure your displays are properly connected to your
                    computer and try refreshing.
                  </p>
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={detectDisplays}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Displays
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Connected displays section */}
        <h2 className="text-lg font-medium text-white mb-3">
          Connected Displays
        </h2>

        {displays.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displays
              .filter((d) => d.id !== "main")
              .map((display) => (
                <Card
                  key={display.id}
                  className="bg-neutral-800 border-neutral-700"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-3 rounded-md ${display.active ? "bg-green-500/20" : "bg-neutral-700"}`}
                      >
                        {display.type === "stage" ? (
                          <Laptop className="w-6 h-6 text-white" />
                        ) : display.type === "preview" ? (
                          <Monitor className="w-6 h-6 text-white" />
                        ) : display.type === "lyrics" ? (
                          <Tv className="w-6 h-6 text-white" />
                        ) : (
                          <Monitor className="w-6 h-6 text-white" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">
                            {display.name}
                          </h3>
                          <span className="text-xs px-1.5 py-0.5 bg-neutral-700 text-neutral-300 rounded-full capitalize">
                            {display.type}
                          </span>
                          {display.active && (
                            <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-300 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 mt-1">
                          {display.resolution.width} ×{" "}
                          {display.resolution.height}
                        </p>

                        <div className="mt-4 flex justify-end gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="flex items-center gap-1.5"
                            onClick={() => {
                              // Configure display
                              console.log("Configure display:", display.id);
                            }}
                          >
                            <Settings className="w-3.5 h-3.5" />
                            <span>Configure</span>
                          </Button>

                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-1.5"
                            onClick={() => {
                              // Remove display
                              console.log("Remove display:", display.id);
                            }}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <Card className="bg-neutral-800 border-neutral-700">
            <CardContent className="p-6 text-center">
              <p className="text-neutral-400">
                No additional displays connected. Add displays from the list
                above to configure your presentation outputs.
              </p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Add Displays
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DisplayDetectionNative;
