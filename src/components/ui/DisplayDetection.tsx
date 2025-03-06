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

interface DisplayInfo {
  id: string;
  name: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

const DisplayDetection: React.FC = () => {
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
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-accent-blue" />
          <h2 className="text-lg font-medium text-text-primary">
            Display Detection
          </h2>
        </div>

        <button
          className="px-3 py-1.5 text-sm bg-background-glass/10 hover:bg-background-glass/20 rounded-md flex items-center gap-1.5"
          onClick={detectDisplays}
          disabled={isDetecting}
        >
          <Maximize2 className="w-3.5 h-3.5 text-text-secondary" />
          <span>Refresh</span>
        </button>
      </div>

      {isDetecting ? (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-text-secondary">Detecting displays...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {detectedDisplays.map((display) => {
            const isAdded = displays.some((d) => d.id === display.id);

            return (
              <div
                key={display.id}
                className="p-3 border border-[var(--border-subtle)] rounded-lg bg-background-glass/10 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Monitor
                      className={`w-4 h-4 ${display.isPrimary ? "text-accent-green" : "text-text-secondary"}`}
                    />
                    <h3 className="text-text-primary font-medium">
                      {display.name}
                    </h3>
                    {display.isPrimary && (
                      <span className="text-xs px-1.5 py-0.5 bg-accent-green/10 text-accent-green rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary mt-1">
                    {display.width} × {display.height}
                  </p>
                </div>

                <button
                  className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 ${isAdded ? "bg-background-glass/20 text-text-secondary cursor-not-allowed" : "bg-accent-blue text-white hover:bg-accent-blue/90"}`}
                  onClick={() => handleAddDisplay(display)}
                  disabled={isAdded}
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
                </button>
              </div>
            );
          })}

          {detectedDisplays.length === 0 && (
            <div className="p-6 border border-[var(--border-subtle)] rounded-lg bg-background-glass/10 text-center">
              <Monitor className="w-12 h-12 text-text-secondary/30 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-text-primary mb-1">
                No displays detected
              </h3>
              <p className="text-text-secondary">
                Try refreshing or connecting additional displays.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium text-text-primary mb-2">
          Connected Displays
        </h3>

        {displays.length > 1 ? (
          <div className="space-y-2">
            {displays
              .filter((d) => d.id !== "main")
              .map((display) => (
                <div
                  key={display.id}
                  className="p-3 border border-[var(--border-subtle)] rounded-lg bg-background-glass/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Monitor
                      className={`w-4 h-4 ${display.active ? "text-accent-blue" : "text-text-secondary"}`}
                    />
                    <div>
                      <h4 className="text-text-primary font-medium">
                        {display.name}
                      </h4>
                      <p className="text-xs text-text-secondary">
                        {display.type} • {display.resolution.width} ×{" "}
                        {display.resolution.height}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="p-1.5 rounded-md hover:bg-background-glass/20 text-text-secondary"
                      onClick={() => {
                        // Open display settings
                        console.log("Configure display:", display.id);
                      }}
                    >
                      <Settings className="w-4 h-4" />
                    </button>

                    <button
                      className="p-1.5 rounded-md hover:bg-background-glass/20 text-text-secondary"
                      onClick={() => {
                        // Remove display
                        console.log("Remove display:", display.id);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="p-4 border border-[var(--border-subtle)] rounded-lg bg-background-glass/10 text-center">
            <p className="text-text-secondary">
              No additional displays connected. Add displays from the list
              above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayDetection;
