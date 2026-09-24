import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: 'PRESS SOS', desc: 'One dedicated physical trigger' },
  { label: 'ACQUIRE LOCATION', desc: 'GPS coordinates — no internet needed' },
  { label: 'GENERATE MESSAGE', desc: 'Compact emergency packet assembled' },
  { label: 'SEND TO CONTACT', desc: 'Delivered via cellular/SMS' },
];

function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Origin() {
  const imgRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { scale: 1 },
      {
        scale: 1.04,
        ease: 'none',
        scrollTrigger: {
          trigger: imgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="py-0 border-t border-[#1A1A1A] overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[90vh]">
        {/* Image left */}
        <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[50vw] lg:min-h-0">
          <img
            ref={imgRef}
            src="/images/astra-table.jpg"
            alt="ASTRA prototype standing on desk in real-world environment"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ willChange: 'transform' }}
          />
          {/* Overlay gradient on right edge */}
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent to-[#080808] hidden lg:block pointer-events-none" />
        </div>

        {/* Right — sticky story */}
        <div className="w-full lg:w-1/2 flex items-center px-8 md:px-16 py-20 bg-[#080808]">
          <div className="max-w-[520px]">
            <FadeUp>
              <div className="font-mono text-[10px] tracking-[0.22em] text-astraRed uppercase mb-6">
                ORIGIN
              </div>
            </FadeUp>

            <FadeUp delay={80}>
              <h2 className="font-space leading-[1.05] text-primaryText mb-8"
                style={{ fontSize: 'clamp(38px, 4vw, 56px)' }}>
                FROM AN IDEA<br />TO HARDWARE.
              </h2>
            </FadeUp>

            <FadeUp delay={160}>
              <p className="font-inter text-[16px] text-secondaryText mb-12 leading-relaxed">
                ASTRA began as an offline-capable women's-safety prototype designed around a
                dedicated physical SOS trigger, GPS location acquisition and cellular/SMS
                communication.
              </p>
            </FadeUp>

            {/* Vertical step sequence */}
            <div className="flex flex-col gap-0 mb-12">
              {steps.map((step, i) => (
                <FadeUp key={i} delay={220 + i * 100}>
                  <div className="flex gap-6 items-start py-4 border-t border-[#1A1A1A] group hover:border-[#2A2A2A] transition-colors">
                    <div className="flex flex-col items-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-astraRed group-hover:scale-125 transition-transform" />
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 min-h-[32px] bg-[#1A1A1A] mt-2" />
                      )}
                    </div>
                    <div>
                      <div className="font-mono text-[12px] text-primaryText tracking-widest mb-1">
                        {step.label}
                      </div>
                      <div className="font-inter text-[13px] text-[#5A5A5A]">{step.desc}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={680}>
              <blockquote className="border-l-2 border-astraRed pl-5 mb-6">
                <p className="font-inter text-[15px] italic text-secondaryText leading-relaxed">
                  "No app to open.<br />
                  No interface to navigate.<br />
                  One dedicated emergency action."
                </p>
              </blockquote>
            </FadeUp>

            <FadeUp delay={780}>
              <p className="font-mono text-[11px] text-[#2A2A2A] leading-relaxed">
                Note: GPS acquisition does not require internet access. The cellular/SMS
                communication path still requires compatible network coverage.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}