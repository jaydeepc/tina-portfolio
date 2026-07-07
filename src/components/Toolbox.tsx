"use client";

const GROUPS = [
  {
    cmd: "languages --frameworks",
    label: "STACK/01",
    title: "Languages & Frameworks",
    chips: ["React", "Redux", "Vue.js", "Node.js", "TypeScript", "Java", "Kotlin", ".NET", "Golang"],
  },
  {
    cmd: "infra --cloud",
    label: "STACK/02",
    title: "Infrastructure & Cloud",
    chips: ["GCP", "AWS", "Azure", "Kubernetes", "Terraform", "Docker", "Chef", "PCF"],
  },
  {
    cmd: "db --list",
    label: "STACK/03",
    title: "Databases",
    chips: ["PostgreSQL", "MongoDB", "MSSQL Server", "Hadoop"],
  },
  {
    cmd: "tools --ai",
    label: "STACK/04",
    title: "Development & AI Tools",
    chips: ["IntelliJ", "VSCode", "Cursor", "GitHub Copilot"],
  },
];

/** Premium developer command center. */
export default function Toolbox() {
  return (
    <section className="sec toolbox" id="toolbox">
      <div className="sec-head">
        <span className="eyebrow" data-reveal>
          05 — Technical Toolbox
        </span>
        <h2 className="h-display" data-reveal>
          Command
          <br />
          center
        </h2>
        <p className="sec-note" data-reveal>
          A decade of production stacks — sharpened across frontend, backend,
          cloud infrastructure and the new generation of AI developer tooling.
        </p>
      </div>

      <div className="toolbox__grid">
        {GROUPS.map((g) => (
          <article className="tool-card" key={g.label} data-reveal>
            <div className="tool-card__bar">
              <i />
              <i />
              <i />
              <span>
                {g.label} — {g.title.toUpperCase()}
              </span>
            </div>
            <div className="tool-card__body">
              <p className="tool-card__cmd">
                <b>tina@thoughtworks</b> ~ $ {g.cmd}
                <span className="caret" />
              </p>
              <div className="tool-card__chips" data-reveal-group>
                {g.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
