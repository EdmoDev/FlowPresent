import React from "react";
import MainLayoutRedesigned from "../layouts/MainLayoutRedesigned";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  Calendar,
  Clock,
  Users,
  Play,
  Plus,
  FileText,
  Music,
  Video,
  BookOpen,
  BarChart,
  ArrowRight,
  Bell,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";

const HomePage: React.FC = () => {
  // Mock data
  const upcomingServices = [
    {
      id: "1",
      title: "Sunday Service",
      date: "June 16, 2024",
      time: "10:00 AM",
      team: "Worship Team A",
    },
    {
      id: "2",
      title: "Youth Service",
      date: "June 16, 2024",
      time: "6:00 PM",
      team: "Youth Team",
    },
    {
      id: "3",
      title: "Prayer Meeting",
      date: "June 19, 2024",
      time: "7:00 PM",
      team: "Prayer Team",
    },
  ];

  const recentItems = [
    { id: "1", title: "Amazing Grace", type: "song", date: "June 9, 2024" },
    { id: "2", title: "John 3:16-21", type: "scripture", date: "June 9, 2024" },
    { id: "3", title: "Welcome Video", type: "video", date: "June 2, 2024" },
  ];

  const notifications = [
    { id: "1", title: "New team member added", time: "2 hours ago" },
    { id: "2", title: "Service plan updated", time: "1 day ago" },
    { id: "3", title: "New song added to library", time: "2 days ago" },
  ];

  // Get icon for item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case "song":
        return <Music className="w-4 h-4 text-purple-400" />;
      case "scripture":
        return <BookOpen className="w-4 h-4 text-green-400" />;
      case "video":
        return <Video className="w-4 h-4 text-blue-400" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <MainLayoutRedesigned>
      <div className="p-6 bg-neutral-900 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* Welcome header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-white mb-1">
              Welcome to ProFlow
            </h1>
            <p className="text-neutral-400">
              Your church presentation software
            </p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Play className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-white">Start Presentation</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Plus className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-white">New Service</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600"
            >
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Music className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-white">Add Song</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center justify-center gap-2 bg-neutral-800/50 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-white">Bible Search</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming services */}
            <div className="lg:col-span-2">
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg text-white">
                    Upcoming Services
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingServices.map((service) => (
                      <div
                        key={service.id}
                        className="p-3 border border-neutral-700 rounded-lg hover:bg-neutral-700/30 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-white">
                            {service.title}
                          </h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" />
                            <span>Present</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{service.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{service.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{service.team}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Schedule New Service</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="bg-neutral-800 border-neutral-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-400">
                          Total Services
                        </p>
                        <h3 className="text-2xl font-semibold text-white mt-1">
                          124
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                    <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 rotate-45" />
                      <span>+12% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-800 border-neutral-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-400">Media Items</p>
                        <h3 className="text-2xl font-semibold text-white mt-1">
                          532
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                    <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 rotate-45" />
                      <span>+8% from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-800 border-neutral-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-neutral-400">Team Members</p>
                        <h3 className="text-2xl font-semibold text-white mt-1">
                          18
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 rotate-45" />
                      <span>+2 new this month</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              {/* Recent items */}
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg text-white">
                    Recent Items
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2 hover:bg-neutral-700/30 rounded-md cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-md bg-neutral-700 flex items-center justify-center">
                          {getItemIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white truncate">
                            {item.title}
                          </h4>
                          <p className="text-xs text-neutral-500">
                            {item.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg text-white">
                    Notifications
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Clear All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 p-2 hover:bg-neutral-700/30 rounded-md cursor-pointer"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-white">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-neutral-500">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick links */}
              <Card className="bg-neutral-800 border-neutral-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white">
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      <span>Team</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      <span>Help</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      <span>Chat</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayoutRedesigned>
  );
};

export default HomePage;
