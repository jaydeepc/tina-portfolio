"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";

interface LoaderProps {
  progress: number; // real asset progress 0..100
  ready: boolean; // all assets settled
  onEnter: () => void; // fired once the cinematic exit completes
}

/**
 * Full-screen first-load experience. The visible counter eases toward the
 * REAL progress value and can only reach 100 when every asset is loaded —
 * then a scarlet flash reveals the hero.
 */
export default function Loader({ progress, ready, onEnter }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLElement>(null);

  const target = useRef(0);
  const shown = useRef(0);
  const exited = useRef(false);
  const readyRef = useRef(false);
  const onEnterRef = useRef(onEnter);

  target.current = progress;
  readyRef.current = ready;
  onEnterRef.current = onEnter;

  useEffect(() => {
    document.body.classList.add("is-locked");

    let raf = 0;
    let interval = 0;

    // Ease the displayed number toward the real value; never exceed it.
    const step = (eased: boolean) => {
      const t = target.current;
      if (eased) {
        shown.current += (t - shown.current) * 0.085;
        if (t - shown.current < 0.08) shown.current = t;
      } else {
        shown.current = t; // hidden tab: no one is watching the easing
      }
      const display = Math.floor(shown.current);

      if (pctRef.current) pctRef.current.textContent = String(display);
      if (barRef.current) barRef.current.style.transform = `scaleX(${shown.current / 100})`;

      if (readyRef.current && display >= 100 && !exited.current) {
        exited.current = true;
        window.clearInterval(interval);
        exit();
        return false;
      }
      return true;
    };

    const tick = () => {
      if (!step(true)) return;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // rAF stalls in hidden/background tabs — keep truthful progress moving.
    interval = window.setInterval(() => {
      if (document.visibilityState === "hidden") step(false);
    }, 400);

    const exit = () => {
      // Hidden tab: GSAP's ticker is rAF-bound and stalls, so skip the
      // cinematic wipe and hand over instantly.
      if (document.visibilityState === "hidden") {
        document.body.classList.remove("is-locked");
        if (rootRef.current) rootRef.current.style.display = "none";
        if (flashRef.current) flashRef.current.style.display = "none";
        onEnterRef.current();
        return;
      }
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("is-locked");
          if (rootRef.current) rootRef.current.style.display = "none";
          if (flashRef.current) flashRef.current.style.display = "none";
          onEnterRef.current();
        },
      });
      tl.to(".loader__msg, .loader__bar, .loader__brand, .loader__hint", {
        opacity: 0,
        y: -14,
        duration: 0.45,
        ease: "power2.in",
        stagger: 0.05,
      })
        .to(
          ".loader__pct",
          { scale: 1.06, opacity: 0, filter: "blur(8px)", duration: 0.55, ease: "power3.in" },
          "-=0.15"
        )
        .fromTo(
          flashRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.28, ease: "power4.in" }
        )
        .to(rootRef.current, { opacity: 0, duration: 0.01 })
        .to(flashRef.current, { opacity: 0, duration: 1.1, ease: "power2.out" });
    };

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="loader" ref={rootRef} role="status" aria-live="polite">
        <p className="loader__brand">TMT — PORTFOLIO SYSTEM v2.6</p>
        <div className="loader__pct h-display" aria-hidden="true">
          <span ref={pctRef}>0</span>
          <sup>%</sup>
        </div>
        <p className="loader__msg">
          Loading amazing experience<span className="dot">.</span>
          <span className="dot">.</span> hold tight
        </p>
        <div className="loader__bar">
          <i ref={barRef as React.RefObject<HTMLElement>} />
        </div>
        <p className="loader__hint">preloading hero frames · 4k footage · typography</p>
      </div>
      <div className="loader__flash" ref={flashRef} aria-hidden="true" />
    </>
  );
}
