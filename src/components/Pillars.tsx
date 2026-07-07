"use client";

import { useEffect, useRef } from "react";
import { gsap, motionOK } from "@/lib/gsapSetup";

const PILLARS = [
  {
    idx: "01",
    title: "Full-Stack Product Engineering",
    desc: "From idea to architecture, frontend, backend, API, database and deployment — one continuous, well-tested line from whiteboard to production.",
    chips: ["React", "Redux", "Vue.js", "Node.js", "TypeScript", "Java", "Kotlin", ".NET", "Golang"],
  },
  {
    idx: "02",
    title: "AI & ML Acceleration",
    desc: "Reusable starter kits and intelligent foundations that help organisations integrate AI and ML faster — with less repetition and more shipping.",
    chips: [
      "Domain-specific ML workflows",
      "Reusable starter kits",
      "Faster feedback",
      "Reduced manual work",
      "Practical AI at scale",
    ],
  },
  {
    idx: "03",
    title: "Quality, Testing & Delivery",
    desc: "Helping teams ship reliable software through TDD, CI/CD, contract testing and automation — quality designed in, not inspected in.",
    chips: [
      "Test-Driven Development",
      "CI/CD pipelines",
      "Pact contract testing",
      "Automated quality gates",
      "Production reliability",
    ],
  },
];

function Diagram({ kind }: { kind: number }) {
  if (kind === 0) {
    return (
      <svg viewBox="0 0 420 110" fill="none" aria-hidden="true">
        {["UI", "API", "SVC", "DB"].map((label, i) => (
          <g key={label} className="dg-node">
            <rect x={20 + i * 108} y={34} width={68} height={42} rx={8} stroke="var(--scarlet)" strokeOpacity={0.8} fill="rgba(255,43,61,0.07)" />
            <text x={54 + i * 108} y={60} textAnchor="middle" fill="var(--cream)" fontSize="13" fontFamily="var(--font-mono)">
              {label}
            </text>
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <path key={i} className="draw" d={`M ${88 + i * 108} 55 H ${128 + i * 108}`} stroke="var(--cream)" strokeOpacity={0.5} strokeWidth={1.5} markerEnd="none" />
        ))}
        <path className="draw" d="M 20 96 H 400" stroke="var(--scarlet)" strokeWidth={1} strokeDasharray="4 6" opacity={0.5} />
        <text x={210} y={22} textAnchor="middle" fill="var(--cream-45, rgba(244,235,218,.45))" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="3">
          IDEA → ARCHITECTURE → DEPLOYMENT
        </text>
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 420 110" fill="none" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <rect key={i} className="dg-node" x={24 + i * 54} y={40 + (i % 2) * 8} width={40} height={30} rx={6} stroke="var(--scarlet)" fill="rgba(255,43,61,0.08)" />
        ))}
        <path className="draw" d="M 190 55 H 240" stroke="var(--cream)" strokeOpacity={0.6} strokeWidth={1.5} />
        <path className="draw" d="M 232 47 L 242 55 L 232 63" stroke="var(--cream)" strokeOpacity={0.6} strokeWidth={1.5} />
        <rect className="dg-node" x={252} y={26} width={140} height={58} rx={10} stroke="var(--green)" fill="rgba(47,220,130,0.06)" />
        <text x={322} y={50} textAnchor="middle" fill="var(--cream)" fontSize="12" fontFamily="var(--font-mono)">
          STARTER KIT
        </text>
        <text x={322} y={68} textAnchor="middle" fill="var(--green)" fontSize="10" fontFamily="var(--font-mono)">
          ● READY TO INTEGRATE
        </text>
        <text x={100} y={98} textAnchor="middle" fill="var(--cream-45, rgba(244,235,218,.45))" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="2">
          MODULAR BLOCKS
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 420 110" fill="none" aria-hidden="true">
      <circle className="dg-node" cx={60} cy={55} r={24} stroke="var(--scarlet)" fill="rgba(255,43,61,0.08)" />
      <text x={60} y={59} textAnchor="middle" fill="var(--scarlet)" fontSize="11" fontFamily="var(--font-mono)">RED</text>
      <circle className="dg-node" cx={160} cy={55} r={24} stroke="var(--green)" fill="rgba(47,220,130,0.08)" />
      <text x={160} y={59} textAnchor="middle" fill="var(--green)" fontSize="10" fontFamily="var(--font-mono)">GREEN</text>
      <circle className="dg-node" cx={270} cy={55} r={24} stroke="var(--cream)" strokeOpacity={0.7} fill="rgba(244,235,218,0.05)" />
      <text x={270} y={59} textAnchor="middle" fill="var(--cream)" fontSize="8.5" fontFamily="var(--font-mono)">REFACTOR</text>
      <path className="draw" d="M 84 55 H 136" stroke="var(--cream)" strokeOpacity={0.55} strokeWidth={1.5} />
      <path className="draw" d="M 184 55 H 246" stroke="var(--cream)" strokeOpacity={0.55} strokeWidth={1.5} />
      <path className="draw" d="M 270 79 Q 165 108 60 79" stroke="var(--cream)" strokeOpacity={0.4} strokeWidth={1.2} strokeDasharray="3 5" />
      <path className="draw" d="M 294 55 H 340" stroke="var(--green)" strokeWidth={1.5} />
      <rect className="dg-node" x={344} y={38} width={56} height={34} rx={7} stroke="var(--green)" fill="rgba(47,220,130,0.07)" />
      <text x={372} y={59} textAnchor="middle" fill="var(--green)" fontSize="10" fontFamily="var(--font-mono)">SHIP</text>
    </svg>
  );
}

