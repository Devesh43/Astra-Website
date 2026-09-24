import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

const GPS_NODES = [
  { label: 'SATELLITE', color: '#F3F1EB' },
  { label: 'GNSS RECEIVER', color: '#F3F1EB' },
  { label: 'LATITUDE / LONGITUDE', color: '#CC2B2B' },
];

const FALLBACK = [
  { label: 'CURRENT FIX', active: true },
  { label: 'LAST VALID LOCATION', active: false },
  { label: 'SOS WITHOUT LOCATION', active: false, red: true },
];

export default function GpsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [nodeStep, setNodeStep] = useState(0);
  const [fallStep, setFallStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setNodeStep(1), 400);
    const t2 = setTimeout(() => setNodeStep(2), 1000);
    const t3 = setTimeout(() => setNodeStep(3), 1700);
    const t4 = setTimeout(() => setFallStep(1), 2400);
    const t5 = setTimeout(() => setFallStep(2), 3000);
    const t6 = setTimeout(() => setFallStep(3), 3600);
    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout);
  }, [inView]);

  return (
    <section className="py-28 md:py-40 bg-[#080808] px-6 text-center border-t border-[#1A1A1A]">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="font-mono text-[13px] text-secondaryText mb-8 tracking-widest">
            Does GPS need the internet?
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <h2
            className="font-space text-primaryText leading-none mb-6"
            style={{ fontSize: 'clamp(80px, 14vw, 150px)' }}
          >
            NO.
          </h2>
        </FadeUp>

        <FadeUp delay={150}>
          <p className="font-inter text-[13px] text-[#3A3A3A] mb-16">
            Satellite positioning works independently of cellular networks or the internet.
          </p>
        </FadeUp>

        {/* Animated flow */}
        <div ref={ref} className="flex flex-col items-center gap-0 mb-16">
          {GPS_NODES.map((node, i) => (
            <React.Fragment key={i}>
              <div
                className="border px-8 py-3 font-mono text-[13px] tracking-widest transition-all duration-700"
                style={{
                  opacity: nodeStep > i ? 1 : 0,
                  transform: nodeStep > i ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
                  borderColor: nodeStep > i ? (node.color === '#CC2B2B' ? '#CC2B2B' : '#2A2A2A') : '#111',
                  color: node.color,
                  backgroundColor: nodeStep > i ? (node.color === '#CC2B2B' ? 'rgba(204,43,43,0.06)' : '#0D0D0D') : 'transparent',
                  boxShadow: nodeStep > i && node.color === '#CC2B2B' ? '0 0 20px rgba(204,43,43,0.1)' : 'none',
                }}
              >
                {node.label}
              </div>
              {i < GPS_NODES.length - 1 && (
                <div
                  className="w-px h-8 bg-[#1A1A1A] transition-all duration-500"
                  style={{ opacity: nodeStep > i ? 1 : 0.1 }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <FadeUp delay={200}>
          <p className="font-inter text-[18px] text-secondaryText max-w-xl mx-auto mb-6 leading-relaxed">
            The network is needed to{' '}
            <span className="text-astraRed font-semibold">SEND</span> the location —{' '}
            not to determine it.
          </p>
        </FadeUp>

        <FadeUp delay={300}>
          <p className="font-inter text-[13px] text-[#3A3A3A] mb-16 max-w-md mx-auto">
            Indoor or obstructed environments can prevent or delay a fresh satellite fix.
          </p>
        </FadeUp>

        {/* Fallback chain */}
        <FadeUp delay={400}>
          <div className="font-mono text-[10px] text-[#3A3A3A] tracking-[0.2em] mb-6 uppercase">
            Location fallback chain
          </div>
        </FadeUp>
        <FadeUp delay={450}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 font-mono text-[11px]">
            {FALLBACK.map((item, i) => (
              <React.Fragment key={i}>
                <div
                  className="flex flex-col items-center gap-1 transition-all duration-500"
                  style={{
                    opacity: fallStep > i ? 1 : 0.2,
                    transform: fallStep > i ? 'scale(1)' : 'scale(0.95)',
                  }}
                >
                  <div
                    className="border px-4 py-2 transition-all duration-700"
                    style={{
                      borderColor: item.red ? '#CC2B2B' : fallStep > i ? '#2A2A2A' : '#111',
                      color: item.red ? '#CC2B2B' : fallStep > i ? '#F3F1EB' : '#3A3A3A',
                    }}
                  >
                    {item.label}
                  </div>
                </div>
                {i < FALLBACK.length - 1 && (
                  <div className="text-astraRed mx-3 my-2 sm:my-0 text-[16px] rotate-90 sm:rotate-0 transition-all duration-500"
                    style={{ opacity: fallStep > i ? 1 : 0.2 }}>
                    →
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}