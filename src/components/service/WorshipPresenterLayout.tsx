import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Plus,
  Search,
  Settings,
  Monitor,
  Edit,
  Layers,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Music,
  Video,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  Clock,
  X,
  Copy,
  Trash2,
  MoreHorizontal,
  Eye,
  Save,
  Rewind,
  FastForward,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";

interface SlideItem {
  id: string;
  type: "song" | "scripture" | "video" | "image" | "announcement";
  title: string;
  content?: string;
  thumbnail?: string;
  selected?: boolean;
}

interface ServiceItem {
  id: string;
  title: string;
  type: "song" | "scripture" | "video" | "image" | "announcement";
  slides: SlideItem[];
  expanded?: boolean;
  selected?: boolean;
}

const WorshipPresenterLayout: React.FC = () => {
  // State for different modes
  const [activeMode, setActiveMode] = useState<"show" | "edit" | "reflow">(
    "show",
  );

  // State for service items
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    {
      id: "1",
      title: "Good Grace",
      type: "song",
      expanded: true,
      selected: true,
      slides: [
        { id: "1-1", type: "song", title: "Blank", selected: false },
        { id: "1-2", type: "song", title: "Verse 1", selected: true },
        { id: "1-3", type: "song", title: "Verse 2", selected: false },
        { id: "1-4", type: "song", title: "Chorus 1", selected: false },
        { id: "1-5", type: "song", title: "Bridge", selected: false },
      ],
    },
    {
      id: "2",
      title: "Way Maker",
      type: "song",
      expanded: false,
      selected: false,
      slides: [
        { id: "2-1", type: "song", title: "Blank", selected: false },
        { id: "2-2", type: "song", title: "Verse 1", selected: false },
        { id: "2-3", type: "song", title: "Chorus", selected: false },
      ],
    },
    {
      id: "3",
      title: "John 3:16-21",
      type: "scripture",
      expanded: false,
      selected: false,
      slides: [
        { id: "3-1", type: "scripture", title: "John 3:16", selected: false },
        {
          id: "3-2",
          type: "scripture",
          title: "John 3:17-18",
          selected: false,
        },
        {
          id: "3-3",
          type: "scripture",
          title: "John 3:19-21",
          selected: false,
        },
      ],
    },
    {
      id: "4",
      title: "Welcome Video",
      type: "video",
      expanded: false,
      selected: false,
      slides: [
        { id: "4-1", type: "video", title: "Welcome Video", selected: false },
      ],
    },
  ]);

  // State for the currently selected slide
  const [currentSlide, setCurrentSlide] = useState<SlideItem | null>(
    serviceItems[0].slides[1],
  );

  // State for the library section
  const [librarySection, setLibrarySection] = useState<
    "songs" | "bible" | "media"
  >("songs");

  // Toggle item expansion
  const toggleItemExpansion = (itemId: string) => {
    setServiceItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, expanded: !item.expanded } : item,
      ),
    );
  };

  // Select an item
  const selectItem = (itemId: string) => {
    setServiceItems((items) =>
      items.map((item) => ({ ...item, selected: item.id === itemId })),
    );
  };

  // Select a slide
  const selectSlide = (itemId: string, slideId: string) => {
    // Update the selected state in the service items
    setServiceItems((items) =>
      items.map((item) => ({
        ...item,
        slides: item.slides.map((slide) => ({
          ...slide,
          selected: item.id === itemId && slide.id === slideId,
        })),
      })),
    );

    // Find and set the current slide
    const item = serviceItems.find((i) => i.id === itemId);
    if (item) {
      const slide = item.slides.find((s) => s.id === slideId);
      if (slide) {
        setCurrentSlide(slide);
      }
    }
  };

  // Get icon for item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case "song":
        return <Music className="w-4 h-4 text-purple-400" />;
      case "scripture":
        return <BookOpen className="w-4 h-4 text-green-400" />;
      case "video":
        return <Video className="w-4 h-4 text-blue-400" />;
      case "image":
        return <ImageIcon className="w-4 h-4 text-amber-400" />;
      case "announcement":
        return <MessageSquare className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  // Get background color for slide
  const getSlideBackground = (type: string) => {
    switch (type) {
      case "song":
        return "bg-purple-900/20";
      case "scripture":
        return "bg-green-900/20";
      case "video":
        return "bg-blue-900/20";
      case "image":
        return "bg-amber-900/20";
      case "announcement":
        return "bg-red-900/20";
      default:
        return "bg-neutral-800";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Top toolbar */}
      <div className="h-12 bg-neutral-800 border-b border-neutral-700 flex items-center px-2 justify-between">
        {/* Left section - Mode switcher */}
        <div className="flex items-center gap-1">
          <Button
            variant={activeMode === "show" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveMode("show")}
            className="flex items-center gap-1.5"
          >
            <Play className="w-4 h-4" />
            <span>Show</span>
          </Button>

          <Button
            variant={activeMode === "edit" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveMode("edit")}
            className="flex items-center gap-1.5"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Button>

          <Button
            variant={activeMode === "reflow" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveMode("reflow")}
            className="flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>Reflow</span>
          </Button>
        </div>

        {/* Center section - Current item info */}
        <div className="flex items-center">
          <span className="text-sm font-medium">Good Grace • Verse 1</span>
        </div>

        {/* Right section - Output controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Monitor className="w-4 h-4" />
            <span>Outputs</span>
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Library/Playlist */}
        <div className="w-64 border-r border-neutral-800 flex flex-col bg-neutral-800/50">
          {/* Library/Playlist tabs */}
          <div className="flex border-b border-neutral-800">
            <button className="flex-1 py-2 text-sm font-medium text-white border-b-2 border-blue-500">
              Playlist
            </button>
            <button className="flex-1 py-2 text-sm font-medium text-neutral-400 border-b-2 border-transparent hover:text-white">
              Library
            </button>
          </div>

          {/* Search */}
          <div className="p-2 border-b border-neutral-800">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search playlist..."
                className="pl-8 py-1 h-8 text-sm bg-neutral-700/50 border-neutral-600"
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
            </div>
          </div>

          {/* Service items list */}
          <div className="flex-1 overflow-y-auto">
            {serviceItems.map((item) => (
              <div key={item.id} className="border-b border-neutral-800/50">
                {/* Item header */}
                <div
                  className={`flex items-center justify-between px-2 py-1.5 cursor-pointer ${item.selected ? "bg-blue-500/20" : "hover:bg-neutral-700/30"}`}
                  onClick={() => selectItem(item.id)}
                >
                  <div className="flex items-center gap-1.5">
                    <button
                      className="p-0.5 rounded hover:bg-neutral-700/50"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleItemExpansion(item.id);
                      }}
                    >
                      {item.expanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                      )}
                    </button>
                    {getItemIcon(item.type)}
                    <span className="text-sm font-medium truncate">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <button className="p-1 rounded hover:bg-neutral-700/50">
                      <MoreHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* Item slides */}
                {item.expanded && (
                  <div className="pl-6 pr-2 py-1 bg-neutral-800/30">
                    {item.slides.map((slide) => (
                      <div
                        key={slide.id}
                        className={`flex items-center justify-between px-2 py-1 rounded-sm cursor-pointer ${slide.selected ? "bg-blue-500/30" : "hover:bg-neutral-700/30"}`}
                        onClick={() => selectSlide(item.id, slide.id)}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium">
                            {slide.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add item button */}
          <div className="p-2 border-t border-neutral-800">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Preview area */}
          <div className="flex-1 p-4 overflow-hidden">
            <div className="h-full flex items-center justify-center">
              <div className="relative w-full max-w-3xl aspect-video bg-black rounded-md overflow-hidden">
                {/* Preview content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8 max-w-xl">
                    <h2 className="text-3xl font-bold mb-4">
                      People get ready
                    </h2>
                    <p className="text-xl">Jesus is coming soon</p>
                    <p className="text-xl">
                      To call from the corners of the earth
                    </p>
                  </div>
                </div>

                {/* Preview overlay - only in edit mode */}
                {activeMode === "edit" && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                      <Button variant="primary" size="sm" className="mb-2">
                        <Edit className="w-4 h-4 mr-1.5" />
                        <span>Edit Content</span>
                      </Button>
                      <p className="text-xs text-neutral-400">
                        Edit Mode Active
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls area */}
          <div className="h-20 border-t border-neutral-800 bg-neutral-800/80 backdrop-blur-sm p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button
                variant="primary"
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <Play className="w-6 h-6" />
              </Button>

              <Button variant="ghost" size="icon" className="h-10 w-10">
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-xs text-neutral-400">Previous</span>
                <span className="text-sm font-medium truncate max-w-[120px]">
                  Blank
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs text-neutral-400">Current</span>
                <span className="text-sm font-medium text-blue-400 truncate max-w-[120px]">
                  Verse 1
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs text-neutral-400">Next</span>
                <span className="text-sm font-medium truncate max-w-[120px]">
                  Verse 2
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right sidebar - Editor/Properties */}
        <div className="w-72 border-l border-neutral-800 flex flex-col bg-neutral-800/50">
          {/* Editor tabs */}
          <div className="flex border-b border-neutral-800">
            <button className="flex-1 py-2 text-sm font-medium text-white border-b-2 border-blue-500">
              Properties
            </button>
            <button className="flex-1 py-2 text-sm font-medium text-neutral-400 border-b-2 border-transparent hover:text-white">
              Theme
            </button>
          </div>

          {/* Properties content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Title
                </label>
                <Input
                  type="text"
                  value="Good Grace"
                  className="bg-neutral-700/50 border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Type
                </label>
                <select className="w-full bg-neutral-700/50 border border-neutral-600 rounded-md px-3 py-1.5 text-sm text-white">
                  <option value="song">Song</option>
                  <option value="scripture">Scripture</option>
                  <option value="video">Video</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Background
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    <ImageIcon className="w-4 h-4 mr-1.5" />
                    <span>Image</span>
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <Video className="w-4 h-4 mr-1.5" />
                    <span>Video</span>
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Text Alignment
                </label>
                <div className="flex border border-neutral-600 rounded-md overflow-hidden">
                  <button className="flex-1 py-1.5 bg-blue-500 text-white">
                    Left
                  </button>
                  <button className="flex-1 py-1.5 bg-neutral-700 text-neutral-300 hover:bg-neutral-600">
                    Center
                  </button>
                  <button className="flex-1 py-1.5 bg-neutral-700 text-neutral-300 hover:bg-neutral-600">
                    Right
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Font Size
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value="36"
                    className="flex-1"
                  />
                  <span className="text-sm font-mono bg-neutral-700 px-2 py-1 rounded">
                    36px
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Text Color
                </label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-md bg-white border border-neutral-600"></div>
                  <Input
                    type="text"
                    value="#FFFFFF"
                    className="bg-neutral-700/50 border-neutral-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Shadow
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable text shadow</span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-9 h-5 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-3 border-t border-neutral-800 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4 mr-1.5" />
              <span>Delete</span>
            </Button>

            <Button variant="primary" size="sm">
              <Save className="w-4 h-4 mr-1.5" />
              <span>Apply</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorshipPresenterLayout;
