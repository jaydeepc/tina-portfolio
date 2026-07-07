"use client";

import { useEffect, useState } from "react";
import { HERO_FRAMES, VIDEOS, isSmallTier } from "@/lib/assets";

export interface LoadedAssets {
  frames: HTMLImageElement[];
  videos: { gallery: string };
  small: boolean;
}

/**
 * Real preloader: hero canvas frames, the gallery film (streamed to a blob
 * URL so scroll playback never stutters) and the display fonts. Progress
 * only reaches 100 when every asset has actually settled.
 *
 * Weights: frames 82% · video 14% · fonts 4%.
 */
export function usePreloader() {
  const [progress, setProgress] = useState(0);
  const [assets, setAssets] = useState<LoadedAssets | null>(null);

  useEffect(() => {
    let disposed = false;
    const small = isSmallTier();
    const size = small ? "sm" : "lg";
    const frameCount = HERO_FRAMES.count;

    let framesDone = 0;
    let fontsDone = 0;
    const videoProg = { gallery: 0 };

    const compute = () => {
      const framePart = (framesDone / frameCount) * 82;
      const videoPart = videoProg.gallery * 14;
      const fontPart = fontsDone * 4;
      const total = Math.min(100, framePart + videoPart + fontPart);
      if (!disposed) setProgress(total);
    };

    // ---- fonts ----
    const fontsReady =
      "fonts" in document
        ? Promise.race([
            document.fonts.ready,
            new Promise((r) => setTimeout(r, 5000)),
          ])
        : Promise.resolve();
    const fontsTask = fontsReady.then(() => {
      fontsDone = 1;
      compute();
    });

    // ---- hero frames ----
    const frames: HTMLImageElement[] = new Array(frameCount);
    const framesTask = Promise.all(
      Array.from({ length: frameCount }, (_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          const settle = () => {
            framesDone += 1;
            compute();
            resolve();
          };
          img.onload = settle;
          img.onerror = settle;
          img.src = HERO_FRAMES.path(i, size);
          frames[i] = img;
        });
      })
    );

    // ---- videos → blob URLs with byte-level progress ----
    const fetchVideo = async (
      url: string,
      key: "gallery"
    ): Promise<string> => {
      try {
        const res = await fetch(url);
        if (!res.ok || !res.body) throw new Error(String(res.status));
        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body.getReader();
        const chunks: BlobPart[] = [];
        let loaded = 0;
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          loaded += value.byteLength;
          if (total > 0) {
            videoProg[key] = Math.min(1, loaded / total);
            compute();
          }
        }
        videoProg[key] = 1;
        compute();
        return URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
      } catch {
        // Missing/failed asset must not dead-lock the experience.
        videoProg[key] = 1;
        compute();
        return url;
      }
    };

    const videosTask = fetchVideo(
      small ? VIDEOS.gallery.sm : VIDEOS.gallery.lg,
      "gallery"
    );

    Promise.all([framesTask, videosTask, fontsTask]).then(([, gallery]) => {
      if (disposed) return;
      setProgress(100);
      setAssets({ frames, videos: { gallery }, small });
    });

    return () => {
      disposed = true;
    };
  }, []);

  return { progress, assets };
}
