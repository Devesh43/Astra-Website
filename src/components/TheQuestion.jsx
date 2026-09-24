import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function TheQuestion() {
  const { ref: r1, inView: v1 } = useInView({ triggerOnce: true, threshold: 0.4 });
  const { ref: r2, inView: v2 } = useInView({ triggerOnce: true, threshold: 0.4 });
  const { ref: r3, inView: v3 } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center py-32 overflow-hidden">

      <div ref={r1} className="mb-12">
        <span
          className="font-mono text-[11px] tracking-[0.25em] text-secondaryText uppercase transition-all duration-700"
          style={{ opacity: v1 ? 1 : 0, transform: v1 ? 'translateY(0)' : 'translateY(16px)' }}
        >
          SO WE ASKED A DIFFERENT QUESTION.
        </span>
      </div>

      <div ref={r2} className="max-w-4xl mx-auto mb-16">
        <div className="overflow-hidden">
          <h2
            className="font-space text-primaryText leading-[1.1] transition-all duration-900"
            style={{
              fontSize: 'clamp(40px, 6.5vw, 72px)',
              opacity: v2 ? 1 : 0,
              transform: v2 ? 'translateY(0)' : 'translateY(80px)',
              transitionDelay: '100ms',
            }}
          >
            What if an SOS didn't have to depend on one network?
          </h2>
        </div>
      </div>

      <div ref={r3} className="flex flex-col items-center gap-8 transition-all duration-700"
        style={{ opacity: v3 ? 1 : 0, transform: v3 ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '300ms' }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-px bg-[#1A1A1A]" />
          <span className="font-mono text-[10px] text-[#3A3A3A] tracking-[0.2em]">THE ANSWER</span>
          <div className="w-16 h-px bg-[#1A1A1A]" />
        </div>

        <button
          onClick={() => scrollTo('system')}
          className="group flex items-center gap-3 font-mono text-[12px] text-astraRed tracking-[0.2em] uppercase hover:gap-5 transition-all duration-300"
        >
          Enter ASTRA
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </section>
  );
}