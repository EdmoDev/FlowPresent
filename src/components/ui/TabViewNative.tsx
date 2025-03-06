import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ElementType;
  content: React.ReactNode;
}

interface TabViewNativeProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: "default" | "pills" | "underline";
  size?: "default" | "sm" | "lg";
}

const TabViewNative: React.FC<TabViewNativeProps> = ({
  tabs,
  defaultTab,
  variant = "default",
  size = "default",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const getTabStyles = () => {
    const baseStyles = "flex items-center gap-2 font-medium transition-colors";
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      default: "px-4 py-2",
      lg: "text-lg px-5 py-2.5",
    };

    switch (variant) {
      case "pills":
        return `${baseStyles} ${sizeStyles[size]} rounded-md`;
      case "underline":
        return `${baseStyles} ${sizeStyles[size]} border-b-2`;
      default: // default tabs
        return `${baseStyles} ${sizeStyles[size]}`;
    }
  };

  const getActiveStyles = (tabId: string) => {
    const isActive = activeTab === tabId;

    switch (variant) {
      case "pills":
        return isActive
          ? "bg-blue-500 text-white"
          : "text-neutral-400 hover:text-white hover:bg-neutral-700/50";
      case "underline":
        return isActive
          ? "text-white border-blue-500"
          : "text-neutral-400 border-transparent hover:text-white hover:border-neutral-700";
      default: // default tabs
        return isActive
          ? "text-white border-b-2 border-blue-500"
          : "text-neutral-400 border-b-2 border-transparent hover:text-white";
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab headers */}
      <div
        className={`flex ${variant === "default" ? "border-b border-neutral-800" : "mb-2"} bg-neutral-800/50`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`${getTabStyles()} ${getActiveStyles(tab.id)}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`h-full ${activeTab === tab.id ? "block" : "hidden"}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabViewNative;
