"use client";

import { useEffect, useRef, useCallback } from "react";

interface Options {
  count: number;
  path: (i: number) => string;
  fit?: "cover" | "contain";
}

/**
 * Lazy-loading canvas frame scrubber. Frames start loading on mount;
 * `seek(progress)` maps 0..1 to a frame index and repaints only on change.
 * While a frame is still in flight the nearest loaded neighbour is drawn,
 * so scrubbing never blanks. The current index is mirrored to
 * `canvas.dataset.frame` (handy for QA).
 */
export function useFrameScrub({ count, path, fit = "cover" }: Options) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({ current: 0, draw: (_i: number) => {} });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cw = 0;
    let ch = 0;

    const frames: HTMLImageElement[] = Array.from({ length: count }, (_, i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (i === state.current.current) state.current.draw(i);
      };
      img.src = path(i);
      return img;
    });

    state.current.draw = (index: number) => {
      const i = Math.max(0, Math.min(count - 1, Math.round(index)));
      let img: HTMLImageElement | undefined = frames[i];
      if (!img || !img.naturalWidth) {
        for (let d = 1; d < count; d++) {
          const before = frames[i - d];
          const after = frames[i + d];
          if (before && before.naturalWidth) {
            img = before;
            break;
          }
          if (after && after.naturalWidth) {
            img = after;
            break;
          }
        }
      }
      if (!img || !img.naturalWidth || cw === 0) return;
      const s =
        fit === "cover"
          ? Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
          : Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx.fillStyle = "#070409";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      canvas.dataset.frame = String(i);
    };

    const resize = () => {
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      state.current.draw(state.current.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [count, path, fit]);

  const seek = useCallback(
    (progress: number) => {
      const idx = Math.round(Math.max(0, Math.min(1, progress)) * (count - 1));
      if (idx !== state.current.current) {
        state.current.current = idx;
        state.current.draw(idx);
      }
    },
    [count]
  );

  return { canvasRef, seek };
}
