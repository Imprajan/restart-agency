import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Sparkles, Film, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function ProjectModal({ project, onClose }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  useEffect(() => {
    setIsPlayingVideo(true);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const isDirectVideo = project?.videoUrl && (
    project.videoUrl.endsWith('.mp4') ||
    project.videoUrl.endsWith('.webm') ||
    project.videoUrl.endsWith('.mov') ||
    project.videoUrl.includes('/videos/') ||
    project.videoUrl.includes('.mp4?') ||
    project.videoUrl.startsWith('blob:')
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-6 md:p-8 font-sora">
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
          className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#F2F0E8] text-[#171714] rounded-3xl border-3 border-[#171714] shadow-[10px_10px_0px_#171714] p-5 sm:p-7 flex flex-col gap-5"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-4 border-b-2 border-[#171714] pb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#00E575] text-[#171714] font-bold text-[11px] border border-[#171714] shadow-[2px_2px_0px_#171714] uppercase tracking-wider">
                {project.category}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FFD277] text-[#171714] font-bold text-[11px] border border-[#171714] shadow-[2px_2px_0px_#171714]">
                {project.year}
              </span>
              <span className="text-xs font-mono font-bold text-[#77766F] hidden sm:inline">
                • 9:16 VERTICAL CINEMA
              </span>
            </div>

            {/* Neo-Brutalist Close Button */}
            <Magnetic strength={0.4}>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] hover:bg-[#FF09B8] hover:text-white hover:shadow-[4px_4px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </Magnetic>
          </div>

          {/* 2-Column Responsive Layout: 9:16 Vertical Reel Screen + Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: True 9:16 Vertical Reel Player */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden border-3 border-[#171714] shadow-[6px_6px_0px_#171714] bg-black">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover bg-black"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#F2F0E8]">
                    <Film size={36} className="text-[#FFD277] mb-2" />
                    <span className="font-sora font-extrabold text-sm">{project.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Project Details, Metric Badge & Conversion Stack */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#171714] font-sora leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-[#77766F] mt-1.5 uppercase tracking-wide">
                  Client / Campaign: <strong className="text-[#171714]">{project.client}</strong>
                </p>

                {project.metrics && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00E575]/20 border-2 border-[#171714] text-xs font-mono font-extrabold text-[#171714] shadow-[2px_2px_0px_#171714]">
                    <span>⚡</span>
                    <span>{project.metrics}</span>
                  </div>
                )}
              </div>

              {/* Description Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#171714] shadow-[3px_3px_0px_#171714]">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#77766F] mb-1.5">
                  Creative Strategy & Hook Breakdown
                </h4>
                <p className="text-xs sm:text-sm text-[#171714] font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Production Stack Badges */}
              <div className="p-4 rounded-2xl bg-white border-2 border-[#171714] shadow-[3px_3px_0px_#171714]">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#77766F] mb-2">
                  Production Deliverables
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#F2F0E8] border border-[#171714] text-[#171714]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Booking CTA (Zero Drive Links) */}
              <div className="pt-2">
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => {
                      onClose();
                      const contactEl = document.getElementById('contact');
                      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3.5 px-6 rounded-full bg-[#171714] text-[#00E575] hover:bg-[#00E575] hover:text-[#171714] border-2 border-[#171714] shadow-[4px_4px_0px_#171714] hover:shadow-[5px_5px_0px_#171714] text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
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
