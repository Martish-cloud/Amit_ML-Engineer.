import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ClickSpark from './bits/ClickSpark';
import ScrollVelocity from './bits/ScrollVelocity';
import Navbar from './components/Navbar';
import Intro from './sections/Intro';
import About from './sections/About';
import CareerEvolution from './sections/CareerEvolution';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import TechOrbit from './sections/TechOrbit';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Inquiry from './sections/Inquiry';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('is-loading');
    if (reduce) {
      document.documentElement.classList.remove('is-loading');
      return;
    }
    const l = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
    l.stop();
    lenis.current = l;
    l.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
    };
  }, []);

  const onReady = useCallback(() => {
    document.documentElement.classList.remove('is-loading');
    lenis.current?.start();
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // Smooth in-page anchor jumps through Lenis
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      if (lenis.current) {
        e.preventDefault();
        lenis.current.scrollTo(href, { duration: 1.4 });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <ClickSpark sparkColor={['#ff7a1a', '#ffd7a8', '#e2383f']} sparkCount={10} sparkRadius={26} sparkSize={12} shape="star">
      <div className="grain" aria-hidden="true" />
      <Navbar />

      <main>
        <Intro onReady={onReady} />
        <div className="ribbon">
          <ScrollVelocity
            texts={[
              'Mr. Amit Haldar ✦ GenAI Developer ✦ Machine Learning Engineer ✦ Production AI Systems ✦ ',
              'Prompt Architecture ✦ LLM Workflows ✦ n8n Automation ✦ Industrial Operations ✦ '
            ]}
            velocity={70}
            className="marquee-text"
            outlineAlternate
            numCopies={6}
          />
        </div>
        <About />
        <CareerEvolution />
        <Projects />
        <Skills />
        <TechOrbit />
        <Experience />
        <Education />
        <Certifications />
        <Inquiry />
        <Contact />
      </main>
    </ClickSpark>
  );
}
export default App;

