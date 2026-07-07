"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger, motionOK } from "@/lib/gsapSetup";
import { scrollState, scrollToTarget } from "@/lib/useLenisScroll";
import { STILLS } from "@/lib/assets";
import { SITE } from "@/config/site";

/** Final cinematic CTA — scarlet glow fades to black, particles slow down. */
export default function Finale() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || !motionOK()) return;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 60%",
      onToggle: (self) => {
        scrollState.emberCalm = self.isActive;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section className="finale" id="finale" ref={ref}>
      <div className="finale__bg" style={{ backgroundImage: `url(${STILLS.finale})` }} />
      <div className="finale__shade" />

      <div className="finale__inner">
        <span className="eyebrow" style={{ justifyContent: "center" }} data-reveal>
          10 — Let’s Build
        </span>
        <h2 className="h-display" data-reveal>
          Let’s build software that is intelligent, reliable and{" "}
          <em>ready to ship.</em>
        </h2>
        <p className="finale__tagline" data-reveal>
          Test first. Build smart. <b>Ship better.</b>
        </p>

        <div className="finale__actions" data-reveal>
          <button className="btn btn--solid" data-hover onClick={() => scrollToTarget("#impact")}>
            View Work
          </button>
          <a className="btn" data-hover href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
            Connect with Tina ↗
          </a>
        </div>
      </div>

      <footer className="finale__footer">
        <div className="finale__links" data-reveal>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" data-hover>
            <i>◆</i> LinkedIn
          </a>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" data-hover title="Placeholder — set Tina's GitHub in src/config/site.ts">
            <i>◆</i> GitHub
          </a>
          <a href={SITE.email} data-hover title="Placeholder — set Tina's email in src/config/site.ts">
            <i>◆</i> Email
          </a>
          <a href={SITE.resume} data-hover title="Placeholder — set Tina's resume link in src/config/site.ts">
            <i>◆</i> Resume
          </a>
        </div>

        <div className="finale__base">
          <span>
            © 2026 <b>TINA MARIA THOMAS</b> — TECH LEAD · FULL-STACK · AI
          </span>
          <span>
            DESIGNED & ENGINEERED <b>TESTS FIRST</b> · BLR
          </span>
        </div>
      </footer>
    </section>
  );
}
