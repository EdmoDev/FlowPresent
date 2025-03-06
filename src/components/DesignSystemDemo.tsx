import React from "react";
import { Button } from "./ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/Card";
import { Input } from "./ui/Input";
import { Toggle } from "./ui/Toggle";
import { ChevronRight, Settings, BellRing, Check, X } from "lucide-react";

const DesignSystemDemo = () => {
  const [isToggled, setIsToggled] = React.useState(false);

  return (
    <div className="p-8 bg-neutral-800/50 min-h-screen">
      <h1 className="text-3xl font-space-grotesk font-bold text-white mb-8 text-glow">
        Design System
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
      </div>
    </div>
  );
};

export default DesignSystemDemo;
