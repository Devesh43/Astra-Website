import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const components = [
  {
    id: 'esp32',
    name: 'ESP32-S3',
    code: 'MCU_01',
    desc: 'Central microcontroller. Coordinates peripheral modules, executes state logic and provides BLE support.',
    round2: false,
    top: '68%', left: '18%',
    behavior: 'ESP32 OUTWARD SIGNAL TRACES',
    behaviorDetail: 'SPI / I2C / UART Bus Active'
  },
  {
    id: 'gnss',
    name: 'GNSS / GPS MODULE',
    code: 'GNSS_01',
    desc: 'Location acquisition. Calculates latitude & longitude via direct satellite RF reception — no internet required.',
    round2: false,
    top: '22%', left: '14%',
    behavior: 'GPS SATELLITE LOCK',
    behaviorDetail: 'Constellation Fix: 28.6219° N, 77.0878° E'
  },
  {
    id: 'cell',
    name: 'SIMCom A7670C',
    code: 'CELL_01',
    desc: '4G LTE Cat-1 cellular module. Transmits SMS emergency alerts over conventional cellular networks.',
    round2: false,
    top: '72%', left: '58%',
    behavior: 'CELLULAR SIGNAL TRANSMIT',
    behaviorDetail: '4G Band 3/5/8 · SMS Gateway Link'
  },
  {
    id: 'gps_ant',
    name: 'GPS PATCH ANTENNA',
    code: 'ANT_GPS',
    desc: 'Ceramic patch antenna tuned for 1575.42MHz GNSS signals. Requires sky exposure for optimal 3D fix.',
    round2: false,
    top: '38%', left: '54%',
    behavior: 'L1 RF RECEPTION',
    behaviorDetail: 'Gain: 28dB · Active LNA'
  },
  {
    id: 'oled',
    name: 'OLED DISPLAY',
    code: 'STATUS_OUT',
    desc: '0.96" SSD1306 I2C display. Displays real-time device status, system diagnostics and trigger readiness.',
    round2: false,
    top: '12%', left: '62%',
    behavior: 'OLED PREVIEW GLOW',
    behaviorDetail: '[ASTRA OS v1.2] [GPS: FIX] [READY]'
  },
  {
    id: 'sos',
    name: 'SOS TRIGGER',
    code: 'SOS_IN',
    desc: 'Dedicated physical push button. Immediate hardware interrupt trigger for emergency alert dispatch.',
    round2: false,
    top: '3%', left: '72%',
    behavior: 'HARDWARE INTERRUPT (GPIO)',
    behaviorDetail: 'Debounced Physical Input'
  },
  {
    id: 'buzzer',
    name: 'BUZZER + STATUS LED',
    code: 'STATUS_LED',
    desc: 'Audible transducer and high-intensity status LED. Confirms SOS dispatch and indicates battery status.',
    round2: false,
    top: '40%', left: '30%',
    behavior: 'TACTILE AUDIO-VISUAL FEEDBACK',
    behaviorDetail: 'State Pulse & Audible Chirp'
  },
  {
    id: 'lora',
    name: 'LoRa MODULE',
    code: 'RADIO_LORA',
    desc: 'Long-range sub-GHz radio transceiver for peer-to-peer device relay and Mini Hub packet transmission.',
    round2: true,
    top: '82%', left: '20%',
    behavior: 'ROUND 2 ARCHITECTURE',
    behaviorDetail: '868MHz / 915MHz LoRa Mesh Protocol'
  },
];

