import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[150px] w-full border border-muted/70 rounded-xl duration-300 bg-background px-4 py-3 text-base transition-colors placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:border-primary hover:border-border disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
