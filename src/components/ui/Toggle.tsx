import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-700 data-[state=on]:text-white",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-white/10 bg-transparent hover:bg-neutral-800 hover:text-white",
        glass:
          "border border-white/10 bg-neutral-800/30 backdrop-blur-md shadow-sm shine",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-state={pressed ? "on" : "off"}
        className={toggleVariants({ variant, size, className })}
        {...props}
      />
    );
  },
);

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
