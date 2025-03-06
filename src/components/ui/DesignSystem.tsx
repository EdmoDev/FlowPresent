import React from "react";
import { Button } from "./Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import { Input } from "./Input";
import { Toggle } from "./Toggle";
import {
  ChevronRight,
  Settings,
  BellRing,
  Check,
  X,
  Palette,
  Type,
  Image,
  Gauge,
} from "lucide-react";

const DesignSystem = () => {
  const [isToggled, setIsToggled] = React.useState(false);

  return (
    <div className="p-8 bg-neutral-800/50 min-h-screen">
      <h1 className="text-3xl font-space-grotesk font-bold text-white mb-8 text-glow">
        ProFlow Design System
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Buttons Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Various button styles and variants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="glass">Glass</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Rounded</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Default Rounded</Button>
                <Button rounded="full">Full Rounded</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>
              Card components with different styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card
                variant="glass"
                className="h-32 flex items-center justify-center"
              >
                <p className="text-white">Glass Card</p>
              </Card>
              <Card
                variant="solid"
                className="h-32 flex items-center justify-center"
              >
                <p className="text-white">Solid Card</p>
              </Card>
              <Card
                variant="outline"
                className="h-32 flex items-center justify-center"
              >
                <p className="text-white">Outline Card</p>
              </Card>
              <Card
                variant="default"
                padding="sm"
                className="h-32 flex items-center justify-center"
              >
                <p className="text-white">Small Padding</p>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Inputs Section */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Form controls and inputs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Text Input</h3>
              <Input placeholder="Enter your name" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Disabled Input</h3>
              <Input disabled placeholder="Disabled input" />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Toggle</h3>
              <div className="flex items-center gap-4">
                <Toggle
                  pressed={isToggled}
                  onClick={() => setIsToggled(!isToggled)}
                  variant="glass"
                >
                  {isToggled ? (
                    <Check className="w-4 h-4 mr-2" />
                  ) : (
                    <X className="w-4 h-4 mr-2" />
                  )}
                  {isToggled ? "On" : "Off"}
                </Toggle>

                <Toggle variant="outline">
                  <BellRing className="w-4 h-4 mr-2" />
                  Notifications
                </Toggle>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Range Input</h3>
              <input type="range" className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Animations & Effects */}
        <Card>
          <CardHeader>
            <CardTitle>Animations & Effects</CardTitle>
            <CardDescription>Visual effects and animations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">
                Blur Animations
              </h3>
              <div className="flex gap-4">
                <div className="animate-blurUp bg-neutral-700/50 p-4 rounded-lg">
                  Blur Up
                </div>
                <div className="animate-blurDown bg-neutral-700/50 p-4 rounded-lg">
                  Blur Down
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Shadows</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="shadow-subtle bg-neutral-700/50 p-4 rounded-lg text-center text-xs">
                  Subtle
                </div>
                <div className="shadow-standard bg-neutral-700/50 p-4 rounded-lg text-center text-xs">
                  Standard
                </div>
                <div className="shadow-large bg-neutral-700/50 p-4 rounded-lg text-center text-xs">
                  Large
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Glass Effects</h3>
              <div className="glass-panel p-4 flex items-center justify-between">
                <span>Glass Panel Effect</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ProFlow Specific Components */}
        <Card>
          <CardHeader>
            <CardTitle>ProFlow Components</CardTitle>
            <CardDescription>
              Components specific to the presentation software
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Palette, label: "Theme" },
                  { icon: Type, label: "Typography" },
                  { icon: Image, label: "Media" },
                  { icon: Gauge, label: "Performance" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="glass-button flex flex-col items-center gap-1 p-2"
                  >
                    <Icon className="w-5 h-5 text-text-secondary" />
                    <span className="text-xs text-text-secondary">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Status Badges</h3>
              <div className="flex gap-4">
                <div className="status-badge-blue">Live</div>
                <div className="status-badge-green">Ready</div>
                <div className="px-3 py-1.5 rounded-md text-[10px] font-medium font-mono leading-none bg-accent-orange/10 text-accent-orange border border-accent-orange/20">
                  Pending
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Glass Input</h3>
              <input className="glass-input w-full" placeholder="Search..." />
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
            <CardDescription>Text styles and fonts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-white mb-2">
                  Headings
                </h3>
                <h1 className="text-2xl font-bold text-white">Heading 1</h1>
                <h2 className="text-xl font-bold text-white">Heading 2</h2>
                <h3 className="text-lg font-bold text-white">Heading 3</h3>
                <h4 className="text-base font-bold text-white">Heading 4</h4>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-2">
                  Body Text
                </h3>
                <p className="text-base text-text-primary">
                  Primary text - The main text color for content.
                </p>
                <p className="text-base text-text-secondary">
                  Secondary text - Used for less important information.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-2">
                  Monospace
                </h3>
                <p className="font-mono text-sm text-text-primary tracking-tight">
                  JetBrains Mono - Used for code and technical information.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-white mb-2">
                  Space Grotesk
                </h3>
                <p className="font-space-grotesk text-lg text-text-primary">
                  Space Grotesk - Modern display typeface.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignSystem;
