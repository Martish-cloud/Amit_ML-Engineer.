import React, { useState, useEffect } from 'react';
import { Menu, X, Bot } from 'lucide-react';
import { personalInfo } from '../data/profile';

const NAV = [
  ['About', '#about'],
  ['Journey', '#journey'],
  ['Work', '#work'],
  ['Stack', '#skills'],
  ['Experience', '#experience'],
  ['Education', '#education'],
  ['Credentials', '#certifications'],
  ['Contact', '#contact']
];

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a href="#home" className="nav__logo">
          <span className="nav__mark">AH</span>
          <span>{personalInfo.name.toLowerCase().replace(' ', '')}.ai</span>
        </a>

        <nav>
          {NAV.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a className="nav__cta hidden sm:inline-flex" href="#inquiry">
            <span>Hire me</span>
            <Bot className="w-3.5 h-3.5 ml-1 inline text-orange-400" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080c]/95 backdrop-blur-xl flex flex-col justify-center items-center gap-6 p-8 sm:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <span className="nav__mark text-xl w-12 h-12 mb-4">AH</span>

          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="display text-2xl text-white/90 hover:text-orange-400 transition-colors"
            >
              {label}
            </a>
          ))}

          <a
            href="#inquiry"
            onClick={() => setMobileOpen(false)}
            className="btn btn--orange text-sm mt-4 py-3 px-8"
          >
            Start a Project
          </a>
        </div>
      )}
    </>
  );
};
export default Navbar;

