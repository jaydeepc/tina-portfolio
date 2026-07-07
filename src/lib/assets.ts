/**
 * Media manifest. Frame counts must match the files on disk — they are
 * produced from the 4K Seedance masters (see README "Media pipeline").
 */
export const HERO_FRAMES = {
  count: 97,
  path: (i: number, size: "lg" | "sm") =>
    `/media/hero/${size}/f_${String(i).padStart(4, "0")}.webp`,
};

/** Clip 2 as a scroll-scrubbed sequence for the Current Focus section. */
export const FOCUS_FRAMES = {
  count: 97,
  path: (i: number, size: "lg" | "sm") =>
    `/media/focus/${size}/f_${String(i).padStart(4, "0")}.webp`,
};

/** Full-bleed walking film (expression arc) for the About section. */
export const ABOUT_WALK = {
  count: 97,
  path: (i: number, size: "lg" | "sm") =>
    `/media/about/${size}/f_${String(i).padStart(4, "0")}.webp`,
};

export const VIDEOS = {
  gallery: {
    lg: "/media/gallery.mp4",
    sm: "/media/gallery-sm.mp4",
    poster: "/media/gallery-poster.jpg",
  },
};

export const STILLS = {
  finale: "/media/finale-poster.jpg",
};

/** Choose the small asset tier for narrow viewports / coarse pointers. */
export const isSmallTier = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(max-width: 840px)").matches ||
    Math.min(window.screen.width, window.screen.height) < 820);
