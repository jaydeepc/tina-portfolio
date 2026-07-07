"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, motionOK } from "@/lib/gsapSetup";
import { SplitWords } from "@/components/Split";

interface HeroProps {
  frames: HTMLImageElement[];
  entered: boolean;
}

/**
 * CLIP 1 — "The Test-First Compile", Tina-only cut.
 * Pinned, scroll-scrubbed canvas frame sequence at native 24fps density:
 * every frame has Tina in it and frame index maps 1:1 to scroll progress.
 */
export default function Hero({ frames, entered }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRef = useRef<HTMLSpanElement>(null);
  const frameLabelRef = useRef<HTMLSpanElement>(null);
  const drawRef = useRef<(i: number) => void>(() => {});
  const frameRef = useRef(0);

  // ---- canvas painter ----
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0;
    let ch = 0;

    const resize = () => {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawRef.current(frameRef.current);
    };

    drawRef.current = (index: number) => {
      const i = Math.max(0, Math.min(frames.length - 1, Math.round(index)));
      const img = frames[i];
      if (!img || !img.naturalWidth || cw === 0) return;
      // 1:1 cover draw — no extra zoom, so the scrub tracks scroll exactly
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.fillStyle = "#070409";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [frames]);

  // ---- scroll scrub + pin ----
  useEffect(() => {
    if (!sectionRef.current) return;
    const total = frames.length;

    const ctx = gsap.context(() => {
      if (!motionOK()) {
        frameRef.current = total - 1;
        drawRef.current(total - 1);
        return;
      }

      let lastDrawn = -1;

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=260%",
          pin: stageRef.current,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (st) => {
            const p = st.progress;
            const idx = Math.round(p * (total - 1));
            frameRef.current = idx;
            if (idx !== lastDrawn) {
              lastDrawn = idx;
              drawRef.current(idx);
              if (frameLabelRef.current) {
                frameLabelRef.current.textContent = `${String(idx + 1).padStart(3, "0")}/${String(total).padStart(3, "0")}`;
              }
            }
            // tests go green early while the system builds around Tina
            if (chipRef.current) {
              const green = p > 0.08;
              if (green !== chipRef.current.classList.contains("is-green")) {
                chipRef.current.classList.toggle("is-green", green);
                chipRef.current.querySelector("b")!.textContent = green
                  ? "TESTS: GREEN — BUILDING"
                  : "TESTS: RED";
              }
            }
          },
        },
      });

      // typography drift while the system assembles (immediateRender off so
      // the entrance timeline owns the initial opacity)
      gsap.fromTo(
        ".hero__sub, .hero__line, .hero__cue",
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -26,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "8% top",
            end: "34% top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        ".hero__name",
        { yPercent: 0, scale: 1 },
        {
          yPercent: -34,
          scale: 0.86,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "10% top",
            end: "88% top",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        ".hero__eyebrow",
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "6% top",
            end: "22% top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [frames]);

  // ---- entrance after loader ----
  useEffect(() => {
    if (!entered || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero__name .ch",
        { yPercent: 118, rotate: 5 },
        { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.038 },
        0.15
      )
        .add(() => {
          document.querySelector(".hero__name")?.classList.add("glow-sweep");
        }, 1.0)
        .fromTo(
          ".hero__eyebrow",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.55
        )
        .fromTo(
          ".hero__sub",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.85
        )
        .fromTo(
          ".hero__line",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.0
        )
        .fromTo(
          ".hero__hud",
          { opacity: 0, x: -22 },
          { opacity: 1, x: 0, duration: 0.8 },
          1.15
        )
        .fromTo(
          ".hero__cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.35
        );
      if (!motionOK()) tl.progress(1);
    }, sectionRef);
    // First paint of the current frame for the reveal moment.
    drawRef.current(frameRef.current);
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [entered]);

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="hero__stage" ref={stageRef}>
        <canvas className="hero__canvas" ref={canvasRef} />
        <div className="hero__vignette" />

        <div className="hero__hud" aria-hidden="true" style={{ opacity: 0 }}>
          <span className="hero__hud-chip" ref={chipRef}>
            <b>TESTS: RED</b>
          </span>
          <span className="hero__hud-frame">
            BUILD <b ref={frameLabelRef}>001/097</b> · WALK SEQUENCE
          </span>
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow" style={{ opacity: 0 }}>
            THOUGHTWORKS — <b>THE TEST-FIRST BUILDER</b>
          </p>
          <h1 className="hero__name">
            <SplitWords text="TINA MARIA THOMAS" />
          </h1>
          <p className="hero__sub" style={{ opacity: 0 }}>
            Tech Lead. Full-Stack Developer. <b>AI Accelerator.</b>
          </p>
          <p className="hero__line" style={{ opacity: 0 }}>
            Building reliable software faster — with tests first, always.
          </p>
        </div>

        <div className="hero__cue" style={{ opacity: 0 }}>
          <span>SCROLL</span>
          <i />
          <span>COMPILE</span>
        </div>
      </div>
    </section>
  );
}
