import React, { useEffect, useRef } from 'react';
import GrowthubVideoTracks from './GrowthubVideoTracks';
import GhostTypewriter from './GhostTypewriter';
import Magnetic from './Magnetic';
import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ studio, projects = [], onSelectProject, onScrollTo }) {
  const headlineTiltRef = useRef(null);
  const trackTiltRef = useRef(null);
  const rafId = useRef(null);

  // Dynamic 3D mouse parallax floating system (smooth lerp, 0% React re-render overhead)
  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768;
    if (!isDesktop) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;

    let targetTrackY = 0;
    let currentTrackY = 0;

    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRotateX = ((e.clientY - cy) / cy) * -3.5;
      targetRotateY = ((e.clientX - cx) / cx) * 4.5;
      targetTrackY = ((e.clientY - cy) / cy) * -10;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateTilt = () => {
      currentRotateX = lerp(currentRotateX, targetRotateX, 0.07);
      currentRotateY = lerp(currentRotateY, targetRotateY, 0.07);
      currentTrackY = lerp(currentTrackY, targetTrackY, 0.07);

      if (headlineTiltRef.current) {
        headlineTiltRef.current.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) translate3d(0, ${(currentRotateX * 1.2).toFixed(1)}px, 0)`;
      }

      if (trackTiltRef.current) {
        trackTiltRef.current.style.transform = `perspective(1000px) rotateX(${(-currentRotateX * 0.6).toFixed(2)}deg) rotateY(${(-currentRotateY * 0.6).toFixed(2)}deg) translate3d(0, ${currentTrackY.toFixed(1)}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updateTilt);
    };

    rafId.current = requestAnimationFrame(updateTilt);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <section id="hero" className="relative pt-24 sm:pt-28 pb-10 sm:pb-12 px-4 sm:px-8 md:px-12 bg-transparent text-[#171714] overflow-hidden font-sora">
      
      {/* Hero Centerpiece: Headline and Content Grid Placed at the Top Level */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
        
        {/* Left Column: Levitating & Floating Headline + Green Box GhostTypewriter */}
        <div
          ref={headlineTiltRef}
          className="lg:col-span-7 flex flex-col items-start max-w-3xl animate-hero-float"
          style={{ willChange: 'transform' }}
        >
          {/* Location Tag with Notch Pointer (Directly below header) */}
          <div className="relative inline-flex flex-col items-start mb-2 sm:mb-3">
            <div className="ml-5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#00E575]" />
            <div className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white border-2 border-[#171714] shadow-[2px_2px_0px_#171714] font-sora text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-[#171714]">
              DELHI, INDIA IN (WORKING GLOBALLY)
            </div>
          </div>

          {/* Master Headline: Get High-Impact (Static as requested) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-extrabold tracking-tight leading-[0.98] text-[#171714] font-sora select-none">
            Get High-Impact
          </h1>

          {/* Giant Neo-Brutalist Green Box with GhostTypewriter Animation Inside */}
          <div className="mt-2.5 sm:mt-3 bg-[#00E575] text-[#171714] px-5 sm:px-7 md:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl border-3 border-[#171714] shadow-[5px_5px_0px_#171714] sm:shadow-[7px_7px_0px_#171714] flex items-center min-h-[140px] sm:min-h-[185px] md:min-h-[205px] w-full max-w-2xl select-none transition-all duration-300 relative group overflow-hidden">
            
            {/* Subtle Neon Glow Sheen on Green Box */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/20 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
            
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight leading-[1.08] font-sora text-[#171714] w-full">
              <GhostTypewriter
                words={[
                  "Direct-Response Creatives That Convert.",
                  "Viral UGC Ads That Stop The Feed.",
                  "AI Commercials Built To Print Cash.",
                  "Retention Loops That Scale 7-Figures.",
                  "Pattern-Interrupts That Cut CPA In Half.",
                  "Unignorable Video Heat For Modern Brands."
                ]}
                typeSpeed={38}
                deleteSpeed={20}
                delayBetween={2200}
                className="font-extrabold text-[#171714] leading-[1.08]"
                cursorClassName="text-[#171714] font-extrabold text-2xl sm:text-4xl md:text-5xl"
              />
            </span>
          </div>

          {/* Supporting Statement in Sora Font */}
          <div className="mt-4 sm:mt-5 p-4 rounded-2xl bg-white/70 backdrop-blur-md border-2 border-[#171714] shadow-[3px_3px_0px_#171714] max-w-xl">
            <div className="flex items-center gap-2 mb-1 text-[11px] font-mono font-extrabold text-[#77766F] uppercase">
              <Sparkles size={13} className="text-[#00E575]" />
              <span>THE RESTART CREATIVE ENGINE</span>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[#171714] leading-relaxed font-semibold font-sora">
              {studio.manifesto || "Engineering high-retention video edits, viral UGC commercials, and AI-accelerated visuals built to capture attention and convert audiences."}
            </p>
          </div>

          {/* Interactive Quick-Jump Category Pills */}
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 sm:gap-2.5 font-sora text-xs">
            {[
              { label: "🎬 Product Ads & UGC", target: "hustle", bg: "#00E575" },
              { label: "🎙️ AI Podcast Cuts", target: "hustle", bg: "#FFFFFF" },
              { label: "🎭 Drama (Coming Soon)", target: "hustle", bg: "#FFD277" },
              { label: "✨ Pixar Animation (Coming Soon)", target: "hustle", bg: "#FFFFFF" }
            ].map((pill) => (
              <Magnetic key={pill.label} strength={0.2}>
                <button
                  onClick={() => onScrollTo(pill.target)}
                  style={{ backgroundColor: pill.bg }}
                  className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border-2 border-[#171714] shadow-[2px_2px_0px_#171714] hover:shadow-[3px_3px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 text-[#171714] text-[11px] sm:text-xs font-extrabold transition-all duration-150 cursor-pointer"
                >
                  {pill.label}
                </button>
              </Magnetic>
            ))}
          </div>

          {/* Dual Action Buttons */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <Magnetic strength={0.35}>
              <button
                onClick={() => onScrollTo('hustle')}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#171714] text-white hover:bg-[#00E575] hover:text-[#171714] border-2 border-[#171714] shadow-[4px_4px_0px_#171714] hover:shadow-[5px_5px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 text-xs font-sora uppercase tracking-wider font-extrabold transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Explore Our Hustle</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                onClick={() => onScrollTo('contact')}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-full bg-[#00E575] hover:bg-[#6AFBC0] text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] hover:shadow-[4px_4px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 text-xs font-sora uppercase tracking-wider font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Call ↗</span>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Counter-Floating Vertical Video Tracks (Aligned Level with Headline) */}
        <div
          ref={trackTiltRef}
          className="lg:col-span-5 flex flex-col items-center justify-start w-full animate-hero-float-reverse"
          style={{ willChange: 'transform' }}
        >
          <div className="w-full flex justify-center">
            <GrowthubVideoTracks
              projects={projects}
              onSelectProject={onSelectProject}
            />
          </div>
        </div>
      </div>

      {/* Bottom Status Row */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 z-20 border-t-2 border-[#171714] pt-4 font-sora text-xs font-bold text-[#171714]">
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap text-[11px] sm:text-xs">
          <span className="px-2.5 py-0.5 rounded-md bg-white border border-[#171714] shadow-[1.5px_1.5px_0px_#171714]">
            AVAILABLE WORLDWIDE
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-[#00E575] border border-[#171714] shadow-[1.5px_1.5px_0px_#171714]">
            4K / 60FPS MASTER
          </span>
          <span className="text-[#171714] hidden md:inline font-bold">
            HIGH-IMPACT VIDEO PRODUCTION & MOTION DIRECTION • RESTART
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-sora text-[11px] font-bold text-[#171714]">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDownRight size={13} className="text-[#171714]" />
        </div>
      </div>
    </section>
  );
}
