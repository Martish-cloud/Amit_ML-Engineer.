import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SpotlightCard from '../bits/SpotlightCard';
import { experiences } from '../data/profile';
import { portfolioImages } from '../data/assets/portfolioImages';

const sideQuests = [
  { name: 'LLM Prompt Engineering Suite', lang: 'Python', role: 'Prompt Architecture', stars: 'Core' },
  { name: 'n8n Workflow Connectors', lang: 'TypeScript / JSON', role: 'AI Automation', stars: 'Enterprise' },
  { name: 'Predictive NLP & Classification', lang: 'Python / Scikit', role: 'Applied ML', stars: 'Analytics' },
  { name: 'MRP & WIP Production Dashboard', lang: 'Power BI / SQL', role: 'Operations', stars: 'Industrial' },
];

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<'all' | 'genai' | 'operations'>('all');

  const filteredExperiences = experiences.filter((exp) => {
    if (filter === 'all') return true;
    return exp.category === filter;
  });

  useGSAP(
    () => {
      gsap.fromTo(
        '.timeline__line i',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } }
      );
      gsap.utils.toArray<HTMLElement>('.timeline__item').forEach(item => {
        gsap.from(item, {
          x: 60,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' }
        });
      });
      gsap.fromTo(
        '.exp__portrait img',
        { yPercent: 10 },
        { yPercent: -10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    },
    { scope: root, dependencies: [filter] }
  );

  const portraitSrc = (portfolioImages && portfolioImages['laptop-white.webp']) || '/img/laptop-white.webp';

  return (
    <section ref={root} className="exp section" id="experience">
      <div className="section__head">
        <span className="tag">05 — Experience</span>
        <span className="tag tag--dim">経歴</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="display exp__title mb-4">
            The path <em className="serif">so far</em>
          </h2>
          <p className="about__note max-w-xl mb-0">
            Chronological record of roles spanning Generative AI development at Intuit and Mphasis,
            along with 6+ years of rigorous industrial PPC, MRP, and ERP leadership.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`certs__filter-pill ${filter === 'all' ? 'is-active' : ''}`}
          >
            All Roles (6)
          </button>
          <button
            onClick={() => setFilter('genai')}
            className={`certs__filter-pill ${filter === 'genai' ? 'is-active' : ''}`}
          >
            GenAI &amp; ML
          </button>
          <button
            onClick={() => setFilter('operations')}
            className={`certs__filter-pill ${filter === 'operations' ? 'is-active' : ''}`}
          >
            Operations &amp; ERP
          </button>
        </div>
      </div>

      <div className="exp__grid">
        <figure className="exp__portrait">
          <img src={portraitSrc} alt="Amit Halder workstation illustration" loading="lazy" />
        </figure>

        <div>
          <ol className="timeline">
            <span className="timeline__line"><i /></span>
            {filteredExperiences.map((e) => (
              <li key={e.id} className="timeline__item">
                <SpotlightCard className="timeline__card" spotlightColor="rgba(255, 122, 26, 0.2)">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className="tag text-orange-400">{e.period}</span>
                    {e.isRemote && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        Remote
                      </span>
                    )}
                  </div>
                  <h3>{e.role}</h3>
                  <span className="timeline__org">{e.company}</span>
                  <p>{e.impactSummary}</p>
                  <ul className="chips mt-4">
                    {e.skills.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </SpotlightCard>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="more">
        <div className="section__head">
          <span className="tag">Engineering Vault</span>
          <span className="tag tag--dim">from the repository</span>
        </div>
        <ul className="repo-list">
          {sideQuests.map((r) => (
            <li key={r.name}>
              <a
                className="repo-row"
                href="https://github.com/Martish-cloud"
                target="_blank"
                rel="noreferrer"
              >
                <span className="repo-row__name">{r.name}</span>
                <span className="repo-row__lang">{r.lang}</span>
                <span className="repo-row__stars">★ {r.stars}</span>
                <span className="repo-row__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

