import React from 'react';
import {
  Layout,
  MonitorPlay,
  BookOpen,
  Music,
  Video,
  Radio,
  Timer,
  Users,
  Cloud,
  MessageSquare,
  Clock,
  Settings,
  Library,
  Layers,
  Wand2,
  Mic2,
  SplitSquareVertical,
  Palette,
  BrainCircuit,
  Sparkles,
  FileVideo,
  Presentation,
  Gauge,
  Sliders,
  ScrollText,
  Type,
  Image,
  Laptop2,
  Play,
  ChevronRight,
  Bell
} from 'lucide-react';
import { Tooltip } from './components/Tooltip';
import { TabView } from './components/TabView';

// Types

interface Module {
  icon: React.ElementType;
  label: string;
  color: string;
  description: string;
  features: string[];
}

interface QuickActionButton {
  icon: React.ElementType;
  label: string;
  tooltip: string;
}

// Data
const modules = [
  {
    icon: Presentation,
    label: 'Stage Design',
    color: 'text-blue-500',
    description: 'Create stunning visual presentations',
    features: ['AI-powered layouts', 'Smart templates', 'Live preview', 'Multi-screen support']
  },
  {
    icon: BookOpen,
    label: 'Scripture',
    color: 'text-emerald-500',
    description: 'Dynamic Bible presentation tools',
    features: ['Multiple translations', 'Smart verse detection', 'Cross-references', 'Commentary integration']
  },
  {
    icon: Music,
    label: 'Worship',
    color: 'text-purple-500',
    description: 'Complete worship service management',
    features: ['Auto-timing lyrics', 'Chord charts', 'CCLI integration', 'Song database']
  },
  {
    icon: FileVideo,
    label: 'Media',
    color: 'text-amber-500',
    description: 'Professional media management',
    features: ['Smart organization', 'Auto-tagging', 'Preview generation', 'Cloud storage']
  },
  {
    icon: Video,
    label: 'Production',
    color: 'text-rose-500',
    description: 'Live production suite',
    features: ['Multi-camera', 'NDI support', 'Stream management', 'Recording']
  },
  {
    icon: Sliders,
    label: 'Audio',
    color: 'text-cyan-500',
    description: 'Advanced audio control',
    features: ['Digital mixing', 'Effects processing', 'Multi-output routing', 'Audio monitoring']
  },
  {
    icon: Timer,
    label: 'Flow',
    color: 'text-indigo-500',
    description: 'Service flow automation',
    features: ['Smart scheduling', 'Cue system', 'Timeline control', 'Countdowns']
  },
  {
    icon: BrainCircuit,
    label: 'AI Studio',
    color: 'text-fuchsia-500',
    description: 'AI-powered creative tools',
    features: ['Content generation', 'Style transfer', 'Smart automation', 'Voice commands']
  }
];

const quickActions: QuickActionButton[] = [
  { icon: Wand2, label: 'AI Enhance', tooltip: 'Enhance presentation with AI suggestions' },
  { icon: Palette, label: 'Theme', tooltip: 'Customize theme, colors, and transitions' },
  { icon: Type, label: 'Typography', tooltip: 'Adjust text styles and animations' },
  { icon: Image, label: 'Media', tooltip: 'Manage and edit media assets' }
];

const serviceTimeline = [
  { name: 'Pre-Service', duration: '15:00', status: 'completed' },
  { name: 'Opening Prayer', duration: '5:00', status: 'current' },
  { name: 'Worship Set', duration: '20:00', status: 'upcoming', items: ['Amazing Grace', 'How Great Thou Art'] },
  { name: 'Announcements', duration: '5:00', status: 'upcoming' },
  { name: 'Message', duration: '35:00', status: 'upcoming' },
  { name: 'Response', duration: '10:00', status: 'upcoming' },
  { name: 'Closing', duration: '5:00', status: 'upcoming' }
];

// Components
const QuickActions = () => (
  <div className="absolute bottom-full mb-2 left-0 right-0 glass-panel p-2">
    <div className="grid grid-cols-4 gap-2">
      {quickActions.map(({ icon: Icon, label, tooltip }) => (
        <Tooltip content={tooltip} key={label}>
          <button
            className="glass-button flex flex-col items-center gap-1 p-2"
          >
            <Icon className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-300">{label}</span>
          </button>
        </Tooltip>
      ))}
    </div>
  </div>
);

