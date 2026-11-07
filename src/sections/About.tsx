import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Download, ExternalLink, Bot } from 'lucide-react';
import BlurText from '../bits/BlurText';
import CountUp from '../bits/CountUp';
import CircularText from '../bits/CircularText';
import SplitText from '../bits/SplitText';
import { drawCover, framePaths, loadFrames } from '../lib/frames';
import { personalInfo, profileStats } from '../data/profile';

const CODE = framePaths('/seq/code', 20);

function CodeLoop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const imgs = loadFrames(CODE);
    let i = 0;
    let dir = 1;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (!visible || !ref.current) return;
      drawCover(ref.current, imgs[i]);
      if (i + dir < 0 || i + dir >= imgs.length) dir *= -1;
      i += dir;
    }, 90);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, []);
  return <canvas ref={ref} className="about__canvas" aria-label="Amit Halder coding models and workflows on laptop" />;
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.about__media',
        { clipPath: 'inset(18% 18% 18% 18% round 28px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round(28px))',
          ease: 'none',
          scrollTrigger: { trigger: '.about__media', start: 'top 90%', end: 'top 30%', scrub: true }
        }
      );
      gsap.to('.about__canvas', {
        yPercent: -10,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      gsap.to('.about__badge', {
        y: -120,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="about section" id="about">
      <div className="section__head">
        <span className="tag">01 — About</span>
        <span className="tag tag--dim">自己紹介</span>
      </div>
      <div className="about__grid">
        <div className="about__media-wrap">
          <div className="about__media">
            <CodeLoop />
          </div>
          <div className="about__badge">
            <CircularText
              text="OPEN TO AI ROLES ✦ COLLABS ✦ GENAI & ML ✦ "
              size={150}
              fontSize={12}
              fontWeight={600}
              letterSpacing={2}
              spinDuration={18}
              color="#f3efe6"
            >
              <span className="about__badge-core">⚡</span>
            </CircularText>
          </div>
        </div>

        <div className="about__copy">
          <SplitText
            tag="h2"
            text="I don't just prompt AI. I architect production systems."
            className="display about__title"
            splitType="words"
            effect="rise"
            mask
            delay={60}
            duration={1}
            textAlign="left"
          />
          <BlurText
            text={personalInfo.summary}
            className="about__bio"
            animateBy="words"
            delay={30}
            stepDuration={0.25}
          />
          <p className="about__note">
            Specialized in <b>few-shot / zero-shot prompt engineering</b>, fine-tuning, and <b>n8n automated workflows</b>.
            I bridge the gap between high-stakes business operations (MRP, WIP management, and ERP data fidelity) and frontier
            Generative AI architectures.
          </p>

          <dl className="stats">
            <div>
              <dt>GenAI &amp; ML</dt>
              <dd>
                <CountUp to={profileStats.genaiYears} duration={2.2} />+ yrs
              </dd>
            </div>
            <div>
              <dt>Operations &amp; ERP</dt>
              <dd>
                <CountUp to={profileStats.opsYears} duration={2.2} />+ yrs
              </dd>
            </div>
            <div>
              <dt>Certifications</dt>
              <dd>
                <CountUp to={profileStats.certs} duration={1.6} />+
              </dd>
            </div>
          </dl>

          <div className="flex items-center gap-4 mt-8 flex-wrap">
            <a
              href={personalInfo.resumeUrl}
              download="Amit_Halder_Resume.pdf"
              className="btn btn--orange text-xs py-3 px-6"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--red text-xs py-3 px-6"
            >
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="#inquiry" className="tag py-3 px-5 rounded-full border border-white/20 hover:border-orange-400 transition-colors">
              <Bot className="w-3.5 h-3.5 text-orange-400" />
              <span>Start a Project</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

