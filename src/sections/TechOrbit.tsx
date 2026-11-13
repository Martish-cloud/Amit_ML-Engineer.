import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { techOrbit } from '../data/profile';

export function TechOrbit() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const selectedNode = techOrbit.find((t) => t.name === activeTech);

  const getTagColor = (cat: string) => {
    switch (cat) {
      case 'AI':
        return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
      case 'Code':
        return 'text-sky-400 border-sky-500/40 bg-sky-500/10';
      case 'Automation':
        return 'text-purple-400 border-purple-500/40 bg-purple-500/10';
      case 'Data':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'Operations':
        return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      default:
        return 'text-orange-400 border-orange-500/40 bg-orange-500/10';
    }
  };

  return (
    <section className="section" id="matrix">
      <div className="section__head">
        <span className="tag">04 — Core Competencies</span>
        <span className="tag tag--dim">基盤能力</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-wider mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Node Matrix</span>
          </div>
          <h3 className="display text-3xl sm:text-5xl text-white">
            Core Competency <em className="serif">Guide</em>
          </h3>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-md">
          Select any technology node to inspect proficiency level and applied domain.
        </p>
      </div>

      <div className="matrix__grid">
        {techOrbit.map((tech) => {
          const isSelected = activeTech === tech.name;
          return (
            <button
              key={tech.name}
              onClick={() => setActiveTech(isSelected ? null : tech.name)}
              className={`matrix__card text-left ${isSelected ? 'is-active' : ''}`}
            >
              <div className="flex items-center justify-between mb-2 gap-1">
                <span className={`text-[9px] sm:text-[10px] font-mono uppercase px-1.5 sm:px-2 py-0.5 rounded border leading-none shrink-0 ${getTagColor(tech.category)}`}>
                  {tech.category}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 shrink-0">{tech.level}</span>
              </div>
              <div className="font-display font-semibold text-xs sm:text-sm md:text-base text-white leading-snug break-words">{tech.name}</div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 p-6 rounded-2xl border border-orange-500/30 bg-orange-950/20 backdrop-blur-md flex items-center justify-between flex-wrap gap-4"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <div>
                <span className="text-xs font-mono text-orange-300 font-semibold uppercase tracking-wider">
                  {selectedNode.category} Specialization · {selectedNode.level} Tier
                </span>
                <h4 className="font-display font-bold text-lg text-white">
                  {selectedNode.name}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Applied in production enterprise workflows</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export default TechOrbit;

