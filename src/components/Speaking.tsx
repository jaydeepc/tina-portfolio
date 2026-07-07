"use client";

/** "Teaching Teams to Build Better" — workshops, conference talks, mentorship. */
export default function Speaking() {
  return (
    <section className="sec speaking" id="speaking">
      <div className="sec-head">
        <span className="eyebrow" data-reveal>
          07 — Speaking & Mentorship
        </span>
        <h2 className="h-display" data-reveal>
          Teaching teams
          <br />
          to build better
        </h2>
        <p className="sec-note" data-reveal>
          Tina loves sharing knowledge — training teams, running hands-on
          workshops and helping developers raise the quality of how software
          gets built.
        </p>
      </div>

      <div className="speaking__grid">
        {/* vodQA */}
        <article className="talk-card" data-reveal>
          <span className="venue">WORKSHOP — vodQA · Bangalore</span>
          <h3>Contract Testing Using Pact</h3>
          <p>
            A hands-on deep dive: two microservices, one contract between them,
            and a Pact verification layer that catches breaking changes before
            integration ever gets the chance to fail.
          </p>
          <svg viewBox="0 0 460 130" fill="none" aria-hidden="true">
            <rect x="14" y="42" width="112" height="48" rx="9" stroke="#ff2b3d" fill="rgba(255,43,61,.07)" />
            <text x="70" y="63" textAnchor="middle" fill="var(--cream)" fontSize="10.5" fontFamily="var(--font-mono)">CONSUMER</text>
            <text x="70" y="79" textAnchor="middle" fill="rgba(244,235,218,.45)" fontSize="8.5" fontFamily="var(--font-mono)">orders-web</text>

            <g>
              <rect x="174" y="30" width="112" height="72" rx="9" stroke="var(--cream)" strokeOpacity=".55" fill="rgba(244,235,218,.04)" />
              <text x="230" y="52" textAnchor="middle" fill="var(--cream)" fontSize="10.5" fontFamily="var(--font-mono)">CONTRACT</text>
              <text x="230" y="68" textAnchor="middle" fill="#ff2b3d" fontSize="9" fontFamily="var(--font-mono)">pact.json</text>
              <text x="230" y="86" textAnchor="middle" fill="#2fdc82" fontSize="9" fontFamily="var(--font-mono)">✓ VERIFIED</text>
            </g>

            <rect x="334" y="42" width="112" height="48" rx="9" stroke="#ff2b3d" fill="rgba(255,43,61,.07)" />
            <text x="390" y="63" textAnchor="middle" fill="var(--cream)" fontSize="10.5" fontFamily="var(--font-mono)">PROVIDER</text>
            <text x="390" y="79" textAnchor="middle" fill="rgba(244,235,218,.45)" fontSize="8.5" fontFamily="var(--font-mono)">orders-api</text>

            <path className="flow-line" d="M 126 66 H 174" stroke="#ff2b3d" strokeWidth="1.4" strokeDasharray="5 5" />
            <path className="flow-line" d="M 286 66 H 334" stroke="#ff2b3d" strokeWidth="1.4" strokeDasharray="5 5" />
            <text x="230" y="122" textAnchor="middle" fill="rgba(244,235,218,.4)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="2">
              THE CONTRACT PASSES BEFORE INTEGRATION BREAKS
            </text>
          </svg>
        </article>

        {/* YourStory */}
        <article className="talk-card" data-reveal>
          <span className="venue">TALK — YourStory · Future of Work</span>
          <h3>Harnessing AI & ML in Testing to Optimise Time to Market</h3>
          <p>
            AI-assisted testing dashboards, earlier defect discovery and
            application-change learning — automation that frees teams to focus
            on innovation instead of repetition.
          </p>
          <svg viewBox="0 0 460 130" fill="none" aria-hidden="true">
            <text x="14" y="24" fill="var(--cream)" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="2">DEFECTS FOUND EARLIER →</text>
            <polyline
              className="flow-line"
              points="14,96 74,88 134,92 194,70 254,62 314,44 374,40 446,26"
              stroke="#ff2b3d"
              strokeWidth="1.8"
              fill="none"
            />
            {[14, 74, 134, 194, 254, 314, 374, 446].map((x, i) => (
              <circle key={i} cx={x} cy={[96, 88, 92, 70, 62, 44, 40, 26][i]} r="3.2" fill={i > 4 ? "#2fdc82" : "#ff2b3d"} />
            ))}
            <rect x="14" y="106" width="128" height="18" rx="4" fill="rgba(255,43,61,.12)" stroke="rgba(255,43,61,.5)" />
            <text x="78" y="118" textAnchor="middle" fill="#ff9aa3" fontSize="8.5" fontFamily="var(--font-mono)">MANUAL REGRESSION</text>
            <rect x="152" y="106" width="128" height="18" rx="4" fill="rgba(47,220,130,.1)" stroke="rgba(47,220,130,.5)" />
            <text x="216" y="118" textAnchor="middle" fill="#2fdc82" fontSize="8.5" fontFamily="var(--font-mono)">AI-ASSISTED SUITE</text>
            <text x="446" y="118" textAnchor="end" fill="rgba(244,235,218,.4)" fontSize="8.5" fontFamily="var(--font-mono)">TIME TO MARKET ↓</text>
          </svg>
        </article>
      </div>

      <div className="speaking__message" data-reveal>
        <p>
          The best engineering leaders don’t just build systems — they raise
          <em> the quality of how teams build.</em>
        </p>
      </div>
    </section>
  );
}
