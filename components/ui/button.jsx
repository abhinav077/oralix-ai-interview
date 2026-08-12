import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex min-w-fit shrink-0 flex-row items-center justify-center gap-2 rounded-[12px] border-2 border-transparent text-sm font-medium whitespace-nowrap transition-[transform,background-color,border-color,color] duration-200 outline-none select-none focus-visible:border-[#034f46] focus-visible:ring-2 focus-visible:ring-[#034f46]/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45 active:translate-y-px [&>svg]:inline-block [&>svg]:shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5",
        gold: "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5",
        outline: "border-[#1a1a1a] bg-transparent text-[#1a1a1a] hover:bg-[#f0d7ff] hover:-translate-y-0.5",
        secondary: "border-[#034f46] bg-[#034f46] text-[#ffffeb] hover:bg-[#05685d] hover:-translate-y-0.5",
        ghost: "border-transparent bg-transparent text-current hover:bg-[#1a1a1a]/7",
        link: "border-transparent bg-transparent px-0 text-current underline-offset-4 hover:underline",
        destructive: "border-[#8d2f2f] bg-[#8d2f2f]/10 text-[#8d2f2f] hover:bg-[#8d2f2f]/15",
        "ghost-gradient-stone-hover": "border-transparent bg-transparent text-current hover:bg-[#e4e4d0]",
        "ghost-gradient-amber-hover": "border-transparent bg-transparent text-current hover:bg-[#f0d7ff]",
        "outline-gradient-stone": "border-[#ffffeb] bg-transparent text-[#ffffeb] hover:bg-[#ffffeb] hover:text-[#1a1a1a]",
        "outline-gradient-stone-hover": "border-[#1a1a1a] bg-transparent text-[#1a1a1a] hover:bg-[#e4e4d0]",
        "outline-gradient-amber-hover": "border-[#1a1a1a] bg-transparent text-[#1a1a1a] hover:bg-[#f0d7ff]",
        "default-gradient-amber-hover": "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] hover:bg-white hover:-translate-y-0.5",
      },
      size: {
        default:
          "min-h-11 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "min-h-8 gap-1 rounded-[10px] px-2 text-xs",
        sm: "min-h-9 gap-1 rounded-[12px] px-3 text-[0.8rem]",
        lg: "min-h-12 gap-1.5 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-10",
        "icon-xs":
          "size-8 rounded-[10px]",
        "icon-sm":
          "size-9 rounded-[12px]",
        "icon-lg": "size-11",
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
  ...props
}) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
