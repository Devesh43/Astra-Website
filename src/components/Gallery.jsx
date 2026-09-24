import React, { useState, useEffect } from 'react';
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

const GALLERY_IMAGES = [
  {
    id: 1,
    src: '/images/astra-dark.png',
    title: 'HERO PROTOTYPE',
    caption: 'Dark studio environment with illuminated red status LED & OLED display.',
    alt: 'ASTRA prototype — dark top-down shot with illuminated status LED',
  },
  {
    id: 2,
    src: '/images/astra-table.jpg',
    title: 'REAL-WORLD CONTEXT',
    caption: 'ASTRA prototype standing vertically in desktop testing environment.',
    alt: 'ASTRA prototype standing vertically on office table',
  },
  {
    id: 3,
    src: '/images/astra-lit.png',
    title: 'HARDWARE TEARDOWN',
    caption: 'Clear component assembly view — ESP32, SIMCom 4G, GNSS module & SOS trigger.',
    alt: 'ASTRA hardware prototype — clear illuminated component layout',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section id="prototype" className="py-24 md:py-36 bg-[var(--bg)] border-t border-[var(--border)] px-6">
      <div className="max-w-[1440px] mx-auto">

        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <FadeUp>
              <div className="font-mono text-[10px] tracking-[0.25em] text-[var(--signal-red)] uppercase mb-3 font-bold">
                / PROTOTYPE 01
              </div>
            </FadeUp>
            <FadeUp delay={80}>
              <h2 className="font-space text-[40px] md:text-[56px] text-[var(--text-primary)] font-bold leading-none">
                BUILT.<br />TESTED.<br />ITERATED.
              </h2>
            </FadeUp>
          </div>

          <FadeUp delay={160} className="md:text-right font-mono text-[10px] text-[var(--text-muted)] leading-relaxed uppercase tracking-widest">
            <div>PHYSICAL HARDWARE</div>
            <div>ENGINEERING PROTOTYPE</div>
            <div className="text-[var(--text-primary)] font-bold mt-1">ASTRA / 2026</div>
          </FadeUp>
        </div>

        {/* DESKTOP: Clean 1-Row 3-Column Contact Sheet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <FadeUp key={img.id} delay={i * 100}>
              <div
                onClick={() => setLightbox(img)}
                className="group border border-[var(--border)] bg-[var(--card-bg)] rounded-xs overflow-hidden cursor-zoom-in hover:border-[var(--border-strong)] transition-all duration-300 flex flex-col h-[420px] md:h-[460px]"
              >
                {/* Image Container with contain fit to preserve framing */}
                <div className="w-full flex-1 bg-[#050505] p-6 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                  <span className="absolute top-3 right-3 font-mono text-[8px] border border-[var(--border)] text-[var(--text-muted)] px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity uppercase bg-[var(--bg)]">
                    CLICK TO ZOOM
                  </span>
                </div>

                {/* Caption Bar */}
                <div className="p-5 border-t border-[var(--border)] bg-[var(--card-bg)]">
                  <div className="flex items-center justify-between mb-1 font-mono text-[10px]">
                    <span className="text-[var(--signal-red)] font-bold tracking-widest">{img.title}</span>
                    <span className="text-[var(--text-muted)]">0{img.id}</span>
                  </div>
                  <p className="font-inter text-[12px] text-[var(--text-secondary)] leading-relaxed">
                    {img.caption}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center cursor-zoom-out p-6"
          onClick={() => setLightbox(null)}
        >
          <div className="absolute top-6 right-6 font-mono text-[11px] text-white/70 tracking-widest bg-black/50 px-3 py-1.5 border border-white/20">
            ESC / CLICK TO CLOSE
          </div>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-[92vw] max-h-[85vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
          <div className="mt-4 font-mono text-[11px] text-white/80 tracking-widest text-center max-w-xl px-4 bg-black/60 py-2 border border-white/10">
            {lightbox.caption}
          </div>
        </div>
      )}
    </section>
  );
}