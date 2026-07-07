"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK } from "@/lib/gsapSetup";
import { FOCUS_FRAMES, isSmallTier } from "@/lib/assets";
import { useFrameScrub } from "@/lib/useFrameScrub";

const MODULES = [
  "Domain-specific ML starter kits",
  "Reusable intelligence foundations",
  "Faster feedback loops",
  "Reduced manual repetition",
  "Easier AI integration at scale",
  "Practical AI adoption for organisations",
];

const focusPath = (i: number) =>
  FOCUS_FRAMES.path(i, isSmallTier() ? "sm" : "lg");

/**
 * CLIP 2 — "AI Systems in Motion", scroll-scrubbed. The film advances in
 * lockstep with the pin progress while the starter-kit modules assemble.
 */
export default function Focus() {
  const sectionRef = useRef<HTMLElement>(null);
  const { canvasRef, seek } = useFrameScrub({
    count: FOCUS_FRAMES.count,
    path: focusPath,
    fit: "cover",
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (!motionOK()) {
        seek(1);
        return;
      }

      const modules = gsap.utils.toArray<HTMLElement>(".focus .module-block");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=240%",
          pin: ".focus__stage",
          scrub: true,
          anticipatePin: 1,
          onUpdate: (st) => seek(st.progress),
        },
      });

      tl.fromTo(
        ".focus .sec-head-inner",
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.16, ease: "power2.out" },
        0
      );

      modules.forEach((m, i) => {
        tl.fromTo(
          m,
          {
            opacity: 0,
            x: (i % 3 - 1) * 160,
            y: 140 + (i % 2) * 90,
            rotate: (i % 2 ? 1 : -1) * 7,
          },
          { opacity: 1, x: 0, y: 0, rotate: 0, duration: 0.14, ease: "power2.out" },
          0.16 + i * 0.09
        );
        tl.to(
          m.querySelector(".module-port"),
          { backgroundColor: "#2fdc82", borderColor: "#2fdc82", boxShadow: "0 0 14px rgba(47,220,130,.65)", duration: 0.03 },
          0.3 + i * 0.09
        );
      });

      tl.fromTo(
        ".focus__status",
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0.82
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [seek]);

  return (
    <section className="vsec focus" id="focus" ref={sectionRef}>
      <div className="vsec__stage focus__stage">
        <canvas
          className="vsec__canvas"
          ref={canvasRef}
          role="img"
          aria-label="Tina building AI systems at a holographic workstation"
        />
        <div className="vsec__shade" />
        <div className="vsec__inner">
          <div className="sec-head-inner">
            <span className="eyebrow">02 — Current Focus</span>
            <h2 className="h-display" style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)", marginTop: ".35em" }}>
              Accelerating AI,
              <br />
              practically
            </h2>
            <p className="focus__kicker">
              Tina is part of a specialised team accelerating large-scale AI and
              Machine Learning evolution. <strong>Not AI as a buzzword</strong> —
              AI made practical, reusable and accessible, assembled from modular
              starter kits organisations can actually ship with.
            </p>
          </div>

          <div className="focus__modules">
            {MODULES.map((m, i) => (
              <div className="module-block" data-idx={`KIT/0${i + 1}`} key={m}>
                <span className="module-port" />
                <h3>{m}</h3>
              </div>
            ))}
          </div>

          <p className="focus__status mono">
            <b>▲ ASSEMBLED</b> — starter kit compiled · reusable · production-ready
          </p>
        </div>
      </div>
    </section>
  );
}
