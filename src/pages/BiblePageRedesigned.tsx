import React from "react";
import MainLayout from "../layouts/MainLayout";
import BibleViewRedesigned from "../components/bible/BibleViewRedesigned";
import BibleSearchViewRedesigned from "../components/bible/BibleSearchViewRedesigned";
import { TabView } from "../components/TabView";
import { BookOpen, Search } from "lucide-react";
import { Card } from "../components/ui/Card";

const BiblePageRedesigned: React.FC = () => {
  const tabs = [
    {
      id: "browse",
      label: "Browse",
      icon: BookOpen,
      content: <BibleViewRedesigned />,
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      content: <BibleSearchViewRedesigned />,
    },
  ];

  return (
    <MainLayout>
      <Card
        variant="solid"
        className="h-[calc(100vh-var(--header-height))] overflow-hidden rounded-none"
      >
        <TabView tabs={tabs} defaultTab="browse" />
      </Card>
    </MainLayout>
  );
};

export default BiblePageRedesigned;
