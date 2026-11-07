import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Factory, Database, Sparkles, BrainCircuit } from 'lucide-react';
import { evolutionStages } from '../data/profile';

const renderStageIcon = (idx: number) => {
  switch (idx) {
    case 0: return <Factory className="w-5 h-5 text-amber-400" />;
    case 1: return <Database className="w-5 h-5 text-sky-400" />;
    case 2: return <Sparkles className="w-5 h-5 text-emerald-400" />;
    case 3: return <BrainCircuit className="w-5 h-5 text-rose-400" />;
    default: return <Sparkles className="w-5 h-5 text-orange-400" />;
  }
};

export function CareerEvolution() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.traj__card', {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section" id="journey">
      <div className="section__head">
        <span className="tag">02 — Trajectory</span>
        <span className="tag tag--dim">進化の道</span>
      </div>

      <div className="mb-12">
        <h2 className="display text-4xl sm:text-6xl max-w-4xl mb-4">
          The Operational Foundation <em className="serif">meets Frontier AI</em>
        </h2>
        <p className="about__note max-w-3xl">
          How 6+ years of shopfloor discipline, ERP data accuracy, and material requirements planning
          evolved into engineering resilient enterprise Generative AI and Machine Learning systems.
        </p>
      </div>

      <div className="traj__grid">
        {evolutionStages.map((stage, idx) => (
          <article key={stage.step} className="traj__card">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {renderStageIcon(idx)}
                </div>
                <span className="traj__step">{stage.step}</span>
              </div>

              <span className="tag text-[10px] text-orange-400 mb-2">
                {stage.timeframe} · {stage.domain}
              </span>
              <h3 className="font-display font-bold text-lg text-white mb-3">
                {stage.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                {stage.description}
              </p>
            </div>

            <ul className="chips">
              {stage.capabilities.map((cap) => (
                <li key={cap}>{cap}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export default CareerEvolution;

