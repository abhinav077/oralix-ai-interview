"use client";

import { useEffect, useState } from "react";
import { MessagesSquare } from "lucide-react";

const INTRO_SESSION_KEY = "oralix:first-visit-intro:v1";

export default function FirstVisitIntro() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    try {
      if (window.sessionStorage.getItem(INTRO_SESSION_KEY)) return undefined;

      window.sessionStorage.setItem(INTRO_SESSION_KEY, "seen");
    } catch {
      // A blocked storage API should never delay access to the application.
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let timeout;
    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true);
      timeout = window.setTimeout(
        () => setIsVisible(false),
        prefersReducedMotion ? 180 : 760
      );
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-40 grid place-items-center bg-background/95 px-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500 motion-reduce:animate-none"
      role="status"
    >
      <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 text-card-foreground shadow-sm">
        <span className="grid size-9 place-items-center rounded-full border border-border bg-primary/10 text-primary">
          <MessagesSquare aria-hidden="true" size={18} />
        </span>
        <div>
          <p className="text-lg font-normal tracking-tight text-card-foreground">
            Oralix
          </p>
          <p className="text-xs text-muted-foreground">A Better Room Is Waiting</p>
        </div>
      </div>
    </div>
  );
}
