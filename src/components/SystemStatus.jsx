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

const statusItems = [
  {
    title: 'DIRECT CELLULAR',
    status: 'DEMONSTRATED ✓',
    desc: 'ASTRA connects directly via SIMCom A7670C 4G Cat-1 to dispatch emergency SMS with GNSS coordinates.',
    tag: 'PATH 01',
    active: true,
  },
  {
    title: 'ASTRA-TO-ASTRA RELAY',
    status: 'DEMONSTRATED ✓',
    desc: 'Peer-to-peer LoRa radio transmission from out-of-range device to nearby online ASTRA unit.',
    tag: 'PATH 02',
    active: true,
  },
  {
    title: 'ASTRA-TO-HUB RELAY',
    status: 'DEMONSTRATED ✓',
    desc: 'Sub-GHz packet reception by dedicated prototype Hub receiver for onward network delivery.',
    tag: 'PATH 03',
    active: true,
  },
];

export default function SystemStatus() {
  return (
    <section id="status" className="py-24 md:py-36 px-6 max-w-[1440px] mx-auto border-t border-[var(--border)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <FadeUp>
            <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--signal-red)] uppercase mb-3 font-bold">
              / SYSTEM STATUS
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className="font-space text-[36px] md:text-[56px] text-[var(--text-primary)] font-bold leading-none">
              PROTOTYPE STATUS
            </h2>
          </FadeUp>
        </div>

        <FadeUp delay={160}>
          <div className="border border-[var(--border)] bg-[var(--card-bg)] px-5 py-3 font-mono text-[11px] text-[var(--text-secondary)] flex items-center gap-4 rounded-xs">
            <span className="text-[var(--text-muted)] uppercase tracking-wider font-bold">CURRENT HARDWARE:</span>
            <span className="text-[var(--text-primary)] font-bold">01 ASTRA DEVICE</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--text-primary)] font-bold">01 HUB DEVICE</span>
          </div>
        </FadeUp>
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusItems.map((item, i) => (
          <FadeUp key={i} delay={i * 90}>
            <div className="border border-[var(--border)] bg-[var(--card-bg)] p-6 md:p-8 rounded-xs hover:border-[var(--border-strong)] transition-all duration-300 relative group flex flex-col justify-between h-full">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--green)]" />
              
              <div>
                <div className="flex items-center justify-between mb-4 font-mono text-[10px]">
                  <span className="text-[var(--signal-red)] font-bold tracking-widest">{item.tag}</span>
                  <span className="text-[var(--green)] bg-green-500/10 border border-[var(--green)] px-2 py-0.5 font-bold rounded-xs">
                    {item.status}
                  </span>
                </div>

                <h3 className="font-space text-[20px] text-[var(--text-primary)] font-bold mb-3">
                  {item.title}
                </h3>

                <p className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center gap-2 font-mono text-[9px] text-[var(--text-muted)] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
                <span>Validated at hardware prototype level</span>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={300} className="mt-12 text-center">
        <p className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest">
          All three communication modes implemented and validated using physical prototype hardware.
        </p>
      </FadeUp>
    </section>
  );
}
