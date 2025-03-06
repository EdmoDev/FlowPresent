import React, { useState } from "react";
import {
  ChevronRight,
  Timer,
  PlusCircle,
  GripVertical,
  Edit2,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Tooltip } from "../Tooltip";
import { useUI } from "../../contexts/UIContext";

interface TimelineItem {
  id: string;
  name: string;
  duration: string;
  status: "completed" | "current" | "upcoming";
  items?: string[];
}

const serviceTimeline: TimelineItem[] = [
  { id: "1", name: "Pre-Service", duration: "15:00", status: "completed" },
  { id: "2", name: "Opening Prayer", duration: "5:00", status: "current" },
  {
    id: "3",
    name: "Worship Set",
    duration: "20:00",
    status: "upcoming",
    items: ["Amazing Grace", "How Great Thou Art"],
  },
  { id: "4", name: "Announcements", duration: "5:00", status: "upcoming" },
  { id: "5", name: "Message", duration: "35:00", status: "upcoming" },
  { id: "6", name: "Response", duration: "10:00", status: "upcoming" },
  { id: "7", name: "Closing", duration: "5:00", status: "upcoming" },
];

const ServiceTimeline: React.FC = () => {
  const { timelineView, toggleTimelineView } = useUI();
  const isCompact = timelineView === "compact";

  return (
    <div className="space-y-0.5">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={toggleTimelineView}
          className="text-xs flex items-center gap-1 text-text-secondary p-1 hover:text-text-primary font-['JetBrains Mono'] tracking-[-0.02em]"
          aria-label={isCompact ? "Expand timeline" : "Collapse timeline"}
        >
          {isCompact ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronUp className="w-3 h-3" />
          )}
          {isCompact ? "Expand" : "Collapse"}
        </button>

        <div className="text-xs text-text-secondary font-['JetBrains Mono'] tracking-[-0.02em]">
          Total: 1:35:00
        </div>
      </div>

      <div className="space-y-1.5 max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 custom-scrollbar">
        {serviceTimeline.map((item, i) => (
          <TimelineItemCard
            key={item.id}
            item={item}
            index={i}
            isCompact={isCompact}
          />
        ))}

        <button
          className="w-full py-2 border-[1.5px] border-[var(--border-subtle)] bg-button-gradient backdrop-blur-glass rounded-[var(--border-radius-md)] flex items-center justify-center gap-2 text-[#2D68FF] hover:text-[#2D68FF]/90 transition-colors mt-3"
          aria-label="Add service item"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm font-medium font-['JetBrains Mono'] tracking-[-0.02em]">
            Add Service Item
          </span>
        </button>
      </div>
    </div>
  );
};

interface TimelineItemCardProps {
  item: TimelineItem;
  index: number;
  isCompact: boolean;
}

const TimelineItemCard: React.FC<TimelineItemCardProps> = ({
  item,
  index,
  isCompact,
}) => {
  const { openRightPanel } = useUI();
  const [isDragging, setIsDragging] = useState(false);
  const [showItemActions, setShowItemActions] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openRightPanel("timeline-item");
  };

  // Determine class names based on state
  const cardClasses = `
    border-[1.5px] border-[var(--border-subtle)] bg-button-gradient backdrop-blur-glass rounded-[var(--border-radius-md)]
    flex items-center gap-3 ${isCompact ? "py-2" : "p-3"} cursor-pointer group relative
    ${item.status === "current" ? "bg-[#2D68FF]/10 border-[#2D68FF]/30" : ""}
    ${item.status === "completed" ? "opacity-50" : ""}
    ${isDragging ? "ring-2 ring-[#2D68FF] shadow-card" : ""}
    transition-all duration-150
  `;

  return (
    <div
      className={cardClasses}
      onMouseEnter={() => setShowItemActions(true)}
      onMouseLeave={() => setShowItemActions(false)}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      draggable
    >
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 drag-handle">
        <GripVertical className="w-4 h-4 text-text-secondary" />
      </div>

      <div className="w-7 h-7 rounded-md bg-background-card border border-[var(--border-subtle)] shadow-card flex items-center justify-center text-sm font-medium text-text-secondary ml-4 group-hover:text-text-primary transition-colors">
        {index + 1}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-text-primary truncate font-['JetBrains Mono'] tracking-[-0.02em]">
            {item.name}
          </span>
          <span className="text-text-secondary text-sm ml-2 font-['JetBrains Mono'] tracking-[-0.02em]">
            {item.duration}
          </span>
        </div>

        {!isCompact && item.items && (
          <div className="mt-2 pl-2 border-l-2 border-[var(--border-subtle)]">
            {item.items.map((subItem) => (
              <div
                key={subItem}
                className="text-xs text-text-secondary py-0.5 flex items-center gap-1 font-['JetBrains Mono'] tracking-[-0.02em]"
              >
                <ChevronRight className="w-3 h-3" />
                {subItem}
              </div>
            ))}
          </div>
        )}
      </div>

      {item.status === "current" && (
        <Tooltip content="Currently active" position="left">
          <div className="absolute right-2 top-2">
            <Timer className="w-4 h-4 text-[#2D68FF] animate-pulse" />
          </div>
        </Tooltip>
      )}

      {/* Quick actions that show on hover */}
      {showItemActions && (
        <div className="absolute right-2 flex items-center gap-1">
          <Tooltip content="Edit item" position="top">
            <button
              onClick={handleEditClick}
              className="p-1 rounded-full hover:bg-[rgba(var(--background-glass-rgb),0.1)]"
              aria-label="Edit item"
            >
              <Edit2 className="w-3.5 h-3.5 text-text-secondary" />
            </button>
          </Tooltip>
          <Tooltip content="Duplicate item" position="top">
            <button
              className="p-1 rounded-full hover:bg-[rgba(var(--background-glass-rgb),0.1)]"
              aria-label="Duplicate item"
            >
              <Copy className="w-3.5 h-3.5 text-text-secondary" />
            </button>
          </Tooltip>
          <Tooltip content="Delete item" position="top">
            <button
              className="p-1 rounded-full hover:bg-[rgba(var(--background-glass-rgb),0.1)]"
              aria-label="Delete item"
            >
              <Trash2 className="w-3.5 h-3.5 text-text-secondary" />
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ServiceTimeline;