function FadeUp({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

export default function InsideAstra() {
  const [activeComp, setActiveComp] = useState(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef(null);

  const active = components.find(c => c.id === activeComp);

  // Desktop Pointer Tilt (±2 degrees max, disabled on touch)
  const handleMouseMove = (e) => {
    if (!window.matchMedia('(hover: hover)').matches || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const ry = (x / (rect.width / 2)) * 2; // max ±2deg
    const rx = -(y / (rect.height / 2)) * 2;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section id="hardware" className="py-20 md:py-32 px-4 md:px-6 max-w-[1440px] mx-auto border-t border-[var(--border)]">
      <FadeUp className="text-center mb-16 md:mb-20">
        <div className="font-mono text-[10px] tracking-[0.22em] text-[var(--signal-red)] uppercase mb-4">
          HARDWARE ARCHITECTURE
        </div>
        <h2 className="font-space text-[36px] md:text-[64px] text-[var(--text-primary)] leading-[1.05]">
          ENGINEERED FROM THE SIGNAL UP.
        </h2>
      </FadeUp>

      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
        {/* Device photograph with hotspots and tilt */}
        <FadeUp delay={100} className="w-full xl:w-[52%]">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative inline-block w-full transition-transform duration-200 ease-out select-none"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            }}
          >
            <img
              src="/images/astra-lit.png"
              alt="ASTRA hardware prototype teardown — real electronics photograph"
              className={`w-full h-auto object-contain transition-all duration-500 ${activeComp ? 'brightness-[0.6] contrast-[1.1]' : 'brightness-100'}`}
              style={{ maxHeight: '620px', display: 'block', margin: '0 auto' }}
            />

            {/* Hotspot Annotation Target Rings */}
            {components.map((comp) => {
              const isSelected = activeComp === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setActiveComp(isSelected ? null : comp.id)}
                  title={`${comp.name} (${comp.code})`}
                  className="absolute group z-20 focus:outline-none"
                  style={{ top: comp.top, left: comp.left, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Outer pulse target ring */}
                  <span
                    className={`absolute -inset-3 rounded-full transition-all duration-300 ${
                      isSelected ? 'border-2 border-[var(--signal-red)] bg-[var(--signal-red-bg)] animate-pulse' : 'border border-[var(--signal-red)]/30 group-hover:border-[var(--signal-red)]'
                    }`}
                  />
                  {/* Target Center Dot */}
                  <span
                    className={`block w-3.5 h-3.5 rounded-full border transition-all duration-300 ${
                      isSelected
                        ? 'bg-[var(--signal-red)] border-white scale-125 shadow-[0_0_10px_rgba(204,43,43,0.8)]'
                        : comp.round2
                        ? 'bg-amber-500/80 border-amber-400 group-hover:scale-110'
                        : 'bg-[var(--surface)] border-[var(--signal-red)] group-hover:scale-110'
                    }`}
                  />
                  {/* Micro label tag */}
                  <span className={`absolute left-full ml-2 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-wider whitespace-nowrap bg-[var(--bg)] border border-[var(--border)] px-1.5 py-0.5 z-30 transition-all duration-200 ${
                    isSelected ? 'text-[var(--signal-red)] border-[var(--signal-red)] opacity-100' : 'text-[var(--text-muted)] opacity-0 group-hover:opacity-100'
                  }`}>
                    {comp.code}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Component Detail & System Behavior Preview */}
          <div
            className="mt-4 border border-[var(--border)] bg-[var(--card-bg)] p-5 transition-all duration-300"
            style={{ minHeight: '110px' }}
          >
            {active ? (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[var(--signal-red)] tracking-[0.2em] font-bold">{active.code}</span>
                    <span className="font-space text-[15px] text-[var(--text-primary)] font-bold">{active.name}</span>
                  </div>
                  {active.round2 ? (
                    <span className="font-mono text-[8px] border border-amber-500 text-amber-500 px-2 py-0.5 uppercase tracking-wider font-bold">
                      ROUND 2 ARCHITECTURE
                    </span>
                  ) : (
                    <span className="font-mono text-[8px] border border-[var(--green)] text-[var(--green)] px-2 py-0.5 uppercase tracking-wider">
                      V1 DEMONSTRATED
                    </span>
                  )}
                </div>
                <div className="font-inter text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">
                  {active.desc}
                </div>
                
                {/* Relevant System Behavior Animation Preview */}
                <div className="pt-2 border-t border-[var(--border)] flex items-center gap-2 font-mono text-[10px] text-[var(--signal-red)]">
                  <span className="animate-pulse">●</span>
                  <span className="font-bold">{active.behavior}:</span>
                  <span className="text-[var(--text-secondary)]">{active.behaviorDetail}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-2">
                <div className="font-mono text-[11px] text-[var(--text-secondary)] tracking-widest uppercase mb-1">
                  INTERACTIVE HARDWARE EXPLORER
                </div>
                <div className="font-mono text-[10px] text-[var(--text-muted)]">
                  Tap any component target on the prototype image above to inspect engineering specifications.
                </div>
              </div>
            )}
          </div>
        </FadeUp>

        {/* Component List Column */}
        <div className="w-full xl:w-[48%]">
          <FadeUp delay={150}>
            <h3 className="font-space text-[28px] md:text-[36px] text-[var(--text-primary)] mb-8">Component Breakdown</h3>
          </FadeUp>

          <div className="flex flex-col gap-0 border-t border-[var(--border)]">
            {components.map((item, i) => {
              const isSelected = activeComp === item.id;
              return (
                <FadeUp key={item.id} delay={180 + i * 50}>
                  <button
                    onClick={() => setActiveComp(isSelected ? null : item.id)}
                    className={`w-full text-left py-4 px-3 border-b border-[var(--border)] flex items-start justify-between gap-4 group transition-all duration-200 ${
                      isSelected ? 'bg-[var(--surface-hover)] border-l-2 border-l-[var(--signal-red)]' : 'hover:bg-[var(--surface)]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`mt-1 text-[10px] transition-colors ${isSelected ? 'text-[var(--signal-red)]' : 'text-[var(--text-muted)] group-hover:text-[var(--signal-red)]'}`}>◆</span>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`font-mono text-[13px] tracking-wider transition-colors ${isSelected ? 'text-[var(--text-primary)] font-bold' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                            {item.name}
                          </span>
                          {item.round2 && (
                            <span className="font-mono text-[8px] border border-amber-500 text-amber-500 px-1.5 py-0.5">
                              ROUND 2
                            </span>
                          )}
                        </div>
                        <div className={`font-inter text-[12px] text-[var(--text-secondary)] leading-relaxed transition-all duration-300 overflow-hidden ${
                          isSelected ? 'max-h-24 mt-1 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] text-[var(--text-muted)] transition-transform duration-200 mt-0.5 ${isSelected ? 'rotate-90 text-[var(--signal-red)]' : ''}`}>
                      →
                    </span>
                  </button>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}