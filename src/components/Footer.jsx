import React from 'react';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const NAV_LINKS = [
  { label: 'Problem', id: 'problem' },
  { label: 'System', id: 'system' },
  { label: 'Simulator', id: 'demo' },
  { label: 'Status', id: 'status' },
  { label: 'Hardware', id: 'hardware' },
  { label: 'Prototype', id: 'prototype' },
  { label: 'Milestone', id: 'milestone' },
  { label: 'Research', id: 'research' },
  { label: 'Team', id: 'team' },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] transition-colors duration-250">
      <div className="max-w-[1440px] mx-auto px-6">

        {/* Main footer row */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

          {/* Left — Wordmark + tagline */}
          <div>
            <button
              onClick={() => scrollTo('hero')}
              className="font-space tracking-[0.18em] text-[16px] text-[var(--text-primary)] uppercase font-bold hover:text-[var(--signal-red)] transition-colors duration-300 mb-3 block"
            >
              ASTRA
            </button>
            <p className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed max-w-[240px]">
              One SOS. Multiple Communication Paths.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--green)]" />
              </span>
              <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-[0.2em] uppercase font-bold">
                03 Paths Demonstrated at Prototype Level
              </span>
            </div>
          </div>

          {/* Center — Nav links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right — Institution */}
          <div className="md:text-right">
            <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.15em] uppercase mb-2 font-bold">Research Institution</div>
            <div className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed">
              Department of Electronics<br />
              & Communication Engineering<br />
              <span className="text-[var(--text-primary)] font-medium">Maharaja Surajmal Institute<br />of Technology, New Delhi</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-[0.15em]">
            © 2026 ASTRA PROJECT · RESEARCH PROTOTYPE · NOT A COMMERCIAL PRODUCT
          </div>
          <div className="font-mono text-[9px] text-[var(--text-muted)] tracking-[0.12em]">
            SELECTED FOR UNIVERSITY INNOVATION & INCUBATION FUNDING
          </div>
        </div>
      </div>
    </footer>
  );
}