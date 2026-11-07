# Amit Halder — Machine Learning Engineer & GenAI Developer Portfolio

> Cinematic, 3D WebP sequence-driven developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS, GSAP ScrollTrigger, Lenis smooth scrolling, and Framer Motion.

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and configure your Web3Forms access key for project inquiries:
```bash
cp .env.example .env
```
In `.env`:
```env
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
Preview the built bundle:
```bash
npm run preview
```

---

## 🎨 Architectural Highlights & Features

- **3D Canvas WebP Sequences:**
  - **Hero Stage:** 70-frame animated character hat sequence synchronized with page entrance and scroll.
  - **About Section:** 20-frame sofa code animation loop.
  - **Skills Summoning:** 61-frame interactive stack summoning sequence bound to scroll scrub.
  - Progressive frame loading, aspect-ratio cover canvas rendering, and zero-flicker frame nearest-neighbor fallback.
- **Editorial Typography System:**
  - `Unbounded` (editorial bold headers)
  - `Instrument Serif` (accent italic serif highlights)
  - `Manrope` (body and UI elements)
  - `JetBrains Mono` (technical badges, metrics, and tags)
  - `Shippori Mincho B1` (kanji accents)
- **Lenis + GSAP Scroll Engine:**
  - High-performance smooth scrolling paired with GSAP `ScrollTrigger` and `lagSmoothing(0)`.
  - Accessible reduced-motion mode via CSS media query checks (`prefers-reduced-motion`).
- **Interactive UI Bits:**
  - `ClickSpark`: Custom cursor click particle explosion.
  - `ScrollVelocity`: Dual-speed marquee ribbon.
  - `TiltedCard`: 3D tilt with dynamic realistic light glare on project cards.
  - `SpotlightCard`: Radial cursor spotlight on experience cards.
  - `SplitText` & `CountUp`: Animated metrics for career statistics.
- **Instant Certificate Dossier Navigation:**
  - Eager background caching via browser Image preloading.
  - Rapid 180ms ease transition using Framer Motion `mode="popLayout"`.
  - Zero loading spinner, no artificial delay, and immediate state updates.
  - Category filtering with instant index reset.
  - Keyboard arrow navigation (`←` / `→`) and full-screen lightbox inspect.
- **Security & Privacy:**
  - **Personal identity documents completely removed** (Aadhaar, PAN, Voter ID, Passport).
  - Web3Forms API integrated with honeypot spam protection, client-side input validation, and secure `.env` access key management.

---

## 📁 Project Structure

```text
├── public/
│   ├── background/         # Video background assets
│   ├── certificates/       # Verified professional credentials
│   ├── img/                # Graphics & stickers
│   ├── seq/                # 3D WebP sequences (hat, code, skills)
│   ├── shots/              # Project showcase posters
│   └── Amit_Halder_Resume.pdf
├── src/
│   ├── bits/               # Micro-animations & custom UI components
│   ├── components/         # Reusable navigation, modals, cursors, backgrounds
│   ├── data/               # Authentic Amit Halder portfolio data & stats
│   ├── lib/                # Canvas frame rendering & frame loading utilities
│   ├── sections/           # 11 bespoke portfolio sections
│   ├── types/              # Strict TypeScript definitions
│   ├── App.tsx             # Main application orchestrator & Lenis controller
│   └── index.css           # Design tokens, typography & CSS layout
├── .env.example            # Environment variable template
├── tailwind.config.js      # Tailwind configuration with custom theme colors
└── vite.config.ts          # Vite build optimizations & chunk splitting
```

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS + PostCSS + Custom CSS tokens
- **Animations:** GSAP + ScrollTrigger + Lenis + Framer Motion
- **Icons:** Lucide React
- **Forms:** Web3Forms API
- **Deployment:** Vercel / Netlify / Cloudflare Pages ready

