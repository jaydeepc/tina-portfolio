"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK } from "@/lib/gsapSetup";
import { ABOUT_WALK, isSmallTier } from "@/lib/assets";
import { useFrameScrub } from "@/lib/useFrameScrub";

const DOMAINS = [
  ["01", "Education"],
  ["02", "Retail"],
  ["03", "Unemployment"],
  ["04", "Skilled Trades"],
  ["05", "AI & ML Acceleration"],
  ["06", "Testing & Quality Engineering"],
  ["07", "Open-Source Engineering"],
];

const aboutPath = (i: number) =>
  ABOUT_WALK.path(i, isSmallTier() ? "sm" : "lg");

/**
 * "Engineering with Intent" — a full-bleed walking film of Tina (expression
 * shifting from thoughtful to a warm smile) scrubbed by the pinned scroll,
 * with her story and domains overlaid in the frame's negative space.
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { canvasRef, seek } = useFrameScrub({
    count: ABOUT_WALK.count,
    path: aboutPath,
    fit: "cover",
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (!motionOK()) {
        seek(1);
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
          pin: ".about__stage",
          scrub: true,
          anticipatePin: 1,
          onUpdate: (st) => seek(st.progress),
        },
      });

      tl.fromTo(
        ".about__head",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" },
        0
      )
        .fromTo(
          ".about__p1",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          0.12
        )
        .fromTo(
          ".about__p2",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          0.22
        )
        .fromTo(
          ".about__roles",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          0.34
        )
        .fromTo(
          ".about__domains-label",
          { opacity: 0 },
          { opacity: 1, duration: 0.08 },
          0.44
        );

      gsap.utils
        .toArray<HTMLElement>(".about .domain-chip")
        .forEach((chip, i) => {
          tl.fromTo(
            chip,
            { opacity: 0, y: 26, x: -14 },
            { opacity: 1, y: 0, x: 0, duration: 0.08, ease: "power2.out" },
            0.48 + i * 0.05
          );
        });
    }, sectionRef);
    return () => ctx.revert();
  }, [seek]);

  return (
    <section className="vsec about" id="about" ref={sectionRef}>
      <div className="vsec__stage about__stage">
        <canvas
          className="vsec__canvas"
          ref={canvasRef}
          role="img"
          aria-label="Tina Maria Thomas walking through a scarlet-lit studio"
        />
        <div className="vsec__shade" />

        <div className="vsec__inner about__inner">
          <div className="about__head">
            <span className="eyebrow">01 — About</span>
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2.4rem, 6.4vw, 6rem)", marginTop: ".35em" }}
            >
              Engineering
              <br />
              with intent
            </h2>
          </div>

          <p className="about__p about__p1">
            For over a decade, <strong>Tina Maria Thomas</strong> has built
            smarter, more reliable software that solves real-world problems —
            helping teams craft seamless experiences and deliver high-quality
            outcomes.
          </p>
          <p className="about__p about__p2">
            Her superpower is range: she can take an idea through architecture,
            code, tests, pipelines and production — then teach the team to do
            it faster next time.
          </p>

          <div className="about__roles">
            <span>Full Stack Developer</span>
            <i>→</i>
            <span>Tech Anchor</span>
            <i>→</i>
            <span>Tech Lead</span>
          </div>

          <p className="about__domains-label mono">
            HER WORK SPANS HIGH-IMPACT DOMAINS —
          </p>
          <div className="about__domains-strip">
            {DOMAINS.map(([idx, name]) => (
              <span className="domain-chip" key={idx}>
                <i>{idx}</i> {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
