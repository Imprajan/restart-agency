import React from 'react';
import { Sparkles, Globe2 } from 'lucide-react';

export default function BrandLogosMarquee() {
  const clientBrands = [
    { name: "Eyvia", subtitle: "US DTC Consumer Tech", tag: "US" },
    { name: "Workinx", subtitle: "Global Workforce Platform", tag: "GLOBAL" },
    { name: "Hervyan", subtitle: "Luxury Apparel & Lifestyle", tag: "US / UK" },
    { name: "Hindustan Unilever", subtitle: "FMCG Conglomerate", tag: "INDIA / GLOBAL" },
    { name: "Raj Shamani", subtitle: "Top 1% Creator & Media House", tag: "INDIA" },
    { name: "Maed", subtitle: "Direct-to-Consumer Brand", tag: "INDIA" },
  ];

  // Repeat for continuous infinite seamless ticker
  const marqueeItems = [...clientBrands, ...clientBrands, ...clientBrands];

  return (
    <section className="relative py-12 sm:py-16 border-t-2 border-b-2 border-[#171714] bg-white/70 backdrop-blur-md overflow-hidden select-none font-sora">
      {/* Top Eyebrow Label */}
      <div className="max-w-7xl mx-auto px-6 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono font-bold text-[#77766F] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E575] animate-ping" />
          <span className="text-[#171714] font-extrabold font-sora text-xs sm:text-sm">
            Trusted By Market Leaders & High-Growth Creators
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#77766F]">
          <Globe2 size={13} className="text-[#171714]" />
          <span>CLIENTS ACROSS US, INDIA & WORLDWIDE</span>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft edge gradient fades for infinite depth */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F2F0E8] via-[#F2F0E8]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F2F0E8] via-[#F2F0E8]/70 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-6 sm:gap-10 whitespace-nowrap">
          {marqueeItems.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white border-2 border-[#171714] shadow-[3px_3px_0px_#171714] hover:shadow-[4px_4px_0px_#171714] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex-shrink-0"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#171714] group-hover:bg-[#00E575] transition-colors" />
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#171714] font-sora group-hover:text-[#00B859] transition-colors">
                  {brand.name}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#F2F0E8] border border-[#171714] text-[9px] font-mono font-extrabold text-[#77766F]">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
