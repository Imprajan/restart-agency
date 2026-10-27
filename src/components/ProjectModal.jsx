import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  Film,
  SlidersHorizontal
} from 'lucide-react';
import Magnetic from './Magnetic';

export default function ProjectModal({ project, onClose }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControlsOverlay, setShowControlsOverlay] = useState(true);
  const [useNativeControls, setUseNativeControls] = useState(false);
  const [isLandscape, setIsLandscape] = useState(project?.aspectRatio === '16/9');

  // Sync landscape state whenever project changes
  useEffect(() => {
    setIsLandscape(project?.aspectRatio === '16/9');
  }, [project]);

  // Keyboard navigation: Escape closes, Space toggles play/pause, M toggles mute
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isPlaying, isMuted]);

  // Video autoplay & safe sound policy fallback
  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
    setCurrentTime(0);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay with sound blocked by browser policy -> mute and retry
            video.muted = true;
            setIsMuted(true);
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          });
      }
    }
  }, [project]);

  // Mouse activity timer for hiding overlay controls
  const handleMouseMove = () => {
    setShowControlsOverlay(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (isPlaying) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowControlsOverlay(false);
      }, 2500);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControlsOverlay(true);
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleRestart = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
      if (video.videoWidth > video.videoHeight) {
        setIsLandscape(true);
      } else if (project?.aspectRatio !== '16/9') {
        setIsLandscape(false);
      }
    }
  };

  const handleScrub = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar || !duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pos = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = pos * duration;
    setProgress(pos * 100);
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-2 sm:p-5 md:p-6 font-sora">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#171714]/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window in Growthub Neo-Brutalist Frame */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 25 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 25 }}
          transition={{ type: "spring", damping: 26, stiffness: 280 }}
          className={`relative z-10 w-full ${isLandscape ? 'max-w-5xl' : 'max-w-4xl'} max-h-[92vh] overflow-y-auto bg-[#F2F0E8] text-[#171714] rounded-2xl sm:rounded-3xl border-3 border-[#171714] shadow-[8px_8px_0px_#171714] p-3.5 sm:p-5 md:p-6 flex flex-col gap-3.5 sm:gap-4`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-3 border-b-2 border-[#171714] pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#00E575] text-[#171714] font-bold text-[10px] sm:text-[11px] border border-[#171714] shadow-[2px_2px_0px_#171714] uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FFD277] text-[#171714] font-bold text-[10px] sm:text-[11px] border border-[#171714] shadow-[2px_2px_0px_#171714]">
                {project.year}
              </span>
              <span className="text-[11px] font-mono font-bold text-[#77766F] hidden sm:inline">
                • {isLandscape ? '16:9 CINEMATIC TVC WIDESCREEN' : '9:16 YOUTUBE SHORTS CINEMA'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Optional Native Controls Switcher */}
              <button
                type="button"
                onClick={() => setUseNativeControls(!useNativeControls)}
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border border-[#171714] transition-all cursor-pointer ${
                  useNativeControls 
                    ? 'bg-[#171714] text-white shadow-[2px_2px_0px_#00E575]' 
                    : 'bg-white text-[#77766F] hover:text-[#171714] shadow-[1px_1px_0px_#171714]'
                }`}
                title="Toggle between custom overlay and native browser controls"
              >
                <SlidersHorizontal size={11} />
                <span>{useNativeControls ? 'Native: ON' : (isLandscape ? 'Cinema UI' : 'Shorts UI')}</span>
              </button>

              {/* Neo-Brutalist Close Button */}
              <Magnetic strength={0.4}>
                <button
                  onClick={onClose}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] hover:bg-[#FF09B8] hover:text-white hover:shadow-[4px_4px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={17} />
                </button>
              </Magnetic>
            </div>
          </div>

          {/* 2-Column Responsive Layout: Video Cinema Screen (Left) + Project Details (Right) */}
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 ${isLandscape ? 'items-center' : 'items-center'}`}>
            
            {/* Left Column: Video Cinema Player (Responsive 16:9 Widescreen or 9:16 Vertical) */}
            <div className={`${isLandscape ? 'md:col-span-7' : 'md:col-span-5'} flex justify-center items-center`}>
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={() => isPlaying && setShowControlsOverlay(false)}
                onClick={togglePlay}
                className={isLandscape
                  ? "relative mx-auto w-full max-w-[620px] aspect-[16/9] max-h-[52vh] rounded-2xl sm:rounded-3xl overflow-hidden border-3 border-[#171714] shadow-[6px_6px_0px_#171714] bg-black flex items-center justify-center group select-none cursor-pointer"
                  : "relative mx-auto h-[52vh] sm:h-[58vh] max-h-[460px] md:max-h-[480px] min-h-[250px] aspect-[9/16] w-auto max-w-full rounded-2xl sm:rounded-3xl overflow-hidden border-3 border-[#171714] shadow-[6px_6px_0px_#171714] bg-black flex items-center justify-center group select-none cursor-pointer"
                }
              >
                {project.videoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      src={project.videoUrl}
                      playsInline
                      preload="auto"
                      loop
                      muted={isMuted}
                      controls={useNativeControls}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="w-full h-full object-contain bg-black pointer-events-auto"
                    />

                    {/* Custom Player UI Overlay when native controls are off */}
                    {!useNativeControls && (
                      <>
                        {/* Top Bar: Format Indicator + Sound / Fullscreen Controls */}
                        <div 
                          className={`absolute top-0 inset-x-0 p-2.5 sm:p-3 flex items-center justify-between transition-opacity duration-200 pointer-events-none z-20 ${
                            showControlsOverlay || !isPlaying ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E575] animate-pulse" />
                            <span>{isLandscape ? '16:9 Cinema TVC' : 'Shorts HD'}</span>
                          </div>

                          <div className="flex items-center gap-1.5 pointer-events-auto">
                            <button
                              type="button"
                              onClick={toggleMute}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-[#171714] text-white hover:text-[#00E575] border border-white/20 hover:border-[#00E575] flex items-center justify-center transition-all shadow-md cursor-pointer"
                              title={isMuted ? "Unmute Sound" : "Mute Sound"}
                              aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>

                            <button
                              type="button"
                              onClick={toggleFullscreen}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/75 hover:bg-[#171714] text-white hover:text-[#FFD277] border border-white/20 hover:border-[#FFD277] flex items-center justify-center transition-all shadow-md cursor-pointer"
                              title="Fullscreen"
                              aria-label="Fullscreen"
                            >
                              <Maximize2 size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Center Big Play Icon (when paused) */}
                        <AnimatePresence>
                          {!isPlaying && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                            >
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#171714]/90 backdrop-blur-sm border-2 border-white/40 text-white flex items-center justify-center shadow-xl">
                                <Play size={24} className="translate-x-0.5 text-[#00E575]" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Bottom Scrubber & Time Bar (Minimal, non-intrusive) */}
                        <div 
                          className={`absolute bottom-0 inset-x-0 pt-6 pb-2 px-2.5 sm:px-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent transition-opacity duration-200 z-20 pointer-events-none ${
                            showControlsOverlay || !isPlaying ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          {/* Sleek Scrubber Timeline (Click to Seek) */}
                          <div
                            ref={progressBarRef}
                            onClick={handleScrub}
                            className="w-full h-1.5 hover:h-2 bg-white/30 hover:bg-white/45 rounded-full cursor-pointer relative transition-all pointer-events-auto"
                            title="Seek"
                          >
                            <div
                              className="h-full bg-[#00E575] rounded-full relative"
                              style={{ width: `${progress}%` }}
                            >
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border border-[#171714] shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>

                          {/* Time readout & playback actions */}
                          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/95 font-bold mt-1.5 pointer-events-auto">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePlay();
                                }}
                                className="hover:text-[#00E575] transition-colors cursor-pointer"
                              >
                                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                              </button>
                              <button
                                type="button"
                                onClick={handleRestart}
                                className="hover:text-[#00E575] transition-colors cursor-pointer"
                                title="Restart from beginning"
                              >
                                <RotateCcw size={11} />
                              </button>
                              <span>
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-white/70 tracking-wider">
                                {isPlaying ? 'TAP TO PAUSE' : 'TAP TO PLAY'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Always visible 2.5px ultra-thin progress line at absolute bottom edge when controls are hidden */}
                        {!showControlsOverlay && isPlaying && (
                          <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-black/40 z-30 pointer-events-none">
                            <div
                              className="h-full bg-[#00E575] transition-all duration-100"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#F2F0E8]">
                    <Film size={36} className="text-[#FFD277] mb-2" />
                    <span className="font-sora font-extrabold text-sm">{project.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Project Details, Metric Badge & Conversion Stack */}
            <div className={`${isLandscape ? 'md:col-span-5' : 'md:col-span-7'} flex flex-col justify-between space-y-3 sm:space-y-4`}>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#171714] font-sora leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#77766F] mt-1 uppercase tracking-wide">
                  Client / Campaign: <strong className="text-[#171714]">{project.client}</strong>
                </p>

                {project.metrics && (
                  <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#00E575]/20 border-2 border-[#171714] text-[11px] sm:text-xs font-mono font-extrabold text-[#171714] shadow-[2px_2px_0px_#171714]">
                    <span>⚡</span>
                    <span>{project.metrics}</span>
                  </div>
                )}
              </div>

              {/* Description Box */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border-2 border-[#171714] shadow-[3px_3px_0px_#171714]">
                <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#77766F] mb-1">
                  Creative Strategy & Hook Breakdown
                </h4>
                <p className="text-xs sm:text-sm text-[#171714] font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Production Stack Badges */}
              <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white border-2 border-[#171714] shadow-[3px_3px_0px_#171714]">
                <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#77766F] mb-1.5">
                  Production Deliverables
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-[#F2F0E8] border border-[#171714] text-[#171714]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Booking CTA */}
              <div className="pt-1">
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => {
                      onClose();
                      const contactEl = document.getElementById('contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 px-5 rounded-full bg-[#171714] text-[#00E575] hover:bg-[#00E575] hover:text-[#171714] border-2 border-[#171714] shadow-[4px_4px_0px_#171714] hover:shadow-[5px_5px_0px_#171714] text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles size={14} />
                    <span>Scale Your Brand with Creatives Like This ↗</span>
                  </button>
                </Magnetic>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
