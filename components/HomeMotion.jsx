"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from("[data-home-hero]", { opacity: 0, y: 32, duration: 1, ease: "power3.out" });
      gsap.from("[data-home-preview]", { opacity: 0, x: 44, rotate: 6, duration: 1.15, delay: 0.15, ease: "power3.out" });
      gsap.from("[data-story-copy]", { opacity: 0.2, y: 20, scrollTrigger: { trigger: "[data-story-copy]", start: "top 78%", end: "top 35%", scrub: true } });
      gsap.from("[data-story-text]", { opacity: 0.2, y: 30, scrollTrigger: { trigger: "[data-story-text]", start: "top 80%", end: "top 35%", scrub: true } });
      gsap.to("[data-home-preview]", { yPercent: -7, rotate: 0, ease: "none", scrollTrigger: { trigger: "[data-home-preview]", start: "top bottom", end: "bottom top", scrub: true } });
      if (window.innerWidth >= 768) {
        gsap.fromTo("[data-stack-card]", { y: 20, opacity: 0.35, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: "[data-stack-card]", start: "top 86%", end: "top 54%", scrub: true } });
      }
    });
    return () => context.revert();
  }, []);

  return null;
}
