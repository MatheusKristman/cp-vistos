import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-base rounded-2xl font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground transition border border-primary hover:bg-transparent hover:text-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-red-400",
        confirm: "bg-confirm text-confirm-foreground hover:bg-confirm/80",
        outline: "border border-muted bg-transparent hover:border-primary",
        secondary: "bg-white text-secondary-foreground hover:bg-white/80",
        ghost: "transition-opacity",
        link: "text-primary underline-offset-4 hover:underline",
        date: "w-full !h-12 pl-3 text-left flex justify-start gap-2 bg-background border border-muted/50 rounded-xl font-normal group overflow-hidden hover:text-foreground hover:bg-background hover:border-border",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-9 px-3 rounded-xl text-sm",
        lg: "h-11 px-8",
        xl: "h-12 px-10",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
