import React from "react";
import MainLayout from "../layouts/MainLayout";
import DisplayDetectionRedesigned from "../components/ui/DisplayDetectionRedesigned";
import MultiScreenControlsRedesigned from "../components/ui/MultiScreenControlsRedesigned";
import { TabView } from "../components/TabView";
import { Monitor, Settings } from "lucide-react";
import { Card } from "../components/ui/Card";

const DisplaysPageRedesigned: React.FC = () => {
  const tabs = [
    {
      id: "detection",
      label: "Display Detection",
      icon: Monitor,
      content: <DisplayDetectionRedesigned />,
    },
    {
      id: "settings",
      label: "Output Settings",
      icon: Settings,
      content: <MultiScreenControlsRedesigned />,
    },
  ];

  return (
    <MainLayout>
      <Card
        variant="solid"
        className="h-[calc(100vh-var(--header-height))] overflow-hidden rounded-none"
      >
        <TabView tabs={tabs} defaultTab="detection" />
      </Card>
    </MainLayout>
  );
};

export default DisplaysPageRedesigned;
