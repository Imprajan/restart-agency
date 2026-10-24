import React, { useState } from 'react';
import { CipherReveal } from './CipherGhostText';
import { Star, TrendingUp, Quote, CheckCircle2, ArrowUpRight, Globe, Building2, User } from 'lucide-react';
import Magnetic from './Magnetic';

export default function CaseStudiesTestimonials() {
  const [activeTab, setActiveTab] = useState('ALL');

  const testimonials = [
    {
      id: "raj-shamani",
      brand: "Raj Shamani",
      location: "India",
      type: "Creator / Media House",
      metric: "14.2M+ Views",
      metricSub: "280% Watch-Time Boost",
      quote: "The RESTART team took our long-form conversation podcasts and built viral 9:16 cuts that completely dominated Reels & Shorts. Pacing, sound design, and hook psychology are top 1% globally.",
      author: "Raj Shamani",
      role: "Founder & Host, Figuring Out",
      highlight: "Top Indian Media House",
      stars: 5,
      badgeColor: "#00E575"
    },
    {
      id: "eyvia",
      brand: "Eyvia",
      location: "US",
      type: "Agency Retainer",
      metric: "3.9x ROAS",
      metricSub: "$185,000+ Ad Spend Scaled",
      quote: "We were struggling to scale past $1.2k/day profitably on TikTok and Meta ads. RESTART delivered 12 creative variations with insane 3-second hook retention. Our CPA dropped by 48% within 3 weeks.",
      author: "Marcus Vance",
      role: "VP of Growth, San Francisco, CA",
      highlight: "US DTC eCommerce Scale",
      stars: 5,
      badgeColor: "#FFD277"
    },
    {
      id: "workinx",
      brand: "Workinx",
      location: "Global",
      type: "B2B SaaS Client",
      metric: "4.1x Demo Rate",
      metricSub: "650k+ Qualified B2B Reach",
      quote: "Hands down the most reliable creative partner. They don't just edit videos—they understand conversion funnels, audience drop-off data, and produce creatives that turn clicks into qualified demos.",
      author: "Ananya Sharma",
      role: "Chief Marketing Officer",
      highlight: "B2B SaaS Growth",
      stars: 5,
      badgeColor: "#6AFBC0"
    },
    {
      id: "hul",
      brand: "Hindustan Unilever",
      location: "India",
      type: "Agency Campaign",
      metric: "2.4x Benchmark",
      metricSub: "High-Volume TVC Quality",
      quote: "Exceptional commercial turnaround. The color grading, sound design, and kinetic pacing met strict broadcast and digital standards on the first iteration without endless back-and-forth.",
      author: "Brand Marketing Lead",
      role: "Campaign Strategy & Innovation",
      highlight: "FMCG Commercial Spotlight",
      stars: 5,
      badgeColor: "#C8FF3D"
    },
    {
      id: "hervyan",
      brand: "Hervyan",
      location: "US",
      type: "Freelance Retainer",
      metric: "5.2x ROAS",
      metricSub: "$340k Attributed Revenue",
      quote: "The macro 3D lighting and cinematic aesthetic made our product look like a million-dollar luxury house. Engagement and direct checkout conversions skyrocketed from day one.",
      author: "Elena Rostova",
      role: "Creative Director, New York, NY",
      highlight: "Luxury Apparel & 3D",
      stars: 5,
      badgeColor: "#FFC8DD"
    },
    {
      id: "maed",
      brand: "Maed",
      location: "India",
      type: "Direct Freelance Client",
      metric: "$1.5k → $8.8k/day",
      metricSub: "Scaled with 3 Creatives",
      quote: "RESTART delivered 3 core video angles with 5 hook variations each. One of the hooks became our all-time top-converting ad on Meta. The ROI on our ad spend was virtually immediate.",
      author: "Rohan Kapoor",
      role: "Co-Founder, Maed Studio",
      highlight: "DTC Direct-Response Hit",
      stars: 5,
      badgeColor: "#00E575"
    }
  ];

  const filterTabs = [
    { id: 'ALL', label: '✦ ALL RESULTS' },
    { id: 'US', label: '🇺🇸 US CLIENTS' },
    { id: 'India', label: '🇮🇳 INDIA CLIENTS' },
    { id: 'Agency', label: '🏢 AGENCY PARTNERS' },
    { id: 'Freelance', label: '⚡ FREELANCE / DIRECT' },
  ];

  const filtered = testimonials.filter(item => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'US') return item.location === 'US';
    if (activeTab === 'India') return item.location === 'India';
    if (activeTab === 'Agency') return item.type.includes('Agency');
    if (activeTab === 'Freelance') return item.type.includes('Freelance') || item.type.includes('Direct') || item.type.includes('Creator');
    return true;
  });

  return (
    <section id="case-studies" className="py-24 sm:py-28 px-4 sm:px-8 md:px-12 bg-transparent text-[#171714] border-t-2 border-[#171714] font-sora">
      <div id="testimonials" className="absolute -top-24 left-0" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-10 border-b-2 border-[#171714]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171714] -ml-4.5" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F] block">
              <CipherReveal text="PROVEN RESULTS // CASE STUDIES & TESTIMONIALS" speed={30} />
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171714] leading-[1.02]">
            What Do They Say? <br />
            <span className="bg-[#00E575] px-3 py-0.5 border-2 border-[#171714] shadow-[3px_3px_0px_#171714] inline-block -rotate-1 mt-1 text-2xl sm:text-4xl md:text-5xl">
              Verified Scale & ROI
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#77766F] font-semibold leading-relaxed">
            Direct feedback from agency founders, venture-backed growth leads, and top creators across the United States and India.
          </p>
        </div>

        {/* Aggregate Credibility Pill */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border-2 border-[#171714] shadow-[3px_3px_0px_#171714]">
          <div className="w-11 h-11 rounded-xl bg-[#00E575] border border-[#171714] flex items-center justify-center font-extrabold text-base text-[#171714]">
            5.0
          </div>
          <div>
            <div className="flex items-center gap-1 text-[#FFB800]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#FFB800]" />
              ))}
            </div>
            <span className="text-xs font-extrabold text-[#171714] block mt-0.5">
              100% Client Satisfaction • US & India
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="py-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
        {filterTabs.map((tab) => (
          <Magnetic key={tab.id} strength={0.2}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer border-2 border-[#171714] ${
                activeTab === tab.id
                  ? 'bg-[#00E575] text-[#171714] shadow-[3px_3px_0px_#171714] -translate-x-0.5 -translate-y-0.5'
                  : 'bg-white/90 text-[#171714] shadow-[2px_2px_0px_#171714] hover:shadow-[3px_3px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5'
              }`}
            >
              {tab.label}
            </button>
          </Magnetic>
        ))}
      </div>

      {/* Testimonials 3-Column Asymmetric Responsive Grid */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white border-3 border-[#171714] shadow-[4px_4px_0px_#171714] hover:shadow-[6px_6px_0px_#171714] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            style={{ contain: 'layout paint' }}
          >
            {/* Top Bar with Brand, Location & Scale Metric */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#171714]/15 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    style={{ backgroundColor: item.badgeColor }}
                    className="w-3 h-3 rounded-full border border-[#171714]"
                  />
                  <span className="font-sora font-extrabold text-base sm:text-lg text-[#171714] tracking-tight">
                    {item.brand}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#F2F0E8] border border-[#171714] text-[10px] font-mono font-bold text-[#171714]">
                  {item.location} • {item.type}
                </span>
              </div>

              {/* Verified Result Metric Banner */}
              <div className="p-3.5 rounded-2xl bg-[#171714] text-[#F2F0E8] mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77766F] block">
                    Verified Outcome
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#00E575] font-sora leading-tight">
                    {item.metric}
                  </span>
                </div>
                <span className="text-right text-[11px] font-mono text-[#F2F0E8]/80 font-bold max-w-[120px]">
                  {item.metricSub}
                </span>
              </div>

              {/* Quote Body */}
              <p className="text-xs sm:text-sm text-[#171714] font-medium leading-relaxed italic mb-6">
                "{item.quote}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 border-t-2 border-[#171714]/15 flex items-center justify-between">
              <div>
                <span className="block text-xs font-extrabold text-[#171714]">
                  {item.author}
                </span>
                <span className="text-[10px] text-[#77766F] font-semibold">
                  {item.role}
                </span>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#F2F0E8] border border-[#171714] text-[9px] font-bold text-[#171714] flex items-center gap-1">
                <CheckCircle2 size={11} className="text-[#00E575]" /> Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
