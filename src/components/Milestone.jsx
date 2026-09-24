import React from 'react';
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

const demonstratedMilestones = [
  { qty: '01', label: 'FUNCTIONAL ASTRA DEVICE PROTOTYPE' },
  { qty: '01', label: 'FUNCTIONAL LORA HUB RECEIVER UNIT' },
  { qty: '03', label: 'COMMUNICATION PATHS DEMONSTRATED' },
];

const nextPhaseGoals = [
  'Compact Multi-layer Custom PCB Integration',
  'Production Enclosure Refinement & CAD Tooling',
  'Extended Field Testing & Range Calibration',
  'Power Management & Battery Life Optimization',
  'Multi-Node Mesh Network Protocol Stress Testing',
];

export default function Milestone() {
  return (
    <section id="milestone" className="py-24 md:py-40 px-6 max-w-[1440px] mx-auto border-t border-[var(--border)]">
      <FadeUp>
        <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--signal-red)] uppercase mb-4 font-bold">
          / PROJECT MILESTONE
        </div>
      </FadeUp>

      <FadeUp delay={80}>
        <h2 className="font-space text-[40px] md:text-[68px] text-[var(--text-primary)] font-bold leading-[1.0] mb-6">
          SELECTED FOR FUNDING.
        </h2>
      </FadeUp>

      <FadeUp delay={160} className="mb-12">
        <p className="font-inter text-[18px] text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          ASTRA has been selected for funding under the university's <span className="text-[var(--text-primary)] font-semibold">Innovation and Incubation Fund</span> following final project presentations.
        </p>
      </FadeUp>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[var(--border)] rounded-xs bg-[var(--card-bg)] shadow-xl">
        {/* Demonstrated Achievements */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[var(--border)]">
          <FadeUp>
            <div className="font-mono text-[11px] text-[var(--text-primary)] mb-8 tracking-[0.2em] uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--green)]" />
              <span>Current Demonstrated Baseline</span>
            </div>
          </FadeUp>

          <div className="flex flex-col gap-6">
            {demonstratedMilestones.map((item, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="flex items-center gap-5 group">
                  <div className="font-space text-[36px] text-[var(--signal-red)] font-bold leading-none w-12 flex-shrink-0 text-right group-hover:scale-110 transition-transform">
                    {item.qty}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-primary)] tracking-widest leading-relaxed font-bold">
                    {item.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Funded Next Phase Development */}
        <div className="p-8 md:p-12">
          <FadeUp>
            <div className="font-mono text-[11px] text-[var(--text-primary)] mb-8 tracking-[0.2em] uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--signal-red)]" />
              <span>Funded Next Phase Objectives</span>
            </div>
          </FadeUp>

          <ul className="flex flex-col gap-0">
            {nextPhaseGoals.map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <li className="flex items-center gap-4 py-3.5 border-t border-[var(--border)] first:border-t-0 font-mono text-[12px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <span className="text-[var(--signal-red)] font-bold text-[8px] flex-shrink-0">◆</span>
                  {item}
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
