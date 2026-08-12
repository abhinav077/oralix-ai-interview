import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-7 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border-2 border-transparent px-3 py-1 text-xs font-medium whitespace-nowrap transition-[background-color,border-color,color] duration-200 focus-visible:border-[#034f46] focus-visible:ring-2 focus-visible:ring-[#034f46]/25 focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-45 aria-invalid:border-[#8d2f2f] [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] [a]:hover:bg-white",
        gold: "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] [a]:hover:bg-white",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-accent",
        destructive:
          "border-destructive/30 bg-destructive/12 text-destructive focus-visible:ring-destructive/25 [a]:hover:bg-destructive/20",
        success: "border-success/35 bg-success/12 text-success [a]:hover:bg-success/20",
        warning: "border-warning/35 bg-warning/12 text-warning [a]:hover:bg-warning/20",
        info: "border-info/35 bg-info/12 text-info [a]:hover:bg-info/20",
        outline:
          "border-[#1a1a1a]/30 bg-transparent text-[#1a1a1a] [a]:hover:border-[#1a1a1a] [a]:hover:bg-[#f0d7ff]",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props} />
  );
}

export { Badge, badgeVariants }
