import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function TheRealization() {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setStage(1), 600),   // "BUT IT EXPOSED..."
      setTimeout(() => setStage(2), 1600),  // show architecture
      setTimeout(() => setStage(3), 2800),  // cellular highlight amber
      setTimeout(() => setStage(4), 4200),  // cellular fails red
      setTimeout(() => setStage(5), 5600),  // explanatory text
      setTimeout(() => setStage(6), 6800),  // SINGLE POINT OF FAILURE
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="min-h-screen bg-[#030303] flex flex-col items-center justify-center px-6 py-24 text-center relative overflow-hidden"
    >
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="max-w-3xl w-full relative z-10">
        {/* Phase 0: Header */}
        <div
          className="font-mono text-[11px] tracking-[0.25em] text-secondaryText mb-16 uppercase transition-all duration-700"
          style={{ opacity: 1 }}
        >
          THE FIRST PROTOTYPE WORKED.
        </div>

        {/* Phase 1: Big reveal */}
        <div className="overflow-hidden mb-16">
          <h2
            className="font-space text-primaryText leading-[1.05] transition-all duration-900"
            style={{
              fontSize: 'clamp(42px, 6vw, 76px)',
              opacity: stage >= 1 ? 1 : 0,
              transform: stage >= 1 ? 'translateY(0)' : 'translateY(100%)',
            }}
          >
            BUT IT EXPOSED<br />ANOTHER PROBLEM.
          </h2>
        </div>

        {/* Phase 2: Architecture */}
        <div
          className="flex flex-col items-center gap-0 font-mono text-[13px] mb-16 transition-all duration-700"
          style={{ opacity: stage >= 2 ? 1 : 0, transform: stage >= 2 ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="border border-[#2A2A2A] px-6 py-3 text-primaryText">ASTRA</div>
          <div className="w-px h-8 bg-[#2A2A2A]" />

          {/* Cellular node */}
          <div
            className="relative border px-6 py-3 transition-all duration-1000"
            style={{
              borderColor:
                stage >= 4 ? '#CC2B2B' :
                stage >= 3 ? '#D4811A' :
                '#2A2A2A',
              color:
                stage >= 4 ? '#CC2B2B' :
                stage >= 3 ? '#D4811A' :
                '#F3F1EB',
              backgroundColor:
                stage >= 4 ? 'rgba(204,43,43,0.06)' :
                stage >= 3 ? 'rgba(212,129,26,0.06)' :
                'transparent',
              boxShadow:
                stage >= 4 ? '0 0 20px rgba(204,43,43,0.15)' :
                stage >= 3 ? '0 0 20px rgba(212,129,26,0.1)' :
                'none',
            }}
          >
            CELLULAR {stage >= 4 && ' ✕'}
            {stage >= 4 && (
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-[9px] text-astraRed tracking-widest whitespace-nowrap animate-pulse">
                NETWORK UNAVAILABLE
              </div>
            )}
          </div>

          <div
            className="w-px h-8 bg-[#2A2A2A] transition-opacity duration-700"
            style={{ opacity: stage >= 4 ? 0.1 : 1 }}
          />
          <div
            className="border border-[#2A2A2A] px-6 py-3 text-primaryText transition-opacity duration-700"
            style={{ opacity: stage >= 4 ? 0.1 : 1 }}
          >
            CONTACT
          </div>
        </div>

        {/* Phase 3: Text explanation */}
        <div
          className="flex flex-col gap-3 mb-16 transition-all duration-700"
          style={{ opacity: stage >= 5 ? 1 : 0, transform: stage >= 5 ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <p className="font-inter text-[15px] text-secondaryText">
            We removed dependence on a smartphone and internet-based app workflow.
          </p>
          <p className="font-inter text-[16px] text-primaryText font-medium">
            But the alert still depended on one communication path.
          </p>
        </div>

        {/* Phase 4: SINGLE POINT */}
        <div
          className="transition-all duration-900"
          style={{
            opacity: stage >= 6 ? 1 : 0,
            transform: stage >= 6 ? 'scale(1)' : 'scale(0.92)',
          }}
        >
          <h3
            className="font-space text-astraRed"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              textShadow: stage >= 6 ? '0 0 40px rgba(204,43,43,0.3)' : 'none',
              transition: 'text-shadow 1s ease',
            }}
          >
            SINGLE POINT OF FAILURE.
          </h3>
        </div>
      </div>
    </section>
  );
}