import React from 'react';
import { useInView } from 'react-intersection-observer';

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

export default function WhyItMatters() {
  const { ref: headRef, inView: headInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-28 md:py-40 bg-[var(--bg)] px-6 border-t border-[var(--border)] transition-colors duration-250">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Heading */}
        <div ref={headRef} className="overflow-hidden w-full text-center mb-20">
          <h2
            className="font-space uppercase text-[var(--text-primary)] transition-all duration-800 font-bold"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              opacity: headInView ? 1 : 0,
              transform: headInView ? 'translateY(0)' : 'translateY(60px)',
            }}
          >
            THE PROBLEM IS NOT THEORETICAL.
          </h2>
        </div>

        {/* Story cards with verified citations */}
        <div className="w-full flex flex-col gap-0">
          {/* Incident 01: Delhi / LSR */}
          <FadeUp delay={0}>
            <div className="border-t border-[var(--border)] py-10 flex flex-col md:flex-row gap-6 md:gap-16 hover:border-[var(--border-strong)] transition-colors duration-300">
              <div className="md:w-1/4 flex-shrink-0">
                <span className="font-mono text-[10px] text-[var(--signal-red)] tracking-[0.2em] uppercase block mb-2 font-bold">
                  DELHI / SEPTEMBER 2026
                </span>
                <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase">INCIDENT 01</span>
              </div>
              <div className="md:w-3/4 flex flex-col gap-4">
                <p className="font-inter text-[15px] text-[var(--text-secondary)] leading-[1.75]">
                  Following the alleged gang rape of a 17-year-old girl in a public park in South Delhi, students from Lady Shri Ram College and other institutions protested and raised concerns about women's safety around their campuses.
                </p>
                
                {/* Source citation link */}
                <div className="pt-2">
                  <a
                    href="https://indianexpress.com/article/delhi/south-delhi-gangrape-lsr-du-students-protest-womens-safety-10891152/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--signal-red)] tracking-widest uppercase transition-all group"
                  >
                    <span>SOURCE: THE INDIAN EXPRESS</span>
                    <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Incident 02: Bihar / Jamui */}
          <FadeUp delay={150}>
            <div className="border-t border-[var(--border)] py-10 flex flex-col md:flex-row gap-6 md:gap-16 hover:border-[var(--border-strong)] transition-colors duration-300">
              <div className="md:w-1/4 flex-shrink-0">
                <span className="font-mono text-[10px] text-[var(--signal-red)] tracking-[0.2em] uppercase block mb-2 font-bold">
                  BIHAR / SEPTEMBER 2026
                </span>
                <span className="font-mono text-[9px] text-[var(--text-muted)] tracking-widest uppercase">INCIDENT 02</span>
              </div>
              <div className="md:w-3/4 flex flex-col gap-4">
                <p className="font-inter text-[15px] text-[var(--text-secondary)] leading-[1.75]">
                  In Jamui, two school-going teenagers were intercepted by a group while out near the town; the girl was allegedly molested and both teenagers assaulted. Police investigations and arrests followed.
                </p>
                
                {/* Source citation link */}
                <div className="pt-2">
                  <a
                    href="https://www.bbc.com/news/articles/cmz6z2vx65jeo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--signal-red)] tracking-widest uppercase transition-all group"
                  >
                    <span>SOURCE: BBC NEWS</span>
                    <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
          <div className="border-t border-[var(--border)]" />
        </div>

        {/* Visual pause & statements */}
        <div className="h-20 md:h-28" />

        <FadeUp delay={0} className="text-center w-full">
          <h3 className="font-space text-[24px] md:text-[30px] text-[var(--text-primary)] font-bold">
            Technology cannot eliminate violence.
          </h3>
        </FadeUp>

        <div className="my-10 flex justify-center">
          <div className="w-16 h-px bg-[var(--border-strong)]" />
        </div>

        <FadeUp delay={100} className="text-center w-full">
          <p className="font-inter text-[18px] md:text-[20px] text-[var(--text-secondary)] max-w-[600px] mx-auto leading-[1.7]">
            But engineering can reduce one vulnerability:{' '}
            <span className="text-[var(--text-primary)] font-semibold">the inability to communicate when help is needed.</span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}