const OutputControls = () => (
  <div className="absolute top-2 right-2 flex items-center gap-2">
    <div className="glass-card px-2 py-1 flex items-center gap-2 text-xs">
      <Gauge className="w-4 h-4 text-green-500" />
      <span className="text-gray-300">60 FPS</span>
      <Tooltip content="System Performance">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
      </Tooltip>
    </div>
    <div className="glass-card px-2 py-1 flex items-center gap-2 text-xs">
      <Laptop2 className="w-4 h-4 text-blue-500" />
      <span className="text-gray-300">Stage</span>
      <Tooltip content="Main Output">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
      </Tooltip>
    </div>
  </div>
);

const Sidebar = () => (
  <div className="w-64 glass-panel border-r border-[var(--border-subtle)] p-6 flex flex-col relative">
    <Tooltip content="ProFlow Church Presentation Software" position="right">
      <div className="flex items-center gap-2 mb-8">
        <Layout className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-semibold text-white">Pro<span className="text-blue-500">Flow</span></h1>
      </div>
    </Tooltip>
    
    <nav className="space-y-2 flex-1 relative z-10">
      {modules.map(({ icon: Icon, label, color, description, features }) => (
        <Tooltip 
          content={
            <div className="space-y-1">
              <p className="font-medium">{description}</p>
              <ul className="text-xs space-y-0.5">
                {features.map(feature => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          } 
          position="right"
          key={label}
        >
          <button
            className="glass-button relative flex items-center gap-3 w-full px-5 py-4 text-gray-300 group"
          >
            <Icon className={`w-5 h-5 ${color} group-hover:text-white transition-all duration-300`} />
            <div className="flex flex-col items-start">
              <span className="group-hover:text-white transition-all duration-300 font-medium">{label}</span>
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-all duration-300">{description}</span>
            </div>
            <div className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
          </button>
        </Tooltip>
      ))}
    </nav>
    
    <div className="mt-auto pt-4 border-t border-gray-800">
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/90 to-purple-600/90 flex items-center justify-center shadow-glass">
          <span className="text-white font-medium">GC</span>
        </div>
        <div>
          <p className="text-sm font-medium text-white">Grace Church</p>
          <p className="text-xs text-gray-400">Main Campus</p>
        </div>
      </div>
    </div>
  </div>
);

const PreviewWindow = () => (
  <div className="glass-panel overflow-hidden relative group rounded-[32px]">
    <div className="aspect-video flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[#282828]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#363636] to-[#282828]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[72px] font-['Rubik'] font-bold text-white mb-4 tracking-tight leading-none">Amazing Grace</h2>
          <p className="text-2xl text-gray-200/90 font-['Rubik'] tracking-wide">How sweet the sound</p>
        </div>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <div className="glass-card px-2 py-1 flex items-center gap-2 text-xs backdrop-blur-sm border-[#363636]/70">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-300">60 FPS</span>
          </div>
        </div>
        <div className="glass-card px-2 py-1 flex items-center gap-2 text-xs backdrop-blur-sm border-[#363636]/70">
          <div className="flex items-center gap-1.5">
            <Laptop2 className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-300">Stage</span>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <QuickActions />
      <div className="absolute inset-0 flex items-center justify-center gap-3">
        <button className="p-4 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all group shadow-lg hover:shadow-blue-500/20">
          <Play className="w-6 h-6 text-white group-hover:scale-95 transition-transform" />
        </button>
        <button className="glass-button p-4 hover:bg-white/5">
          <MonitorPlay className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  </div>
);

const SlidePreview = ({ title, active = false }: { title: string; active?: boolean }) => (
  <div className={`glass-card relative aspect-video overflow-hidden group ${active ? 'ring-2 ring-blue-500' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <p className="text-sm text-gray-300 text-center line-clamp-2">{title}</p>
    </div>
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
      <button className="glass-button p-1.5">
        <Play className="w-5 h-5 text-white" />
      </button>
      <button className="glass-button p-1.5">
        <ScrollText className="w-5 h-5 text-white" />
      </button>
    </div>
  </div>
);

const MainContent = () => (
  <div className="flex-1 bg-background-card p-6">
    <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-3.5rem)]">
      <div className="col-span-8 space-y-6">
        <div className="relative bg-[#282828] rounded-[20px] overflow-hidden">
          <div className="absolute inset-0 bg-[rgba(253,253,253,0.025)] border-b border-[rgba(54,54,54,0.7)]">
            <div className="absolute left-4 top-[15px] flex items-center gap-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-[rgba(114,114,114,0.2)]" />
              ))}
            </div>
          </div>
          <div className="p-6">
            <TabView
              tabs={[
                {
                  id: 'preview',
                  label: 'Preview',
                  icon: MonitorPlay,
                  content: (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-semibold text-white">Main Stage</h2>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#363636]">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            <span className="text-xs text-gray-400 font-medium">Live</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">1920 × 1080</span>
                          <Tooltip content="Active Output">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          </Tooltip>
                        </div>
                      </div>
                      <PreviewWindow />
                    </>
                  ),
                },
                {
                  id: 'multiview',
                  label: 'Multi-View',
                  icon: Layout,
                  content: (
                    <div className="grid grid-cols-2 gap-4 aspect-video">
                      {['Program', 'Preview', 'Camera 1', 'Camera 2'].map(view => (
                        <div key={view} className="glass-card relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950" />
                          <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-sm font-medium text-white">{view}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            'Amazing Grace',
            'How Great Thou Art',
            'It Is Well',
            'Holy Spirit',
            'Great Are You Lord',
            'Who You Say I Am',
            'Graves Into Gardens',
            'Build My Life'
          ].map((title, i) => (
            <SlidePreview
              key={title}
              title={title}
              active={i === 0}
            />
          ))}
        </div>
      </div>
      
      <div className="col-span-4 space-y-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <Tooltip content="Manage service flow and timing">
              <span className="flex items-center gap-2">
                Service Timeline
                <span className="text-xs text-gray-400">(1:35:00)</span>
              </span>
            </Tooltip>
            <div className="ml-auto flex items-center gap-2">
              <Tooltip content="Settings">
                <button className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" />
                </button>
              </Tooltip>
              <Tooltip content="Notifications">
                <button className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                  <Bell className="w-4 h-4 text-gray-400" />
                </button>
              </Tooltip>
            </div>
          </h3>
          <div className="space-y-3">
            {serviceTimeline.map((item, i) => (
              <div
                key={item.name}
                className={`glass-button flex items-center gap-3 p-3 cursor-pointer group relative
                  ${item.status === 'current' ? 'bg-blue-500/10 border-blue-500/30' : ''}
                  ${item.status === 'completed' ? 'opacity-50' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">{item.name}</span>
                    <span className="text-gray-400 text-sm">{item.duration}</span>
                  </div>
                  {item.items && (
                    <div className="mt-2 pl-2 border-l-2 border-gray-800">
                      {item.items.map(subItem => (
                        <div key={subItem} className="text-xs text-gray-400 py-0.5 flex items-center gap-1">
                          <ChevronRight className="w-3 h-3" />
                          {subItem}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {item.status === 'current' && (
                  <div className="absolute right-2 top-2">
                    <Timer className="w-4 h-4 text-blue-400 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            <Tooltip content="Collaborate with your team in real-time">
              <span>Team Chat</span>
            </Tooltip>
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Sarah', role: 'Worship Leader', message: 'Starting rehearsal in 5' },
              { name: 'Mike', role: 'Tech Director', message: 'Audio levels look good' },
              { name: 'Anna', role: 'Stage Manager', message: 'Lighting cues updated' }
            ].map(({ name, role, message }) => (
              <div key={name} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center shadow-glass">
                  <span className="text-sm font-medium text-purple-400">{name[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-medium text-gray-300">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{message}</p>
                </div>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-800">
              <input type="text" placeholder="Send a message..." className="glass-input w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TopBar = () => (
  <div className="h-14 glass-panel border-b border-[var(--border-subtle)] flex items-center px-4">
    <div className="flex-1 flex items-center gap-4">
      <Tooltip content="Start broadcasting to all outputs" position="bottom">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all flex items-center gap-2 group">
          <Play className="w-4 h-4" />
          <span className="font-medium">Go Live</span>
        </button>
      </Tooltip>
      <Tooltip content="Get AI-powered suggestions" position="bottom">
        <button className="glass-button px-4 py-2 text-gray-300 flex items-center gap-2 group">
          <BrainCircuit className="w-4 h-4 text-blue-500 group-hover:text-blue-400" />
          <span>AI Assistant</span>
        </button>
      </Tooltip>
      <Tooltip content="Manage screen layouts" position="bottom">
        <button className="glass-button px-4 py-2 text-gray-300 flex items-center gap-2">
          <SplitSquareVertical className="w-4 h-4" />
          <span>Layouts</span>
        </button>
      </Tooltip>
      <div className="h-6 w-px bg-gray-800" />
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-gray-400">Sunday Service</span>
        <span className="text-gray-600">•</span>
        <span className="text-gray-400">March 10, 2024</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Mic2 className="w-5 h-5 text-green-500" />
        <Radio className="w-5 h-5 text-blue-500" />
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="glass-card px-3 py-1.5 flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-gray-300">09:30 AM</span>
      </div>
      <div className="w-2 h-2 bg-green-500 rounded-full" />
    </div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-background-card text-text-primary flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <MainContent />
      </div>
    </div>
  );
}

export default App;