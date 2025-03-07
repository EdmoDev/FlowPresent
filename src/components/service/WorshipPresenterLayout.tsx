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
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  Grid,
  Layout,
  RefreshCw,
  Maximize,
  MinusCircle,
  PlusCircle,
  Tv2,
  Laptop,
  Mic,
  Volume2,
  SquareStack,
} from "lucide-react";

const WorshipPresenterLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState("slides");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-neutral-900 text-white overflow-hidden">
      {/* Top toolbar */}
      <div className="h-14 bg-neutral-800 border-b border-neutral-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Music className="w-5 h-5 text-purple-400" />
            <span className="font-semibold">Worship Presenter</span>
          </div>

          <div className="h-6 w-px bg-neutral-700 mx-1"></div>

          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md flex items-center gap-1.5 hover:bg-blue-700">
            <Play className="w-3.5 h-3.5" />
            <span>Go Live</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-neutral-400 hover:text-white rounded-md">
            <Save className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-400 hover:text-white rounded-md">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 text-neutral-400 hover:text-white rounded-md">
            <Monitor className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Library */}
        <div className="w-64 border-r border-neutral-800 bg-neutral-800/50 flex flex-col">
          <div className="p-3 border-b border-neutral-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search library..."
                className="w-full bg-neutral-700/50 border border-neutral-600 rounded-md pl-9 pr-3 py-2 text-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-2">
              <div className="mb-4">
                <h3 className="text-xs font-medium text-neutral-400 px-2 py-1 uppercase">
                  Songs
                </h3>
                <div className="space-y-1">
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-white">Amazing Grace</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-white">
                        How Great Is Our God
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-medium text-neutral-400 px-2 py-1 uppercase">
                  Scripture
                </h3>
                <div className="space-y-1">
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-white">John 3:16-21</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-medium text-neutral-400 px-2 py-1 uppercase">
                  Media
                </h3>
                <div className="space-y-1">
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-white">Welcome Video</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-neutral-700 bg-neutral-800/50">
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === "slides" ? "text-white border-b-2 border-blue-500" : "text-neutral-400 hover:text-white"}`}
              onClick={() => setActiveTab("slides")}
            >
              Slides
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === "editor" ? "text-white border-b-2 border-blue-500" : "text-neutral-400 hover:text-white"}`}
              onClick={() => setActiveTab("editor")}
            >
              Editor
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${activeTab === "settings" ? "text-white border-b-2 border-blue-500" : "text-neutral-400 hover:text-white"}`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>

          {/* Preview area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center relative">
              <div className="text-center">
                <h2 className="text-6xl font-bold mb-4">Amazing Grace</h2>
                <p className="text-2xl">How sweet the sound</p>
              </div>

              {/* Overlay controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <button className="p-1.5 text-white/80 hover:text-white rounded-full">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  className="p-2 bg-white text-black rounded-full hover:bg-white/90"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <button className="p-1.5 text-white/80 hover:text-white rounded-full">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slides thumbnails */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Slides</h3>
              <div className="grid grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map((slide) => (
                  <div
                    key={slide}
                    className={`aspect-video bg-neutral-800 rounded-md overflow-hidden flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 ${slide === 1 ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <span className="text-sm text-neutral-400">
                      Slide {slide}
                    </span>
                  </div>
                ))}
                <div className="aspect-video border border-dashed border-neutral-600 rounded-md flex items-center justify-center cursor-pointer hover:bg-neutral-800/50">
                  <Plus className="w-5 h-5 text-neutral-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Properties */}
        <div className="w-72 border-l border-neutral-800 bg-neutral-800/50 flex flex-col">
          <div className="p-3 border-b border-neutral-700 flex items-center justify-between">
            <h3 className="text-sm font-medium">Properties</h3>
            <button className="p-1 text-neutral-400 hover:text-white rounded-md">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Text properties */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 mb-2 uppercase">
                  Text
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Font
                    </label>
                    <select className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-1.5 text-sm">
                      <option>Arial</option>
                      <option>Helvetica</option>
                      <option>Times New Roman</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Size
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      defaultValue="36"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Alignment
                    </label>
                    <div className="flex bg-neutral-700 rounded-md p-1">
                      <button className="flex-1 p-1.5 rounded text-neutral-300 hover:bg-neutral-600 flex items-center justify-center">
                        <AlignLeft className="w-4 h-4" />
                      </button>
                      <button className="flex-1 p-1.5 rounded bg-neutral-600 text-white flex items-center justify-center">
                        <AlignCenter className="w-4 h-4" />
                      </button>
                      <button className="flex-1 p-1.5 rounded text-neutral-300 hover:bg-neutral-600 flex items-center justify-center">
                        <AlignRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background properties */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 mb-2 uppercase">
                  Background
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Type
                    </label>
                    <select className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-1.5 text-sm">
                      <option>Solid Color</option>
                      <option>Gradient</option>
                      <option>Image</option>
                      <option>Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Color
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-black rounded-md border border-neutral-600"></div>
                      <input
                        type="text"
                        value="#000000"
                        className="flex-1 bg-neutral-700 border border-neutral-600 rounded-md px-3 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transition properties */}
              <div>
                <h4 className="text-xs font-medium text-neutral-400 mb-2 uppercase">
                  Transition
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Type
                    </label>
                    <select className="w-full bg-neutral-700 border border-neutral-600 rounded-md px-3 py-1.5 text-sm">
                      <option>None</option>
                      <option>Fade</option>
                      <option>Slide</option>
                      <option>Zoom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Duration
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        defaultValue="0.5"
                        className="flex-1"
                      />
                      <span className="text-sm">0.5s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorshipPresenterLayout;