/** Three capability pillars revealed one at a time inside a pinned stage. */
export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(-1);

  useEffect(() => {
    if (!sectionRef.current) return;
    const root = sectionRef.current;

    const tabs = Array.from(root.querySelectorAll<HTMLElement>(".pillar-tab"));
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pillar-card"));
    const bars = Array.from(root.querySelectorAll<HTMLElement>(".pillars__progress i b"));

    const setActive = (i: number) => {
      if (activeRef.current === i) return;
      activeRef.current = i;
      tabs.forEach((t, ti) => t.classList.toggle("is-active", ti === i));
      cards.forEach((c, ci) => c.classList.toggle("is-active", ci === i));
      const card = cards[i];
      if (card) {
        gsap.fromTo(card, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" });
        const draws = card.querySelectorAll<SVGPathElement>(".draw");
        draws.forEach((p) => {
          const len = p.getTotalLength();
          gsap.fromTo(
            p,
            { strokeDasharray: p.style.strokeDasharray || `${len}`, strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", delay: 0.15 }
          );
        });
        gsap.fromTo(
          card.querySelectorAll(".dg-node, .chip"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, delay: 0.1, ease: "power2.out" }
        );
      }
    };

    const ctx = gsap.context(() => {
      if (!motionOK()) {
        setActive(0);
        return;
      }
      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=260%",
          pin: ".pillars__stage",
          scrub: true,
          anticipatePin: 1,
          onUpdate: (st) => {
            const p = st.progress;
            setActive(Math.min(2, Math.floor(p * 3)));
            bars.forEach((b, bi) => {
              const local = gsap.utils.clamp(0, 1, p * 3 - bi);
              b.style.transform = `scaleX(${local})`;
            });
          },
        },
      });
      setActive(0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pillars" id="pillars" ref={sectionRef}>
      <div className="pillars__stage">
        <div className="pillars__grid">
          <div>
            <span className="eyebrow">04 — Capabilities</span>
            <div className="pillars__list" style={{ marginTop: "2rem" }}>
              {PILLARS.map((p, i) => (
                <div className={`pillar-tab${i === 0 ? " is-active" : ""}`} key={p.idx}>
                  <span className="idx">/{p.idx}</span>
                  <h3>{p.title}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="pillars__panel">
            {PILLARS.map((p, i) => (
              <article className={`pillar-card${i === 0 ? " is-active" : ""}`} key={p.idx}>
                <span className="eyebrow">PILLAR {p.idx}</span>
                <p>{p.desc}</p>
                <Diagram kind={i} />
                <div className="chips">
                  {p.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="pillars__progress" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <i key={i}>
              <b />
            </i>
          ))}
        </div>
      </div>
    </section>
  );
}
