import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { X, ArrowUpRight } from 'lucide-react';
import { CipherReveal } from './CipherGhostText';

export default function NavigationDrawer({ isOpen, onClose, onNavigate, socials, onReopenFlashlight }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: "Home", target: "hero", number: "01" },
    { label: "Our Hustle", target: "hustle", number: "02" },
    { label: "The Growth Method", target: "method", number: "03" },
    { label: "Our Packages", target: "pricing", number: "04" },
    { label: "FAQs", target: "faq", number: "05" },
    { label: "Book a Call", target: "contact", number: "06" }
  ];

  const menuSlide = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const curveVariants = {
    initial: {
      d: `M100 0 L100 ${dimensions.height} Q-100 ${dimensions.height / 2} 100 0`
    },
    enter: {
      d: `M100 0 L100 ${dimensions.height} Q100 ${dimensions.height / 2} 100 0`,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: `M100 0 L100 ${dimensions.height} Q-100 ${dimensions.height / 2} 100 0`,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#171714]/80 z-50 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed top-0 right-0 h-screen w-full max-w-[540px] bg-[#171714] z-[60] text-[#F2F0E8] flex flex-col justify-between p-8 sm:p-14 shadow-2xl border-l border-[#77766F]/20 font-sans"
          >
            {/* SVG Curve on left border */}
            <svg className="absolute top-0 -left-[99px] w-[100px] h-full stroke-none fill-[#171714] pointer-events-none">
              <motion.path variants={curveVariants} initial="initial" animate="enter" exit="exit" />
            </svg>

            {/* Header with Close & Flashlight Room buttons */}
            <div className="flex items-center justify-between pb-6 border-b border-[#77766F]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8FF3D]"></span>
                <span className="text-xs font-mono tracking-widest text-[#77766F] uppercase">
                  <CipherReveal text="NAVIGATION INDEX" autoStart={true} />
                </span>
              </div>

              <div className="flex items-center gap-3">
                {onReopenFlashlight && (
                  <button
                    onClick={() => {
                      onClose();
                      onReopenFlashlight();
                    }}
                    className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#77766F]/40 text-[#77766F] hover:text-[#C8FF3D] hover:border-[#C8FF3D] transition-colors cursor-pointer"
                  >
                    🔦 Shader Prologue
                  </button>
                )}

                <Magnetic strength={0.4}>
                  <button
                    onClick={onClose}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#C8FF3D] hover:text-[#171714] transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Navigation Links with Bricolage Grotesque font */}
            <div className="flex flex-col gap-5 my-auto py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.target}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className="group flex items-baseline gap-4 cursor-pointer"
                  onClick={() => {
                    onNavigate(link.target);
                    onClose();
                  }}
                >
                  <span className="text-xs font-mono text-[#77766F] group-hover:text-[#C8FF3D] transition-colors">
                    {link.number}
                  </span>
                  <div className="overflow-hidden font-heading">
                    <span className="text-3xl sm:text-5xl font-light tracking-tight text-[#F2F0E8] group-hover:translate-x-3 group-hover:text-[#C8FF3D] transition-all duration-300 inline-block">
                      {link.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Socials in Drawer */}
            <div className="pt-6 border-t border-[#77766F]/20">
              <span className="block text-[11px] font-mono text-[#77766F] uppercase tracking-wider mb-4">
                Global Network
              </span>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#F2F0E8]">
                {socials.map((social) => (
                  <Magnetic key={social.name} strength={0.3}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#C8FF3D] flex items-center gap-1 transition-colors"
                    >
                      {social.name}
                      <ArrowUpRight size={12} className="opacity-60" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
