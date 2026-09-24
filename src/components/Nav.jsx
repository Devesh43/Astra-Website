import React, { useEffect, useState } from 'react';

const navLinks = [
  { label: 'PROBLEM', id: 'problem' },
  { label: 'SYSTEM', id: 'system' },
  { label: 'SIMULATOR', id: 'demo' },
  { label: 'HARDWARE', id: 'hardware' },
  { label: 'PROTOTYPE', id: 'prototype' },
  { label: 'RESEARCH', id: 'research' },
  { label: 'TEAM', id: 'team' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('astra-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('astra-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollTo(id), menuOpen ? 350 : 0);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-space tracking-[0.18em] text-[17px] text-[var(--text-primary)] uppercase font-bold hover:text-[var(--signal-red)] transition-colors duration-300 flex items-center gap-2"
          >
            ASTRA
            <span className="text-[9px] font-mono border border-[var(--border)] px-1.5 py-0.5 text-[var(--text-muted)] rounded-xs">P01</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--signal-red)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 border border-[var(--border)] rounded-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all duration-200 ml-1"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => handleNavClick('demo')}
              className="border border-[var(--signal-red)] text-[var(--signal-red)] px-3.5 py-2 text-[10px] font-mono tracking-[0.15em] uppercase hover:bg-[var(--signal-red)] hover:text-white transition-all duration-300 ml-1 font-bold"
            >
              TEST DEMO
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 border border-[var(--border)] rounded-sm text-[var(--text-secondary)]"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 relative"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className={`block w-6 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-[5px]' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? 'w-0 opacity-0' : 'w-6'
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-[var(--bg)] z-40 flex flex-col items-center justify-center gap-6 transition-all duration-400 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.id)}
            className="font-space text-[22px] tracking-[0.12em] uppercase text-[var(--text-primary)] hover:text-[var(--signal-red)] transition-colors duration-200"
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => handleNavClick('demo')}
          className="border border-[var(--signal-red)] text-[var(--signal-red)] px-8 py-3 text-[12px] font-mono tracking-widest uppercase hover:bg-[var(--signal-red)] hover:text-white transition-all duration-300 mt-2 font-bold"
        >
          TEST INTERACTIVE DEMO
        </button>
      </div>
    </>
  );
}