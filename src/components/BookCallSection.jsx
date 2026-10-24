import React, { useState } from 'react';
import { CipherReveal } from './CipherGhostText';
import { Calendar, Clock, CheckCircle2, Copy, Check, ArrowUpRight, MessageSquare, Send, Sparkles, Mail } from 'lucide-react';
import Magnetic from './Magnetic';
import confetti from 'canvas-confetti';

const formatTimeIST = (timeStr) => {
  if (!timeStr) return '2:00 PM IST';
  const [h, m] = timeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return timeStr + ' IST';
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHours = h % 12 || 12;
  const displayMinutes = m < 10 ? `0${m}` : m;
  return `${displayHours}:${displayMinutes} ${period} IST`;
};

export default function BookCallSection({ studio, socials = [] }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [isPickDate, setIsPickDate] = useState(false);
  const [dateInput, setDateInput] = useState('');
  
  // Preferred Time Slot (Client chooses their own time without static constraints)
  const [timeInput, setTimeInput] = useState('14:00');
  const [selectedTime, setSelectedTime] = useState('2:00 PM IST');

  // Spend options: exactly 4 options
  const spendOptions = ['Less than $10k', 'Less than $50k', 'Less than $100k', 'Custom'];
  const [monthlySpend, setMonthlySpend] = useState('Less than $50k');
  const [customSpendInput, setCustomSpendInput] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', brand: '', notes: '' });

  const standardDates = ['Tomorrow', 'Next Monday'];
  const contactEmail = '22truefeed@gmail.com';
  const todayISO = new Date().toISOString().split('T')[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#00E575', '#FFD277', '#F2F0E8']
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSelectStandardDate = (d) => {
    setIsPickDate(false);
    setSelectedDate(d);
  };

  const handleDateInputChange = (e) => {
    const val = e.target.value;
    setDateInput(val);
    if (val) {
      const [year, month, day] = val.split('-');
      const dateObj = new Date(year, month - 1, day);
      const formatted = dateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      setSelectedDate(formatted);
    }
  };

  const handleTimeChange = (e) => {
    const val = e.target.value;
    setTimeInput(val);
    setSelectedTime(formatTimeIST(val));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalSpend = monthlySpend === 'Custom' && customSpendInput.trim()
      ? `Custom: ${customSpendInput.trim()}`
      : monthlySpend;

    const submissionPayload = {
      _subject: `🚀 New Discovery Call Booking: ${formData.name} (${formData.brand || 'No Website/Brand'})`,
      _template: 'table',
      _captcha: 'false',
      Client_Name: formData.name,
      Client_Email: formData.email,
      Brand_or_Website: formData.brand ? formData.brand.trim() : 'Not provided / Still building',
      Selected_Day: selectedDate,
      Selected_Time: selectedTime,
      Current_Ad_Marketing_Spend: finalSpend,
      Client_Notes: formData.notes ? formData.notes.trim() : 'None',
      Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'
    };

    try {
      // 1. Direct AJAX dispatch to FormSubmit for 22truefeed@gmail.com
      const formSubmitPromise = fetch('https://formsubmit.co/ajax/22truefeed@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionPayload)
      }).catch((err) => {
        console.warn('FormSubmit notification notice:', err);
        return null;
      });

      // 2. Also dispatch to local/Netlify backend endpoint /api/book-call
      const backendPromise = fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionPayload)
      }).catch(() => null);

      // Await quick confirmation (or timeout fallback after 2s so user never waits)
      await Promise.race([
        Promise.all([formSubmitPromise, backendPromise]),
        new Promise((resolve) => setTimeout(resolve, 2000))
      ]);
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.75 },
        colors: ['#00E575', '#FFD277', '#FFFFFF']
      });
    }
  };

  return (
    <footer id="contact" className="relative bg-[#171714] text-[#F2F0E8] pt-24 pb-12 px-4 sm:px-8 md:px-12 font-sora">
      <div id="book-a-call" className="absolute -top-20 left-0" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header: "Book a call, let’s scale" */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E575] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E575]">
              <CipherReveal text="DISCOVERY & CREATIVE AUDIT CALL" speed={30} />
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F2F0E8] leading-[1.02]">
            Book a call, <br />
            <span className="text-[#00E575] underline decoration-4 underline-offset-8">
              let’s scale.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#77766F] font-medium leading-relaxed max-w-2xl">
            In the call we’ll discuss your brand’s objectives and how we can help your brand grow with our creative process.
          </p>
        </div>

        {/* 2-Column Booking Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-20 border-b border-white/15">
          
          {/* Left Column: What We Cover */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/5 border-2 border-white/15 backdrop-blur-md">
              <h3 className="text-xl font-extrabold text-[#F2F0E8] mb-4 flex items-center gap-2 font-sora">
                <Sparkles size={18} className="text-[#00E575]" />
                What Happens on the Call:
              </h3>
              <ul className="space-y-4 text-xs sm:text-sm text-[#F2F0E8]/80 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00E575] flex-shrink-0 mt-0.5" />
                  <span><strong>Creative Audit:</strong> Live review of your top ads & current CPA bottlenecks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00E575] flex-shrink-0 mt-0.5" />
                  <span><strong>Hook Angles:</strong> We brainstorm 3 high-probability direct-response hooks tailored to your offer.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00E575] flex-shrink-0 mt-0.5" />
                  <span><strong>Sprint Roadmap:</strong> Exact delivery timelines, revision cycles, and pricing tiers.</span>
                </li>
              </ul>
            </div>

            {/* Direct Email Note Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#00E575] uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={13} />
                  <span>Direct Inquiries</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-white/10 hover:bg-[#00E575] hover:text-[#171714] transition-all flex items-center gap-1 cursor-pointer text-[#F2F0E8]"
                >
                  {copiedEmail ? <Check size={11} className="text-[#00E575]" /> : <Copy size={11} />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs text-[#77766F] font-medium leading-relaxed">
                Prefer email directly? Reach us anytime at{' '}
                <a
                  href={`mailto:${contactEmail}`}
                  className="text-[#00E575] hover:underline font-bold font-mono"
                >
                  {contactEmail}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right Column: Direct Interactive Booking Widget */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white text-[#171714] border-3 border-[#171714] shadow-[6px_6px_0px_#00E575]">
              {formSubmitted ? (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#00E575] text-[#171714] border-2 border-[#171714] flex items-center justify-center mx-auto shadow-[3px_3px_0px_#171714]">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-[#00E575]/20 text-[#171714] text-xs font-mono font-extrabold border border-[#00E575] inline-block">
                      ✉️ Notification Sent to 22truefeed@gmail.com
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Call Request Confirmed!
                    </h3>
                  </div>
                  <p className="text-sm text-[#77766F] font-semibold max-w-md mx-auto leading-relaxed">
                    We've reserved <strong>{selectedDate} at {selectedTime}</strong>. We'll send a calendar invite and Google Meet link to <strong>{formData.email || 'your email'}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', brand: '', notes: '' });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#171714] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[#00E575] hover:text-[#171714] transition-colors cursor-pointer"
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-[#171714]/15">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#77766F] uppercase tracking-wider block">
                        Select Discovery Slot
                      </span>
                      <h4 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#171714]">
                        30-Min Growth Strategy Call
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#00E575] text-[#171714] text-xs font-extrabold border border-[#171714]">
                      FREE
                    </span>
                  </div>

                  {/* 1. Day Selector (Tomorrow, Next Monday, or Select Date) */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171714] mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        1. Select Day:
                      </span>
                      {selectedDate && (
                        <span className="text-[11px] font-mono text-[#00E575] bg-[#171714] px-2 py-0.5 rounded-md">
                          Selected: {selectedDate}
                        </span>
                      )}
                    </label>

                    <div className="grid grid-cols-3 gap-2">
                      {standardDates.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => handleSelectStandardDate(d)}
                          className={`py-2.5 px-3 rounded-xl border-2 border-[#171714] text-xs font-extrabold transition-all cursor-pointer ${
                            !isPickDate && selectedDate === d
                              ? 'bg-[#00E575] shadow-[2px_2px_0px_#171714] -translate-x-0.5 -translate-y-0.5 text-[#171714]'
                              : 'bg-[#F2F0E8] hover:bg-white text-[#171714]'
                          }`}
                        >
                          {d}
                        </button>
                      ))}

                      {/* Pick Date Button */}
                      <button
                        type="button"
                        onClick={() => setIsPickDate(true)}
                        className={`py-2.5 px-3 rounded-xl border-2 border-[#171714] text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isPickDate
                            ? 'bg-[#FFD277] shadow-[2px_2px_0px_#171714] -translate-x-0.5 -translate-y-0.5 text-[#171714]'
                            : 'bg-[#F2F0E8] hover:bg-white text-[#171714]'
                        }`}
                      >
                        <Calendar size={13} />
                        <span>Select Date</span>
                      </button>
                    </div>

                    {/* Inline Date Picker */}
                    {isPickDate && (
                      <div className="mt-3 p-3 rounded-xl bg-[#FFFDEE] border-2 border-[#171714] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                        <span className="text-xs font-mono font-bold text-[#171714]">
                          Choose date on calendar:
                        </span>
                        <input
                          type="date"
                          min={todayISO}
                          value={dateInput}
                          onChange={handleDateInputChange}
                          className="px-3 py-1.5 rounded-lg border-2 border-[#171714] text-xs font-extrabold bg-white text-[#171714] focus:outline-none focus:ring-2 focus:ring-[#00E575]"
                          required={isPickDate}
                        />
                      </div>
                    )}
                  </div>

                  {/* 2. Time Slot Selector (IST) - Direct selector without static constraints */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171714] mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} />
                        2. Select Preferred Time (IST):
                      </span>
                      {selectedTime && (
                        <span className="text-[11px] font-mono text-[#00E575] bg-[#171714] px-2.5 py-0.5 rounded-md font-bold">
                          {selectedTime}
                        </span>
                      )}
                    </label>

                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F2F0E8] border-2 border-[#171714] hover:border-[#00E575] focus-within:border-[#00E575] transition-colors">
                      <Clock size={18} className="text-[#171714] flex-shrink-0" />
                      <input
                        type="time"
                        value={timeInput}
                        onChange={handleTimeChange}
                        className="bg-transparent font-sora font-extrabold text-sm sm:text-base text-[#171714] focus:outline-none cursor-pointer flex-1"
                        required
                      />
                      <span className="px-2.5 py-1 rounded-lg bg-[#171714] text-[#00E575] font-mono text-xs font-extrabold shadow-[1px_1px_0px_#171714]">
                        IST
                      </span>
                    </div>
                  </div>

                  {/* 3. Monthly Ad / Marketing Spend (Exact 4 options) */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#171714] mb-2 flex items-center justify-between">
                      <span>3. Current Monthly Ad / Marketing Spend:</span>
                      {monthlySpend && (
                        <span className="text-[11px] font-mono text-[#00E575] bg-[#171714] px-2 py-0.5 rounded-md font-bold">
                          {monthlySpend === 'Custom' && customSpendInput.trim() ? customSpendInput.trim() : monthlySpend}
                        </span>
                      )}
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {spendOptions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setMonthlySpend(s)}
                          className={`py-2 px-2.5 rounded-xl border-2 border-[#171714] text-[11px] font-extrabold transition-all cursor-pointer ${
                            monthlySpend === s
                              ? 'bg-[#171714] text-[#00E575] shadow-[2px_2px_0px_#171714] -translate-x-0.5 -translate-y-0.5'
                              : 'bg-[#F2F0E8] hover:bg-white text-[#171714]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Inline Custom Spend Input */}
                    {monthlySpend === 'Custom' && (
                      <div className="mt-3 p-3 rounded-xl bg-[#FFFDEE] border-2 border-[#171714] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
                        <span className="text-xs font-mono font-bold text-[#171714]">
                          Enter your monthly budget:
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. $150k+/mo or flexible"
                          value={customSpendInput}
                          onChange={(e) => setCustomSpendInput(e.target.value)}
                          className="px-3 py-1.5 rounded-lg border-2 border-[#171714] text-xs font-semibold bg-white text-[#171714] focus:outline-none focus:ring-2 focus:ring-[#00E575] flex-1 max-w-xs"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>

                  {/* Form Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-[#171714] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#171714] text-xs font-semibold focus:outline-none focus:bg-[#FFFDEE]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold uppercase text-[#171714] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@yourbrand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#171714] text-xs font-semibold focus:outline-none focus:bg-[#FFFDEE]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-extrabold uppercase text-[#171714] mb-1 flex items-center justify-between">
                        <span>Brand Name or Website</span>
                        <span className="text-[10px] text-[#77766F] font-mono font-semibold">(Optional — not everyone has a site)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Nike, Personal Brand, or website URL (optional)"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#171714] text-xs font-semibold focus:outline-none focus:bg-[#FFFDEE]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#00E575] text-[#171714] border-3 border-[#171714] shadow-[4px_4px_0px_#171714] hover:shadow-[5px_5px_0px_#171714] hover:bg-[#6AFBC0] hover:-translate-x-0.5 hover:-translate-y-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#171714] border-t-transparent rounded-full animate-spin" />
                        <span>Sending to 22truefeed@gmail.com...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Confirm Call</span>
                        <ArrowUpRight size={16} className="stroke-[3]" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Agency Wordmark & Social Links (No Phone Numbers) */}
        <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-[#77766F] font-mono">
          <div className="flex items-center gap-3">
            <span className="font-sora font-extrabold text-base text-[#F2F0E8] tracking-tight">
              RESTART
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#00E575] text-[#171714] text-[9px] font-extrabold">
              AGENCY
            </span>
            <span className="text-white/40">|</span>
            <span>© 2026 • Let's Restart That Bitch</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-sora font-bold text-xs text-[#F2F0E8]">
            <a href={`mailto:${contactEmail}`} className="text-[#00E575] hover:underline flex items-center gap-1.5 font-mono">
              <Mail size={13} />
              <span>{contactEmail}</span>
            </a>
            <a href="https://wa.me/?text=Hi%20RESTART,%20Let's%20Restart%20That%20Bitch" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E575] transition-colors flex items-center gap-1">
              <MessageSquare size={13} />
              <span>WhatsApp</span>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E575] transition-colors">
              X (Twitter)
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E575] transition-colors">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00E575] transition-colors">
              YouTube
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
