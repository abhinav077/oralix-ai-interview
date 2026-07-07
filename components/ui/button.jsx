import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const animatedGradientHover =
  "bg-[length:200%_100%] bg-[position:0%_50%] hover:bg-[position:100%_50%] dark:bg-[position:0%_50%] dark:hover:bg-[position:100%_50%]"

const gradientVariants = {
  default: {
    base: "bg-primary text-primary-foreground hover:bg-primary/80",
    stone:
      "bg-gradient-to-r from-stone-100 via-stone-300 to-stone-500 text-stone-900 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:text-stone-100",
    stoneHover:
      `bg-gradient-to-r from-stone-100 via-stone-300 to-stone-500 text-stone-900 ${animatedGradientHover} dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:text-stone-100`,
    amber:
      "bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 text-amber-950 dark:from-amber-700 dark:via-amber-800 dark:to-amber-900 dark:text-amber-100",
    amberHover:
      `bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 text-amber-950 ${animatedGradientHover} dark:from-amber-700 dark:via-amber-800 dark:to-amber-900 dark:text-amber-100`,
  },
  outline: {
    base: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
    stone:
      "border-stone-300 bg-gradient-to-r from-stone-50 via-stone-100 to-stone-200 text-stone-800 dark:border-stone-700 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 dark:text-stone-100",
    stoneHover:
      `border-stone-300 bg-gradient-to-r from-stone-50 via-stone-100 to-stone-200 text-stone-800 ${animatedGradientHover} dark:border-stone-700 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 dark:text-stone-100`,
    amber:
      "border-amber-300 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-200 text-amber-900 dark:border-amber-700 dark:from-amber-950 dark:via-amber-900 dark:to-amber-800 dark:text-amber-100",
    amberHover:
      `border-amber-300 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-200 text-amber-900 ${animatedGradientHover} dark:border-amber-700 dark:from-amber-950 dark:via-amber-900 dark:to-amber-800 dark:text-amber-100`,
  },
  secondary: {
    base: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
    stone:
      "bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 text-slate-900 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 dark:text-slate-100",
    stoneHover:
      `bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 text-slate-900 ${animatedGradientHover} dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 dark:text-slate-100`,
    amber:
      "bg-gradient-to-r from-amber-100 via-orange-300 to-amber-500 text-amber-950 dark:from-amber-700 dark:via-orange-800 dark:to-amber-900 dark:text-amber-100",
    amberHover:
      `bg-gradient-to-r from-amber-100 via-orange-300 to-amber-500 text-amber-950 ${animatedGradientHover} dark:from-amber-700 dark:via-orange-800 dark:to-amber-900 dark:text-amber-100`,
  },
  ghost: {
    base: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
    stone:
      "bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-200 text-zinc-800 dark:from-zinc-900/60 dark:via-zinc-800/60 dark:to-zinc-700/60 dark:text-zinc-100",
    stoneHover:
      `bg-gradient-to-r from-zinc-50 via-zinc-100 to-zinc-200 text-zinc-800 ${animatedGradientHover} dark:from-zinc-900/60 dark:via-zinc-800/60 dark:to-zinc-700/60 dark:text-zinc-100`,
    amber:
      "bg-gradient-to-r from-amber-50 via-amber-100 to-orange-200 text-amber-900 dark:from-amber-950/60 dark:via-amber-900/60 dark:to-orange-800/60 dark:text-amber-100",
    amberHover:
      `bg-gradient-to-r from-amber-50 via-amber-100 to-orange-200 text-amber-900 ${animatedGradientHover} dark:from-amber-950/60 dark:via-amber-900/60 dark:to-orange-800/60 dark:text-amber-100`,
  },
  destructive: {
    base: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
    stone:
      "bg-gradient-to-r from-stone-200 via-stone-400 to-stone-600 text-red-950 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:text-red-100",
    stoneHover:
      `bg-gradient-to-r from-stone-200 via-stone-400 to-stone-600 text-red-950 ${animatedGradientHover} dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 dark:text-red-100`,
    amber:
      "bg-gradient-to-r from-amber-100 via-orange-300 to-red-500 text-red-950 dark:from-amber-800 dark:via-orange-800 dark:to-red-900 dark:text-red-100",
    amberHover:
      `bg-gradient-to-r from-amber-100 via-orange-300 to-red-500 text-red-950 ${animatedGradientHover} dark:from-amber-800 dark:via-orange-800 dark:to-red-900 dark:text-red-100`,
  },
  link: {
    base: "text-primary underline-offset-4 hover:underline",
    stone:
      "bg-gradient-to-r from-stone-500 via-stone-700 to-stone-900 bg-clip-text text-transparent underline-offset-4 dark:from-stone-100 dark:via-stone-300 dark:to-stone-500",
    stoneHover:
      `bg-gradient-to-r from-stone-500 via-stone-700 to-stone-900 bg-clip-text text-transparent underline-offset-4 hover:underline ${animatedGradientHover} dark:from-stone-100 dark:via-stone-300 dark:to-stone-500`,
    amber:
      "bg-gradient-to-r from-amber-500 via-orange-600 to-amber-800 bg-clip-text text-transparent underline-offset-4 dark:from-amber-200 dark:via-orange-300 dark:to-amber-500",
    amberHover:
      `bg-gradient-to-r from-amber-500 via-orange-600 to-amber-800 bg-clip-text text-transparent underline-offset-4 hover:underline ${animatedGradientHover} dark:from-amber-200 dark:via-orange-300 dark:to-amber-500`,
  },
}

const expandedButtonVariants = Object.entries(gradientVariants).reduce(
  (variants, [name, styles]) => {
    variants[name] = styles.base
    variants[`${name}-gradient`] = styles.stone
    variants[`${name}-gradient-stone`] = styles.stone
    variants[`${name}-gradient-amber`] = styles.amber
    variants[`${name}-gradient-stone-hover`] = styles.stoneHover
    variants[`${name}-gradient-amber-hover`] = styles.amberHover
    return variants
  },
  {}
)

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[background-position,color,background-color,border-color,box-shadow,transform,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: expandedButtonVariants,

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
