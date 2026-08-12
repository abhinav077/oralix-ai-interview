import * as React from "react"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-[12px] border-2 border-[#1a1a1a]/25 bg-white/45 px-4 py-2.5 text-base text-[#1a1a1a] transition-[border-color,background-color] duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#1a1a1a] placeholder:text-[#6d6d63] hover:border-[#1a1a1a]/55 focus-visible:border-[#034f46] focus-visible:ring-2 focus-visible:ring-[#034f46]/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#e4e4d0] disabled:opacity-50 aria-invalid:border-[#8d2f2f] md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Input }
