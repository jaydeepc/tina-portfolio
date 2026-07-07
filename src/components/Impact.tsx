"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK } from "@/lib/gsapSetup";
import { VIDEOS } from "@/lib/assets";
import { SITE } from "@/config/site";

const AREAS = [
  {
    num: "IMPACT AREA — 01",
    title: "AI Acceleration",
    desc: "Reusable starter kits for domain-specific ML problems — cutting repetitive manual work and speeding up enterprise AI adoption.",
    tags: ["ML Starter Kits", "Enterprise AI", "Feedback Loops"],
  },
  {
    num: "IMPACT AREA — 02",
    title: "Quality Engineering",
    desc: "TDD, CI/CD, contract testing and automation practices that measurably improve reliability and time to market.",
    tags: ["TDD", "CI/CD", "Pact", "Automation"],
  },
  {
    num: "IMPACT AREA — 03",
    title: "Open Source Responsibility",
    desc: "Contributions to Cloud Carbon Footprint and Talisman — making software more sustainable and secure for everyone.",
    tags: ["Cloud Carbon Footprint", "Talisman", "Sustainability", "Security"],
  },
  {
    num: "IMPACT AREA — 04",
    title: "Full-Stack Delivery",
    desc: "Product experiences built end to end — frontend, backend, databases, cloud infrastructure and deployment pipelines.",
    tags: ["Frontend", "Backend", "Cloud", "Pipelines"],
  },
];

/**
 * CLIP 3 — "Built. Tested. Shipped." Tina walks the gallery while her
 * impact areas slide past as glass panels (horizontal scrub on desktop).
 */
export default function Impact({ videoSrc }: { videoSrc: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const root = sectionRef.current;

    const ctx = gsap.context(() => {
      if (!motionOK()) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px)", () => {
        const track = root.querySelector<HTMLElement>(".impact__track")!;
        const stage = root.querySelector<HTMLElement>(".impact__stage")!;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=280%",
            pin: stage,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onToggle: (st) => {
              const v = videoRef.current;
              if (!v) return;
              if (st.isActive) v.play().catch(() => {});
              else v.pause();
            },
          },
        });

        tl.fromTo(
          root.querySelectorAll(".impact-card"),
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.18, ease: "power2.out" },
          0
        );
        tl.to(
          track,
          {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            duration: 0.8,
          },
          0.15
        );
      });

      mm.add("(max-width: 820px)", () => {
        gsap.utils.toArray<HTMLElement>(".impact-card").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            }
          );
        });
        videoRef.current?.play().catch(() => {});
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="vsec impact" id="impact" ref={sectionRef}>
      <div className="vsec__stage impact__stage">
        <video
          className="vsec__video"
          ref={videoRef}
          src={videoSrc}
          poster={VIDEOS.gallery.poster}
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="vsec__shade" />

        <div className="impact__head">
          <span className="eyebrow">09 — Work / Impact</span>
          <h2 className="h-display">
            Built. Tested. <em style={{ color: "var(--scarlet)", fontStyle: "normal" }}>Shipped.</em>
          </h2>
        </div>

        <div className="impact__track">
          {AREAS.map((a) => (
            <article className="impact-card" key={a.num}>
              <span className="num">{a.num}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
              <div className="tags">
                {a.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <a className="cta" href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                Explore Impact <i>→</i>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
