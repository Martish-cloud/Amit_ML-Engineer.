import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import ScrollFloat from '../bits/ScrollFloat';
import Magnet from '../bits/Magnet';
import GradientText from '../bits/GradientText';
import { personalInfo, socials } from '../data/profile';
import { portfolioImages } from '../data/assets/portfolioImages';
import ghostAndPrice from '../Images/Image 2.png';

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.contact__art',
        { yPercent: 20, scale: 0.9 },
        { yPercent: -5, scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } }
      );
      gsap.fromTo(
        '.contact__ring',
        { scale: 0.4, opacity: 0 },
        { scale: 1.1, opacity: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: true } }
      );
    },
    { scope: root }
  );

  const runnerSrc = (portfolioImages && portfolioImages['naruto-sticker.gif']) || '/img/naruto-sticker.gif';

  return (
    <section ref={root} className="contact" id="contact">
      <div className="contact__ring" aria-hidden="true" />
      <div className="section__head">
        <span className="tag">09 — Direct Contact</span>
        <span className="tag tag--dim">連絡</span>
      </div>

      <ScrollFloat containerClassName="contact__float" textClassName="contact__float-text" stagger={0.02} distance={90}>
        Let's build something
      </ScrollFloat>
      <h2 className="display contact__big">
        <GradientText colors={['#ff7a1a', '#e2383f', '#c77dff', '#ff7a1a']} animationSpeed={6}>
          legendary.
        </GradientText>
      </h2>

      <div className="contact__grid">
        <div className="contact__cta">
          <p className="contact__lede">
            Available for full-time GenAI &amp; Machine Learning roles, high-impact consulting, and workflow automation partnerships.
            Direct lines are always open.
          </p>

          <Magnet padding={100} magnetStrength={2.5}>
            <a className="btn btn--orange" href={`mailto:${personalInfo.email}`}>
              <Mail className="w-4 h-4 mr-1" />
              <span>{personalInfo.email}</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </Magnet>

          <div className="flex flex-col gap-2 font-mono text-xs text-slate-300 mt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <a href={`tel:${personalInfo.phoneRaw}`} className="hover:text-white transition-colors">
                {personalInfo.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap mt-2">
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
              className="tag py-2.5 px-5 rounded-full border border-white/20 hover:border-orange-400 text-xs transition-colors"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
            </a>
          </div>

          <ul className="socials mt-4">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-u">
                  {s.label} &nearr;
                </a>
              </li>
            ))}
          </ul>
        </div>

        <img
          className="contact__art"
          src={ghostAndPrice}
          alt="Ghost and Captain Price - Call of Duty"
          loading="lazy"
        />
      </div>

      <footer className="footer">
        <img src={runnerSrc} alt="" className="footer__runner" />
        <span>&copy; {new Date().getFullYear()} Mr. Amit Haldar</span>
        <span className="serif">Dattebayo — keep engineering, keep growing.</span>
        <a href="#home" className="link-u">Back to top &uarr;</a>
      </footer>
    </section>
  );
}

