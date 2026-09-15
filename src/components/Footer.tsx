import React from 'react';
import {
  GraduationCap,
  Mail,
  Phone,
  Shield,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenCheckout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCheckout }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm tracking-wide uppercase">
                <Sparkles className="w-4 h-4" /> Single Price Membership Model
              </div>
              <h3 className="text-2xl font-bold font-['Outfit'] text-white mt-1">
                One Payment. All Courses. Learn. Build. Grow.
              </h3>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Get unlimited lifetime access to all 6 foundational courses, lesson prompts, templates, and future modules for a single $300 payment.
              </p>
            </div>
            <button
              onClick={onOpenCheckout}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition whitespace-nowrap transform hover:-translate-y-0.5"
            >
              Get Full Access — $300
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5 text-indigo-100" />
              </div>
              <span className="font-bold font-['Outfit'] text-xl tracking-tight text-white">
                Foundation<span className="text-indigo-400">Course</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An online education platform designed to teach individuals and local business owners how to use Artificial Intelligence (AI) as a practical tool for building software, websites, and applications—and establishing an unstoppable digital presence.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400" />
                <a href="mailto:foundationcourse@gmail.com" className="hover:text-white transition">
                  foundationcourse@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-indigo-400" />
                <a href="tel:123-456-7890" className="hover:text-white transition">
                  123-456-7890
                </a>
              </div>
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Curriculum Tracks
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('course-detail', 'ai-fundamentals')}
                  className="text-slate-400 hover:text-white transition text-left"
                >
                  AI Fundamentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('course-detail', 'build-websites-with-ai')}
                  className="text-slate-400 hover:text-white transition text-left"
                >
                  Build Websites with AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('course-detail', 'build-software-and-applications-with-ai')}
                  className="text-slate-400 hover:text-white transition text-left"
                >
                  Build Software & Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('course-detail', 'ai-for-local-businesses')}
                  className="text-slate-400 hover:text-white transition text-left"
                >
                  AI for Local Businesses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('course-detail', 'google-business-profile-mastery')}
                  className="text-slate-400 hover:text-white transition text-left"
                >
                  Google Business Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('course-detail', 'personal-branding')}
                  className="text-slate-400 hover:text-white transition text-left"
                >
                  Personal Branding
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="text-slate-400 hover:text-white transition">
                  Explore Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="text-slate-400 hover:text-white transition">
                  Pricing ($300 Flat)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-slate-400 hover:text-white transition">
                  About & Mission
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white transition">
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Guarantee & Access
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>30-Day Money-Back Guarantee if you are not 100% satisfied.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Lifetime access to all future courses & modules.</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Protected 256-bit encrypted checkout with server-side validation.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Foundation Course. All rights reserved. Designed for practical digital builders.</p>
          <div className="flex items-center gap-6">
            <span>One Payment. All Courses. Learn. Build. Grow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
