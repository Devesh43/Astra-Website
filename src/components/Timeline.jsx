import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const NODES = [
  { num: '01', title: 'CONCEPT', desc: 'Dedicated personal-safety emergency hardware formulation.', done: true },
  { num: '02', title: 'ASTRA V1', desc: 'First GPS/GNSS and cellular SOS prototype built & tested.', done: true },
  { num: '03', title: 'DIRECT ALERT', desc: 'ASTRA → emergency contact communication demonstrated.', done: true },
  { num: '04', title: 'MULTI-PATH', desc: 'LoRa introduced to eliminate single-point network failure.', done: true },
  { num: '05', title: 'ASTRA RELAY', desc: 'ASTRA-to-ASTRA peer relay demonstrated at prototype level.', done: true },
  { num: '06', title: 'HUB RELAY', desc: 'ASTRA-to-Hub relay demonstrated at prototype level.', done: true },
  { num: '07', title: 'FUNDED', desc: 'Selected under university Innovation & Incubation Fund.', done: true },
  { num: '08', title: 'NEXT', desc: 'Compact PCB, enclosure refinement, extended field testing.', active: true },
];

function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function Timeline() {
  const [activeNode, setActiveNode] = useState(7); // '08 NEXT' selected by default

  return (
    <section id="timeline" className="py-24 md:py-36 bg-[var(--bg)] px-6 border-t border-[var(--border)]">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp className="mb-16">
          <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal-red)] uppercase mb-4 font-bold">
            / PROJECT EVOLUTION
          </div>
          <h2 className="font-space text-[var(--text-primary)] font-bold" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            The ASTRA Timeline.
          </h2>
        </FadeUp>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative mb-0">
          {/* Track line */}
          <div className="absolute top-[20px] left-0 right-0 h-px bg-[var(--border)] z-0" />
          {/* Progress line */}
          <div
            className="absolute top-[20px] left-0 h-px bg-[var(--signal-red)] z-0 transition-all duration-1000"
            style={{ width: `${(6 / (NODES.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-8 relative z-10">
            {NODES.map((node, i) => (
              <button
                key={i}
                onClick={() => setActiveNode(activeNode === i ? -1 : i)}
                className="flex flex-col items-start px-2 group text-left focus:outline-none"
              >
                {/* Node circle */}
                <div
                  className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono text-[10px] mb-5 transition-all duration-300 ${
                    node.active
                      ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg)] font-bold'
                      : node.done
                      ? 'border-[var(--signal-red)] text-[var(--signal-red)] bg-[var(--card-bg)] font-bold'
                      : 'border-[var(--border)] text-[var(--text-muted)] bg-[var(--card-bg)]'
                  } ${activeNode === i ? 'scale-110' : 'group-hover:scale-105'}`}
                >
                  {node.num}
                </div>

                <h4
                  className={`font-space text-[13px] mb-1.5 transition-colors duration-200 ${
                    activeNode === i
                      ? 'text-[var(--text-primary)] font-bold'
                      : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'
                  }`}
                >
                  {node.title}
                </h4>
                <p
                  className="font-inter text-[11px] text-[var(--text-secondary)] leading-relaxed transition-all duration-300"
                  style={{
                    maxHeight: activeNode === i ? '90px' : '0',
                    opacity: activeNode === i ? 1 : 0,
                    overflow: 'hidden',
                  }}
                >
                  {node.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[var(--border)]" />
          <div
            className="absolute left-[18px] top-0 w-px bg-[var(--signal-red)]"
            style={{ height: `${(6 / NODES.length) * 100}%` }}
          />
          {NODES.map((node, i) => (
            <FadeUp key={i} delay={i * 60}>
              <button
                onClick={() => setActiveNode(activeNode === i ? -1 : i)}
                className="relative flex items-start gap-5 mb-8 text-left w-full group"
              >
                <div
                  className={`absolute -left-8 w-8 h-8 rounded-full border flex items-center justify-center font-mono text-[9px] flex-shrink-0 transition-all duration-300 bg-[var(--card-bg)] ${
                    node.active ? 'border-[var(--text-primary)] text-[var(--text-primary)] font-bold' : node.done ? 'border-[var(--signal-red)] text-[var(--signal-red)] font-bold' : 'border-[var(--border)] text-[var(--text-muted)]'
                  }`}
                >
                  {node.num}
                </div>
                <div className="pt-0.5">
                  <h4 className={`font-space text-[15px] mb-1 ${node.active ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                    {node.title}
                  </h4>
                  <p className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed">{node.desc}</p>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}