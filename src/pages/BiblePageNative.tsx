import React from "react";
import MainLayoutRedesigned from "../layouts/MainLayoutRedesigned";
import BibleViewNative from "../components/bible/BibleViewNative";
import BibleSearchViewNative from "../components/bible/BibleSearchViewNative";
import TabViewNative from "../components/ui/TabViewNative";
import { BookOpen, Search } from "lucide-react";
import { Card } from "../components/ui/Card";

const BiblePageNative: React.FC = () => {
  const tabs = [
    {
      id: "browse",
      label: "Bible",
      icon: BookOpen,
      content: <BibleViewNative />,
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      content: <BibleSearchViewNative />,
    },
  ];

  return (
    <MainLayoutRedesigned>
      <Card
        variant="solid"
        className="h-[calc(100vh-var(--header-height))] overflow-hidden rounded-none border-0"
      >
        <TabViewNative tabs={tabs} defaultTab="browse" />
      </Card>
    </MainLayoutRedesigned>
  );
};

export default BiblePageNative;
