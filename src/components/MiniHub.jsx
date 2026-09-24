import React from 'react';
import { useInView } from 'react-intersection-observer';

function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
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

function RingAnimation({ size, delay, opacity }) {
  return (
    <div
      className="absolute rounded-full border border-astraRed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: size,
        height: size,
        opacity,
        animation: `loraRing 3s ease-out ${delay}s infinite`,
      }}
    />
  );
}

export default function MiniHub() {
  return (
    <section className="py-28 md:py-40 bg-[#0A0A0A] border-y border-[#1A1A1A] px-6 overflow-hidden">
      <style>{`
        @keyframes loraRing {
          0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes hubPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(204,43,43,0.4); }
          50% { box-shadow: 0 0 0 12px rgba(204,43,43,0); }
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <FadeUp>
            <div className="font-mono text-[10px] tracking-[0.22em] text-astraRed uppercase mb-6">
              EXTENDED COVERAGE
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className="font-space text-primaryText leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}>
              WHAT IF THERE'S<br />NO ASTRA NEARBY?
            </h2>
          </FadeUp>
          <FadeUp delay={160}>
            <h3 className="font-inter text-[20px] text-secondaryText mb-6">
              Introducing the <span className="text-primaryText">ASTRA Mini Hub.</span>
            </h3>
          </FadeUp>
          <FadeUp delay={240}>
            <p className="font-inter text-[16px] text-secondaryText max-w-2xl mx-auto leading-relaxed">
              Strategically deployed authorized LoRa reception points provide another local path
              for ASTRA emergency packets — without requiring proximity to another user's device.
            </p>
          </FadeUp>
        </div>

        {/* Deployment tags */}
        <FadeUp delay={300} className="flex flex-wrap justify-center gap-3 mb-4">
          {[
            'Educational Campuses',
            'Institutional Facilities',
            'Controlled Public Infrastructure',
            'Authorized Safety Locations',
          ].map((tag) => (
            <span
              key={tag}
              className="border border-[#1A1A1A] px-4 py-2 font-mono text-[11px] text-secondaryText hover:border-[#2A2A2A] hover:text-primaryText transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </FadeUp>
        <FadeUp delay={360} className="text-center mb-20">
          <p className="font-mono text-[11px] text-[#2A2A2A]">
            Proposed future infrastructure. Mini Hubs are not currently deployed.
          </p>
        </FadeUp>

        {/* Visual diagram */}
        <FadeUp delay={400}>
          <div className="relative max-w-2xl mx-auto h-[440px] md:h-[480px]">
            {/* LoRa rings from hub center */}
            <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <RingAnimation size="140px" delay={0} opacity={0.35} />
              <RingAnimation size="240px" delay={0.8} opacity={0.25} />
              <RingAnimation size="360px" delay={1.6} opacity={0.15} />
              <RingAnimation size="480px" delay={2.4} opacity={0.08} />
            </div>

            {/* ASTRA devices at top */}
            <div className="absolute top-0 left-0 right-0 flex justify-between px-4 md:px-10 z-10">
              {['ASTRA 1', 'ASTRA 2', 'ASTRA 3'].map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div
                    className="border border-[#1A1A1A] bg-[#080808] px-3 py-2 font-mono text-[11px] text-primaryText hover:border-astraRed hover:text-astraRed transition-all duration-300 cursor-default"
                    style={{ animation: `hubPulse 2.5s ease ${i * 0.8}s infinite` }}
                  >
                    {label}
                  </div>
                  {/* Connection line down */}
                  <div
                    className="w-px bg-gradient-to-b from-[#2A2A2A] to-transparent"
                    style={{ height: '80px' }}
                  />
                </div>
              ))}
            </div>

            {/* Mini Hub center */}
            <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3">
              <div
                className="border border-astraRed text-astraRed bg-[#0D0505] px-6 py-3 font-mono text-[13px] font-bold tracking-wider"
                style={{ animation: 'hubPulse 2s ease infinite' }}
              >
                ASTRA MINI HUB
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-secondaryText to-transparent" />
              <div className="border border-[#1A1A1A] px-4 py-2 font-mono text-[11px] text-secondaryText text-center">
                Onward Communication
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}