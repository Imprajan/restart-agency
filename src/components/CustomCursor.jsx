import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomCursor({ activeProject, isHoveringInteractive }) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const isPointerFine = useRef(false);

  useEffect(() => {
    isPointerFine.current = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768;
    if (!isPointerFine.current) return;

    let ticking = false;

    const handleMouseMove = (e) => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          if (!isVisible) setIsVisible(true);
          ticking = false;
        });
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Completely disabled on mobile and touch screens for maximum battery and FPS
  if (!isVisible) return null;

  return (
    <>
      {/* 1. Small Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990] hidden md:block"
        animate={{
          x: mousePosition.x - (activeProject ? 40 : isHoveringInteractive ? 20 : 6),
          y: mousePosition.y - (activeProject ? 40 : isHoveringInteractive ? 20 : 6),
          scale: activeProject ? 1 : isHoveringInteractive ? 1.5 : 1,
          opacity: 1
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.15
        }}
      >
        {activeProject ? (
          <div className="w-20 h-20 rounded-full bg-[#6AFBC0] text-[#171714] flex items-center justify-center font-bold text-xs shadow-2xl tracking-wide select-none border-2 border-[#171714] font-sora">
            View
          </div>
        ) : (
          <div
            className={`rounded-full transition-all duration-150 ${
              isHoveringInteractive
                ? 'w-9 h-9 border-2 border-[#171714] bg-[#6AFBC0]/30'
                : 'w-3 h-3 bg-[#171714]'
            }`}
          />
        )}
      </motion.div>

      {/* 2. Floating Project Image Preview Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: mousePosition.x - 175,
              y: mousePosition.y - 125,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 22,
              stiffness: 240,
              mass: 0.25
            }}
            className="fixed top-0 left-0 pointer-events-none z-[9985] w-[320px] h-[220px] rounded-2xl overflow-hidden border-2 border-[#171714] shadow-[6px_6px_0px_#171714] hidden md:block"
            style={{ backgroundColor: activeProject.color || '#171714' }}
          >
            <img
              src={activeProject.image}
              alt={activeProject.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171714]/85 via-transparent to-transparent flex items-end p-4">
              <span className="text-[#F2F0E8] text-xs font-sora font-bold tracking-wide">
                {activeProject.client} • {activeProject.year}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
