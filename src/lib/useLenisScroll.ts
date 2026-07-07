"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, motionOK } from "@/lib/gsapSetup";

/**
 * Shared scroll state readable by non-React render loops
 * (embers canvas, marquee velocity, etc.).
 */
export const scrollState = {
  lenis: null as Lenis | null,
  velocity: 0,
  emberCalm: false,
};

export function scrollToTarget(target: string) {
  if (scrollState.lenis) {
    scrollState.lenis.scrollTo(target, { duration: 1.6, offset: 0 });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

/** Boot Lenis + keep GSAP ScrollTrigger in sync. */
export function useLenisScroll(active: boolean) {
  useEffect(() => {
    if (!active || !motionOK()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.35,
    });
    scrollState.lenis = lenis;

    lenis.on("scroll", () => {
      scrollState.velocity = lenis.velocity;
      ScrollTrigger.update();
    });

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      scrollState.lenis = null;
      scrollState.velocity = 0;
    };
  }, [active]);
}
