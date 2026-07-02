import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80",

        "default-gradient":
          "bg-gradient-to-r from-stone-100 via-stone-300 to-stone-500 text-stone-900 hover:from-stone-200 hover:via-stone-400 hover:to-stone-600 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:text-stone-100",

        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",

        "outline-gradient":
          "border border-stone-300 bg-gradient-to-r from-stone-50 via-stone-100 to-stone-200 text-stone-800 hover:from-stone-100 hover:via-stone-200 hover:to-stone-300 dark:border-stone-700 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 dark:text-stone-100",

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",

        "secondary-gradient":
          "bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 text-slate-900 hover:from-slate-200 hover:via-slate-400 hover:to-slate-600 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 dark:text-slate-100",

        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",

        "ghost-gradient":
          "bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-200 text-zinc-800 hover:from-zinc-100 hover:via-zinc-200 hover:to-zinc-300 dark:from-zinc-900/60 dark:via-zinc-800/60 dark:to-zinc-700/60 dark:text-zinc-100",

        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",

        "destructive-gradient":
          "bg-gradient-to-r from-red-100 via-red-300 to-red-500 text-red-950 hover:from-red-200 hover:via-red-400 hover:to-red-600 dark:from-red-900 dark:via-red-800 dark:to-red-700 dark:text-red-100",

        link:
          "text-primary underline-offset-4 hover:underline",

        "link-gradient":
          "bg-gradient-to-r from-sky-100 via-sky-300 to-sky-500 bg-clip-text text-transparent underline-offset-4 hover:underline",
      },

      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
