import React, { useState } from "react";
import {
  Play,
  ScrollText,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Grid,
  Plus,
} from "lucide-react";
import { Tooltip } from "../Tooltip";
import { useUI } from "../../contexts/UIContext";

interface SlideProps {
  title: string;
  active?: boolean;
  onClick?: () => void;
}

const SlidePreview: React.FC<SlideProps> = ({
  title,
  active = false,
  onClick,
}) => {
  const { openRightPanel } = useUI();
  const [isHovering, setIsHovering] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openRightPanel("slide-editor");
  };

  return (
    <div
      className={`glass-card relative aspect-video overflow-hidden group cursor-pointer ${active ? "ring-2 ring-blue-500" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <p className="text-sm text-text-secondary text-center line-clamp-2">
          {title}
        </p>
      </div>

      {isHovering && (
        <div className="absolute top-2 right-2 z-10">
          <Tooltip content="Edit slide" position="top">
            <button
              className="p-1 rounded-full bg-background-glass/80 border border-[var(--border-subtle)]"
              onClick={handleEditClick}
            >
              <Edit2 className="w-3.5 h-3.5 text-text-primary" />
            </button>
          </Tooltip>
        </div>
      )}

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button className="glass-button p-1.5">
          <Play className="w-5 h-5 text-white" />
        </button>
        <button className="glass-button p-1.5">
          <ScrollText className="w-5 h-5 text-white" />
        </button>
      </div>

      {active && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
      )}
    </div>
  );
};

const SlideCarousel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;
  const slides = [
    "Amazing Grace",
    "How Great Thou Art",
    "It Is Well",
    "Holy Spirit",
    "Great Are You Lord",
    "Who You Say I Am",
    "Graves Into Gardens",
    "Build My Life",
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const { openRightPanel } = useUI();

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSlideClick = (index: number) => {
    setActiveSlide(index);
  };

  const handleAddSlide = () => {
    openRightPanel("slide-editor");
  };

  // We can conditionally vary the number of columns based on screen size
  // For a real app this would be better handled with responsive Tailwind classes
  const gridCols = 4; // This could be dynamic based on screen width

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-text-primary">Slides</h3>
          <Tooltip content="Toggle grid view" position="top">
            <button className="p-1 rounded glass-button ml-2">
              <Grid className="w-4 h-4 text-text-secondary" />
            </button>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-1 glass-button"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 text-text-secondary" />
          </button>
          <span className="text-sm text-text-secondary">
            {currentPage} of {totalPages}
          </span>
          <button
            className="p-1 glass-button"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-${gridCols} gap-4`}>
        {slides.map((title, i) => (
          <div key={title}>
            <SlidePreview
              title={title}
              active={i === activeSlide}
              onClick={() => handleSlideClick(i)}
            />
          </div>
        ))}

        {/* Add slide button */}
        <button
          className="aspect-video glass-button flex flex-col items-center justify-center"
          onClick={handleAddSlide}
        >
          <Plus className="w-6 h-6 text-text-secondary mb-2" />
          <span className="text-sm text-text-secondary">Add Slide</span>
        </button>
      </div>
    </div>
  );
};

export default SlideCarousel;
