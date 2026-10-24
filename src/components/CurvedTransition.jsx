import React, { useEffect, useRef, useState } from 'react';

/**
 * RESTART Signature Curved Section Transition
 * Bends organically into #171714 dark contact section.
 */
export default function CurvedTransition() {
  const containerRef = useRef(null);
  const [curveHeight, setCurveHeight] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = 1 - (rect.top / windowHeight);
        const height = Math.max(0, 100 * (1 - progress * 0.8));
        setCurveHeight(height);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100px] overflow-hidden -mb-[1px]">
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
        preserveAspectRatio="none"
      >
        <path
          d={`M0 100 C 480 ${100 - curveHeight} 960 ${100 - curveHeight} 1440 100 L 1440 100 L 0 100 Z`}
          fill="#171714"
        />
      </svg>
    </div>
  );
}
