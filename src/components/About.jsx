import React from 'react';
import Magnetic from './Magnetic';
import { ArrowUpRight, Layers, Sparkles } from 'lucide-react';
import { GhostScrollText, CipherReveal } from './CipherGhostText';

export default function About({ studio, capabilities = [], onOpenContact }) {
  const badgeColors = ['#6AFBC0', '#FFD277', '#FFC8DD', '#C8FF3D'];

  return (
    <section id="capabilities" className="py-28 px-6 sm:px-12 bg-transparent text-[#171714] border-t-2 border-[#171714] font-sora">
      
      {/* Top Editorial Statement with Ghost Scroll & Magnetic Circular Button */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#171714]"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F] block">
              <CipherReveal text="CREATIVE PHILOSOPHY" autoStart={true} />
            </span>
          </div>

          {/* Ghost Scroll Text Reveal in Sora Font */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14]">
            <GhostScrollText
              text="We reject boring agency templates. High-growth creator brands demand viral hook psychology, cinematic AI visuals, and relentless visual retention."
              highlightColor="#171714"
            />
          </div>
        </div>

        {/* Big Signature Neo-Brutalist Magnetic Circle Button */}
        <div className="lg:col-span-4 flex justify-start lg:justify-center">
          <Magnetic strength={0.45}>
            <button
              onClick={onOpenContact}
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#171714] text-white flex flex-col items-center justify-center p-6 border-3 border-[#171714] shadow-[0_12px_40px_rgba(0,0,0,0.15),6px_6px_0px_#171714] hover:shadow-[9px_9px_0px_#171714] hover:bg-[#6AFBC0] hover:text-[#171714] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#77766F] group-hover:text-[#171714]">
                Collaborate
              </span>
              <span className="text-xl font-extrabold mt-1">Start Brief</span>
              <ArrowUpRight size={22} className="mt-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Capabilities 4-Pillar Grid */}
      <div className="border-t-2 border-[#171714] pt-16">
        <div className="flex items-center justify-between mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F]">
            <CipherReveal text="SERVICES & CAPABILITIES" speed={35} />
          </span>
          <span className="px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-[#171714] shadow-[2px_2px_0px_#171714] text-xs font-bold text-[#171714]">
            [ 04 Disciplines ]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((service, idx) => (
            <div
              key={service.number}
              className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-[#171714] shadow-[0_12px_35px_rgba(0,0,0,0.04),5px_5px_0px_#171714] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07),8px_8px_0px_#171714] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span
                  style={{ backgroundColor: badgeColors[idx % badgeColors.length] }}
                  className="text-xs font-bold text-[#171714] block mb-4 px-3 py-1 rounded-full border border-[#171714] shadow-[2px_2px_0px_#171714] w-fit"
                >
                  {service.number}
                </span>
                <h3 className="text-2xl font-extrabold tracking-tight text-[#171714] mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed font-medium mb-6">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#171714]/20">
                {(service.deliverables || service.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#EFECE3] border border-[#171714] text-[#171714]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
