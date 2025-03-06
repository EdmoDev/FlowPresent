import React from "react";
import { X } from "lucide-react";
import { useUI } from "../../contexts/UIContext";

const RightPanel: React.FC = () => {
  const { rightPanelOpen, rightPanelContent, closeRightPanel } = useUI();

  if (!rightPanelOpen) return null;

  // Determine panel content based on rightPanelContent value
  const renderPanelContent = () => {
    switch (rightPanelContent) {
      case "slide-editor":
        return (
          <div className="p-4">
            <h2 className="text-lg font-medium text-text-primary mb-4">
              Slide Editor
            </h2>
            <p className="text-text-secondary">Edit your slide content here.</p>
            {/* Slide editor content would go here */}
          </div>
        );
      case "timeline-item":
        return (
          <div className="p-4">
            <h2 className="text-lg font-medium text-text-primary mb-4">
              Timeline Item
            </h2>
            <p className="text-text-secondary">
              Edit timeline item details here.
            </p>
            {/* Timeline item editor content would go here */}
          </div>
        );
      default:
        return (
          <div className="p-4">
            <h2 className="text-lg font-medium text-text-primary mb-4">
              Details
            </h2>
            <p className="text-text-secondary">
              Select an item to edit its details.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed top-[var(--header-height)] right-0 bottom-0 w-[320px] bg-background-card border-l border-[var(--border-subtle)] shadow-lg z-30 animate-slideInRight">
      <div className="h-full flex flex-col">
        {/* Panel header */}
        <div className="px-4 py-3 border-b border-[var(--border-subtle)] bg-background-elevated flex items-center justify-between">
          <h3 className="text-base font-medium text-text-primary">
            {rightPanelContent === "slide-editor"
              ? "Slide Editor"
              : rightPanelContent === "timeline-item"
                ? "Timeline Item"
                : "Details"}
          </h3>
          <button
            className="p-1.5 rounded-md hover:bg-background-glass/10"
            onClick={closeRightPanel}
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {renderPanelContent()}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
