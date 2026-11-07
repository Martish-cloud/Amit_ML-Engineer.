import { useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import TiltedCard from '../bits/TiltedCard';
import { projects } from '../data/profile';
import { projectShots } from '../data/assets/projectShots';
import killo1 from '../Images/Kiloo/1.png';
import killo2 from '../Images/Kiloo/2.png';
import killo3 from '../Images/Kiloo/3.png';
import killo4 from '../Images/Kiloo/4.png';
import killo5 from '../Images/Kiloo/5.png';
import killo6 from '../Images/Kiloo/6.png';

const killoImages: string[] = [killo1, killo2, killo3, killo4, killo5, killo6];

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el) return;
      const distance = () => el.scrollWidth - window.innerWidth;

      const scroll = gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: self => gsap.set('.projects__progress i', { scaleX: self.progress })
        }
      });

      // Parallax inside the horizontal track
      gsap.utils.toArray<HTMLElement>('.panel').forEach(panel => {
        const st = { trigger: panel, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true };
        const kanji = panel.querySelector('.panel__kanji');
        const num = panel.querySelector('.panel__num');
        if (kanji) gsap.fromTo(kanji, { xPercent: 40 }, { xPercent: -60, ease: 'none', scrollTrigger: st });
        if (num) gsap.fromTo(num, { xPercent: -30 }, { xPercent: 30, ease: 'none', scrollTrigger: st });
        const info = panel.querySelectorAll('.panel__info > *');
        if (info.length > 0) {
          gsap.from(info, {
            y: 50,
            opacity: 0,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left 75%', toggleActions: 'play none none reverse' }
          });
        }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="projects" id="work">
      <div className="projects__progress"><i /></div>
      <div ref={track} className="projects__track">
        <div className="panel panel--intro">
          <span className="tag">03 — Selected Work</span>
          <h2 className="display projects__title">
            Engineered
            <br />
            <em className="serif">missions</em>
          </h2>
          <p className="projects__lede">
            Enterprise Generative AI pipelines, production LLM chatbots, autonomous n8n workflows, and industrial ERP data analytics — scroll sideways.
          </p>
          <span className="projects__arrow" aria-hidden="true">⟶</span>
        </div>

        {projects.map((p, i) => {
          const shotSrc = killoImages[i] || (projectShots && projectShots[p.shotKey]) || `/shots/${p.shotKey}`;
          return (
            <article key={p.repo} className="panel" style={{ '--accent': p.accent } as CSSProperties}>
              <span className="panel__kanji" aria-hidden="true">{p.kanji}</span>
              <span className="panel__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="panel__card">
                <TiltedCard
                  imageSrc={shotSrc}
                  altText={`${p.title} project visualization`}
                  containerHeight="var(--card-h)"
                  containerWidth="var(--card-w)"
                  imageHeight="var(--card-h)"
                  imageWidth="var(--card-w)"
                  rotateAmplitude={8}
                  scaleOnHover={1.03}
                  showTooltip={false}
                  flipOnClick={false}
                  glare={0.35}
                  radius={18}
                  onClick={() => p.live && window.open(p.live, '_blank', 'noopener')}
                />
              </div>
              <div className="panel__info">
                <span className="tag" style={{ color: p.accent }}>
                  {p.client ? `● ${p.client}` : '★ Production Verified'} · {p.stack.slice(0, 3).join(' · ')}
                </span>
                <h3 className="panel__title">{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="panel__links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="link-u">
                      Live Overview ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="link-u">
                      GitHub Source ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}

        <div className="panel panel--outro">
          <a href="https://github.com/Martish-cloud" target="_blank" rel="noreferrer" className="outro-link">
            <span className="tag">GitHub Profile · Mr. Amit Haldar</span>
            <span className="display">
              View all<br />repositories ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

