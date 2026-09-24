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

export default function Research() {
  return (
    <section id="research" className="py-24 md:py-36 bg-[var(--bg)] px-6 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto">

        <FadeUp>
          <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal-red)] uppercase mb-6 font-bold">
            ACADEMIC FOUNDATION
          </div>
        </FadeUp>
        <FadeUp delay={80}>
          <h2 className="font-space text-[var(--text-primary)] mb-8"
            style={{ fontSize: 'clamp(32px, 4.5vw, 52px)' }}>
            FROM RESEARCH<br />TO HARDWARE.
          </h2>
        </FadeUp>
        <FadeUp delay={160}>
          <p className="font-inter text-[16px] text-[var(--text-secondary)] mb-16 max-w-2xl leading-relaxed">
            The first-generation ASTRA work was documented as a research project exploring
            dedicated GPS/cellular emergency hardware independent of internet-based smartphone
            application workflows.
          </p>
        </FadeUp>

        {/* Paper card */}
        <FadeUp delay={240}>
          <div className="border border-[var(--border)] bg-[var(--card-bg)] p-8 md:p-10 mb-8 group hover:border-[var(--border-strong)] transition-all duration-300 rounded-xs shadow-md">
            <div className="font-mono text-[9px] tracking-[0.22em] text-[var(--text-muted)] uppercase mb-4 font-bold">
              Research Paper
            </div>
            <p className="font-inter italic text-[17px] md:text-[19px] text-[var(--text-primary)] leading-[1.5] mb-8">
              "An Offline Capable Women Safety Device using Integrated GPS and GSM Technology"
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-1 h-6 bg-[var(--signal-red)]" />
                <div>
                  <div className="font-mono text-[10px] text-[var(--text-secondary)]">Department of Electronics & Communication Engineering</div>
                  <div className="font-mono text-[10px] text-[var(--text-muted)]">Maharaja Surajmal Institute of Technology</div>
                </div>
              </div>
              <a
                href="#"
                onClick={e => e.preventDefault()}
                className="font-mono text-[11px] text-[var(--signal-red)] tracking-[0.15em] uppercase flex items-center gap-2 hover:gap-3 transition-all duration-300 font-bold"
                title="Citation pending"
              >
                VIEW PAPER
                <span className="transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={300}>
          <div className="font-mono text-[11px] text-[var(--text-muted)] leading-relaxed">
            Publication details, DOI and venue to be confirmed. Link will be updated upon availability.
          </div>
        </FadeUp>
      </div>
    </section>
  );
}