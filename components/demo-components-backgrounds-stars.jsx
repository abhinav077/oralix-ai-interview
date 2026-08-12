"use client";

import {StarsBackground} from "@/components/animate-ui/components/backgrounds/star";
import { cn } from "@/lib/utils";

export const StarsBackgroundDemo = () => {
  return (
    <StarsBackground
      starColor="#FFF"
      className={cn(
        "absolute inset-0 flex items-center justify-center rounded-xl",
        "dark:bg-[radial-gradient(ellipse_at_bottom,#262626_0%,#000_100%)] bg-[radial-gradient(ellipse_at_bottom,#f5f5f5_0%,#fff_100%)]"
      )}
    />
  );
};
