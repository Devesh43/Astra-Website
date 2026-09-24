import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

const demonstrated = [
  'Physical SOS trigger activation',
  'GPS/GNSS location fix acquisition',
  'Direct cellular/SMS emergency alerting',
  'ASTRA-to-ASTRA LoRa peer relay',
  'ASTRA-to-Hub LoRa infrastructure relay',
  'Multi-path emergency routing logic',
];

const upcoming = [
  'Custom multi-layer PCB integration',
  'Production enclosure refinement & 3D tooling',
  'Extended multi-node field testing & calibration',
  'Power management & battery life optimization',
  'Large-scale campus hub deployment testing',
];

export default function WeBuiltIt() {
  const imgRef = useRef(null);
  const { ref: headRef, inView: headInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !imgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, { y: 0 }, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 md:py-32 bg-[var(--bg)] overflow-hidden border-t border-[var(--border)]">

      {/* Headline */}
      <div className="max-w-[1440px] mx-auto px-6 mb-8 text-center">
        <FadeUp>
          <div className="font-mono text-[11px] md:text-[13px] tracking-[0.25em] text-[var(--text-secondary)] uppercase mb-4 font-bold">
            WE DIDN'T START WITH A RENDER.
          </div>
        </FadeUp>
      </div>

      {/* Full-bleed image with subtle parallax */}
      <div className="w-full overflow-hidden mb-8" style={{ height: 'clamp(320px, 55vh, 600px)' }}>
        <img
          ref={imgRef}
          src="/images/astra-dark.png"
          alt="ASTRA prototype — real physical hardware"
          className="w-full h-full object-contain px-4 md:px-12"
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* WE BUILT IT */}
      <div ref={headRef} className="text-center mb-20 px-6">
        <div className="overflow-hidden">
          <h2
            className="font-space text-[var(--text-primary)] font-bold leading-none transition-all duration-900"
            style={{
              fontSize: 'clamp(52px, 9vw, 100px)',
              opacity: headInView ? 1 : 0,
              transform: headInView ? 'translateY(0)' : 'translateY(100%)',
            }}
          >
            WE BUILT IT.
          </h2>
        </div>
      </div>

      {/* Two-column comparison */}
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[var(--border)] rounded-xs bg-[var(--card-bg)] shadow-lg">
          {/* Left: demonstrated */}
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[var(--border)]">
            <FadeUp>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--green)]" />
                <h3 className="font-mono text-[12px] text-[var(--green)] tracking-[0.2em] uppercase font-bold">
                  Demonstrated at Prototype Level
                </h3>
              </div>
            </FadeUp>
            <ul className="flex flex-col gap-0">
              {demonstrated.map((item, i) => (
                <FadeUp key={i} delay={i * 70}>
                  <li className="flex items-center gap-4 py-3.5 border-t border-[var(--border)] first:border-t-0 font-inter text-[15px] text-[var(--text-primary)] group font-medium">
                    <span className="text-[var(--green)] text-[11px] font-bold flex-shrink-0">✓</span>
                    {item}
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>

          {/* Right: upcoming */}
          <div className="p-8 md:p-12">
            <FadeUp>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--signal-red)]" />
                <h3 className="font-mono text-[12px] text-[var(--text-secondary)] tracking-[0.2em] uppercase font-bold">
                  Funded Next Phase Objectives
                </h3>
              </div>
            </FadeUp>
            <ul className="flex flex-col gap-0">
              {upcoming.map((item, i) => (
                <FadeUp key={i} delay={i * 70}>
                  <li className="flex items-center justify-between gap-4 py-3.5 border-t border-[var(--border)] first:border-t-0 font-inter text-[15px] text-[var(--text-secondary)]">
                    <div className="flex items-center gap-4">
                      <span className="text-[var(--signal-red)] text-[10px] flex-shrink-0">◆</span>
                      {item}
                    </div>
                    <span className="font-mono text-[9px] text-[var(--signal-red)] border border-[var(--signal-red)] px-1.5 py-0.5 tracking-widest flex-shrink-0 rounded-xs font-bold">NEXT</span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}