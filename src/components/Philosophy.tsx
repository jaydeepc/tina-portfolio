"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK } from "@/lib/gsapSetup";

const BELIEFS = [
  "Writing tests first forces clarity on the end goal",
  "It keeps the focus on what the code must do",
  "Tests written afterward only validate what already exists",
  "A test-first mindset surfaces edge cases earlier",
  "Better tests → better software, delivered faster",
];

const PIPELINE = ["COMMIT", "TEST", "BUILD", "GATE", "SHIP"];

/**
 * The belief system: RED → GREEN → REFACTOR staged inside a pinned scene,
 * a CI pipeline lighting up, and Tina's mantra landing as a manifesto.
 */
export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (!motionOK()) {
        gsap.set(".ph__word--refactor, .ph__quote, .ph__beliefs li, .ph__log div", { opacity: 1 });
        return;
      }

      const nodes = gsap.utils.toArray<HTMLElement>(".ph__node");
      const links = gsap.utils.toArray<HTMLElement>(".ph__link i");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=380%",
          pin: ".ph__stage",
          scrub: true,
          anticipatePin: 1,
        },
        defaults: { ease: "power2.out" },
      });

      // Stage 1 — RED
      tl.fromTo(".ph__word--red", { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.07 }, 0.02)
        .fromTo(".ph__log .l1", { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.05)
        .fromTo(".ph__log .l2", { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.08)
        .to(".ph__word--red", { opacity: 0, scale: 1.12, filter: "blur(6px)", duration: 0.05 }, 0.16);

      // Stage 2 — GREEN
      tl.fromTo(".ph__word--green", { opacity: 0, scale: 0.82 }, { opacity: 1, scale: 1, duration: 0.07 }, 0.2)
        .fromTo(".ph__log .l3", { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.23)
        .fromTo(".ph__log .l4", { opacity: 0 }, { opacity: 1, duration: 0.03 }, 0.26)
        .to(".ph__word--green", { opacity: 0, scale: 1.12, filter: "blur(6px)", duration: 0.05 }, 0.34);

      // Stage 3 — REFACTOR
      tl.fromTo(".ph__word--refactor", { opacity: 0, rotate: -3, scale: 0.9 }, { opacity: 1, rotate: 0, scale: 1, duration: 0.07 }, 0.38)
        .to(".ph__word--refactor", { opacity: 0, scale: 1.08, duration: 0.05 }, 0.5);

      // Stage 4 — pipeline lights up, gate opens
      nodes.forEach((n, i) => {
        tl.add(() => n.classList.add("lit"), 0.5 + i * 0.045);
        if (links[i]) tl.to(links[i], { scaleX: 1, duration: 0.04 }, 0.52 + i * 0.045);
      });

      // Stage 5 — the mantra
      tl.fromTo(
        ".ph__quote",
        { opacity: 0, scale: 0.92, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.1 },
        0.66
      );

      // Stage 6 — beliefs
      gsap.utils.toArray<HTMLElement>(".ph__beliefs li").forEach((li, i) => {
        tl.fromTo(li, { opacity: 0, x: 40 }, { opacity: 0.9, x: 0, duration: 0.05 }, 0.78 + i * 0.035);
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="philosophy" id="philosophy" ref={sectionRef}>
      <div className="ph__stage">
        <div className="ph__head">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            03 — Philosophy
          </span>
          <h2 className="h-display">Test first, always</h2>
        </div>

        <div className="ph__words" aria-hidden="true">
          <span className="ph__word ph__word--red">RED</span>
          <span className="ph__word ph__word--green">GREEN</span>
          <span className="ph__word ph__word--refactor">REFACTOR</span>
        </div>

        <div className="ph__log mono" aria-hidden="true">
          <div className="l1">$ npm run test:watch</div>
          <div className="l2 fail">✗ ships value to production — FAILED (0 implementations)</div>
          <div className="l3 pass">✓ ships value to production — PASSED (42 ms)</div>
          <div className="l4 pass">✓ pipeline green · deploy gate open</div>
        </div>

        <blockquote className="ph__quote">
          <div>
            <p>
              “I will write the <em>tests first.</em>”
            </p>
            <cite>— Tina Maria Thomas · rock-solid software starts with a testing mindset</cite>
          </div>
        </blockquote>

        <ul className="ph__beliefs">
          {BELIEFS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <div className="ph__pipeline" aria-hidden="true">
          {PIPELINE.map((label, i) => (
            <span key={label} style={{ display: "contents" }}>
              <span className={`ph__node${label === "SHIP" ? " ship" : ""}`}>
                <i />
                <span>{label}</span>
              </span>
              {i < PIPELINE.length - 1 && (
                <span className="ph__link">
                  <i />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
