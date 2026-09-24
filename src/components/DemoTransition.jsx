import React from 'react';
import { useInView } from 'react-intersection-observer';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function DemoTransition() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-20 bg-[var(--bg)] border-t border-[var(--border)] px-6 text-center transition-colors duration-250">
      <div ref={ref} className="max-w-4xl mx-auto flex flex-col items-center">
        <div
          className="font-mono text-[10px] tracking-[0.25em] text-[var(--signal-red)] uppercase mb-4 font-bold transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)' }}
        >
          / ROUTING TEST
        </div>
        
        <h2
          className="font-space text-[32px] md:text-[52px] text-[var(--text-primary)] font-bold leading-tight mb-6 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '100ms' }}
        >
          YOU'VE SEEN THE THREE PATHS.<br />
          <span className="text-[var(--signal-red)]">NOW REMOVE THEM.</span>
        </h2>

        <div
          className="mt-4 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '200ms' }}
        >
          <button
            onClick={() => scrollTo('demo')}
            className="group inline-flex items-center gap-3 font-mono text-[12px] text-white bg-[var(--signal-red)] border border-[var(--signal-red)] px-8 py-3.5 tracking-[0.2em] uppercase font-bold hover:bg-transparent hover:text-[var(--signal-red)] transition-all duration-300 shadow-md"
          >
            <span>TEST ASTRA SIMULATOR</span>
            <span className="group-hover:translate-x-1 transition-transform">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
