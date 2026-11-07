// Skills summoning sequence (61 frames) - Fallback to public/seq/skills paths
export const skillFrames: string[] = Array.from(
  { length: 61 },
  (_, i) => `/seq/skills/${String(i + 1).padStart(3, '0')}.webp`
);

