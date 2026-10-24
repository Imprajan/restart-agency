import React from 'react';
import { CipherReveal } from './CipherGhostText';
import { ArrowDownRight, CheckCircle2 } from 'lucide-react';

export default function ApproachSection({ approach = [] }) {
  return (
    <section id="approach" className="py-28 px-6 sm:px-12 bg-transparent text-[#171714] border-t-2 border-[#171714] font-sora">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 pb-12 border-b-2 border-[#171714]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#171714]"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F] block">
              <CipherReveal text="METHODOLOGY & PRODUCTION SPRINT" speed={30} />
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171714] leading-tight">
            How We Execute <br />
            <span className="bg-[#FFD277] px-2 border-2 border-[#171714] shadow-[4px_4px_0px_#171714] inline-block -rotate-1 mt-2">
              Viral Growth Content
            </span>.
          </h2>
        </div>

        <div className="max-w-md text-sm text-[#171714]/80 leading-relaxed font-medium">
          <p>
            No fluff. No bloated agency retainers. Every edit follows a battle-tested four-phase sprint engineered to capture retention, maximize watch time, and turn views into revenue.
          </p>
        </div>
      </div>

      {/* 4-Step Narrative Timeline / Grid with Frosted Glass Neo-Brutalist Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {approach.map((item, idx) => (
          <div
            key={item.step}
            className="p-7 rounded-3xl bg-white/70 backdrop-blur-xl border-2 border-[#171714] shadow-[0_12px_35px_rgba(0,0,0,0.04),5px_5px_0px_#171714] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07),8px_8px_0px_#171714] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Top Bar with Number & Lime Badge */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#171714]/15">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#171714] text-[#6AFBC0] border border-[#171714] shadow-[2px_2px_0px_#171714]">
                  {item.step}
                </span>
                <span className="text-xs font-mono font-bold text-[#77766F]">
                  0{idx + 1} / 04
                </span>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-[#171714] mb-3 leading-tight">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#77766F] leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            {/* Bottom Status Marker */}
            <div className="pt-6 mt-6 border-t-2 border-[#171714]/15 flex items-center justify-between text-[11px] font-mono font-bold text-[#77766F]">
              <span className="flex items-center gap-1.5 text-[#171714]">
                <CheckCircle2 size={13} className="text-[#171714]" /> Verified Milestone
              </span>
              <ArrowDownRight size={14} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform text-[#171714]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
