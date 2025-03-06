import React from "react";
import MainLayout from "../layouts/MainLayout";
import DisplayDetection from "../components/ui/DisplayDetection";
import MultiScreenControls from "../components/ui/MultiScreenControls";
import { TabView } from "../components/TabView";
import { Monitor, Settings } from "lucide-react";

const DisplaysPage: React.FC = () => {
  const tabs = [
    {
      id: "detection",
      label: "Display Detection",
      icon: Monitor,
      content: <DisplayDetection />,
    },
    {
      id: "settings",
      label: "Output Settings",
      icon: Settings,
      content: <MultiScreenControls />,
    },
  ];

  return (
    <MainLayout>
      <div className="h-[calc(100vh-var(--header-height))] overflow-hidden">
        <TabView tabs={tabs} defaultTab="detection" />
      </div>
    </MainLayout>
  );
};

export default DisplaysPage;
