import React, { useRef, useEffect } from 'react';

/**
 * High-Performance Magnetic Element
 * Uses direct DOM manipulation on desktop with 0% React re-renders.
 * Completely bypassed on mobile / touch for maximum performance.
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const isPointerFine = useRef(false);

  useEffect(() => {
    isPointerFine.current = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768;
  }, []);

  const handleMouseMove = (e) => {
    if (!isPointerFine.current || !ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    ref.current.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate3d(0px, 0px, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
