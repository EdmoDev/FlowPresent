import React from "react";
import MainLayoutRedesigned from "../layouts/MainLayoutRedesigned";
import DisplayDetectionNative from "../components/ui/DisplayDetectionNative";
import MultiScreenControlsNative from "../components/ui/MultiScreenControlsNative";
import TabViewNative from "../components/ui/TabViewNative";
import { Monitor, Settings } from "lucide-react";
import { Card } from "../components/ui/Card";

const DisplaysPageNative: React.FC = () => {
  const tabs = [
    {
      id: "detection",
      label: "Display Detection",
      icon: Monitor,
      content: <DisplayDetectionNative />,
    },
    {
      id: "settings",
      label: "Output Settings",
      icon: Settings,
      content: <MultiScreenControlsNative />,
    },
  ];

  return (
    <MainLayoutRedesigned>
      <Card
        variant="solid"
        className="h-[calc(100vh-var(--header-height))] overflow-hidden rounded-none border-0"
      >
        <TabViewNative tabs={tabs} defaultTab="detection" />
      </Card>
    </MainLayoutRedesigned>
  );
};

export default DisplaysPageNative;
