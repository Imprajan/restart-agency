import React, { useState } from 'react';
import { CipherReveal } from './CipherGhostText';
import { Plus, Minus, HelpCircle, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function FaqSection({ onOpenContact }) {
  // Allow multiple FAQs to be open simultaneously so content is immediately visible
  const [openIndices, setOpenIndices] = useState([0, 1, 2]); // First 3 open by default!
  const [allExpanded, setAllExpanded] = useState(false);

  // Exact 5 FAQs from growthub.agency
  const faqs = [
    {
      q: "Can we integrate influencer partnerships into our marketing strategy?",
      a: "Absolutely. We seamlessly incorporate influencer collaborations into your direct-response marketing strategy to amplify your reach and resonate with your target audience authentically.",
      badge: "INFLUENCER & UGC"
    },
    {
      q: "How does the production process accommodate brand revisions?",
      a: "Our process is collaborative and flexible, allowing for revisions at multiple stages. We work closely with you to refine and perfect the creatives to ensure they align with your vision and objectives. This is helped by the initial objective setting stage, where we align our objectives.",
      badge: "REVISIONS & SPRINT"
    },
    {
      q: "Is it possible to submit our own scripts or concepts for the ads?",
      a: "Yes! We welcome your scripts, concepts, and previous customer research. Our team can polish and adapt your initial ideas to maximize impact and conversions while staying true to your brand's voice.",
      badge: "SCRIPTING & CONCEPTS"
    },
    {
      q: "What metrics do you use to assess the performance of the creatives?",
      a: "We analyze both amount spent and ROAS. These indicate which ads are categorized as \"winners\" and ultimately correlate to your revenue and profit. We use secondary metrics (such as 3-second hook retention and thumb-stop rate) to engineer high-performing creative variations.",
      badge: "ROAS & DATA ANALYSIS"
    },
    {
      q: "Why should we invest in ad creatives?",
      a: "Investing in professional ad creatives ensures your brand communicates its message effectively, engaging your audience with high-quality content that drives results by converting cold attention into customers and scaling your presence in the market.",
      badge: "SCALE & ROI"
    }
  ];

  const toggleFaq = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter(i => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const handleToggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
      setAllExpanded(false);
    } else {
      setOpenIndices([0, 1, 2, 3, 4]);
      setAllExpanded(true);
    }
  };

  return (
    <section id="faq" className="relative py-12 sm:py-16 px-4 sm:px-8 md:px-12 bg-transparent text-[#171714] border-t-2 border-[#171714] font-sora">
      {/* Anchor for smooth navigation */}
      <div className="absolute -top-24 left-0" />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-8 border-b-2 border-[#171714]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#171714] -ml-4.5" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#77766F] block">
              <CipherReveal text="KNOWLEDGE BASE // FREQUENTLY ASKED QUESTIONS" speed={30} />
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#171714] leading-[1.02]">
            FAQs. <br />
            <span className="bg-[#00E575] px-3 py-0.5 border-2 border-[#171714] shadow-[3px_3px_0px_#171714] inline-block -rotate-1 mt-1 text-2xl sm:text-4xl md:text-5xl">
              Answers & Process
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#171714]/80 font-medium leading-relaxed">
            Everything you need to know about our direct-response creative process, revision rounds, performance tracking, and scaling models.
          </p>
        </div>

        {/* Action Controls: Expand All + Direct Contact */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleToggleAll}
            className="px-4 py-2.5 rounded-full bg-white border-2 border-[#171714] shadow-[2px_2px_0px_#171714] hover:bg-[#FFD277] text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
          >
            {allExpanded ? "Collapse All" : "Expand All Answers"}
          </button>

          <Magnetic strength={0.3}>
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-full bg-[#171714] text-[#00E575] hover:bg-[#00E575] hover:text-[#171714] border-2 border-[#171714] shadow-[3px_3px_0px_#171714] text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Ask Directly on Call</span>
              <ArrowUpRight size={14} />
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Visible Accordion Content Cards */}
      <div className="pt-8 max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className={`rounded-2xl border-3 border-[#171714] transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-white shadow-[5px_5px_0px_#171714]'
                  : 'bg-white/90 hover:bg-white shadow-[3px_3px_0px_#171714] hover:shadow-[4px_4px_0px_#171714]'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-8 h-8 rounded-xl bg-[#171714] text-[#00E575] border border-[#171714] flex items-center justify-center font-mono font-extrabold text-xs flex-shrink-0 shadow-[1.5px_1.5px_0px_#171714]">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[#F2F0E8] border border-[#171714] text-[9px] font-mono font-extrabold text-[#77766F] uppercase mb-1">
                      {faq.badge}
                    </span>
                    <h3 className="font-sora font-extrabold text-base sm:text-lg md:text-xl text-[#171714] leading-snug group-hover:text-[#00E575] transition-colors">
                      {faq.q}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-9 h-9 rounded-full border-2 border-[#171714] flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#00E575] rotate-45' : 'bg-white group-hover:bg-[#FFD277]'
                  }`}
                >
                  <Plus size={16} className="text-[#171714] stroke-[3]" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-3 border-t-2 border-[#171714]/15 bg-[#FFFDEE]/60">
                  <p className="text-xs sm:text-sm text-[#171714] font-medium leading-relaxed pl-1 sm:pl-11">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}


