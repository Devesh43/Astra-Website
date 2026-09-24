import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const labelRef = useRef(null);
  const textRef = useRef(null);
  const btnsRef = useRef(null);
  const statusRef = useRef(null);
  const imgRef = useRef(null);
  const glowRef = useRef(null);
  const signalLineRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(
        [line1Ref.current, line2Ref.current, line3Ref.current,
          labelRef.current, textRef.current, btnsRef.current, statusRef.current, imgRef.current, signalLineRef.current],
        { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', scaleX: 1, y: 0 }
      );
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current],
      { clipPath: 'inset(0 100% 0 0)' });
    gsap.set([labelRef.current, textRef.current, btnsRef.current, statusRef.current],
      { autoAlpha: 0, y: 16 });
    gsap.set(imgRef.current, { autoAlpha: 0, scale: 0.97 });
    gsap.set(signalLineRef.current, { scaleX: 0, transformOrigin: 'left center', autoAlpha: 0 });

    tl
      .to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
      .to(line1Ref.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out' }, 0.2)
      .to(line2Ref.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out' }, 0.38)
      .to(line3Ref.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.7, ease: 'power3.out' }, 0.56)
      // Short signal line accent reveals cleanly after heading finishes
      .to(signalLineRef.current, { autoAlpha: 1, scaleX: 1, duration: 0.6, ease: 'power3.out' }, 0.75)
      .to(imgRef.current, { autoAlpha: 1, scale: 1, duration: 1, ease: 'power2.out' }, 0.3)
      .to(textRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.9)
      .to(btnsRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.05)
      .to(statusRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.15);

  }, [imgLoaded]);

  // Desktop Pointer Tilt (±2deg max, disabled on touch)
  const handleMouseMove = (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      ry: (x / (rect.width / 2)) * 2,
      rx: -(y / (rect.height / 2)) * 2,
    });
  };

  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[var(--bg)] flex flex-col md:flex-row items-center overflow-hidden transition-colors duration-250"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none opacity-60" />

      <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row items-center px-6 pt-24 pb-12 md:py-0 md:min-h-screen">
        {/* LEFT Column */}
        <div className="w-full md:w-1/2 flex flex-col z-10 relative">
          <div
            ref={labelRef}
            className="font-mono text-[10px] text-[var(--text-secondary)] tracking-[0.22em] mb-6 uppercase flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--signal-red)] animate-pulse" />
            <span>ASTRA // PERSONAL SAFETY HARDWARE // PROTOTYPE 02</span>
          </div>

          <h1
            className="font-space font-bold leading-[0.93] text-[var(--text-primary)] flex flex-col gap-0"
            style={{ fontSize: 'clamp(58px, 7.5vw, 96px)' }}
          >
            <span ref={line1Ref} className="block" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              ONE SOS.
            </span>
            <span ref={line2Ref} className="block" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              MULTIPLE
            </span>
            <span ref={line3Ref} className="block" style={{ clipPath: 'inset(0 100% 0 0)' }}>
              PATHS.
            </span>
          </h1>

          {/* Short Signal Line Accent (anchored underneath heading, 120px wide) */}
          <div className="mt-5 flex items-center gap-3">
            <div
              ref={signalLineRef}
              className="w-32 h-[2px] bg-[var(--signal-red)]"
              style={{ transformOrigin: 'left center' }}
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-red)] animate-ping" />
          </div>

          <div ref={textRef} className="mt-6" style={{ opacity: 0 }}>
            <p className="font-inter text-[16px] text-[var(--text-secondary)] max-w-[440px] leading-relaxed">
              A resilient personal-safety device designed to keep an emergency alert
              moving when a single communication network cannot.
            </p>
          </div>

          <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 mt-8" style={{ opacity: 0 }}>
            <button
              onClick={() => scrollTo('demo')}
              className="bg-[var(--signal-red)] text-white font-bold border border-[var(--signal-red)] px-6 py-3 font-mono text-[11px] tracking-[0.15em] uppercase hover:bg-transparent hover:text-[var(--signal-red)] transition-all duration-300 shadow-md"
            >
              TEST INTERACTIVE DEMO
            </button>
            <button
              onClick={() => scrollTo('system')}
              className="bg-transparent text-[var(--text-primary)] border border-[var(--border-strong)] px-6 py-3 font-mono text-[11px] tracking-[0.15em] uppercase hover:border-[var(--text-primary)] transition-all duration-300"
            >
              EXPLORE ARCHITECTURE
            </button>
          </div>

          <div ref={statusRef} className="flex items-center gap-3 mt-10" style={{ opacity: 0 }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]" />
            </span>
            <span className="font-mono text-[10px] text-[var(--text-secondary)] tracking-[0.18em] uppercase font-bold">
              WORKING PROTOTYPE / 3 COMMUNICATION PATHS DEMONSTRATED
            </span>
          </div>
        </div>

        {/* RIGHT Column — Device Photo with subtle tilt */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 relative flex justify-center items-center mt-12 md:mt-0 h-[55vw] md:h-screen max-h-[700px] select-none"
        >
          {/* Subtle Glow behind device */}
          <div
            ref={glowRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-[65%] h-[65%] rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(204,43,43,0.12) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </div>

          <img
            ref={imgRef}
            src="/images/astra-dark.png"
            alt="ASTRA prototype device — dark background with illuminated red LED"
            onLoad={() => setImgLoaded(true)}
            className="max-w-[85%] md:max-w-[90%] h-auto max-h-[80vh] object-contain relative z-10 transition-transform duration-200 ease-out"
            style={{
              maskImage: 'radial-gradient(ellipse 72% 82% at 52% 50%, black 35%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 72% 82% at 52% 50%, black 35%, transparent 100%)',
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              opacity: 0,
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-mono text-[9px] tracking-[0.2em] text-[var(--text-muted)] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--text-muted)] to-transparent" />
      </div>
    </section>
  );
}