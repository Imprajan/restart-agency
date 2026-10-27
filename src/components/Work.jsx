import React, { useState, useRef } from 'react';
import PolaroidLineCarousel from './ui/polaroid-line-carousel';
import { CipherReveal } from './CipherGhostText';
import GhostTypewriter from './GhostTypewriter';
import { Sparkles, Play, Film, ArrowUpRight, Grid, StretchHorizontal, Lock, Clock, ExternalLink } from 'lucide-react';
import Magnetic from './Magnetic';
import confetti from 'canvas-confetti';

// High-Performance On-Demand Video Card (Zero Memory Lag, 60 FPS)
function WorkVideoCard({ project, badgeColor, isComingSoon, onSelect, onComingSoonClick }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isComingSoon && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isComingSoon && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      onClick={() => isComingSoon ? onComingSoonClick(project) : onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-3xl overflow-hidden border-3 border-[#171714] transition-all duration-200 flex flex-col cursor-pointer select-none ${
        isComingSoon
          ? 'bg-gradient-to-b from-white/90 to-[#FFF7E8] shadow-[4px_4px_0px_#171714] hover:shadow-[6px_6px_0px_#171714] hover:-translate-y-1'
          : 'bg-white/80 backdrop-blur-md shadow-[4px_4px_0px_#171714] hover:shadow-[6px_6px_0px_#171714] hover:-translate-y-1'
      }`}
      style={{ contain: 'layout paint', transform: 'translate3d(0, 0, 0)' }}
    >
      {/* Direct High-Impact Video Frame */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-black">
        {!isComingSoon && project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1b1b18] flex flex-col items-center justify-center p-6 text-center">
            <Clock size={32} className="text-[#FFD277] mb-2" />
            <span className="font-sora font-extrabold text-sm text-[#F2F0E8]">
              {project.title}
            </span>
            <span className="mt-1 text-[10px] font-mono font-bold text-[#FFD277] uppercase tracking-wider">
              Pipeline Post-Production Sprint
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <span
            style={{ backgroundColor: isComingSoon ? '#FFD277' : badgeColor }}
            className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold text-[#171714] border border-[#171714] shadow-[1.5px_1.5px_0px_#171714] uppercase tracking-wider"
          >
            {project.tags?.[0] || project.category}
          </span>
          
          {isComingSoon ? (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#171714] text-[#FFD277] border border-[#171714] text-[10px] font-mono font-bold shadow-[1.5px_1.5px_0px_#FFD277]">
              <Clock size={10} />
              COMING SOON
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold flex items-center gap-1">
              {isHovered ? (
                <span className="text-[#00E575] animate-pulse">● LIVE PREVIEW</span>
              ) : (
                <span>{project.year}</span>
              )}
            </span>
          )}
        </div>

        {/* Center Tactile Play / Lock Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {isComingSoon ? (
            <div className="px-4 py-2 rounded-full bg-white text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] group-hover:scale-110 group-hover:bg-[#FFD277] flex items-center gap-2 transition-transform duration-200 text-xs font-extrabold">
              <Lock size={14} className="stroke-[2.5]" />
              <span>PIPELINE SPRINT</span>
            </div>
          ) : (
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white/90 text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] group-hover:scale-110 group-hover:bg-[#00E575] flex items-center justify-center transition-all duration-200">
              <Play size={16} className="fill-[#171714] ml-0.5" />
            </div>
          )}
        </div>

        {/* Performance metric overlay chip */}
        {project.metrics && (
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-md bg-[#171714]/90 backdrop-blur-xs border border-white/20 text-[10px] font-mono font-extrabold text-[#00E575]">
              ⚡ {project.metrics}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />
      </div>

      {/* Card Content Bar */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white border-t-2 border-[#171714]">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#171714] group-hover:text-[#00E575] group-hover:bg-[#171714] group-hover:px-2 rounded transition-colors inline-block leading-tight font-sora">
            {project.title}
          </h3>
          <p className="mt-2 text-xs text-[#77766F] font-semibold line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-[#171714]/15 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 2).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-[#F2F0E8] border border-[#171714] text-[10px] font-bold text-[#171714]">
                {t}
              </span>
            ))}
          </div>

          {isComingSoon ? (
            <span className="flex items-center gap-1 text-[11px] font-extrabold text-[#171714] group-hover:text-[#FF8C00]">
              <span>EARLY ACCESS</span>
              <ArrowUpRight size={13} />
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-extrabold text-[#171714] group-hover:translate-x-0.5 transition-transform">
              <span>WATCH REEL</span>
              <ArrowUpRight size={13} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work({ projects, onSelectProject, onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'polaroid'

  const categories = [
    { id: 'ALL', label: '✦ ALL HUSTLE' },
    { id: 'Product Ads & UGC', label: '🎬 PRODUCT ADS & UGC' },
    { id: 'AI Podcast', label: '🎙️ AI PODCAST' },
    { id: 'Drama', label: '🎭 DRAMA (COMING SOON)' },
    { id: 'Pixar Animation', label: '✨ PIXAR ANIMATION (COMING SOON)' },
  ];

  const filteredProjects = activeFilter === 'ALL'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Map project data to Polaroid Line Carousel slides
  const slides = filteredProjects.map((p) => ({
    image: p.image,
    title: p.title,
    caption: p.isComingSoon 
      ? `[COMING SOON] — ${p.category} (${p.year})`
      : `${p.client} — ${p.category} (${p.year})`,
    alt: p.title,
    originalProject: p
  }));

  const handleSelect = (slide) => {
    if (slide.originalProject) {
      if (slide.originalProject.isComingSoon) {
        handleComingSoonClick(slide.originalProject);
      } else {
        onSelectProject(slide.originalProject);
      }
    }
  };

  const handleComingSoonClick = (project) => {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00E575', '#FFD277', '#FFC8DD']
    });
    if (onOpenContact) {
      onOpenContact(`Inquiry: Early Access for ${project.title}`);
    }
  };

  const badgeColors = ['#00E575', '#FFD277', '#FFC8DD', '#C8FF3D', '#E2F0D9'];

  return (
    <section id="hustle" className="relative pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-8 md:px-12 bg-transparent text-[#171714] border-t-2 border-[#171714] font-sora">
      {/* Anchor for backward compatibility with #work */}
      <div id="work" className="absolute -top-20 left-0" />
      
      {/* 1. Header Bar: Gen-Z GhostTypewriter Slang Title + View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-8 border-b-2 border-[#171714]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#171714] -ml-4.5"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F] block">
              <CipherReveal text="CREATIVE PRODUCTION ARCHIVE // 2026" speed={30} />
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171714] leading-[1.1] flex flex-wrap items-center gap-2.5">
            <span>Watch</span>
            <span className="bg-[#00E575] text-[#171714] px-3.5 sm:px-4 py-1 rounded-2xl border-3 border-[#171714] shadow-[4px_4px_0px_#171714] inline-flex items-center min-w-[260px] sm:min-w-[390px] -rotate-1 text-2xl sm:text-4xl md:text-5xl font-sora">
              <GhostTypewriter
                words={[
                  "The Sauce.",
                  "Our Cookings.",
                  "Pure Heat.",
                  "The Banger Bag.",
                  "The Reel Vault.",
                  "Our Flex.",
                  "Our Hustle."
                ]}
                typeSpeed={45}
                deleteSpeed={25}
                delayBetween={2200}
                className="font-extrabold text-[#171714]"
                cursorClassName="text-[#171714] font-extrabold text-2xl sm:text-4xl"
              />
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#77766F] font-semibold leading-relaxed">
            High-converting UGC ads, viral conversational podcast cuts, plus exclusive upcoming drama and Pixar-grade 3D animation pipelines.
          </p>
        </div>

        {/* Right Action Bar: View Switcher (No Drive link) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-xl border-2 border-[#171714] shadow-[3px_3px_0px_#171714]">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-[#171714] text-[#00E575]'
                  : 'text-[#171714] hover:bg-[#171714]/10'
              }`}
            >
              <Grid size={13} />
              <span>Grid</span>
            </button>

            <button
              onClick={() => setViewMode('polaroid')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'polaroid'
                  ? 'bg-[#171714] text-[#FFD277]'
                  : 'text-[#171714] hover:bg-[#171714]/10'
              }`}
            >
              <StretchHorizontal size={13} />
              <span>Wire</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Bars */}
      <div className="py-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
        {categories.map((cat) => (
          <Magnetic key={cat.id} strength={0.2}>
            <button
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer border-2 border-[#171714] ${
                activeFilter === cat.id
                  ? 'bg-[#00E575] text-[#171714] shadow-[3px_3px_0px_#171714] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-white/90 text-[#171714] shadow-[2px_2px_0px_#171714] hover:shadow-[3px_3px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5'
              }`}
            >
              {cat.label}
            </button>
          </Magnetic>
        ))}
      </div>

      {/* 3. Main Freestyle Showcase Grid */}
      {viewMode === 'grid' ? (
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredProjects.map((project, idx) => (
            <WorkVideoCard
              key={project.id}
              project={project}
              badgeColor={badgeColors[idx % badgeColors.length]}
              isComingSoon={project.isComingSoon}
              onSelect={onSelectProject}
              onComingSoonClick={handleComingSoonClick}
            />
          ))}
        </div>
      ) : (
        <div className="w-full pt-6">
          <PolaroidLineCarousel
            slides={slides}
            height="80vh"
            cardWidth={330}
            sag={48}
            swing={1}
            autoplay={5500}
            string="#171714"
            background="#F2F0E8"
            ink="#171714"
            onSelect={handleSelect}
          />
        </div>
      )}
    </section>
  );
}
