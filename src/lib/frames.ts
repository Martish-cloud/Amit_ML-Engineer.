// Preloads a numbered WebP sequence and draws frames onto a canvas with object-fit: cover.

export function framePaths(dir: string, count: number) {
  return Array.from({ length: count }, (_, i) => `${dir}/${String(i + 1).padStart(3, '0')}.webp`);
}

export function loadFrames(paths: string[], onProgress?: (p: number) => void) {
  let done = 0;
  const images = paths.map(src => {
    const img = new Image();
    img.decoding = 'async';
    const finish = () => {
      done++;
      onProgress?.(done / paths.length);
    };
    img.onload = finish;
    img.onerror = finish;
    img.src = src;
    return img;
  });
  return images;
}

export function drawCover(canvas: HTMLCanvasElement, img: HTMLImageElement | undefined, fit: 'cover' | 'contain' = 'cover') {
  if (!img || !img.complete || !img.naturalWidth) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  const scale = (fit === 'cover' ? Math.max : Math.min)(w / img.naturalWidth, h / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = '#040405';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
}

// Picks the nearest loaded frame so scrubbing never shows a blank canvas while images stream in.
export function nearestLoaded(images: HTMLImageElement[], index: number) {
  for (let d = 0; d < images.length; d++) {
    const a = images[index - d];
    if (a?.complete && a.naturalWidth) return a;
    const b = images[index + d];
    if (b?.complete && b.naturalWidth) return b;
  }
  return undefined;
}

