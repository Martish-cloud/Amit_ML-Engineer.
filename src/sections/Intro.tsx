import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Download, Bot, ArrowDown, ExternalLink } from 'lucide-react';
import Particles from '../bits/Particles';
import RotatingText from '../bits/RotatingText';
import { drawCover, framePaths, loadFrames, nearestLoaded } from '../lib/frames';
import { personalInfo } from '../data/profile';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAMES = framePaths('/seq/hat', 70);

export default function Intro({ onReady }: { onReady: () => void }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ i: 0 });
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    images.current = loadFrames(FRAMES, p => {
      setProgress(p);
      if (p >= 1) setLoaded(true);
    });
    const first = images.current[0];
    if (first) {
      if (first.complete) {
        if (canvas.current) drawCover(canvas.current, first);
      } else {
        first.addEventListener('load', () => canvas.current && drawCover(canvas.current, first));
      }
    }
    const onResize = () =>
      canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Preloader exit sequence
  useGSAP(
    () => {
      if (!loaded) return;
      const tl = gsap.timeline({ onComplete: onReady });
      tl.to('.preloader__count', { yPercent: -110, duration: 0.6, ease: 'power3.in' })
        .to('.preloader', { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=0.1')
        .from('.intro__stage', { scale: 1.25, filter: 'blur(12px)', duration: 1.6, ease: 'expo.out' }, '-=0.6')
        .from('.intro__chrome > *', { opacity: 0, y: 16, stagger: 0.08, duration: 0.8, ease: 'power3.out' }, '-=1.1');
    },
    { dependencies: [loaded], scope: root }
  );

  useGSAP(
    () => {
      const draw = () =>
        canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=260%', scrub: 0.6, pin: true }
      });
      tl.to(frame.current, { i: FRAMES.length - 1, duration: 1, onUpdate: draw }, 0)
        .to('.intro__stage', { scale: 1, duration: 1 }, 0)
        .to('.intro__hint', { opacity: 0, y: 20, duration: 0.12 }, 0)
        .to('.intro__kanji', { yPercent: -40, duration: 1 }, 0)
        .from('.intro__name span', { yPercent: 120, rotate: 6, opacity: 0, stagger: 0.08, duration: 0.35, ease: 'power3.out' }, 0.5)
        .from('.intro__sub', { opacity: 0, y: 30, duration: 0.25 }, 0.72)
        .from('.intro__actions', { opacity: 0, y: 20, duration: 0.25 }, 0.85)
        .to('.intro__veil', { opacity: 0.6, duration: 0.3 }, 0.55);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="intro" id="home">
      <div className="intro__stage">
        <canvas ref={canvas} className="intro__canvas" aria-label="Animated 3D portrait of Mr. Amit Haldar lifting his hat" />
      </div>
      <div className="intro__veil" />
      <div className="intro__particles">
        <Particles
          particleCount={110}
          particleColors={['#ffffff', '#ff7a1a', '#ffd7a8']}
          particleSpread={12}
          speed={0.06}
          particleBaseSize={60}
          shape="sparkle"
          glow={0.1}
          twinkle={0.7}
          drift="up"
          driftSpeed={0.4}
          clickBurst={false}
          disableRotation
        />
      </div>

      <div className="intro__chrome">
        <span className="tag intro__tl">Portfolio · 2026</span>
        <span className="tag intro__tr">Kolkata, IN · 22.57°N</span>
        <span className="intro__kanji" aria-hidden="true">麦わらのエンジニア</span>
        <div className="intro__hint">
          <span className="tag">Scroll to lift the hat</span>
          <span className="intro__hint-line" />
        </div>
      </div>

      <h1 className="intro__name" aria-label="Mr. Amit Haldar">
        <span>Mr. Amit</span>
        <span>Haldar</span>
      </h1>

      <div className="intro__sub">
        <span className="serif">GenAI Developer &amp; Machine Learning Engineer —</span>
        <span className="intro__rot">
          crafting{' '}
          <RotatingText
            texts={[
              'production LLM workflows',
              'intelligent enterprise agents',
              'scalable prompt architectures',
              'data-driven AI systems',
              'high-throughput ML pipelines'
            ]}
            mainClassName="rot-pill"
            staggerDuration={0.02}
            staggerFrom="last"
            rotationInterval={2400}
            effect="slide"
            animatePresenceMode="sync"
            animatePresenceInitial
          />
        </span>

        {/* Hero Quick Action Buttons */}
        <div className="intro__actions flex items-center justify-center gap-3 mt-4 flex-wrap z-10 pointer-events-auto">
          <a href="#inquiry" className="btn btn--orange text-xs py-2.5 px-5">
            <span>Start a Project</span>
            <Bot className="w-3.5 h-3.5" />
          </a>
          <a
            href={personalInfo.resumeUrl}
            download="Amit_Halder_Resume.pdf"
            className="btn btn--red text-xs py-2.5 px-5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="tag py-2.5 px-4 rounded-full border border-white/20 hover:border-orange-400 text-xs transition-colors bg-black/40 backdrop-blur-md"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-orange-400" />
          </a>
          <a
            href="#skills"
            className="tag py-2.5 px-4 rounded-full border border-white/20 hover:border-orange-400 text-xs transition-colors bg-black/40 backdrop-blur-md"
          >
            <span>Explore Stack</span>
            <ArrowDown className="w-3 h-3 text-orange-400" />
          </a>
        </div>
      </div>

      <div className="preloader" aria-hidden={loaded}>
        <div className="preloader__inner">
          <span className="preloader__kanji">知</span>
          <div className="preloader__count">
            {String(Math.round(progress * 100)).padStart(3, '0')}
            <small>%</small>
          </div>
          <span className="tag">Initializing 3D neural workspace…</span>
        </div>
        <div className="preloader__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </section>
  );
}

