"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/config/site";
import { scrollToTarget } from "@/lib/useLenisScroll";

const LINKS: Array<[string, string]> = [
  ["About", "#about"],
  ["Focus", "#focus"],
  ["Philosophy", "#philosophy"],
  ["Work", "#impact"],
  ["Contact", "#finale"],
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (ref.current) {
        ref.current.classList.toggle("nav--hidden", y > 140 && y > last);
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" ref={ref}>
      <a
        className="nav__logo"
        href="#top"
        data-hover
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget("#top");
        }}
      >
        TM<em>—</em>T
      </a>
      <nav className="nav__links" aria-label="Sections">
        {LINKS.map(([label, target]) => (
          <button key={target} data-hover onClick={() => scrollToTarget(target)}>
            {label}
          </button>
        ))}
      </nav>
      <a
        className="nav__cta"
        href={SITE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        data-hover
      >
        <i /> LinkedIn
      </a>
    </header>
  );
}
