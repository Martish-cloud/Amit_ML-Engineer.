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
        y: 24,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: root.current, start: 'top 90%' }
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

      <div className="mb-8">
        <h2 className="display text-4xl sm:text-6xl max-w-4xl mb-3">
          Foundation <em className="serif">Meets Frontier AI</em>
        </h2>
        <p className="about__note max-w-3xl mb-0">
          How 4+ years of shopfloor discipline, ERP data accuracy, and material requirements planning
          evolved into engineering resilient enterprise Generative AI and Machine Learning systems.
        </p>
      </div>

      <div className="traj__grid">
        {evolutionStages.map((stage, idx) => (
          <article key={stage.step} className="traj__card">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shadow-sm">
                  {renderStageIcon(idx)}
                </div>
                <span className="traj__step">{stage.step}</span>
              </div>

              <span className="tag text-[10px] text-orange-300 bg-orange-950/40 border border-orange-500/30 px-2.5 py-0.5 rounded-full mb-3 inline-block font-mono">
                {stage.timeframe} · {stage.domain}
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
                {stage.title}
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed mb-6 font-sans">
                {stage.description}
              </p>
            </div>

            <ul className="chips">
              {stage.capabilities.map((cap) => (
                <li key={cap} className="text-slate-100 bg-white/8 border border-white/12">{cap}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
export default CareerEvolution;

