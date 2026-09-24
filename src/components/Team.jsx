import React, { useState } from 'react';
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

const TEAM = [
  {
    initial: 'M',
    name: 'Mayank Saraswati',
    role: 'Project Lead',
    detail: 'Leads overall project direction, hardware architecture decisions, and system integration.',
  },
  {
    initial: 'K',
    name: 'Kashish Dhawan',
    role: 'Hardware & Firmware',
    detail: 'Responsible for circuit design, embedded firmware development, and hardware testing.',
  },
  {
    initial: 'D',
    name: 'Devesh',
    role: 'Systems Design',
    detail: 'Designs multi-path communication architecture and inter-device protocol routing logic.',
  },
];

export default function Team() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="team" className="py-24 md:py-40 px-6 max-w-[1440px] mx-auto border-t border-[var(--border)]">
      {/* Heading */}
      <FadeUp className="mb-16 md:mb-20">
        <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal-red)] uppercase mb-5 font-bold">
          / THE TEAM
        </div>
        <h2
          className="font-space text-[var(--text-primary)] leading-[1.05]"
          style={{ fontSize: 'clamp(38px, 5vw, 62px)' }}
        >
          THE PEOPLE<br />BEHIND ASTRA.
        </h2>
      </FadeUp>

      {/* Balanced 3-column Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TEAM.map((member, i) => {
          const isActive = activeCard === i;
          return (
            <FadeUp key={i} delay={i * 90}>
              <button
                onClick={() => setActiveCard(isActive ? null : i)}
                className={`w-full text-left border transition-all duration-300 p-6 md:p-8 group rounded-xs flex flex-col justify-between h-full ${
                  isActive
                    ? 'border-[var(--signal-red)] bg-[var(--signal-red-bg)] shadow-md'
                    : 'border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--card-bg)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Initial block */}
                    <div
                      className={`w-14 h-14 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center font-space font-bold transition-all duration-300 rounded-xs ${
                        isActive
                          ? 'bg-[var(--signal-red)] text-white shadow-md'
                          : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--signal-red)] group-hover:border-[var(--border-strong)]'
                      }`}
                      style={{ fontSize: '28px' }}
                    >
                      {member.initial}
                    </div>

                    <span
                      className={`font-mono text-[12px] transition-all duration-300 ${
                        isActive ? 'text-[var(--signal-red)] rotate-90 font-bold' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                      }`}
                    >
                      →
                    </span>
                  </div>

                  <h4 className="font-space text-[20px] mb-1 text-[var(--text-primary)] font-bold">
                    {member.name}
                  </h4>

                  <div
                    className={`font-mono text-[11px] tracking-widest mb-3 ${
                      isActive ? 'text-[var(--signal-red)] font-bold' : 'text-[var(--text-secondary)]'
                    }`}
                  >
                    {member.role}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border)]">
                  <p className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {member.detail}
                  </p>
                </div>
              </button>
            </FadeUp>
          );
        })}
      </div>

      {/* Faculty Mentor */}
      <FadeUp delay={300}>
        <div className="border-t border-[var(--border)] pt-12">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-shrink-0">
              <div className="font-mono text-[10px] tracking-[0.2em] text-[var(--signal-red)] uppercase mb-4 font-bold">
                FACULTY MENTOR
              </div>
              <h3 className="font-space text-[26px] md:text-[30px] text-[var(--text-primary)] mb-3 font-bold">
                Dr. Sudesh Pahal
              </h3>
            </div>
            <div className="md:border-l md:border-[var(--border)] md:pl-10">
              <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-1">
                Department of Electronics & Communication Engineering
              </p>
              <p className="font-inter text-[14px] text-[var(--text-secondary)] mb-5">
                Maharaja Surajmal Institute of Technology, New Delhi, India
              </p>
              <div className="flex flex-wrap gap-3">
                {['ECE DEPARTMENT', 'MSIT', 'NEW DELHI'].map(tag => (
                  <span key={tag} className="font-mono text-[9px] border border-[var(--border)] px-3 py-1.5 text-[var(--text-muted)] tracking-widest bg-[var(--card-bg)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}