import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { studioData } from './data/portfolioData';
import FlashlightTextReveal from './components/ui/flashlight-text-reveal';
import Preloader from './components/Preloader';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import BrandLogosMarquee from './components/BrandLogosMarquee';
import Work from './components/Work';
import CaseStudiesTestimonials from './components/CaseStudiesTestimonials';
import GrowthMethod from './components/GrowthMethod';
import PricingPackages from './components/PricingPackages';
import FaqSection from './components/FaqSection';
import BookCallSection from './components/BookCallSection';
import NavigationDrawer from './components/NavigationDrawer';
import ProjectModal from './components/ProjectModal';
import Magnetic from './components/Magnetic';
import GlassmorphicBackground from './components/GlassmorphicBackground';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CipherReveal } from './components/CipherGhostText';

export default function App() {
  // Application lifecycle: 'flashlight' -> 'preloader' -> 'ready'
  const [appPhase, setAppPhase] = useState('flashlight');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedModalProject, setSelectedModalProject] = useState(null);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll (Desktop only — native 120Hz ProMotion touch on mobile)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const req = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(req);
      lenis.destroy();
    };
  }, []);

  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -60, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnterFromFlashlight = () => {
    setAppPhase('preloader');
  };

  const handlePreloaderComplete = () => {
    setAppPhase('ready');
  };

  return (
    <div className="relative min-h-screen bg-[#F2F0E8] text-[#171714] selection:bg-[#00E575] selection:text-[#171714] font-sans">
      
      {/* ========================================================
          STAGE 1: FLASHLIGHT TEXT REVEAL (Interactive Prologue)
         ======================================================== */}
      <AnimatePresence>
        {appPhase === 'flashlight' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9998] bg-[#171714] text-[#F2F0E8] flex flex-col justify-between overflow-hidden"
          >
            {/* Top Bar Header inside Flashlight Room */}
            <div className="absolute top-0 left-0 w-full z-20 px-6 sm:px-12 py-8 flex items-center justify-between pointer-events-none font-sora">
              <div className="pointer-events-auto flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-ping"></span>
                <span className="text-xs font-mono font-bold tracking-widest text-[#77766F] uppercase">
                  <CipherReveal text="RESTART // AI DIGITAL MARKETING & CREATIVE AGENCY" />
                </span>
              </div>

              <div className="pointer-events-auto hidden sm:flex items-center gap-2 text-xs font-mono text-[#77766F] bg-[#171714]/80 px-4 py-1.5 rounded-full border border-[#77766F]/30 backdrop-blur-xs">
                <span>Move pointer to shine spotlight on wall</span>
              </div>
            </div>

            {/* Main WebGL Flashlight Text Wall with Sora Font */}
            <FlashlightTextReveal
              text={`RESTART
THAT
BITCH`}
              textColor="#F2F0E8"
              colors={["#171714", "#20201c", "#2c2c27"]}
              fontFamily='"Sora", sans-serif'
              fontSize="clamp(4.5rem, 16vw, 14rem)"
              ghost={0.035}
              radius={0.38}
              strength={1.25}
              height="100vh"
              wander={true}
            />

            {/* Bottom Floating Bar: Enter Button */}
            <div className="absolute bottom-10 left-0 w-full z-20 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-none font-sora">
              <div className="text-left font-mono text-xs text-[#77766F] pointer-events-auto hidden sm:block">
                <span>© RESTART • LET'S RESTART THAT BITCH</span>
              </div>

              {/* Enter Studio Magnetic Button */}
              <div className="pointer-events-auto">
                <Magnetic strength={0.4}>
                  <button
                    onClick={handleEnterFromFlashlight}
                    className="px-8 py-4 rounded-full bg-[#00E575] text-[#171714] font-extrabold text-xs uppercase tracking-wider font-sora flex items-center gap-3 border-2 border-[#171714] shadow-[4px_4px_0px_#171714] hover:scale-105 hover:bg-[#FFD277] transition-all duration-300 cursor-pointer"
                  >
                    <span>Enter RESTART Studio</span>
                    <ArrowRight size={16} />
                  </button>
                </Magnetic>
              </div>

              <div className="text-right font-mono text-xs text-[#77766F] pointer-events-auto hidden sm:block">
                <span>[ Tap to enter ]</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          STAGE 2: MULTILINGUAL PRELOADER (Curved Opening)
         ======================================================== */}
      <AnimatePresence>
        {appPhase === 'preloader' && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* ========================================================
          STAGE 3: MAIN AI CREATIVE AGENCY FLAGSHIP
         ======================================================== */}
      {/* Custom Trailing Cursor */}
      <CustomCursor
        activeProject={null}
        isHoveringInteractive={false}
      />

      {/* Dynamic Beige/Cream Glassmorphic Aurora Mesh Background with Interactive Refraction */}
      <GlassmorphicBackground />

      {/* 01. Studio Header */}
      <Header
        studio={studioData.studio}
        onOpenMenu={() => setIsMenuOpen(true)}
        onScrollTo={handleScrollTo}
      />

      {/* Fullscreen Curved Navigation Menu Drawer */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleScrollTo}
        socials={studioData.socials}
        onReopenFlashlight={() => setAppPhase('flashlight')}
      />

      {/* 02. Hero Section (Growthub Sora Typography + Vertical Video Tracks + Status) */}
      <Hero
        studio={studioData.studio}
        projects={studioData.projects}
        onSelectProject={(project) => setSelectedModalProject(project)}
        onScrollTo={handleScrollTo}
      />

      {/* 03. Client Brands Marquee (Eyvia, Workinx, Hervyan, Hindustan Unilever, Raj Shamani, Maed) */}
      <BrandLogosMarquee />

      {/* 04. Our Hustle (Live Video Vault: UGC, Commercials, AI Podcast, Explainers) */}
      <Work
        projects={studioData.projects}
        onSelectProject={(project) => setSelectedModalProject(project)}
        onOpenContact={() => handleScrollTo('contact')}
      />

      {/* 05. The Growth Method (6-Stage Creative Engine) */}
      <GrowthMethod
        onOpenContact={() => handleScrollTo('contact')}
      />

      {/* 06. Packages & Pricing (Interactive 3D Flip Card System) */}
      <PricingPackages
        onOpenContact={(topic) => handleScrollTo('contact')}
      />

      {/* 07. FAQs (Exact 5 Questions & Answers) */}
      <FaqSection
        onOpenContact={() => handleScrollTo('contact')}
      />

      {/* 08. Book a Call, Let's Scale (Interactive Booking Simulator + Socials + Footer) */}
      <BookCallSection
        studio={studioData.studio}
        socials={studioData.socials}
      />

      {/* Fullscreen Project Detail Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  );
}
