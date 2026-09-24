import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const PATHS = [
  {
    id: 1,
    label: 'PATH 01',
    sublabel: 'DIRECT (4G CELLULAR)',
    nodes: ['ASTRA', 'Cellular (SIMCom)', 'Emergency Contact'],
    desc: 'Primary route. When cellular coverage is available, ASTRA sends the emergency alert directly via its SIMCom 4G LTE module.',
  },
  {
    id: 2,
    label: 'PATH 02',
    sublabel: 'DEVICE-TO-DEVICE RELAY',
    nodes: ['ASTRA A', 'LoRa Mesh', 'ASTRA B', 'Cellular', 'Emergency Contact'],
    desc: 'When ASTRA A has no cellular, it broadcasts via LoRa radio. A nearby ASTRA B receives the packet and relays the alert over its own cellular connection.',
  },
  {
    id: 3,
    label: 'PATH 03',
    sublabel: 'LOCAL INFRASTRUCTURE',
    nodes: ['ASTRA', 'LoRa Radio', 'MINI HUB', 'Onward Emergency Route'],
    desc: 'ASTRA transmits to a strategically placed local Mini Hub, providing onward connectivity without needing another user nearby.',
  },
];

export default function MultiPath() {
  const [activePath, setActivePath] = useState(null);
  const [hovered, setHovered] = useState(null);
  const { ref: headRef, inView: headInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (hovered !== null) return;
    const id = setInterval(() => {
      setActivePath(p => {
        if (p === null) return 1;
        if (p === 3) return null;
        return p + 1;
      });
    }, 2800);
    return () => clearInterval(id);
  }, [hovered]);

  const displayActive = hovered !== null ? hovered : activePath;

  return (
    <section id="system" className="py-20 md:py-32 px-6 max-w-[1440px] mx-auto overflow-hidden relative">
      <style>{`
        @keyframes packetSlide {
          0%   { transform: translateX(-200%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
      `}</style>

      {/* Header */}
      <div ref={headRef} className="mb-16 md:mb-20">
        <div
          className="overflow-hidden mb-4 transition-all duration-700"
          style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(40px)' }}
        >
          <div className="font-space font-bold text-[var(--text-primary)] leading-none"
            style={{ fontSize: 'clamp(64px, 9vw, 120px)' }}>
            ASTRA
          </div>
        </div>
        <div
          className="transition-all duration-700"
          style={{ opacity: headInView ? 1 : 0, transform: headInView ? 'translateY(0)' : 'translateY(24px)', transitionDelay: '200ms' }}
        >
          <h3 className="font-space text-[var(--text-primary)] leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            ONE SOS.<br />MULTIPLE COMMUNICATION PATHS.
          </h3>
          <p className="font-inter text-[17px] text-[var(--text-secondary)] max-w-[540px] leading-relaxed">
            ASTRA is evolving from a single cellular device into a multi-path emergency
            communication architecture — eliminating single points of failure.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Path cards */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4">
          <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest mb-2 uppercase flex items-center gap-2">
            <span>HOVER OR TAP A PATH TO INSPECT ROUTING</span>
            <span>↓</span>
          </div>

          {PATHS.map(path => {
            const isActive = displayActive === path.id;
            return (
              <div
                key={path.id}
                onMouseEnter={() => { setHovered(path.id); setActivePath(path.id); }}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActivePath(isActive ? null : path.id)}
                className={`p-6 border cursor-pointer transition-all duration-300 relative overflow-hidden rounded-xs ${
                  isActive
                    ? 'border-[var(--signal-red)] bg-[var(--signal-red-bg)] shadow-md'
                    : displayActive !== null
                    ? 'border-[var(--border)] opacity-50 bg-[var(--card-bg)]'
                    : 'border-[var(--border)] hover:border-[var(--border-strong)] bg-[var(--card-bg)]'
                }`}
              >
                {/* Active top line */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--signal-red)]" />
                )}

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className={`font-mono text-[10px] tracking-[0.2em] mb-0.5 ${isActive ? 'text-[var(--signal-red)] font-bold' : 'text-[var(--text-muted)]'}`}>
                      {path.label}
                    </div>
                    <div className={`font-space text-[14px] uppercase tracking-wider font-bold ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                      {path.sublabel}
                    </div>
                  </div>
                  <div className={`font-mono text-[9px] border px-2 py-1 transition-all duration-300 ${isActive ? 'border-[var(--signal-red)] text-[var(--signal-red)] bg-[var(--bg)]' : 'border-[var(--border)] text-[var(--text-muted)]'}`}>
                    {['DIRECT', 'RELAY', 'HUB'][path.id - 1]}
                  </div>
                </div>

                {/* Flow nodes */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4 font-mono text-[11px]">
                  {path.nodes.map((node, i) => (
                    <React.Fragment key={i}>
                      <span className={`transition-all duration-300 ${isActive ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)]'}`}>
                        {node}
                      </span>
                      {i < path.nodes.length - 1 && (
                        <span className={`text-[11px] mx-1 transition-colors ${isActive ? 'text-[var(--signal-red)] font-bold' : 'text-[var(--text-muted)]'}`}>→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Animated progress track line */}
                <div className="h-[2px] w-full bg-[var(--border)] relative overflow-hidden">
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 h-full bg-[var(--signal-red)]"
                      style={{ animation: 'packetSlide 1.8s linear infinite', width: '40%' }}
                    />
                  )}
                </div>

                {/* Expanded description */}
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: isActive ? '90px' : '0', marginTop: isActive ? '12px' : '0' }}
                >
                  <p className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed">
                    {path.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="flex items-center gap-3 mt-2">
            <div className="bg-[var(--signal-red)] text-white font-mono text-[8px] px-2 py-0.5 rounded-xs font-bold">SOS</div>
            <span className="font-mono text-[10px] text-[var(--text-muted)]">= active emergency packet travelling along path</span>
          </div>
        </div>

        {/* Prototype Image Column */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-center">
          <div className="relative w-full max-w-sm mx-auto">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(204,43,43,0.12) 0%, transparent 70%)',
                transition: 'opacity 0.5s',
                opacity: displayActive ? 1 : 0.3,
              }}
            />
            <img
              src="/images/astra-dark.png"
              alt="ASTRA hardware prototype"
              className="w-full h-auto object-contain relative z-10"
              style={{
                maskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 35%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 75% 85% at 50% 50%, black 35%, transparent 100%)',
              }}
            />
          </div>
          <div className="mt-6 text-center">
            <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-widest">
              PROTOTYPE 02 // MULTI-PATH ARCHITECTURE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}