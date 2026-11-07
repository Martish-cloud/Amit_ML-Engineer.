import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 3500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('hatFrames')) return 'frames-hat';
          if (id.includes('skillFrames')) return 'frames-skills';
          if (id.includes('codeFrames')) return 'frames-code';
          if (id.includes('certificateImages')) return 'assets-certs';
          if (id.includes('portfolioImages') || id.includes('projectShots') || id.includes('profileImage') || id.includes('resumeData')) {
            return 'assets-media';
          }
          if (id.includes('node_modules')) {
            if (id.includes('gsap') || id.includes('lenis')) return 'vendor-motion';
            return 'vendor';
          }
        },
      },
    },
  },
});

