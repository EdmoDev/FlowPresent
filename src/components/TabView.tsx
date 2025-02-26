import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ElementType;
}

interface TabViewProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function TabView({ tabs, defaultTab }: TabViewProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-1 px-2 mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive 
                  ? 'text-white bg-[#282828] shadow-[var(--glass-shadow)]' 
                  : 'text-gray-400 hover:text-white hover:bg-[#282828]/50'}`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {tab.label}
              {isActive && (
                <div className="absolute -right-1 -top-1">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div className="flex-1">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}