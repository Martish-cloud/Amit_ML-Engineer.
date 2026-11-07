import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollVelocity from '../bits/ScrollVelocity';
import { drawCover, framePaths, loadFrames, nearestLoaded } from '../lib/frames';
import { skillFrames } from '../data/assets/skillFrames';

const FRAMES = skillFrames && skillFrames.length > 0 ? skillFrames : framePaths('/seq/skills', 61);

const amitSkills = [
  'Large Language Models (LLMs)',
  'Prompt Engineering (Few-Shot / Zero-Shot)',
  'Model Fine-Tuning & Evaluation',
  'Natural Language Processing (NLP)',
  'Python for Data Science & ML',
  'AI Workflow Automation & n8n',
  'REST API Integration & Orchestration',
  'SQL Querying & Data Extraction',
  'Power BI Executive Dashboards',
  'ERP Systems Implementation',
  'Material Requirements Planning (MRP)',
  'Work-in-Progress (WIP) Tracking'
];

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frame = useRef({ i: 0 });

  useEffect(() => {
    images.current = loadFrames(FRAMES);
    const first = images.current[0];
    if (first) {
      if (first.complete) {
        if (canvas.current) drawCover(canvas.current, first);
      } else {
        first.addEventListener('load', () => canvas.current && drawCover(canvas.current, first));
      }
    }
  }, []);

  useGSAP(
    () => {
      const draw = () =>
        canvas.current && drawCover(canvas.current, nearestLoaded(images.current, Math.round(frame.current.i)));
      const items = gsap.utils.toArray<HTMLElement>('.skills__list li');

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.skills__pin',
          start: 'top top',
          end: '+=220%',
          scrub: 0.5,
          pin: true,
          onUpdate: self => {
            const lit = Math.floor(self.progress * (items.length + 0.5));
            items.forEach((li, k) => li.classList.toggle('is-lit', k < lit));
          }
        }
      });
      tl.to(frame.current, { i: FRAMES.length - 1, duration: 1, onUpdate: draw }, 0)
        .fromTo('.skills__frame', { scale: 0.82, rotate: -2 }, { scale: 1, rotate: 0, duration: 0.5 }, 0)
        .fromTo('.skills__frame-glow', { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
    },
    { scope: root }
  );

  return (
    <section ref={root} className="skills" id="skills">
      <div className="skills__pin">
        <div className="section__head">
          <span className="tag">04 — Jutsu Arsenal</span>
          <span className="tag tag--dim">技術術</span>
        </div>
        <div className="skills__grid">
          <div className="skills__frame">
            <div className="skills__frame-glow" />
            <canvas ref={canvas} aria-label="3D animated sequence of summoning the technical skill arsenal" />
          </div>
          <div className="skills__side">
            <h2 className="display skills__title">
              Summoning <em className="serif">the AI stack</em>
            </h2>
            <ol className="skills__list">
              {amitSkills.map((s, i) => (
                <li key={s}>
                  <span className="skills__idx">{String(i + 1).padStart(2, '0')}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="skills__marquee">
        <ScrollVelocity
          texts={[
            'LLMs ✦ Prompt Engineering ✦ Python ✦ Model Fine-Tuning ✦ NLP ✦ ',
            'n8n Automation ✦ REST APIs ✦ SQL ✦ Power BI ✦ ERP Systems ✦ AI Automation ✦ '
          ]}
          velocity={60}
          className="marquee-text"
          outlineAlternate
          numCopies={6}
        />
      </div>
    </section>
  );
}

