"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, motionOK } from "@/lib/gsapSetup";

/**
 * "Code With Consequence" — Cloud Carbon Footprint (TypeScript) and
 * Talisman (Go). Each feature gets a living, animated visual.
 */
export default function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const root = sectionRef.current;

    const ctx = gsap.context(() => {
      if (!motionOK()) return;

      // --- CCF: bars grow + counters + scarlet→green sustainability shift ---
      const ccf = root.querySelector<HTMLElement>(".oss__viz--ccf");
      if (ccf) {
        const kwh = { v: 0 };
        const co2 = { v: 0 };
        const kwhEl = ccf.querySelector<SVGTextElement>(".ccf-kwh");
        const co2El = ccf.querySelector<SVGTextElement>(".ccf-co2");
        gsap
          .timeline({
            scrollTrigger: { trigger: ccf, start: "top 78%", end: "bottom 40%", scrub: 0.6 },
          })
          .fromTo(
            ccf.querySelectorAll(".ccf-bar"),
            { scaleY: 0.06, transformOrigin: "bottom" },
            { scaleY: 1, stagger: 0.06, ease: "power2.out", duration: 0.8 },
            0
          )
          .to(ccf, { ["--viz-accent" as string]: "#2fdc82", duration: 1 }, 0.15)
          .to(kwh, {
            v: 4823,
            duration: 1,
            onUpdate: () => {
              if (kwhEl) kwhEl.textContent = `${Math.round(kwh.v).toLocaleString()} kWh`;
            },
          }, 0)
          .to(co2, {
            v: 2.4,
            duration: 1,
            onUpdate: () => {
              if (co2El) co2El.textContent = `${co2.v.toFixed(1)} t CO2e`;
            },
          }, 0.1);
      }

      // --- Talisman: commits flow through the scan gate; secrets get blocked ---
      const tal = root.querySelector<HTMLElement>(".oss__viz--talisman");
      if (tal) {
        const commits = tal.querySelectorAll<SVGGElement>(".tal-commit");
        const shield = tal.querySelector<SVGGElement>(".tal-shield");
        const alert = tal.querySelector<SVGGElement>(".tal-alert");
        const master = gsap.timeline({ repeat: -1, repeatDelay: 0.4, paused: true });

        commits.forEach((c, i) => {
          const isSecret = c.classList.contains("is-secret");
          const t = i * 0.9;
          if (isSecret) {
            master
              .fromTo(c, { x: 0, opacity: 0 }, { x: 150, opacity: 1, duration: 0.9, ease: "none" }, t)
              .to(shield, { scale: 1.16, transformOrigin: "center", duration: 0.12, yoyo: true, repeat: 1 }, t + 0.9)
              .fromTo(alert, { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.18 }, t + 0.95)
              .to(c, { x: 118, opacity: 0, duration: 0.45, ease: "power2.in" }, t + 1.05)
              .to(alert, { opacity: 0, duration: 0.3 }, t + 1.9);
          } else {
            master.fromTo(
              c,
              { x: 0, opacity: 0 },
              { x: 330, opacity: 1, duration: 1.7, ease: "none" },
              t
            ).to(c, { opacity: 0, duration: 0.2 }, t + 1.7);
          }
        });

        ScrollTrigger.create({
          trigger: tal,
          start: "top 85%",
          end: "bottom 10%",
          onToggle: (st) => (st.isActive ? master.play() : master.pause()),
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sec oss" id="opensource" ref={sectionRef}>
      <div className="sec-head">
        <span className="eyebrow" data-reveal>
          06 — Open Source
        </span>
        <h2 className="h-display" data-reveal>
          Code with
          <br />
          consequence
        </h2>
        <p className="sec-note" data-reveal>
          Open source is where engineering values become public. Tina
          contributes where software meets responsibility — sustainability and
          security.
        </p>
      </div>

      {/* ---------- Cloud Carbon Footprint ---------- */}
      <div className="oss__feature">
        <div className="oss__text">
          <span className="lang" data-reveal>
            TypeScript · Thoughtworks OSS
          </span>
          <h3 data-reveal>
            Cloud Carbon
            <br />
            Footprint
          </h3>
          <p data-reveal>
            An open-source tool that estimates actual energy use in
            kilowatt-hours and carbon emissions in metric tons of CO2e from
            public cloud usage — turning invisible infrastructure cost into
            visible, actionable impact.
          </p>
          <p className="oss-message" data-reveal>
            Engineering should not just scale. It should understand its impact.
          </p>
          <a
            className="oss-link"
            href="https://www.cloudcarbonfootprint.org/"
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            cloudcarbonfootprint.org <i>↗</i>
          </a>
        </div>

        <div
          className="oss__viz oss__viz--ccf"
          data-reveal
          style={{ ["--viz-accent" as string]: "#ff2b3d" }}
        >
          <svg viewBox="0 0 460 240" fill="none" aria-hidden="true">
            <text x="20" y="28" fill="var(--cream)" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="2">
              CLOUD ENERGY & EMISSIONS
            </text>
            <text x="20" y="46" fill="rgba(244,235,218,.4)" fontSize="9" fontFamily="var(--font-mono)">
              estimated from public cloud usage
            </text>
            {[64, 108, 88, 132, 74, 118, 96, 142, 82, 60].map((h, i) => (
              <rect
                key={i}
                className="ccf-bar"
                x={24 + i * 32}
                y={200 - h}
                width={18}
                height={h}
                rx={3}
                fill="var(--viz-accent)"
                opacity={0.32 + (i % 3) * 0.18}
              />
            ))}
            <line x1="20" y1="201" x2="360" y2="201" stroke="rgba(244,235,218,.25)" />
            <text className="ccf-kwh" x="368" y="120" fill="var(--viz-accent)" fontSize="17" fontFamily="var(--font-mono)">
              0 kWh
            </text>
            <text className="ccf-co2" x="368" y="145" fill="var(--cream)" fontSize="13" fontFamily="var(--font-mono)">
              0.0 t CO2e
            </text>
            <text x="368" y="166" fill="rgba(244,235,218,.4)" fontSize="8.5" fontFamily="var(--font-mono)">
              metric tons, CO2e
            </text>
            <text x="20" y="226" fill="rgba(244,235,218,.35)" fontSize="9" fontFamily="var(--font-mono)">
              AWS · GCP · AZURE — normalized
            </text>
          </svg>
        </div>
      </div>

      {/* ---------- Talisman ---------- */}
      <div className="oss__feature is-flipped">
        <div className="oss__text">
          <span className="lang" data-reveal>
            Go · Thoughtworks OSS
          </span>
          <h3 data-reveal>Talisman</h3>
          <p data-reveal>
            A pre-commit hook that validates outgoing changesets and scans for
            suspicious secrets — tokens, passwords, private keys — before they
            ever reach a public repository.
          </p>
          <p className="oss-message" data-reveal>
            Security should be automated before mistakes become public.
          </p>
          <a
            className="oss-link"
            href="https://github.com/thoughtworks/talisman"
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            github.com/thoughtworks/talisman <i>↗</i>
          </a>
        </div>

        <div className="oss__viz oss__viz--talisman" data-reveal>
          <svg viewBox="0 0 460 240" fill="none" aria-hidden="true">
            <text x="20" y="28" fill="var(--cream)" fontSize="12" fontFamily="var(--font-mono)" letterSpacing="2">
              PRE-COMMIT SECRET SCAN
            </text>
            <text x="20" y="46" fill="rgba(244,235,218,.4)" fontSize="9" fontFamily="var(--font-mono)">
              git push → talisman → public repo
            </text>

            {/* lanes */}
            <line x1="20" y1="120" x2="440" y2="120" stroke="rgba(244,235,218,.14)" strokeDasharray="3 6" />

            {/* gate */}
            <g className="tal-shield">
              <rect x="196" y="78" width="68" height="84" rx="10" stroke="#ff2b3d" fill="rgba(255,43,61,.08)" />
              <path d="M230 96 l16 7 v14 c0 12 -7 19 -16 24 c-9 -5 -16 -12 -16 -24 v-14 z" stroke="#ff2b3d" fill="rgba(255,43,61,.16)" />
              <text x="230" y="176" textAnchor="middle" fill="#ff2b3d" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2">
                TALISMAN
              </text>
            </g>

            {/* commits */}
            {[0, 1, 2, 3].map((i) => {
              const secret = i === 2;
              return (
                <g className={`tal-commit${secret ? " is-secret" : ""}`} key={i} opacity="0">
                  <circle cx={54} cy={120} r={9} fill={secret ? "#ff2b3d" : "rgba(47,220,130,.85)"} />
                  <text x={54} y={124} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="#070409">
                    {secret ? "!" : "✓"}
                  </text>
                </g>
              );
            })}

            {/* blocked alert */}
            <g className="tal-alert" opacity="0">
              <rect x="150" y="52" width="160" height="22" rx="5" fill="rgba(255,43,61,.14)" stroke="#ff2b3d" />
              <text x="230" y="67" textAnchor="middle" fill="#ff9aa3" fontSize="9.5" fontFamily="var(--font-mono)">
                AWS_SECRET_KEY BLOCKED
              </text>
            </g>

            {/* repo */}
            <rect x="384" y="96" width="52" height="48" rx="8" stroke="rgba(47,220,130,.8)" fill="rgba(47,220,130,.06)" />
            <text x="410" y="122" textAnchor="middle" fill="#2fdc82" fontSize="9" fontFamily="var(--font-mono)">
              PUBLIC
            </text>
            <text x="410" y="134" textAnchor="middle" fill="#2fdc82" fontSize="9" fontFamily="var(--font-mono)">
              REPO
            </text>

            <text x="20" y="226" fill="rgba(244,235,218,.35)" fontSize="9" fontFamily="var(--font-mono)">
              tokens · passwords · private keys — stopped at the gate
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
