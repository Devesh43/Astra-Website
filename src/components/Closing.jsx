import React from 'react';
import { useInView } from 'react-intersection-observer';

function SignalLine() {
  return (
    <div className="flex items-center justify-center gap-4 font-mono text-[12px] text-[var(--text-secondary)] tracking-widest select-none">
      <span className="text-[var(--text-primary)] font-bold">ASTRA</span>

      {/* Pulsing dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--signal-red)] opacity-60" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--signal-red)]"
          style={{ boxShadow: '0 0 8px 2px rgba(204,43,43,0.5)' }} />
      </span>

      {/* Animated track */}
      <div className="flex-1 max-w-[200px] md:max-w-[320px] h-px bg-[var(--border)] relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[var(--signal-red)] to-[var(--signal-red)]"
          style={{
            width: '45%',
            animation: 'signalTravel 3s ease-in-out infinite',
          }}
        />
      </div>

      <span className="text-[var(--signal-red)] font-bold">HELP</span>

      <style>{`
        @keyframes signalTravel {
          0%   { transform: translateX(-120%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(280%); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Closing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-[var(--bg)] relative overflow-hidden transition-colors duration-250 border-t border-[var(--border)]">

      {/* Subtle radial bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(204,43,43,0.05) 0%, transparent 100%)',
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-40 pointer-events-none" />

      <div ref={ref} className="relative z-10 flex flex-col items-center">
        {/* ASTRA label */}
        <div
          className="font-space text-[13px] tracking-[0.3em] text-[var(--text-muted)] mb-12 uppercase font-bold transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '0ms' }}
        >
          ASTRA
        </div>

        {/* Main headline */}
        <div className="overflow-hidden mb-4">
          <h2
            className="font-space text-[var(--text-primary)] leading-[1.0] transition-all duration-900 font-bold"
            style={{
              fontSize: 'clamp(42px, 8vw, 88px)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(100%)',
              transitionDelay: '150ms',
            }}
          >
            WHEN ONE PATH FAILS,
          </h2>
        </div>
        <div className="overflow-hidden mb-12">
          <h2
            className="font-space text-[var(--text-primary)] leading-[1.0] transition-all duration-900 font-bold"
            style={{
              fontSize: 'clamp(42px, 8vw, 88px)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(100%)',
              transitionDelay: '280ms',
            }}
          >
            FIND ANOTHER.
          </h2>
        </div>

        {/* Subline */}
        <div
          className="font-inter text-[18px] md:text-[22px] text-[var(--text-secondary)] mb-16 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)', transitionDelay: '450ms' }}
        >
          One SOS. Multiple Communication Paths.
        </div>

        {/* Signal animation */}
        <div
          className="w-full max-w-md transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '650ms' }}
        >
          <SignalLine />
        </div>

        {/* Status */}
        <div
          className="mt-12 flex items-center gap-3 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transitionDelay: '800ms' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--signal-red)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--signal-red)]" />
          </span>
          <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
            Prototype built · System under development
          </span>
        </div>
      </div>
    </section>
  );
}