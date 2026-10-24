import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, ArrowUpRight, Film } from 'lucide-react';

function TrackVideoCard({ project, color, idx, isAutoplayLeader, onSelectProject }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(isAutoplayLeader);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!isAutoplayLeader && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={() => onSelectProject(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group/card relative w-full aspect-[9/16] rounded-2xl overflow-hidden border-2 border-[#171714] shadow-[3px_3px_0px_#171714] hover:shadow-[5px_5px_0px_#171714] hover:-translate-y-0.5 transition-all duration-200 bg-[#171714] cursor-pointer"
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      {/* 9:16 Video Frame with Hardware GPU Throttling */}
      {project.videoUrl ? (
        <video
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          autoPlay={isAutoplayLeader}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <div className="w-full h-full bg-[#1b1b18] flex items-center justify-center">
          <Film size={24} className="text-[#FFD277]" />
        </div>
      )}

      {/* Top Badge: Category */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
        <span
          style={{ backgroundColor: color.bg, color: color.text }}
          className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-sora border border-[#171714] shadow-[1.5px_1.5px_0px_#171714] uppercase tracking-wider"
        >
          {project.tags?.[0] || project.category}
        </span>
        <span className="w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center text-[9px]">
          <Film size={9} />
        </span>
      </div>

      {/* Center Tactile Play Button with Hard Neo-Brutalist Shadow */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#171714] border-2 border-[#171714] shadow-[2.5px_2.5px_0px_#171714] group-hover/card:scale-110 group-hover/card:bg-[#6AFBC0] flex items-center justify-center transition-transform duration-200">
          <Play size={16} className="fill-[#171714] ml-0.5" />
        </div>
      </div>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25 pointer-events-none" />

      {/* Bottom Info Card */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
        <div className="p-2 rounded-xl bg-white/95 border border-[#171714] shadow-[1.5px_1.5px_0px_#171714] text-[#171714]">
          <p className="font-sora text-[11px] sm:text-xs font-bold leading-tight truncate">
            {project.title}
          </p>
          <div className="mt-0.5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-[#77766F]">
            <span className="truncate">{project.client}</span>
            <span className="font-bold text-[#171714] flex items-center gap-0.5">
              PLAY <ArrowUpRight size={9} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GrowthubVideoTracks({ projects, onSelectProject }) {
  const [activeMute, setActiveMute] = useState(true);

  // Divide projects into two distinct streams for Column A and Column B
  const columnAProjects = projects.filter((_, i) => i % 2 === 0);
  const columnBProjects = projects.filter((_, i) => i % 2 !== 0);

  // Duplicate for seamless infinite vertical marquee
  const streamA = [...columnAProjects, ...columnAProjects];
  const streamB = [...columnBProjects, ...columnBProjects];

  const badgeColors = [
    { bg: '#6AFBC0', text: '#171714' }, // Growthub Mint
    { bg: '#FFD277', text: '#171714' }, // Vibrant Gold
    { bg: '#FFC8DD', text: '#171714' }, // Pastel Pink
    { bg: '#C8FF3D', text: '#171714' }, // Electric Lime
    { bg: '#E2F0D9', text: '#171714' }, // Soft Sage
  ];

  return (
    <div
      className="track-container group/track relative w-full h-[480px] sm:h-[580px] md:h-[660px] overflow-hidden rounded-3xl border-2 border-[#171714] bg-white/60 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.05),6px_6px_0px_#171714] p-2.5 sm:p-4 select-none"
      style={{ contain: 'layout paint' }}
    >
      {/* Top Banner: Growthub Reel Monitor Bar */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs border-2 border-[#171714] shadow-[2px_2px_0px_#171714] font-sora text-[10px] sm:text-[11px] font-extrabold text-[#171714]">
          <span className="text-[#00E575]">⚡</span>
          <span>RESTART REEL SHOWCASE</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#00E575] text-[#171714] border border-[#171714] font-sora text-[9px] sm:text-[10px] font-extrabold shadow-[1.5px_1.5px_0px_#171714]">
            TAP TO WATCH
          </span>
          <button
            onClick={() => setActiveMute(!activeMute)}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-[#171714] shadow-[1.5px_1.5px_0px_#171714] flex items-center justify-center text-[#171714] hover:bg-[#00E575] transition-colors cursor-pointer"
            title="Toggle Audio Feedback"
          >
            {activeMute ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>
      </div>

      {/* Subtle Top & Bottom Frosted Glass Fades for Infinite Depth */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-white/80 via-white/40 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-20 pointer-events-none" />

      {/* Dual Staggered Vertical Columns (GPU Compositor Accelerated + Hover Pause) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 h-full overflow-hidden">
        
        {/* ================= COLUMN A (Scrolls Up) ================= */}
        <div className="overflow-hidden h-full flex flex-col" style={{ contain: 'layout paint' }}>
          <div
            className="animate-vertical-up group-hover/track:[animation-play-state:paused] flex flex-col gap-3 sm:gap-4"
            style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
          >
            {streamA.map((project, idx) => (
              <TrackVideoCard
                key={`colA-${project.id}-${idx}`}
                project={project}
                color={badgeColors[idx % badgeColors.length]}
                idx={idx}
                isAutoplayLeader={idx === 0}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>
        </div>

        {/* ================= COLUMN B (Scrolls Down / Offset) ================= */}
        <div className="overflow-hidden h-full flex flex-col" style={{ contain: 'layout paint' }}>
          <div
            className="animate-vertical-down group-hover/track:[animation-play-state:paused] flex flex-col gap-3 sm:gap-4"
            style={{ willChange: 'transform', transform: 'translate3d(0, 0, 0)' }}
          >
            {streamB.map((project, idx) => (
              <TrackVideoCard
                key={`colB-${project.id}-${idx}`}
                project={project}
                color={badgeColors[(idx + 2) % badgeColors.length]}
                idx={idx}
                isAutoplayLeader={idx === 0}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Floating Bottom Status Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto px-3.5 py-1.5 rounded-full bg-white/95 border-2 border-[#171714] shadow-[2px_2px_0px_#171714] flex items-center gap-2 text-[10px] sm:text-xs font-sora font-semibold text-[#171714]">
          <span className="w-2 h-2 rounded-full bg-[#6AFBC0] animate-ping" />
          <span>Hover to preview • Click to open 9:16 vertical cinema</span>
        </div>
      </div>

    </div>
  );
}
