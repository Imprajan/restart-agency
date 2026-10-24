import React, { useState, useEffect } from 'react';
import Magnetic from './Magnetic';
import { ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CipherReveal } from './CipherGhostText';

export default function Footer({ personal, socials }) {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#6AFBC0', '#FFD277', '#F2F0E8']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleGetInTouch = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#6AFBC0', '#FFD277', '#F2F0E8']
    });
    window.location.href = `mailto:${personal.email}?subject=Project%20Inquiry%20via%20Portfolio`;
  };

  return (
    <footer id="contact" className="relative bg-[#171714] text-[#F2F0E8] pt-24 pb-12 px-6 sm:px-12 flex flex-col justify-between min-h-screen font-sora">
      
      {/* Top Headline + Giant Neo-Brutalist Magnetic Button */}
      <div className="max-w-6xl mx-auto w-full my-auto py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          {/* Huge Editorial Headline */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-2 bg-[#6AFBC0] rounded-full"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#6AFBC0]">
                <CipherReveal text="START A PROJECT OR COMMISSION" speed={30} />
              </span>
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-extrabold tracking-tight leading-[0.92] text-[#F2F0E8]">
              LET'S MAKE <br />
              <span className="text-[#6AFBC0] hover:text-[#FFD277] transition-colors">
                MAGIC
              </span>.
            </h2>
          </div>

          {/* Giant Magnetic Circular Button in Growthub Mint */}
          <div className="flex justify-center w-full lg:w-auto">
            <Magnetic strength={0.5}>
              <button
                onClick={handleGetInTouch}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#6AFBC0] text-[#171714] flex flex-col items-center justify-center p-8 border-3 border-white shadow-[8px_8px_0px_#F2F0E8] hover:shadow-[12px_12px_0px_#F2F0E8] hover:bg-[#FFD277] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                aria-label="Send email"
              >
                <span className="text-xs font-mono uppercase tracking-widest font-extrabold text-[#171714]/80">
                  Book a Project
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Get in touch
                </span>
                <ArrowUpRight size={28} className="mt-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-[#171714]" />
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Quick Contact Interactive Action Pills (Neo-Brutalist Style) */}
        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.3}>
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full bg-white/10 border-2 border-white/20 hover:border-[#6AFBC0] hover:bg-white text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all cursor-pointer text-[#F2F0E8] hover:text-[#171714] shadow-[3px_3px_0px_#6AFBC0]"
            >
              {copied ? <Check size={16} className="text-[#6AFBC0]" /> : <Copy size={16} className="text-[#77766F]" />}
              <span>{personal.email}</span>
              {copied && <span className="text-[#6AFBC0] text-xs font-bold">(Copied!)</span>}
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <a
              href="https://wa.me/?text=Hi%20RESTART,%20Let's%20Restart%20That%20Bitch"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/10 border-2 border-white/20 hover:border-[#6AFBC0] hover:bg-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer text-[#F2F0E8] hover:text-[#171714] shadow-[3px_3px_0px_#6AFBC0]"
            >
              <span>Chat via WhatsApp</span>
              <ArrowUpRight size={14} />
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Bottom Info Bar: Version, Timezone Clock, Socials */}
      <div className="border-t border-white/15 pt-8 mt-12 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono text-[#77766F]">
        
        {/* Left: Version & Location Status */}
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[#77766F] block text-[10px] uppercase font-bold">Status</span>
            <span className="text-[#F2F0E8] font-bold">Available for Commissions</span>
          </div>
          <div>
            <span className="text-[#77766F] block text-[10px] uppercase font-bold">Local Time</span>
            <span className="text-[#6AFBC0] font-bold">{currentTime}</span>
          </div>
        </div>

        {/* Right: Magnetic Social Pills */}
        <div className="flex flex-wrap items-center gap-6 font-sora font-bold">
          <span className="text-[#77766F] text-[10px] uppercase block md:hidden">Socials</span>
          {socials.map((social) => (
            <Magnetic key={social.name} strength={0.25}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6AFBC0] transition-colors"
              >
                {social.name}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </footer>
  );
}
