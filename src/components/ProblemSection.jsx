import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

function FlowNode({ label, status = 'normal', visible, delay }) {
  const colors = {
    normal: 'border-[#2A2A2A] text-primaryText',
    failed: 'border-astraRed text-astraRed bg-[#1a0505]',
    faded: 'border-[#1A1A1A] text-[#2A2A2A]',
  };
  return (
    <div
      className={`border px-6 py-3 font-mono text-[13px] tracking-widest transition-all duration-700 ${colors[status]}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {label}
    </div>
  );
}

function Arrow({ visible, failed }) {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className={`w-px h-8 ${failed ? 'bg-astraRed' : 'bg-[#2A2A2A]'} transition-colors duration-700`} />
      <div className={`w-0 h-0 ${failed ? 'border-t-astraRed' : 'border-t-[#2A2A2A]'}`}
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `6px solid ${failed ? '#CC2B2B' : '#2A2A2A'}`,
          transition: 'border-color 0.7s',
        }} />
    </div>
  );
}

export default function ProblemSection() {
  const { ref, inView } = useInView({ threshold: 0.35, triggerOnce: true });
  const { ref: textRef, inView: textInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 900),
      setTimeout(() => setStage(3), 1500),
      setTimeout(() => setStage(4), 3200),
      setTimeout(() => setStage(5), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const failedCellular = stage >= 4;

  return (
    <section id="problem" className="py-28 md:py-40 px-6 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* LEFT — editorial text */}
        <div ref={textRef} className="flex flex-col">
          <div
            className="font-mono text-[10px] tracking-[0.2em] text-astraRed uppercase mb-6 transition-all duration-700"
            style={{ opacity: textInView ? 1 : 0, transform: textInView ? 'translateY(0)' : 'translateY(16px)' }}
          >
            THE PROBLEM ISN'T JUST CALLING FOR HELP.
          </div>
          <h2
            className="font-space text-[44px] md:text-[56px] text-primaryText leading-[1.05] mb-8 transition-all duration-700"
            style={{
              opacity: textInView ? 1 : 0,
              transform: textInView ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '120ms',
            }}
          >
            It's whether<br />the call can leave.
          </h2>
          <p
            className="font-inter text-[16px] text-secondaryText mb-5 max-w-lg leading-relaxed transition-all duration-700"
            style={{ opacity: textInView ? 1 : 0, transform: textInView ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '220ms' }}
          >
            Emergency tools built around smartphones introduce compounding dependencies:
            a device must be accessible, operable under extreme stress, connected
            to a cellular network, and that network must be available — all at once.
          </p>
          <p
            className="font-inter text-[16px] text-secondaryText max-w-lg leading-relaxed transition-all duration-700"
            style={{ opacity: textInView ? 1 : 0, transform: textInView ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '320ms' }}
          >
            Dependence on any single communication path creates a potential point
            of failure. Not a theoretical one.
          </p>

          {/* Dependency list */}
          <div
            className="mt-10 flex flex-col gap-3 transition-all duration-700"
            style={{ opacity: textInView ? 1 : 0, transitionDelay: '450ms' }}
          >
            {[
              'Smartphone must be accessible',
              'Device must be operable under stress',
              'Internet connectivity required',
              'Cellular network must be available',
              'One communication route',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-astraRed flex-shrink-0" />
                <span className="font-inter text-[14px] text-secondaryText">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — animated flow diagram */}
        <div ref={ref} className="flex flex-col items-center justify-center gap-0 select-none">
          <FlowNode label="SOS" visible={stage >= 1} delay={0} />
          <Arrow visible={stage >= 1} failed={false} />
          <div className="relative flex flex-col items-center">
            <FlowNode
              label={failedCellular ? 'CELLULAR  ✕' : 'CELLULAR'}
              status={failedCellular ? 'failed' : stage >= 2 ? 'normal' : 'normal'}
              visible={stage >= 2}
              delay={0}
            />
            {failedCellular && (
              <div
                className="mt-2 font-mono text-[10px] text-astraRed tracking-widest animate-pulse"
                style={{ opacity: stage >= 4 ? 1 : 0, transition: 'opacity 0.5s' }}
              >
                ✕ NETWORK UNAVAILABLE
              </div>
            )}
          </div>
          <Arrow visible={stage >= 2 && !failedCellular} failed={false} />
          <FlowNode
            label="CONTACT"
            status={failedCellular ? 'faded' : 'normal'}
            visible={stage >= 3}
            delay={0}
          />

          {/* Failure message */}
          <div
            className="mt-12 text-center transition-all duration-700"
            style={{
              opacity: stage >= 5 ? 1 : 0,
              transform: stage >= 5 ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
            }}
          >
            <div className="font-space text-[22px] md:text-[26px] text-astraRed mb-2">
              One path. One point of failure.
            </div>
            <div className="font-mono text-[10px] text-secondaryText tracking-widest">
              — regardless of how urgent the situation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}