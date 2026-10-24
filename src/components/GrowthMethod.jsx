import React, { useState, useRef } from 'react';
import { CipherReveal } from './CipherGhostText';
import { 
  Search, Lightbulb, Wand2, Scissors, LineChart, Rocket, 
  CheckCircle2, ArrowRight, Sparkles, Layers, Cpu, Zap, 
  ChevronDown, ChevronUp, Check, Play, RefreshCw, BarChart3
} from 'lucide-react';
import Magnetic from './Magnetic';
import confetti from 'canvas-confetti';

// Interactive 3D Perspective Tilt Card
function InteractiveGrowthCard({ step, index, isActive, onSelect, onOpenContact }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completedItems, setCompletedItems] = useState([]);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const Icon = step.icon;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth 3D tilt calculation
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  const toggleCheck = (e, item) => {
    e.stopPropagation();
    if (completedItems.includes(item)) {
      setCompletedItems(completedItems.filter(i => i !== item));
    } else {
      setCompletedItems([...completedItems, item]);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: [step.tagColor, '#00E575', '#171714']
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        onSelect(index);
        setIsExpanded(!isExpanded);
      }}
      className={`relative p-6 sm:p-7 rounded-3xl border-3 border-[#171714] transition-all duration-300 flex flex-col justify-between cursor-pointer select-none group ${
        isActive 
          ? 'bg-white shadow-[7px_7px_0px_#171714] -translate-y-1.5' 
          : 'bg-white/95 hover:bg-white shadow-[4px_4px_0px_#171714] hover:shadow-[6px_6px_0px_#171714] hover:-translate-y-1'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 ? 'transform 0.5s ease, box-shadow 0.2s ease' : 'none',
        willChange: 'transform'
      }}
    >
      {/* Interactive Cursor Spotlight Sheen */}
      <div 
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${step.tagColor}25, transparent 65%)`
        }}
      />

      {/* Top Bar: Number + Tag Badge + Live Pulse Indicator */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#171714]/15 mb-5 relative z-10">
          <div className="flex items-center gap-3">
            <span 
              className={`w-11 h-11 rounded-2xl border-2 border-[#171714] flex items-center justify-center font-sora font-extrabold text-sm transition-all duration-200 shadow-[2px_2px_0px_#171714] ${
                isActive 
                  ? 'bg-[#00E575] text-[#171714] scale-105' 
                  : 'bg-[#171714] text-[#F2F0E8] group-hover:bg-[#00E575] group-hover:text-[#171714]'
              }`}
            >
              {step.num}
            </span>
            <div>
              <span
                style={{ backgroundColor: step.tagColor }}
                className="px-2.5 py-0.5 rounded-full border border-[#171714] text-[9px] font-mono font-extrabold text-[#171714] shadow-[1px_1px_0px_#171714] uppercase tracking-wider block"
              >
                {step.tag}
              </span>
              <span className="text-[10px] font-mono font-bold text-[#77766F] mt-0.5 block">
                {step.timeline}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#F2F0E8] border border-[#171714] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#FFD277] transition-all">
              <Icon size={18} className="text-[#171714]" />
            </div>
          </div>
        </div>

        {/* Title & Core Description */}
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#171714] mb-3 leading-tight font-sora group-hover:text-[#00B85C] transition-colors relative z-10">
          {step.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#77766F] font-semibold leading-relaxed mb-5 relative z-10">
          {step.description}
        </p>

        {/* Live Metrics Pill */}
        <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171714] text-white text-[10px] font-mono font-bold shadow-[2px_2px_0px_#00E575]">
          <Zap size={11} className="text-[#00E575] fill-[#00E575]" />
          <span>BENCHMARK: {step.metric}</span>
        </div>
      </div>

      {/* Bottom Section: Deliverables + Interactive Expand Drawer */}
      <div className="relative z-10">
        <div className="pt-4 border-t-2 border-[#171714]/15">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77766F]">
              Sprint Deliverables (Click to check off):
            </span>
            <span className="text-[10px] font-mono font-extrabold text-[#171714] bg-[#F2F0E8] px-2 py-0.5 rounded border border-[#171714]">
              {completedItems.length}/{step.deliverables.length} Ready
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {step.deliverables.map((item) => {
              const isChecked = completedItems.includes(item);
              return (
                <button
                  key={item}
                  onClick={(e) => toggleCheck(e, item)}
                  className={`px-2.5 py-1 rounded-lg border border-[#171714] text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isChecked
                      ? 'bg-[#00E575] text-[#171714] shadow-[1.5px_1.5px_0px_#171714]'
                      : 'bg-[#F2F0E8] hover:bg-[#FFD277] text-[#171714]'
                  }`}
                  title="Click to mark deliverable complete"
                >
                  <div className={`w-3.5 h-3.5 rounded-full border border-[#171714] flex items-center justify-center ${isChecked ? 'bg-white' : 'bg-white/80'}`}>
                    {isChecked ? <Check size={8} className="text-[#171714] stroke-[3]" /> : null}
                  </div>
                  <span>{item}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Tech Stack & Expand Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-[#171714]/10 text-[10px] font-mono text-[#77766F]">
            <span className="flex items-center gap-1 font-bold text-[#171714]">
              <Cpu size={12} className="text-[#00E575]" />
              {step.techStack}
            </span>

            <span className="font-extrabold text-[#171714] flex items-center gap-1 group-hover:text-[#00E575]">
              {isExpanded ? 'Less Details' : 'Deep Dive'}
              {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </span>
          </div>

          {/* Expandable Deep Dive Panel */}
          {isExpanded && (
            <div className="mt-3 p-3.5 rounded-2xl bg-[#FFFDEE] border-2 border-[#171714] shadow-[2px_2px_0px_#171714] text-[11px] text-[#171714] space-y-2 animate-fadeIn">
              <div className="font-extrabold uppercase font-mono text-[9px] text-[#77766F] tracking-wider">
                EXECUTION PROTOCOL:
              </div>
              <p className="font-medium leading-relaxed">
                {step.deepDive}
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-[#171714]/15">
                <span className="font-mono text-[9px] font-bold text-[#77766F]">
                  EST. TURNAROUND: {step.turnaround}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenContact) onOpenContact(`Inquiry regarding Stage ${step.num}: ${step.title}`);
                  }}
                  className="px-2.5 py-1 rounded bg-[#171714] text-white hover:bg-[#00E575] hover:text-[#171714] font-mono font-bold text-[9px] uppercase tracking-wider flex items-center gap-1"
                >
                  <span>Book This Stage</span>
                  <ArrowRight size={10} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GrowthMethod({ onOpenContact }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Initial In-depth Research",
      tag: "DISCOVERY & AUDIT",
      tagColor: "#FFD277",
      timeline: "Day 1-2 Sprint",
      metric: "99.4% Angle Accuracy",
      turnaround: "24-48 Hours",
      techStack: "Meta Ad Library • TikTok Creative Center • SpyFu",
      description: "We analyze your top-performing ads, competitor creative libraries, customer reviews, and niche scroll habits to uncover high-converting hook angles that break feed fatigue.",
      deliverables: ["Competitor Creative Teardown", "Hook Fatigue Analysis", "Target Audience Angle Map"],
      deepDive: "We scrape 50+ competitor ads, pinpoint hook decay points, and map audience pain triggers into 3 distinct buyer personas to build a data-backed creative thesis."
    },
    {
      num: "02",
      icon: Lightbulb,
      title: "Creative Strategy & Angle Matrix",
      tag: "STRATEGY SPRINT",
      tagColor: "#00E575",
      timeline: "Day 3 Sprint",
      metric: "3-5 Angles Formulated",
      turnaround: "24 Hours",
      techStack: "Direct Response Matrix • Storyboard Deck",
      description: "We develop 3 to 5 core direct-response narrative angles (Us vs. Them, Problem-Solution, AI Surreal Interruption, Founder Truth) tailored to your brand's unique value.",
      deliverables: ["Direct-Response Scripts", "3-Second Hook Variations", "Storyboards & Visual Briefs"],
      deepDive: "Every script is calibrated around emotional friction, open loops, and rapid visual pacing to guarantee maximum average watch time before product introduction."
    },
    {
      num: "03",
      icon: Wand2,
      title: "AI-Accelerated Production",
      tag: "GENERATIVE SPRINT",
      tagColor: "#C8FF3D",
      timeline: "Day 4-5 Sprint",
      metric: "10x Production Velocity",
      turnaround: "48 Hours",
      techStack: "Runway Gen-3 • Midjourney v6.1 • Topaz 4K",
      description: "We combine authentic creator UGC with Runway Gen-3 and Kling AI cinematic footage, generating hyper-stylized product b-roll and surreal visual hooks impossible with traditional shoots.",
      deliverables: ["AI Cinematic Synthesis", "UGC Asset Curation", "Photorealistic Product Inserts"],
      deepDive: "We train bespoke LoRAs and upscale video generations to crisp 4K 60fps, giving your brand cutting-edge visuals at a fraction of traditional shoot budgets."
    },
    {
      num: "04",
      icon: Scissors,
      title: "Direct Response Editing",
      tag: "RETENTION POLISH",
      tagColor: "#FFC8DD",
      timeline: "Day 6 Sprint",
      metric: "<1.6s Micro-Cut Pacing",
      turnaround: "24-36 Hours",
      techStack: "Premiere Pro • After Effects • Custom SFX Suite",
      description: "Every cut is calibrated to the beat. We engineer pattern interrupts, kinetic bold typography captions, dynamic camera zooms, and multi-layered impact sound design.",
      deliverables: ["Micro-Zoom Pacing", "Kinetic Subtitles", "Custom Audio SFX & Risers"],
      deepDive: "Subconscious audio cues, whoosh risers, screen tilts, and dynamic color grading keep viewers' dopaminergic attention hooked all the way to the call-to-action."
    },
    {
      num: "05",
      icon: LineChart,
      title: "Data Analysis & Iterations",
      tag: "PERFORMANCE TRACKING",
      tagColor: "#00E575",
      timeline: "Post-Launch Cycle",
      metric: "48% Avg CPA Drop",
      turnaround: "Continuous Weekly",
      techStack: "Triple Whale • Meta Graph API • GA4",
      description: "We analyze thumb-stop rate, hold rate, and cost-per-acquisition to isolate the winning creative angle, then rapidly cut 5+ hook variations to double down on what converts.",
      deliverables: ["Thumb-Stop Optimization", "3-Second Hook Swaps", "Iterative Winner Scaling"],
      deepDive: "When an ad hits a 3.5x+ ROAS threshold, we immediately create 5 fresh 3-second hook openers to prevent creative burnout and sustain high spend."
    },
    {
      num: "06",
      icon: Rocket,
      title: "Scale & Omnichannel Launch",
      tag: "6-FIGURE SCALING",
      tagColor: "#FFD277",
      timeline: "Day 7 Scale",
      metric: "$100k+ Profitable Spend Ready",
      turnaround: "Same-Day Deployment",
      techStack: "TikTok Ads • Meta Ads Manager • YouTube Shorts",
      description: "Platform-optimized 4K masters delivered across 9:16 (TikTok & Reels), 1:1 (Meta Feeds), and 16:9 (YouTube Ads), built to absorb high ad spend without creative burnout.",
      deliverables: ["Multi-Ratio 4K Masters", "High-CTR Companion Thumbnails", "Paid Ad Deployment Ready"],
      deepDive: "Deliverables are encoded with platform-specific bitrate optimizations and companion thumb cards, ready for immediate drag-and-drop into campaign ad sets."
    }
  ];

  // Interactive Stage Simulator
  const handleSimulateEngine = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setIsSimulating(false);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00E575', '#FFD277', '#C8FF3D', '#FFC8DD']
        });
      } else {
        setActiveStepIndex(current);
      }
    }, 900);
  };

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FFD277', '#00E575', '#171714']
    });
  };

  return (
    <section id="method" className="py-12 sm:py-16 px-4 sm:px-8 md:px-12 bg-transparent text-[#171714] border-t-2 border-[#171714] font-sora relative">
      <div id="approach" className="absolute -top-20 left-0" />

      {/* Header Bar with Animated "Engineered For Scale" Badge & Interactive Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-8 border-b-2 border-[#171714]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171714] -ml-4.5" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F] block">
              <CipherReveal text="THE GROWTH METHOD // 6-STAGE ENGINE" speed={30} />
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171714] leading-[1.02]">
            The Growth Method. <br />
            
            {/* Interactive Animated "Engineered For Scale" Badge */}
            <div className="inline-flex items-center gap-3 flex-wrap mt-2">
              <button
                onClick={handleTriggerConfetti}
                className="group relative bg-[#FFD277] hover:bg-[#00E575] px-4 py-1.5 rounded-2xl border-3 border-[#171714] shadow-[4px_4px_0px_#171714] hover:shadow-[6px_6px_0px_#171714] hover:-translate-y-0.5 inline-flex items-center gap-2 -rotate-1 transition-all duration-200 cursor-pointer text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#171714]"
                title="Click to celebrate scale engineering"
              >
                <Sparkles size={24} className="group-hover:rotate-45 group-hover:scale-125 transition-transform duration-300 text-[#171714]" />
                <span>Engineered For Scale</span>
                <span className="ml-1 text-xs font-mono font-bold uppercase bg-white/90 px-2 py-0.5 rounded-full border border-[#171714] shadow-[1px_1px_0px_#171714]">
                  6-STAGE
                </span>
              </button>
            </div>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-[#77766F] font-semibold leading-relaxed">
            Our proprietary 6-step framework blends consumer direct-response psychology with generative AI visual pipelines to slash your CPA and maximize profitable scale.
          </p>
        </div>

        {/* Action Buttons: Simulator & Scale Call */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSimulateEngine}
            disabled={isSimulating}
            className={`px-4 sm:px-5 py-3 rounded-full border-2 border-[#171714] shadow-[3px_3px_0px_#171714] text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              isSimulating
                ? 'bg-[#C8FF3D] text-[#171714] animate-pulse'
                : 'bg-white hover:bg-[#FFD277] text-[#171714]'
            }`}
          >
            <RefreshCw size={14} className={isSimulating ? 'animate-spin' : ''} />
            <span>{isSimulating ? `Testing Phase 0${activeStepIndex + 1}...` : 'Simulate 6-Stage Flow'}</span>
          </button>

          <Magnetic strength={0.35}>
            <button
              onClick={onOpenContact}
              className="px-6 sm:px-7 py-3.5 rounded-full bg-[#171714] text-white hover:bg-[#00E575] hover:text-[#171714] border-2 border-[#171714] shadow-[4px_4px_0px_#171714] hover:shadow-[5px_5px_0px_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 text-xs font-extrabold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <span>Scale Your Brand</span>
              <ArrowRight size={14} />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Interactive Stage Tab Selector Bar */}
      <div className="pt-6 pb-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {steps.map((s, idx) => (
          <button
            key={s.num}
            onClick={() => setActiveStepIndex(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer border-2 border-[#171714] flex items-center gap-1.5 whitespace-nowrap ${
              activeStepIndex === idx
                ? 'bg-[#00E575] text-[#171714] shadow-[2.5px_2.5px_0px_#171714] -translate-y-0.5'
                : 'bg-white/80 hover:bg-white text-[#77766F] shadow-[1.5px_1.5px_0px_#171714]'
            }`}
          >
            <span className="font-extrabold text-[#171714]">{s.num}</span>
            <span>{s.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* 6-Stage Process 3D Interactive Cards Grid */}
      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {steps.map((step, idx) => (
          <InteractiveGrowthCard
            key={step.num}
            step={step}
            index={idx}
            isActive={activeStepIndex === idx}
            onSelect={(i) => setActiveStepIndex(i)}
            onOpenContact={onOpenContact}
          />
        ))}
      </div>
    </section>
  );
}
