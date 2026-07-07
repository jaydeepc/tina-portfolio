"use client";

import { useEffect, useState } from "react";
import { gsap, ScrollTrigger, motionOK } from "@/lib/gsapSetup";
import { useLenisScroll } from "@/lib/useLenisScroll";
import { usePreloader } from "@/lib/usePreloader";

import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import Embers from "@/components/Embers";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Focus from "@/components/Focus";
import Philosophy from "@/components/Philosophy";
import Pillars from "@/components/Pillars";
import Toolbox from "@/components/Toolbox";
import OpenSource from "@/components/OpenSource";
import Speaking from "@/components/Speaking";
import Certifications from "@/components/Certifications";
import Impact from "@/components/Impact";
import Stats from "@/components/Stats";
import Finale from "@/components/Finale";

export default function Home() {
  const { progress, assets } = usePreloader();
  const [entered, setEntered] = useState(false);

  useLenisScroll(!!assets);

  // Global content reveals — created once the loader has handed over.
  useEffect(() => {
    if (!entered) return;
    const ctx = gsap.context(() => {
      if (!motionOK()) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: group, start: "top 90%", once: true },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    // Dev/debug utility: /?at=<scrollY> jumps straight to an offset.
    const at = new URLSearchParams(window.location.search).get("at");
    if (at) {
      requestAnimationFrame(() => window.scrollTo(0, parseInt(at, 10) || 0));
      setTimeout(() => window.scrollTo(0, parseInt(at, 10) || 0), 400);
    }

    return () => ctx.revert();
  }, [entered]);

  return (
    <>
      {!entered && (
        <Loader progress={progress} ready={!!assets} onEnter={() => setEntered(true)} />
      )}

      {assets && (
        <>
          <Cursor />
          <Embers />
          <Nav />
          <main>
            <Hero frames={assets.frames} entered={entered} />
            <Marquee />
            <About />
            <Focus />
            <Philosophy />
            <Pillars />
            <Toolbox />
            <OpenSource />
            <Speaking />
            <Certifications />
            <Impact videoSrc={assets.videos.gallery} />
            <Stats />
            <Finale />
          </main>
        </>
      )}
    </>
  );
}
