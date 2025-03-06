import React from "react";
import SidebarRedesigned from "./SidebarRedesigned";
import TopBarRedesigned from "./TopBarRedesigned";
import { useUI } from "../contexts/UIContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayoutRedesigned: React.FC<MainLayoutProps> = ({ children }) => {
  const { sidebarCollapsed } = useUI();

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white overflow-hidden">
      <TopBarRedesigned />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`${sidebarCollapsed ? "w-14" : "w-60"} transition-all duration-300 ease-in-out flex-shrink-0`}
        >
          <SidebarRedesigned />
        </div>
        <main className="flex-1 overflow-hidden bg-neutral-900">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayoutRedesigned;
