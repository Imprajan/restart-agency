import React, { useState } from 'react';
import { CipherReveal } from './CipherGhostText';
import { 
  Sparkles, Lock, Unlock, Check, ArrowRight, ArrowUpRight, 
  Flame, Zap, Rocket, Star, ShieldCheck, Eye, Layers, ChevronRight
} from 'lucide-react';
import Magnetic from './Magnetic';
import confetti from 'canvas-confetti';

function FlipPriceCard({ pkg, isForceRevealed, onOpenContact }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Card is flipped if hovered on desktop, tapped on mobile, or "Reveal All" is active
  const isFlipped = isForceRevealed || isHovered || isTapped;

  const handleCardClick = () => {
    const nextState = !isTapped;
    setIsTapped(nextState);
    if (nextState) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: [pkg.tagColor, '#00E575', '#171714']
      });
    }
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#00E575', '#FFD277', '#171714']
    });
    if (onOpenContact) {
      onOpenContact(`Inquiry: ${pkg.title} (${pkg.price})`);
    } else {
      const msg = encodeURIComponent(`Hi RESTART, I want to lock in the ${pkg.title} package (${pkg.price}). Let's restart that bitch!`);
      window.open(`https://wa.me/?text=${msg}`, '_blank');
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full h-[540px] sm:h-[560px] perspective-1000 cursor-pointer select-none"
    >
      {/* 3D Flip Rotating Container */}
      <div
        className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ========================================================
            SIDE A: FRONT (UNREVEALED / MYSTERY TEASER STATE)
           ======================================================== */}
        <div
          className={`absolute inset-0 backface-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-3 border-[#171714] transition-all duration-300 ${
            pkg.isPopular
              ? 'bg-gradient-to-b from-[#FFFDEE] via-white to-[#E9FFF3] shadow-[6px_6px_0px_#00E575]'
              : 'bg-white shadow-[5px_5px_0px_#171714]'
          }`}
        >
          {/* Top Bar: Number + Slang Badge + Status */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b-2 border-[#171714]/15 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#171714] text-[#F2F0E8] flex items-center justify-center font-mono font-extrabold text-xs shadow-[1.5px_1.5px_0px_#171714]">
                  {pkg.num}
                </span>
                <span
                  style={{ backgroundColor: pkg.tagColor }}
                  className="px-2.5 py-1 rounded-full border border-[#171714] text-[10px] font-mono font-extrabold text-[#171714] shadow-[1px_1px_0px_#171714] uppercase tracking-wider flex items-center gap-1"
                >
                  {pkg.isPopular && <Flame size={12} className="fill-[#171714]" />}
                  {pkg.badge}
                </span>
              </div>

              {/* Pulsing Lock Icon */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171714] text-white text-[10px] font-mono font-bold">
                <Lock size={11} className="text-[#FFD277] animate-pulse" />
                <span className="hidden sm:inline">RATE CLASSIFIED</span>
              </div>
            </div>

            {/* Package Title & Tagline */}
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171714] font-sora leading-tight mb-2">
              {pkg.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#77766F] leading-relaxed mb-6 font-sora">
              {pkg.vibe}
            </p>

            {/* Center Holographic Mystery Emblem */}
            <div className="my-6 p-5 rounded-2xl bg-[#F2F0E8] border-2 border-dashed border-[#171714]/30 flex flex-col items-center justify-center text-center relative overflow-hidden group-hover:border-[#00E575] transition-colors">
              <div className="w-14 h-14 rounded-full bg-[#171714] text-[#00E575] flex items-center justify-center mb-3 shadow-[3px_3px_0px_#00E575] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <Lock size={22} className="stroke-[2.5]" />
              </div>
              <span className="text-xs font-mono font-extrabold text-[#171714] uppercase tracking-wider">
                Hover or Tap to Unreveal Price
              </span>
              <span className="text-[10px] font-mono text-[#77766F] mt-1">
                [ 3D Flip Card Animation • 100% Transparent ]
              </span>
            </div>

            {/* Teaser Deliverables Chips */}
            <div className="flex flex-wrap gap-1.5">
              {pkg.teaserDeliverables.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#171714] text-[10px] font-bold text-[#171714] shadow-[1px_1px_0px_#171714]"
                >
                  ✦ {t}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Flip Callout Bar */}
          <div className="pt-4 border-t-2 border-[#171714]/15 flex items-center justify-between text-xs font-sora font-extrabold text-[#171714]">
            <span className="flex items-center gap-1.5 text-[11px] text-[#77766F] font-mono">
              <span>UNVEIL THE SAUCE</span>
              <span className="animate-bounce">↷</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#00E575] border border-[#171714] text-[10px] uppercase tracking-wider shadow-[1.5px_1.5px_0px_#171714]">
              FLIP TO SEE
            </span>
          </div>
        </div>

        {/* ========================================================
            SIDE B: BACK (REVEALED RATE + FULL DELIVERABLES)
           ======================================================== */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-3 border-[#171714] bg-white shadow-[7px_7px_0px_#171714] overflow-y-auto no-scrollbar ${
            pkg.isPopular ? 'border-[#00E575]' : 'border-[#171714]'
          }`}
        >
          <div>
            {/* Top Bar with Revealed Indicator */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#171714]/15 mb-3">
              <span
                style={{ backgroundColor: pkg.tagColor }}
                className="px-2.5 py-0.5 rounded-full border border-[#171714] text-[9px] font-mono font-extrabold text-[#171714] uppercase tracking-wider"
              >
                {pkg.title}
              </span>

              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00E575] text-[#171714] text-[9px] font-mono font-extrabold border border-[#171714]">
                <Unlock size={10} />
                <span>UNLOCKED</span>
              </div>
            </div>

            {/* Revealed Rate Display (Huge & Punchy) */}
            <div className="mb-4">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#171714] font-sora tracking-tight">
                  {pkg.price}
                </span>
                {pkg.period && (
                  <span className="text-xs font-mono font-bold text-[#77766F]">
                    {pkg.period}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono font-semibold text-[#77766F] mt-0.5">
                {pkg.subprice}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2 mb-4">
              <span className="block text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#77766F]">
                Everything Included:
              </span>
              <ul className="space-y-1.5 text-xs text-[#171714] font-semibold font-sora">
                {pkg.deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 leading-snug">
                    <div className="w-4 h-4 rounded-md bg-[#00E575] border border-[#171714] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={10} className="stroke-[3] text-[#171714]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Goal Callout Box */}
            <div className="p-3 rounded-xl bg-[#FFFDEE] border border-[#171714] text-[11px] text-[#171714] mb-3 font-sora">
              <strong className="text-[#171714] font-extrabold uppercase font-mono text-[10px] block mb-0.5">
                🎯 The Goal:
              </strong>
              <span className="font-medium text-[#77766F]">
                {pkg.goal}
              </span>
            </div>
          </div>

          {/* Action CTA Button on Back */}
          <div className="pt-3 border-t-2 border-[#171714]/15">
            <button
              onClick={handleBookClick}
              className="w-full py-3 rounded-full bg-[#171714] hover:bg-[#00E575] text-white hover:text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] hover:shadow-[4px_4px_0px_#171714] text-xs font-extrabold font-sora uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{pkg.ctaText}</span>
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PricingPackages({ onOpenContact }) {
  const [revealAll, setRevealAll] = useState(false);

  const packages = [
    {
      num: "01",
      title: "BASIC",
      subtitle: "Build Your Presence",
      price: "₹19,999",
      period: "/month",
      subprice: "Monthly Retainer • No Hidden Fees",
      tagColor: "#FFD277",
      badge: "PRESENCE SPRINT",
      vibe: "For creators and businesses ready to get their content game started and stay consistent.",
      teaserDeliverables: ["10 AI Videos & Reels", "Carousels & Static Posts", "Social Media Management"],
      deliverables: [
        "10 AI videos & direct-response edited reels",
        "High-CTR carousels & static posts",
        "Full Social Media Management (SMM)",
        "Page audit & competitor hook analysis",
        "Content calendar, captions & posting strategy",
        "Monthly performance tracking report"
      ],
      goal: "Build a solid online presence, break feed fatigue, and stay hyper-consistent.",
      ctaText: "Lock In Basic Sprint"
    },
    {
      num: "02",
      title: "GROWTH",
      subtitle: "Time to Level Up",
      price: "₹33,999",
      period: "/month",
      subprice: "Scale Retainer • Weekly Iterations",
      tagColor: "#6AFBC0",
      badge: "LEVEL UP BAG",
      vibe: "For brands ready to step up their content game, dominate attention, and stand out from competitors.",
      teaserDeliverables: ["12 AI Reels & Edits", "Full SMM & Optimization", "Competitor Research"],
      deliverables: [
        "12 AI videos & direct-response edited reels",
        "Conversion carousels & static creatives",
        "Complete Social Media Management",
        "Detailed page audit & deep competitor teardown",
        "Monthly content strategy & growth roadmap",
        "Scheduling, analytics & iterative optimization"
      ],
      goal: "Create better content, build authority, and unlock continuous profitable growth.",
      ctaText: "Level Up With Growth"
    },
    {
      num: "03",
      title: "PREMIUM",
      subtitle: "Main Character Energy",
      price: "₹59,999",
      period: "/month",
      subprice: "High-Volume Firepower • Priority Sprint",
      tagColor: "#00E575",
      badge: "MAIN CHARACTER ENERGY",
      isPopular: true,
      vibe: "For brands that aren't here to play small. Premium creative, high-volume content, and ruthless strategy.",
      teaserDeliverables: ["30–35 Videos / Month", "Priority Creative Direction", "Full Campaign Planning"],
      deliverables: [
        "30–35 high-impact videos per month",
        "Premium AI ads & cinema-grade video editing",
        "High-converting carousels & static creatives",
        "Full Social Media Management suite",
        "In-depth competitor analysis & advanced hook strategy",
        "Paid campaign planning & performance tracking",
        "Priority production sprint & direct creative direction"
      ],
      goal: "Build a powerhouse brand with content that hits different and keeps your audience hooked.",
      ctaText: "Claim Main Character Energy"
    },
    {
      num: "04",
      title: "CUSTOM",
      subtitle: "Your Vision, Our Execution",
      price: "₹75,000+",
      period: "/month",
      subprice: "Tailor-Made Scope • Bespoke Delivery",
      tagColor: "#FFC8DD",
      badge: "BESPOKE SAUCE",
      vibe: "Need something beyond the usual? From bespoke 3D pipelines to custom web development, we've got you.",
      teaserDeliverables: ["Custom AI Pipelines", "Web & E-Commerce", "Full-Funnel Campaigns"],
      deliverables: [
        "Custom AI generative video production",
        "High-conversion website design & development",
        "Complete E-commerce solutions & funnels",
        "Advanced multi-channel marketing campaigns",
        "Tailor-made content & proprietary creative strategies"
      ],
      goal: "Build an end-to-end bespoke solution that fits your brand, your goals, and your limitless vision.",
      ctaText: "Build Custom Package"
    }
  ];

  const workflowSteps = [
    { step: "01", label: "AUDIT", desc: "Teardown existing creatives" },
    { step: "02", label: "COMPETITORS", desc: "Analyze winning niche angles" },
    { step: "03", label: "STRATEGY", desc: "Formulate 3-second hook matrix" },
    { step: "04", label: "CREATE", desc: "AI-accelerated production & polish" },
    { step: "05", label: "TRACK", desc: "Measure thumb-stop & CPA metrics" },
    { step: "06", label: "OPTIMIZE", desc: "Iterate winners to scale profit" }
  ];

  return (
    <section id="pricing" className="py-14 sm:py-20 px-4 sm:px-8 md:px-12 bg-transparent text-[#171714] border-t-2 border-[#171714] font-sora relative">
      
      {/* 1. Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-10 border-b-2 border-[#171714]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171714] -ml-4.5" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F] block">
              <CipherReveal text="TRANSPARENT RETAINERS // NO CAP PRICING" speed={30} />
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#171714] leading-[1.05]">
            🚀 Our Packages — <br />
            <span className="bg-[#00E575] px-3.5 py-0.5 rounded-xl border-2 border-[#171714] shadow-[3px_3px_0px_#171714] inline-block -rotate-1 mt-1 text-2xl sm:text-4xl md:text-5xl">
              Your Brand, But Built Different.
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#77766F] font-semibold leading-relaxed">
            All rates remain classified until you touch or hover any card below. Flip each tier to unveil the sauce, exact deliverables, and monthly rates.
          </p>
        </div>

        {/* Action Controls: Reveal All Toggle + Direct Inquiry */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setRevealAll(!revealAll)}
            className="px-4 py-3 rounded-full bg-white border-2 border-[#171714] shadow-[2.5px_2.5px_0px_#171714] hover:bg-[#FFD277] text-xs font-extrabold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
          >
            {revealAll ? <Lock size={14} /> : <Unlock size={14} />}
            <span>{revealAll ? "Lock Mystery Mode" : "Reveal All Rates"}</span>
          </button>

          <Magnetic strength={0.3}>
            <button
              onClick={() => onOpenContact ? onOpenContact("Custom Package Inquiry") : window.open("https://wa.me/?text=Hi%20RESTART,%20Let's%20Restart%20That%20Bitch", "_blank")}
              className="px-5 py-3 rounded-full bg-[#171714] text-[#00E575] hover:bg-[#00E575] hover:text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer font-sora"
            >
              <span>Custom Proposal</span>
              <ArrowUpRight size={14} />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* 2. 4-Tier Interactive 3D Flip Cards Grid */}
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-7">
        {packages.map((pkg) => (
          <FlipPriceCard
            key={pkg.num}
            pkg={pkg}
            isForceRevealed={revealAll}
            onOpenContact={onOpenContact}
          />
        ))}
      </div>

      {/* 3. "WHY US? 👀" Interactive Framework Showcase */}
      <div className="mt-16 p-7 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-md border-3 border-[#171714] shadow-[6px_6px_0px_#171714]">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#00E575] text-[#171714] text-[10px] font-mono font-extrabold border border-[#171714]">
              GEN-Z CREATIVE OPERATING SYSTEM
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171714] font-sora">
            WHY US? 👀
          </h3>

          <p className="mt-2 text-sm sm:text-base text-[#171714] font-bold">
            We don't just create content and call it a day.
          </p>
        </div>

        {/* 6-Step Interactive Arrow Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {workflowSteps.map((ws, i) => (
            <div
              key={ws.step}
              className="p-4 rounded-2xl bg-[#F2F0E8] border-2 border-[#171714] shadow-[2px_2px_0px_#171714] flex flex-col justify-between hover:bg-[#00E575] hover:-translate-y-1 transition-all duration-200 group cursor-default"
            >
              <div>
                <span className="text-[10px] font-mono font-extrabold text-[#77766F] group-hover:text-[#171714] block mb-1">
                  STAGE {ws.step}
                </span>
                <span className="text-sm font-extrabold font-sora text-[#171714] block leading-tight">
                  {ws.label}
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-[#77766F] group-hover:text-[#171714] mt-2 block">
                {ws.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Punchline Statement Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#171714] text-[#F2F0E8] border-2 border-[#171714] flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-[#F2F0E8]/80 font-medium font-sora">
              From AI-powered visuals to social media management and high-converting websites, we bring your brand's digital game under one roof.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-extrabold font-sora text-[#00E575]">
              Less guesswork. Better creatives. Smarter strategy. Let's build something that hits different.
            </p>
          </div>

          <Magnetic strength={0.35}>
            <button
              onClick={() => onOpenContact ? onOpenContact("Why Us Strategy Call") : window.open("https://wa.me/?text=Hi%20RESTART,%20Let's%20Restart%20That%20Bitch", "_blank")}
              className="px-6 py-3.5 rounded-full bg-[#00E575] hover:bg-[#6AFBC0] text-[#171714] font-extrabold text-xs uppercase tracking-wider font-sora border-2 border-white shadow-[3px_3px_0px_#FFFFFF] flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <span>Work With Us ↗</span>
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
