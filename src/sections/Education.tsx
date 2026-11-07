import { GraduationCap, BookOpen, Globe } from 'lucide-react';
import { education, languages } from '../data/profile';

export function Education() {
  return (
    <section className="section" id="education">
      <div className="section__head">
        <span className="tag">06 — Academic &amp; Linguistic Profile</span>
        <span className="tag tag--dim">学問と言語</span>
      </div>

      <div className="mb-12">
        <h2 className="display text-3xl sm:text-5xl text-white mb-4">
          Academic Foundations <em className="serif">&amp; Languages</em>
        </h2>
        <p className="about__note max-w-2xl">
          Formal university education, specialized linguistic curriculum, and multilingual capabilities
          spanning 6 regional and international languages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Education column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-orange-400 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Formal Academic Credentials</span>
          </div>

          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-orange-500/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{edu.degree}</h3>
                    <p className="text-xs font-mono text-slate-400">{edu.institution}</p>
                  </div>
                </div>
                {edu.status && (
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-orange-950/40 text-orange-300 border border-orange-500/40 font-semibold shrink-0">
                    {edu.status}
                  </span>
                )}
              </div>
              {edu.period && (
                <div className="mt-3 text-xs font-mono text-slate-500">Timeline: {edu.period}</div>
              )}
              {edu.field && (
                <div className="mt-1 text-xs text-slate-300">Focus: {edu.field}</div>
              )}
            </div>
          ))}
        </div>

        {/* Languages column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-orange-400 uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            <span>Linguistic Fluency (6 Languages)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <div
                key={lang.language}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm text-white">{lang.language}</span>
                  {lang.nativeName && (
                    <span className="font-serif italic text-xs text-orange-400">{lang.nativeName}</span>
                  )}
                </div>
                <div className="text-[11px] font-mono text-slate-400">{lang.levelCode}</div>
                <div className="text-[10px] text-slate-500 mt-1">{lang.proficiency}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Education;

