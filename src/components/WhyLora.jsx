import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    title: 'LOW DATA REQUIREMENT',
    icon: '≪',
    desc: 'Emergency packets are just bytes. LoRa is optimized for tiny payloads — perfect for SOS data.',
  },
  {
    title: 'LONGER LOCAL RANGE',
    icon: '⟶',
    desc: 'Sub-GHz frequencies propagate further and penetrate urban environments better than Wi-Fi or Bluetooth.',
  },
  {
    title: 'LOW POWER',
    icon: '⚡',
    desc: 'Radio transmissions require minimal energy, preserving battery life when it matters most.',
  },
  {
    title: 'NO WI-FI REQUIRED',
    icon: '✕',
    desc: 'Creates an independent local radio link entirely separate from conventional internet infrastructure.',
  },
];

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

export default function WhyLora() {
  const lineRef = useRef(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: 'left' }, {
      scaleX: 1,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: { trigger: lineRef.current, start: 'top 80%' },
    });
  }, []);

  return (
    <section className="py-28 md:py-40 px-6 max-w-[1440px] mx-auto text-center border-t border-[#1A1A1A]">
      <FadeUp>
        <h2 className="font-space text-primaryText leading-[1.0]"
          style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}>
          AN SOS IS TINY.
        </h2>
      </FadeUp>
      <FadeUp delay={100}>
        <h2 className="font-space text-astraRed leading-[1.0] mb-20"
          style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}>
          ITS IMPORTANCE ISN'T.
        </h2>
      </FadeUp>

      {/* Animated divider */}
      <div className="flex justify-center mb-20">
        <div ref={lineRef} className="h-px w-48 bg-[#1A1A1A]" style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1A1A1A] text-left mb-16">
        {stats.map((item, i) => (
          <FadeUp key={i} delay={i * 80} className="h-full">
            <div className="p-7 border-b border-r border-[#1A1A1A] last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r h-full flex flex-col hover:bg-[#0D0D0D] transition-colors duration-300 group">
              <div className="font-mono text-[22px] text-astraRed mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {item.icon}
              </div>
              <h4 className="font-mono text-[11px] text-primaryText mb-3 tracking-widest">{item.title}</h4>
              <p className="font-inter text-[14px] text-secondaryText leading-relaxed flex-1">{item.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={200}>
        <div className="border border-[#1A1A1A] bg-[#0D0D0D] p-6 max-w-2xl mx-auto">
          <div className="font-mono text-[9px] text-astraRed tracking-[0.2em] mb-2">FIELD TESTING NOTE</div>
          <p className="font-inter italic text-[13px] text-[#4A4A4A] leading-relaxed">
            Practical range depends on antenna design, frequency, radio configuration, transmit
            power and environment, and will be established through field testing.
          </p>
        </div>
      </FadeUp>
    </section>
  );
}