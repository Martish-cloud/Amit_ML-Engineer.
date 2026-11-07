// Code frame sequence (20 frames) - Fallback to public/seq/code paths
export const codeFrames: string[] = Array.from(
  { length: 20 },
  (_, i) => `/seq/code/${String(i + 1).padStart(3, '0')}.webp`
);

