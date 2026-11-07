// Hero character hat frame sequence (70 frames) - Fallback to public/seq/hat paths
export const hatFrames: string[] = Array.from(
  { length: 70 },
  (_, i) => `/seq/hat/${String(i + 1).padStart(3, '0')}.webp`
);

