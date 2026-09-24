import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

function RevealLine({ children, delay = 0, color = 'text-primaryText', size = 'text-[48px] md:text-[72px]' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`font-space ${size} leading-[1.1] ${color} transition-all duration-700`}
        style={{
          transform: inView ? 'translateY(0)' : 'translateY(105%)',
          opacity: inView ? 1 : 0,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ScrollText() {
  const { ref: paraRef, inView: paraInView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, transformOrigin: 'center' },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section className="min-h-screen bg-background flex flex-col justify-center items-center px-6 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        <RevealLine delay={0}>
          Safety shouldn't depend
        </RevealLine>
        <RevealLine delay={150} color="text-astraRed">
          on perfect connectivity.
        </RevealLine>

        {/* Divider line */}
        <div className="my-16 md:my-20 flex justify-center">
          <div
            ref={lineRef}
            className="h-px w-24 bg-[#2A2A2A]"
            style={{ transform: 'scaleX(0)', transformOrigin: 'center' }}
          />
        </div>

        <div
          ref={paraRef}
          className="transition-all duration-1000"
          style={{
            opacity: paraInView ? 1 : 0,
            transform: paraInView ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <p className="font-inter text-[20px] md:text-[24px] text-secondaryText max-w-2xl mx-auto leading-relaxed">
            But most digital safety systems still do.
          </p>
          <p className="font-mono text-[11px] text-[#3D3D3D] tracking-widest mt-8 uppercase">
            That's the gap ASTRA was built to address.
          </p>
        </div>
      </div>
    </section>
  );
}