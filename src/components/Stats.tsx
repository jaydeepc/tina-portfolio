"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK } from "@/lib/gsapSetup";

const STATS: Array<{ value: number | null; suffix?: string; text?: string; label: string }> = [
  { value: 10, suffix: "+", label: "Years Building Software" },
  { value: 4, suffix: "+", label: "Domains Delivered" },
  { value: 2, label: "Major Open-Source Contributions" },
  { value: 2, label: "Speaking & Workshop Engagements" },
  { value: null, text: "AWS·GCP", label: "Cloud + AI Certified" },
];

/** Animated count-up stats strip with subtle parallax. */
export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const root = ref.current;

    const ctx = gsap.context(() => {
      const nums = root.querySelectorAll<HTMLElement>(".stat .num b");
      if (!motionOK()) return;

      ScrollTriggerOnce();
      function ScrollTriggerOnce() {
        gsap.fromTo(
          root.querySelectorAll(".stat"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 82%", once: true },
          }
        );
        nums.forEach((el) => {
          const target = Number(el.dataset.value || 0);
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: root, start: "top 82%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(state.v));
            },
          });
        });
        gsap.fromTo(
          root,
          { yPercent: 6 },
          {
            yPercent: -4,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="stats__row">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="num h-display">
              {s.value !== null ? (
                <>
                  <b data-value={s.value}>0</b>
                  {s.suffix && <em>{s.suffix}</em>}
                </>
              ) : (
                <span style={{ fontSize: "0.62em", lineHeight: 1.25 }}>{s.text}</span>
              )}
            </div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
