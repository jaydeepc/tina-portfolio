"use client";

import { useEffect, useRef } from "react";
import { motionOK } from "@/lib/gsapSetup";
import { scrollState } from "@/lib/useLenisScroll";

interface Ember {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  alpha: number;
}

/**
 * Global scarlet ember field. Pre-rendered glow sprite, capped particle
 * count, velocity-reactive drift, calms down in the finale.
 */
export default function Embers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!motionOK()) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const COUNT = coarse ? 16 : 38;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    // glow sprite
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sctx = sprite.getContext("2d")!;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,96,86,0.9)");
    grad.addColorStop(0.25, "rgba(255,43,61,0.45)");
    grad.addColorStop(1, "rgba(255,43,61,0)");
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);

    const embers: Ember[] = [];
    const spawn = (e?: Ember): Ember => {
      const em = e ?? ({} as Ember);
      em.x = Math.random() * w;
      em.y = h + 30 + Math.random() * h * 0.4;
      em.r = 1 + Math.random() * 2.4;
      em.vy = 0.18 + Math.random() * 0.5;
      em.sway = 0.4 + Math.random() * 1.1;
      em.phase = Math.random() * Math.PI * 2;
      em.alpha = 0.16 + Math.random() * 0.34;
      return em;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < COUNT; i++) {
      const e = spawn();
      e.y = Math.random() * h; // scatter initial field
      embers.push(e);
    }

    let t = 0;
    const frame = () => {
      if (!running) return;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const calm = scrollState.emberCalm ? 0.35 : 1;
      const boost = Math.min(Math.abs(scrollState.velocity) * 0.04, 2.2);
      for (const e of embers) {
        e.y -= (e.vy + boost * 0.6) * calm * (e.r * 0.5);
        e.x += Math.sin(t * e.sway + e.phase) * 0.3;
        if (e.y < -40) spawn(e);
        const s = e.r * 11;
        ctx.globalAlpha = e.alpha * calm;
        ctx.drawImage(sprite, e.x - s / 2, e.y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas className="embers" ref={canvasRef} aria-hidden="true" />;
}
