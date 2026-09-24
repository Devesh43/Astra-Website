import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function AstraToAstra() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setAnimStep(1), 400);
    const t2 = setTimeout(() => setAnimStep(2), 1600);
    const t3 = setTimeout(() => setAnimStep(3), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [inView]);

  return (
    <section className="py-24 md:py-36 px-6 max-w-[1440px] mx-auto border-t border-[var(--border)]">
      <div className="flex flex-col lg:flex-row gap-16 items-center">

        {/* LEFT — Diagram */}
        <div ref={ref} className="w-full lg:w-1/2">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 md:p-10 relative overflow-hidden min-h-[340px] rounded-xs shadow-lg">

            {/* Top row: two devices */}
            <div className="flex justify-between items-start mb-8">
              {/* ASTRA A */}
              <div className="flex flex-col items-center gap-2">
                <div className="font-mono text-[11px] text-[var(--text-secondary)] tracking-widest font-bold">ASTRA A</div>
                <div
                  className="border font-mono text-[11px] px-3 py-1.5 transition-all duration-700"
                  style={{
                    borderColor: animStep >= 1 ? 'var(--signal-red)' : 'var(--border)',
                    color: animStep >= 1 ? 'var(--signal-red)' : 'var(--text-muted)',
                    backgroundColor: animStep >= 1 ? 'var(--signal-red-bg)' : 'transparent',
                  }}
                >
                  NO CELLULAR SIGNAL
                </div>
                {/* Transmitting waves */}
                <div
                  className="flex items-center gap-1 font-mono text-[11px] transition-all duration-700"
                  style={{ opacity: animStep >= 1 ? 1 : 0 }}
                >
                  {[')', ')', ')'].map((p, i) => (
                    <span
                      key={i}
                      className="text-[var(--signal-red)] font-bold"
                      style={{
                        animation: animStep >= 1 ? `pulse 1.2s ease-in-out ${i * 200}ms infinite` : 'none',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                  <span className="text-[var(--text-muted)] ml-1 tracking-widest text-[9px] font-bold">LoRa Mesh</span>
                  {[' (', '(', '('].map((p, i) => (
                    <span
                      key={i}
                      className="text-[var(--green)] font-bold"
                      style={{
                        animation: animStep >= 1 ? `pulse 1.2s ease-in-out ${i * 200}ms infinite` : 'none',
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* ASTRA B */}
              <div className="flex flex-col items-center gap-2">
                <div className="font-mono text-[11px] text-[var(--text-secondary)] tracking-widest font-bold">ASTRA B</div>
                <div
                  className="border font-mono text-[11px] px-3 py-1.5 transition-all duration-700"
                  style={{
                    borderColor: animStep >= 2 ? 'var(--green)' : 'var(--border)',
                    color: animStep >= 2 ? 'var(--green)' : 'var(--text-muted)',
                    backgroundColor: animStep >= 2 ? 'rgba(61,153,112,0.06)' : 'transparent',
                  }}
                >
                  CELLULAR READY
                </div>
              </div>
            </div>

            {/* Middle — relay arrow */}
            <div className="relative h-12 mb-8">
              <div
                className="absolute top-1/2 -translate-y-1/2 left-[12%] right-[12%] h-px transition-all duration-700"
                style={{
                  background: animStep >= 2
                    ? 'linear-gradient(to right, var(--signal-red), var(--green))'
                    : 'var(--border)',
                }}
              />
              {/* Packet */}
              {animStep >= 2 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-[12%]"
                  style={{ animation: 'packetRelay 2s linear infinite' }}
                >
                  <div className="bg-[var(--signal-red)] text-white font-mono text-[8px] px-1.5 py-0.5 whitespace-nowrap font-bold rounded-xs">
                    SOS / AST_A / LAT_LON
                  </div>
                </div>
              )}
              {/* Arrow head */}
              <div
                className="absolute top-1/2 -translate-y-1/2 right-[12%] transition-all duration-700"
                style={{ opacity: animStep >= 2 ? 1 : 0 }}
              >
                <div className="w-0 h-0"
                  style={{
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: '7px solid var(--green)',
                  }}
                />
              </div>
            </div>

            {/* ASTRA B → Cellular → Contact */}
            <div className="flex flex-col items-end gap-1">
              <div
                className="flex items-center gap-3 transition-all duration-700"
                style={{ opacity: animStep >= 3 ? 1 : 0, transform: animStep >= 3 ? 'translateX(0)' : 'translateX(20px)' }}
              >
                <div className="font-mono text-[10px] text-[var(--green)] tracking-widest font-bold">ASTRA B</div>
                <div className="text-[var(--green)] text-[10px]">→</div>
                <div className="border border-[var(--green)] font-mono text-[10px] text-[var(--green)] px-2 py-1">4G CELLULAR</div>
                <div className="text-[var(--green)] text-[10px]">→</div>
                <div className="border border-[var(--border)] font-mono text-[10px] text-[var(--text-primary)] px-2 py-1 bg-[var(--bg)] font-bold">CONTACT</div>
              </div>
              {animStep >= 3 && (
                <div className="font-mono text-[9px] text-[var(--green)] tracking-widest animate-pulse font-bold mt-2">
                  ✓ RELAYED EMERGENCY ALERT DELIVERED
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — Text */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--signal-red)] mb-6 font-bold">
            DEVICE-TO-DEVICE LORA RELAY
          </div>
          <h2
            className="font-space text-[var(--text-primary)] leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(34px, 4vw, 52px)' }}
          >
            YOUR NETWORK FAILED.<br />THE MESSAGE<br />DIDN'T HAVE TO.
          </h2>
          <p className="font-inter text-[16px] text-[var(--text-secondary)] mb-10 leading-relaxed max-w-md">
            When ASTRA A cannot reach its primary cellular route, it broadcasts a small
            emergency packet via LoRa radio. A nearby ASTRA B — within LoRa range and with
            cellular access — receives and forwards the alert.
          </p>
          <div className="border border-[var(--border)] bg-[var(--card-bg)] p-5 font-mono text-[11px] text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-muted)] tracking-widest font-bold">TECHNICAL NOTE ·</span>{' '}
            Relay availability depends on nearby compatible devices, radio conditions and network
            availability. ASTRA is designed to reduce single-point failure, not guarantee
            communication under every possible condition.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes packetRelay {
          0%   { transform: translateY(-50%) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(-50%) translateX(calc(100% + 40px)); opacity: 0; }
        }
      `}</style>
    </section>
  );
}