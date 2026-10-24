import React, { useEffect, useRef } from 'react';

export default function GlassmorphicBackground({ className = "" }) {
  const cursorBlobRef = useRef(null);
  const targetPos = useRef({ x: -400, y: -400 });
  const currentPos = useRef({ x: -400, y: -400 });
  const animFrameId = useRef(null);
  const isPointerFine = useRef(false);

  useEffect(() => {
    // Only enable interactive cursor tracking on desktop with a real mouse
    isPointerFine.current = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768;

    if (!isPointerFine.current) return;

    let ticking = false;

    const handleMouseMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth lerp loop directly manipulating DOM (0% React re-renders = pure 120fps)
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateBloom = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08);

      if (cursorBlobRef.current) {
        cursorBlobRef.current.style.transform = `translate3d(${currentPos.current.x - 180}px, ${currentPos.current.y - 180}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(updateBloom);
    };

    animFrameId.current = requestAnimationFrame(updateBloom);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
      style={{ backgroundColor: '#F2F0E8', contain: 'strict' }}
    >
      {/* 1. LAYER A: HIGH-PERFORMANCE LIQUID GRADIENT BLOBS (Hardware Accelerated, Zero Layout Triggers) */}
      <div className="absolute inset-0 overflow-hidden" style={{ willChange: 'transform' }}>
        
        {/* Blob 1: Luminous Warm Ivory / Cream Core (Top Left) */}
        <div
          className="absolute -top-[12%] -left-[12%] w-[45vw] min-w-[320px] h-[45vw] min-h-[320px] rounded-full opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(255,248,231,0.85) 0%, rgba(245,230,204,0.5) 45%, transparent 72%)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            animation: 'gpu-blob-drift-1 26s ease-in-out infinite alternate',
          }}
        />

        {/* Blob 2: Sunshine Gold Glow (Center Right) */}
        <div
          className="absolute top-[20%] -right-[10%] w-[42vw] min-w-[300px] h-[42vw] min-h-[300px] rounded-full opacity-65"
          style={{
            background: 'radial-gradient(circle, rgba(255,228,158,0.75) 0%, rgba(255,210,119,0.45) 45%, transparent 70%)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            animation: 'gpu-blob-drift-2 30s ease-in-out infinite alternate',
          }}
        />

        {/* Blob 3: Growthub Mint Aurora Ribbon (Bottom Left) */}
        <div
          className="absolute -bottom-[12%] left-[8%] w-[45vw] min-w-[320px] h-[45vw] min-h-[320px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(166,253,224,0.7) 0%, rgba(106,251,192,0.4) 45%, transparent 70%)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            animation: 'gpu-blob-drift-1 28s ease-in-out infinite alternate-reverse',
          }}
        />

        {/* Blob 4: Soft Champagne Vanilla (Bottom Right) */}
        <div
          className="absolute -bottom-[10%] -right-[8%] w-[38vw] min-w-[280px] h-[38vw] min-h-[280px] rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(255,240,220,0.8) 0%, rgba(252,227,197,0.4) 45%, transparent 70%)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            animation: 'gpu-blob-drift-2 34s ease-in-out infinite alternate',
          }}
        />

        {/* Blob 5: Desktop Only — Cursor-Tracking Luminous Refraction Bloom (0% React overhead) */}
        <div
          ref={cursorBlobRef}
          className="absolute w-[360px] h-[360px] rounded-full opacity-55 pointer-events-none hidden md:block"
          style={{
            top: 0,
            left: 0,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,238,187,0.5) 40%, rgba(106,251,192,0.2) 65%, transparent 80%)',
            willChange: 'transform',
          }}
        />
      </div>

      {/* 2. LAYER B: OPTIMIZED FROSTED GLASS SURFACE */}
      {/* On desktop: silky 20px blur. On mobile: lightweight 8px blur or pure translucent mesh */}
      <div
        className="absolute inset-0 backdrop-blur-[12px] sm:backdrop-blur-[24px]"
        style={{
          background: 'linear-gradient(135deg, rgba(242, 240, 232, 0.6) 0%, rgba(245, 243, 236, 0.45) 50%, rgba(239, 236, 227, 0.65) 100%)',
        }}
      />

      {/* 3. LAYER C: HIGH-PERFORMANCE STATIC GRAIN */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />


    </div>
  );
}
