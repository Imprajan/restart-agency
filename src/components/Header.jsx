import React, { useEffect, useState } from 'react';
import Magnetic from './Magnetic';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu } from 'lucide-react';

export default function Header({ studio, onOpenMenu, onScrollTo }) {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 md:px-10 py-4 sm:py-5 pointer-events-none font-sora">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Bar with [P] Avatar & Believer of the Craft */}
        <div className="pointer-events-auto flex items-center">
          <Magnetic strength={0.3}>
            <button
              onClick={() => onScrollTo('hero')}
              className="flex items-center gap-3 cursor-pointer group text-left select-none"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#171714] text-[#F2F0E8] border-2 border-[#171714] flex items-center justify-center font-extrabold text-base sm:text-lg shadow-[2px_2px_0px_#171714] group-hover:scale-105 transition-transform font-sora">
                R
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-sora font-extrabold text-sm sm:text-base tracking-tight text-[#171714]">
                    {studio?.wordmark || "RESTART"}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-[#00E575] text-[#171714] text-[9px] font-extrabold font-mono tracking-wider border border-[#171714]">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#77766F] -mt-0.5">
                  {studio?.descriptor || "Let's Restart That Bitch"}
                </span>
              </div>
            </button>
          </Magnetic>
        </div>

        {/* Center Floating Desktop Nav Links Bar (Screenshot Style) */}
        <nav className="pointer-events-auto hidden lg:flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-2xl border-2 border-[#171714] shadow-[0_10px_35px_rgba(0,0,0,0.05),3px_3px_0px_#171714]">
          {[
            { label: 'Our Hustle', target: 'hustle' },
            { label: 'The Growth Method', target: 'method' },
            { label: 'Packages', target: 'pricing' },
            { label: 'FAQs', target: 'faq' },
            { label: 'Book a Call', target: 'contact' }
          ].map((item) => (
            <Magnetic key={item.label} strength={0.2}>
              <button
                onClick={() => onScrollTo(item.target)}
                className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold text-[#171714] hover:bg-[#171714] hover:text-[#00E575] transition-all duration-150 cursor-pointer"
              >
                {item.label}
              </button>
            </Magnetic>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Trigger */}
        <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
          {/* Quick Action Button: BOOK A CALL */}
          <Magnetic strength={0.35}>
            <button
              onClick={() => onScrollTo('contact')}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#00E575] text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] hover:shadow-[4px_4px_0px_#171714] hover:bg-[#6AFBC0] hover:-translate-x-0.5 hover:-translate-y-0.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer"
            >
              <span>BOOK A CALL</span>
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </button>
          </Magnetic>

          {/* Fullscreen Drawer Menu Button */}
          <Magnetic strength={0.35}>
            <button
              onClick={onOpenMenu}
              aria-label="Toggle navigation menu"
              className="w-10 h-10 rounded-full bg-white text-[#171714] border-2 border-[#171714] shadow-[2px_2px_0px_#171714] hover:bg-[#FFD277] hover:shadow-[3px_3px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <Menu size={17} />
            </button>
          </Magnetic>
        </div>

      </div>
    </header>
  );
}
