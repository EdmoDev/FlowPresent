import React, { useState } from "react";
import {
  Plus,
  ChevronRight,
  Clock,
  Music,
  Video,
  BookOpen,
  MessageSquare,
  Image,
  MoreHorizontal,
  Play,
  Edit2,
  Copy,
  Trash2,
  ChevronDown,
  Search,
  Filter,
  Save,
  FileText,
  Calendar,
  Users,
  Settings,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";

interface ServiceItem {
  id: string;
  type: "song" | "scripture" | "video" | "announcement" | "sermon" | "custom";
  title: string;
  duration: number; // in seconds
  notes?: string;
  presenter?: string;
  content?: string;
}

const ServicePlanViewNative: React.FC = () => {
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([
    {
      id: "1",
      type: "song",
      title: "Amazing Grace",
      duration: 240,
      presenter: "Worship Team",
      notes: "Key of G, 3 verses and chorus",
    },
    {
      id: "2",
      type: "scripture",
      title: "John 3:16-21",
      duration: 120,
      presenter: "Pastor Mike",
    },
    {
      id: "3",
      type: "video",
      title: "Welcome Video",
      duration: 90,
    },
    {
      id: "4",
      type: "sermon",
      title: "Faith in Action",
      duration: 1800,
      presenter: "Pastor Mike",
      notes: "Main points: Faith, Works, Love",
    },
    {
      id: "5",
      type: "song",
      title: "How Great Is Our God",
      duration: 210,
      presenter: "Worship Team",
    },
  ]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLibrary, setShowLibrary] = useState(true);

  // Calculate total service duration
  const totalDuration = serviceItems.reduce(
    (total, item) => total + item.duration,
    0,
  );

  // Format seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Get icon for item type
  const getItemIcon = (type: ServiceItem["type"]) => {
    switch (type) {
      case "song":
        return <Music className="w-4 h-4 text-purple-400" />;
      case "scripture":
        return <BookOpen className="w-4 h-4 text-green-400" />;
      case "video":
        return <Video className="w-4 h-4 text-blue-400" />;
      case "announcement":
        return <MessageSquare className="w-4 h-4 text-amber-400" />;
      case "sermon":
        return <FileText className="w-4 h-4 text-red-400" />;
      case "custom":
        return <Image className="w-4 h-4 text-indigo-400" />;
      default:
        return <Plus className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-full bg-neutral-900">
      {/* Left sidebar - Library */}
      {showLibrary && (
        <div className="w-72 border-r border-neutral-800 flex flex-col bg-neutral-800/50">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Media Library</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowLibrary(false)}
              className="h-8 w-8"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* Search and filters */}
          <div className="p-3 border-b border-neutral-800">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search library..."
                className="pl-9 bg-neutral-700/50 border-neutral-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Button variant="secondary" size="sm" className="flex-1">
                All Items
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Library categories */}
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
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-white">10,000 Reasons</span>
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
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-white">Psalm 23</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-medium text-neutral-400 px-2 py-1 uppercase">
                  Videos
                </h3>
                <div className="space-y-1">
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-white">Welcome Video</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-md hover:bg-neutral-700/50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-white">Announcements</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add new item */}
          <div className="p-3 border-t border-neutral-800">
            <Button
              variant="primary"
              className="w-full flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Item</span>
            </Button>
          </div>
        </div>
      )}

      {/* Main content - Service Plan */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Service header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-800/50 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Sunday Service</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>June 16, 2024</span>
              </div>
              <span className="text-neutral-600">•</span>
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <Clock className="w-3.5 h-3.5" />
                <span>10:00 AM</span>
              </div>
              <span className="text-neutral-600">•</span>
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <Users className="w-3.5 h-3.5" />
                <span>Worship Team</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!showLibrary && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowLibrary(true)}
                className="flex items-center gap-1.5"
              >
                <ChevronRight className="w-4 h-4" />
                <span>Library</span>
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <Play className="w-4 h-4" />
              <span>Present</span>
            </Button>
          </div>
        </div>

        {/* Service timeline */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Service info card */}
            <Card className="mb-6 bg-neutral-800 border-neutral-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-white mb-1">
                      Service Overview
                    </h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-neutral-400" />
                        <span className="text-sm text-neutral-300">
                          Total Duration: {formatDuration(totalDuration)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Music className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-neutral-300">
                          {
                            serviceItems.filter((item) => item.type === "song")
                              .length
                          }{" "}
                          Songs
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-neutral-300">
                          {
                            serviceItems.filter((item) => item.type === "video")
                              .length
                          }{" "}
                          Videos
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1.5"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Service Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service items */}
            <div className="space-y-3">
              {serviceItems.map((item, index) => (
                <Card
                  key={item.id}
                  className={`bg-neutral-800 border-neutral-700 ${selectedItemId === item.id ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setSelectedItemId(item.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      {/* Item number */}
                      <div className="w-12 h-full flex items-center justify-center py-4 border-r border-neutral-700">
                        <span className="text-lg font-medium text-neutral-500">
                          {index + 1}
                        </span>
                      </div>

                      {/* Item content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <h3 className="text-base font-medium text-white">
                              {item.title}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-sm text-neutral-400">
                              {formatDuration(item.duration)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="w-4 h-4 text-neutral-400" />
                            </Button>
                          </div>
                        </div>

                        {item.presenter && (
                          <div className="mt-1 text-sm text-neutral-400">
                            {item.presenter}
                          </div>
                        )}

                        {item.notes && (
                          <div className="mt-2 text-sm text-neutral-300 bg-neutral-700/30 p-2 rounded-md">
                            {item.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Item actions */}
                    {selectedItemId === item.id && (
                      <div className="flex items-center justify-end gap-2 p-2 border-t border-neutral-700 bg-neutral-700/20">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1.5"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Duplicate</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1.5 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Add item button */}
              <div className="flex justify-center py-4">
                <Button variant="outline" className="flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Add Service Item</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePlanViewNative;
