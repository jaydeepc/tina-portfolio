"use client";

const CERTS = [
  {
    seal: "AWS",
    provider: "Amazon Web Services",
    title: "AWS Certified AI Practitioner",
    valid: "VALID THROUGH SEP 2028",
  },
  {
    seal: "GCP",
    provider: "Google Cloud",
    title: "GCP Cloud Digital Leader",
    valid: "VALID THROUGH NOV 2027",
  },
];

function Seal() {
  return (
    <svg viewBox="0 0 74 74" fill="none" aria-hidden="true">
      <circle cx="37" cy="37" r="34" stroke="#ff2b3d" strokeOpacity="0.85" strokeWidth="1.2" strokeDasharray="5 7" />
      <circle cx="37" cy="37" r="26" stroke="rgba(244,235,218,.25)" strokeWidth="1" />
      <path d="M27 37.5 l7 7 L48 30" stroke="#2fdc82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Compact credibility strip — cloud + AI certifications. */
export default function Certifications() {
  return (
    <section className="sec certs" id="certs">
      <div className="sec-head">
        <span className="eyebrow" data-reveal>
          08 — Certifications
        </span>
        <h2 className="h-display" data-reveal>
          Certified,
          <br />
          cloud + AI
        </h2>
      </div>

      <div className="certs__grid">
        {CERTS.map((c) => (
          <article className="cert-card" key={c.seal} data-reveal>
            <div className="cert-card__seal">
              <Seal />
              <b>{c.seal}</b>
            </div>
            <div className="cert-card__body">
              <span className="provider">{c.provider}</span>
              <h3>{c.title}</h3>
              <p className="valid">
                <b>● ACTIVE</b> — {c.valid}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
