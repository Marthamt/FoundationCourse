import React from 'react';
import {
  GraduationCap,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Code2,
  Building2,
  ArrowRight,
} from 'lucide-react';

interface AboutProps {
  onNavigate: (tab: string) => void;
  onOpenCheckout: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate, onOpenCheckout }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Mission Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
          <Target className="w-3.5 h-3.5 text-indigo-600" />
          Our Mission & Manifesto
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
          Teaching AI as a Tool to Build Real-World Digital Solutions.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We created Foundation Course because the internet was flooded with superficial AI hype. Our mission is to transform everyday individuals and local business owners into confident builders who can create software, launch websites, and dominate their local markets.
        </p>
      </div>

      {/* Story & Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Why Foundation Course Exists
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900">
            From "Chatting with AI" to "Engineering with AI"
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The traditional path to software development required months of learning low-level syntax before ever seeing something deployable. Meanwhile, local businesses spent thousands on marketing agencies that delivered little more than a static brochure site.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Artificial Intelligence has permanently broken that bottleneck. Today, if you understand how to formulate technical intent, generate specifications, and orchestrate modern tools, you can build full-stack web applications and automated workflows in days.
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-800">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No CS degree needed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Practical hands-on code
            </span>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-['Outfit'] text-white">The Foundation Ethos</h3>
              <p className="text-xs text-indigo-300">One Payment. All Courses. Learn. Build. Grow.</p>
            </div>
          </div>
          <blockquote className="text-sm text-slate-300 italic leading-relaxed border-l-2 border-indigo-500 pl-4">
            "We believe the best education is transparent, completely accessible, and results in tangible code and business revenue. That is why we offer every single course on our platform for a single $300 payment."
          </blockquote>
          <div className="text-xs text-slate-400">
            — The Foundation Course Instruction Team
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900">
            The 4 Guiding Principles of Foundation Course
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Building Over Theorizing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every lesson concludes with functional code, a deployed landing page, or an operational business automation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Single-Price Honesty</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No subscriptions that keep billing you when you are busy. One $300 payment guarantees lifetime access to everything.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Accessible to All</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed from the ground up for non-coders and small business owners, while robust enough for aspiring developers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              4
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-1.5">Local Business First</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedicated strategies for Google Maps, customer retention, and local reputation that directly increase phone calls and revenue.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-indigo-950">
          Ready to become a digital builder?
        </h2>
        <p className="text-sm text-indigo-900 max-w-xl mx-auto">
          Join hundreds of local business owners and independent creators who have unlocked all 6 tracks.
        </p>
        <div className="pt-2">
          <button
            onClick={onOpenCheckout}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
          >
            Get Full Access — $300
          </button>
        </div>
      </div>
    </div>
  );
};
