import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, Shield, Eye, Award } from 'lucide-react';
import { certifications } from '../data/profile';
import type { CertificationItem } from '../types';
import { ImageLightboxModal } from '../components/ImageLightboxModal';
import { certificateImages } from '../data/assets/certificateImages';

const categories = [
  'All',
  'AI & GenAI',
  'Data & Analytics',
  'Automation & Dev',
  'Productivity & Languages',
  'Business / Management',
] as const;

type Direction = 'next' | 'prev';

export const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>('next');
  const [modalCert, setModalCert] = useState<CertificationItem | null>(null);
  const prefersReduced = useReducedMotion();

  // Preload all certificate images into browser memory immediately
  useEffect(() => {
    certifications.forEach((c) => {
      if (c.image) {
        const fileKey = c.image.replace('/certificates/', '');
        const src = (certificateImages && certificateImages[fileKey]) || c.image;
        const img = new Image();
        img.decoding = 'async';
        img.src = src;
      }
    });
  }, []);

  const filteredCerts = certifications.filter((cert) =>
    selectedCategory === 'All' ? true : cert.category === selectedCategory
  );

  const totalCerts = filteredCerts.length;
  const currentCert = filteredCerts[currentIndex];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentIndex(0);
    setDirection('next');
  };

  const goNext = useCallback(() => {
    if (currentIndex < totalCerts - 1) {
      setDirection('next');
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalCerts]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalCert) return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, modalCert]);

  // Resolves certificate image source (in-memory data URI or public path)
  const resolveCertImage = (imagePath?: string): string => {
    if (!imagePath) return '';
    const fileKey = imagePath.replace('/certificates/', '');
    return (certificateImages && certificateImages[fileKey]) || imagePath;
  };

  const currentImageSrc = currentCert?.image ? resolveCertImage(currentCert.image) : '';

  // Ultra-fast transition variants (180ms)
  const variants = {
    enter: (dir: Direction) => ({
      x: prefersReduced ? 0 : dir === 'next' ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: prefersReduced ? 0.1 : 0.18, ease: [0.2, 0.8, 0.2, 1] as const },
    },
    exit: (dir: Direction) => ({
      x: prefersReduced ? 0 : dir === 'next' ? -40 : 40,
      opacity: 0,
      transition: { duration: prefersReduced ? 0.08 : 0.15, ease: [0.2, 0.8, 0.2, 1] as const },
    }),
  };

  return (
    <section id="certifications" className="certs section">
      <div className="section__head">
        <span className="tag">07 — Verified Credentials</span>
        <span className="tag tag--dim">認定資格</span>
      </div>

      <div className="certs__header flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="display certs__title">
            Verified <em className="serif">Certifications</em>
          </h2>
          <p className="about__note max-w-xl mb-0">
            Formal technical credentials issued by Qualcomm, Anthropic, IBM, Deloitte, Simplilearn, UniAthena, and partner institutions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="certs__filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`certs__filter-pill ${selectedCategory === cat ? 'is-active' : ''}`}
            >
              {cat}
              {cat === 'All' ? ` (${certifications.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Book Dossier Container */}
      <div className="certs__book">
        {/* Left Dossier Spine */}
        <div className="certs__spine">
          <div>
            <span className="tag certs__dossier-tag mb-4">Professional Dossier</span>
            <h3 className="display text-2xl sm:text-3xl text-white mb-2 leading-tight">
              MR. AMIT HALDAR
            </h3>
            <p className="font-mono text-xs text-slate-400 mb-6">
              Verified Technical Archives
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/40 bg-orange-950/30 text-xs font-mono text-orange-300 font-semibold mb-6 max-w-full">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>{selectedCategory === 'All' ? 'All Credentials' : selectedCategory}</span>
            </div>
          </div>

          <div>
            <div className="font-mono text-2xl font-bold text-orange-400 mb-1">
              {String(currentIndex + 1).padStart(2, '0')}
              <span className="text-sm text-slate-500 font-normal"> / {String(totalCerts).padStart(2, '0')}</span>
            </div>
            <p className="text-[11px] font-mono text-slate-500">
              Use arrow buttons or keyboard &larr; &rarr; to navigate instantly.
            </p>
          </div>
        </div>

        {/* Right Certificate Display */}
        <div className="certs__page">
          <AnimatePresence mode="popLayout" custom={direction} initial={false}>
            {currentCert && (
              <motion.div
                key={`${selectedCategory}-${currentCert.id}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col justify-between h-full min-w-0 w-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="tag text-xs text-orange-400">
                      <Shield className="w-3.5 h-3.5" />
                      {currentCert.provider}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                      {currentCert.category}
                    </span>
                  </div>

                  <h3 className="display text-xl sm:text-3xl text-white mb-2 leading-snug break-words">
                    {currentCert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verified Credential · Issued by {currentCert.provider}</span>
                  </div>

                  {currentImageSrc ? (
                    <div
                      className="certs__preview-box"
                      onClick={() => setModalCert(currentCert)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setModalCert(currentCert)}
                      aria-label={`View full certificate for ${currentCert.title}`}
                    >
                      <img
                        src={currentImageSrc}
                        alt={`${currentCert.title} certificate`}
                        loading="eager"
                        decoding="async"
                        className="certs__preview-img"
                      />
                      <div className="certs__preview-overlay">
                        <span className="tag text-xs text-white bg-black/70 py-2 px-4 rounded-full border border-orange-400">
                          <Eye className="w-4 h-4 text-orange-400 mr-2" />
                          Inspect Full Size
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center my-6">
                      <Award className="w-8 h-8 text-orange-400 mx-auto mb-2 opacity-60" />
                      <p className="font-mono text-xs text-slate-400">
                        Formal verification verified on file by {currentCert.provider}.
                      </p>
                    </div>
                  )}
                </div>

                {/* Instant Navigation Footer */}
                <div className="certs__nav-controls">
                  <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="certs__arrow-btn"
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="w-4 h-4 shrink-0" />
                    <span>Previous</span>
                  </button>

                  {currentImageSrc && (
                    <button
                      onClick={() => setModalCert(currentCert)}
                      className="certs__full-btn tag text-xs text-orange-400 hover:text-white transition-colors cursor-pointer"
                      aria-label="View full certificate"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1 shrink-0" />
                      <span>Full Certificate</span>
                    </button>
                  )}

                  <button
                    onClick={goNext}
                    disabled={currentIndex === totalCerts - 1}
                    className="certs__arrow-btn"
                    aria-label="Next certificate"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalCert && (
        <ImageLightboxModal
          isOpen={!!modalCert}
          onClose={() => setModalCert(null)}
          title={modalCert.title}
          category={modalCert.category}
          badge={modalCert.provider}
          imageSrc={resolveCertImage(modalCert.image)}
          altText={`${modalCert.title} certificate`}
        />
      )}
    </section>
  );
};
export default Certifications;

