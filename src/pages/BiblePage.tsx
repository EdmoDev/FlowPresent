import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import BibleView from "../components/bible/BibleView";
import BibleSearchView from "../components/bible/BibleSearchView";
import { TabView } from "../components/TabView";
import { BookOpen, Search } from "lucide-react";

const BiblePage: React.FC = () => {
  const tabs = [
    {
      id: "browse",
      label: "Browse",
      icon: BookOpen,
      content: <BibleView />,
    },
    {
      id: "search",
      label: "Search",
      icon: Search,
      content: <BibleSearchView />,
    },
  ];

  return (
    <MainLayout>
      <div className="h-[calc(100vh-var(--header-height))] overflow-hidden">
        <TabView tabs={tabs} defaultTab="browse" />
      </div>
    </MainLayout>
  );
};

export default BiblePage;
