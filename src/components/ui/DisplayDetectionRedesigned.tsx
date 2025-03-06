import React, { useState, useEffect } from "react";
import {
  Monitor,
  ExternalLink,
  Maximize2,
  X,
  Settings,
  Check,
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

const DisplayDetectionRedesigned: React.FC = () => {
  const { addDisplay, displays } = useUI();
  const [detectedDisplays, setDetectedDisplays] = useState<DisplayInfo[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);

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
    <div className="p-4 bg-neutral-800/50">
      <Card variant="glass" className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-accent-blue" />
            <CardTitle className="text-lg">Display Detection</CardTitle>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={detectDisplays}
            disabled={isDetecting}
            className="flex items-center gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>
        </CardHeader>

        <CardContent>
          {isDetecting ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-neutral-400">Detecting displays...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {detectedDisplays.map((display) => {
                const isAdded = displays.some((d) => d.id === display.id);

                return (
                  <Card
                    key={display.id}
                    variant="glass"
                    className="overflow-hidden"
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Monitor
                            className={`w-4 h-4 ${display.isPrimary ? "text-accent-green" : "text-neutral-400"}`}
                          />
                          <h3 className="text-white font-medium">
                            {display.name}
                          </h3>
                          {display.isPrimary && (
                            <span className="text-xs px-1.5 py-0.5 bg-accent-green/10 text-accent-green rounded-full">
                              Primary
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 mt-1">
                          {display.width} × {display.height}
                        </p>
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
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Add Display</span>
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}

              {detectedDisplays.length === 0 && (
                <Card variant="glass" className="text-center p-6">
                  <Monitor className="w-12 h-12 text-neutral-500/30 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white mb-1">
                    No displays detected
                  </h3>
                  <p className="text-neutral-400">
                    Try refreshing or connecting additional displays.
                  </p>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle className="text-base">Connected Displays</CardTitle>
        </CardHeader>
        <CardContent>
          {displays.length > 1 ? (
            <div className="space-y-2">
              {displays
                .filter((d) => d.id !== "main")
                .map((display) => (
                  <Card
                    key={display.id}
                    variant="glass"
                    className="overflow-hidden"
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor
                          className={`w-4 h-4 ${display.active ? "text-accent-blue" : "text-neutral-400"}`}
                        />
                        <div>
                          <h4 className="text-white font-medium">
                            {display.name}
                          </h4>
                          <p className="text-xs text-neutral-400">
                            {display.type} • {display.resolution.width} ×{" "}
                            {display.resolution.height}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
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

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            // Remove display
                            console.log("Remove display:", display.id);
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <Card variant="glass" className="text-center p-4">
              <p className="text-neutral-400">
                No additional displays connected. Add displays from the list
                above.
              </p>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DisplayDetectionRedesigned;
