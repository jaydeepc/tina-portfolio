"use client";

import { useEffect, useRef } from "react";
import { motionOK } from "@/lib/gsapSetup";
import { scrollState } from "@/lib/useLenisScroll";

const ITEMS = [
  "Test First",
  "Build Smart",
  "Ship Better",
  "10+ Years",
  "Full-Stack",
  "AI Accelerator",
];

/** Velocity-reactive marquee band. */
export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionOK()) return;
    const track = trackRef.current!;
    const chunk = track.children[0] as HTMLElement;
    let x = 0;
    let raf = 0;
    const frame = () => {
      const speed = 0.6 + Math.min(Math.abs(scrollState.velocity) * 0.09, 4);
      x -= speed;
      const width = chunk.offsetWidth;
      if (width > 0 && -x >= width) x += width;
      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const chunk = (key: number) => (
    <div className="marquee__chunk" key={key} aria-hidden={key > 0}>
      {ITEMS.map((item, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <span className={`marquee__item${i % 2 ? " is-hollow" : ""}`}>{item}</span>
          <span className="marquee__star">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className="marquee__track" ref={trackRef}>
        {chunk(0)}
        {chunk(1)}
        {chunk(2)}
      </div>
    </div>
  );
}
