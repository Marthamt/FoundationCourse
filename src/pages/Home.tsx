import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Code2,
  Globe2,
  Cpu,
  Building2,
  TrendingUp,
  Award,
  Shield,
  HelpCircle,
  ChevronDown,
  Play,
  Zap,
  Users,
  Star,
  Layers,
} from 'lucide-react';
import { Course } from '../types';
import { CourseCard } from '../components/CourseCard';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/siteContent';
import { useAuth } from '../context/AuthContext';

interface HomeProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onNavigate: (tab: string, param?: string) => void;
  onOpenCheckout: () => void;
}

export const Home: React.FC<HomeProps> = ({
  courses,
  onSelectCourse,
  onNavigate,
  onOpenCheckout,
}) => {
  const { hasPaidAccess } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Practical AI Education Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight leading-[1.15]">
              Learn AI. Build Digital Solutions.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-800">
                Grow Your Business.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Learn how to use AI as a practical tool to build websites, software, and applications—and discover how local businesses can use digital tools, Google Business Profile, and personal branding to build a stronger online presence.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              {hasPaidAccess ? (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>Go to Your Student Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onOpenCheckout}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
                  id="hero-primary-cta"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Get Full Access — $300</span>
                </button>
              )}

              <button
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base border border-slate-300 shadow-xs transition flex items-center justify-center gap-2"
                id="hero-secondary-cta"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                All 6 Core Tracks Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Single $300 One-Time Payment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                30-Day Money-Back Guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INSTANT VALUE PROPOSITION (Understanding within seconds) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10">
            <div className="text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              The Foundation Course Promise
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit']">
              One complete learning experience for AI-powered development and digital business growth.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              We cut through the hype. Here is everything you need to know about what you get:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1 */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h3 className="font-bold text-base text-white">What Foundation Course Is</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                A hands-on, video-and-code curriculum teaching individuals and local business owners how to use AI as a direct builder for software, web solutions, and operations.
              </p>
            </div>

            {/* 2 */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h3 className="font-bold text-base text-white">What You Will Learn</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Writing software specs, building responsive websites, pairing with AI coding assistants, wiring databases, ranking on Google Maps, and automating customer tasks.
              </p>
            </div>

            {/* 3 */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h3 className="font-bold text-base text-white">Who It Is For</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Entrepreneurs with ideas, local business owners wanting to dominate online, and non-technical creators wanting to build digital products without hiring expensive agencies.
              </p>
            </div>

            {/* 4 */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                4
              </div>
              <h3 className="font-bold text-base text-white">All Courses Included</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Zero tier gating. You get all 6 flagship tracks immediately, plus every future course and module added to Foundation Course forever.
              </p>
            </div>

            {/* 5 */}
            <div className="bg-slate-800/60 p-5 rounded-xl border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                5
              </div>
              <h3 className="font-bold text-base text-white">Flat $300 One-Time</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                No monthly subscription fatigue, no renewals, and no upsells. Pay once and keep your full access for life.
              </p>
            </div>

            {/* 6 & 7 */}
            <div className="bg-gradient-to-br from-indigo-950 to-slate-800 p-5 rounded-xl border border-indigo-500/30">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                6 & 7
              </div>
              <h3 className="font-bold text-base text-white">Purchase & Immediate Access</h3>
              <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
                Complete checkout in 60 seconds. Your student account is instantly created, unlocking your personal dashboard, video lessons, and downloadable prompts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY: Real Solutions Over Superficial AI Chatting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            The Foundation Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-slate-900">
            Don't Just Learn About AI. Learn to Create Real-World Solutions.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Most courses treat AI as a toy for writing poems or generating novelty images. We teach you how to treat AI as a tireless junior developer, copywriter, and digital operations director.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 mb-2">
              Build & Deploy Websites
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Generate pixel-perfect layouts, write responsive HTML/Tailwind code, add interactive booking widgets, and deploy live online with your own custom domain.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Responsive mobile-first layouts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero-cost hosting deployment</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 mb-2">
              Build Software & Applications
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Turn software concepts into full-stack web applications. Pair with AI coding assistants (Cursor, Claude, Copilot) to build front-ends, APIs, and databases.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Full-stack React & Node development</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Databases, schemas, and live auth</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-['Outfit'] text-slate-900 mb-2">
              Scale Local Businesses
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automate customer replies, create high-converting marketing in minutes, dominate Google Maps Local 3-Pack, and turn happy customers into 5-star reviews.
            </p>
            <ul className="mt-4 space-y-2 text-xs text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Google Business Profile dominance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automated 24/7 lead qualification</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. DUAL BENEFIT: For Individuals vs Local Businesses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              Engineered For Results
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-slate-900">
              Who Foundation Course Empowers
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Box 1: Individuals & Aspiring Developers */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                    For Individuals & Aspiring Builders
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  You have ideas for apps, websites, or side projects, but technical barriers or agency price tags held you back.
                </p>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Build functional software prototypes without a 4-year CS degree.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Offer high-demand web and AI automation services to commercial clients.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Establish an influential personal brand that attracts premium opportunities.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Key Track:</span>
                <span className="text-xs font-bold text-indigo-600">Software & Web with AI</span>
              </div>
            </div>

            {/* Box 2: Local Business Owners */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-slate-900">
                    For Local Business Owners
                  </h3>
                </div>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                  Contractors, clinic directors, retail owners, and service professionals who need more customer calls and less administrative chaos.
                </p>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Never pay $5,000+ to agencies for simple landing pages again.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Rank in Google Maps Top 3 to capture high-intent local phone calls.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Automate customer inquiries, review replies, and monthly social campaigns.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Key Track:</span>
                <span className="text-xs font-bold text-emerald-700">Google Business & AI Operations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED COURSES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              Curriculum Catalog
            </div>
            <h2 className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
              Featured Foundation Courses
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every course below is included in your single $300 membership access.
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 self-start md:self-auto transition"
          >
            <span>View All {courses.length} Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid of Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 6).map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
              onOpenCheckout={onOpenCheckout}
            />
          ))}
        </div>
      </section>

      {/* 6. PRICING SECTION: Single Fixed-Price $300 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="pricing-section">
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Honest Single-Price Model
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-white">
              One Payment. All Courses. Learn. Build. Grow.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              We don't believe in monthly subscription traps or locking advanced modules behind expensive tiers. Pay once, gain immediate access to everything, and keep it forever.
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-slate-800/90 rounded-2xl p-8 sm:p-10 border border-indigo-400/30 shadow-2xl backdrop-blur-xs relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
              Full Platform Access
            </div>

            <div className="text-center pb-6 border-b border-slate-700">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold text-slate-400">$</span>
                <span className="text-6xl font-extrabold font-['Outfit'] text-white tracking-tight">
                  300
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mt-1">
                One-time payment • Lifetime membership
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Zero recurring charges. Full access to all current and future courses.
              </p>
            </div>

            {/* Checklist */}
            <div className="py-6 space-y-3.5 text-sm text-slate-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span><strong>All 6 Flagship Tracks</strong> (AI, Web, Apps, Local Biz, SEO, Branding)</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Over 90+ Video Lessons & In-Depth Text Tutorials</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Full Library of Copy-Paste AI Prompts & Specs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Complete Ready-to-Deploy Code Starter Repos</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Personal Student Dashboard with Progress Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>All Future Curriculum Updates Included Automatically</span>
              </div>
            </div>

            {/* CTA */}
            {hasPaidAccess ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg shadow-indigo-600/40 transition flex items-center justify-center gap-2"
              >
                <span>You Already Have Access • Open Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={onOpenCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-base shadow-xl shadow-indigo-600/40 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                id="pricing-card-cta"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Get Full Access — $300</span>
              </button>
            )}

            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-indigo-400" /> 30-Day Money-Back Guarantee
              </span>
              <span>•</span>
              <span>Instant Account Activation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            Proven Outcomes
          </div>
          <h2 className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
            Real Results from Real Builders & Business Owners
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            See how our students applied the Foundation Course curriculum to build live software, save thousands, and accelerate their businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm sm:text-base text-slate-700 italic leading-relaxed">
                  "{test.quote}"
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-sm text-slate-900">{test.name}</div>
                    <div className="text-xs text-slate-500">{test.role} • {test.company}</div>
                  </div>
                </div>

                <div className="hidden sm:block text-right">
                  <span className="inline-block px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {test.outcome}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            Questions & Answers
          </div>
          <h2 className="text-3xl font-extrabold font-['Outfit'] text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Clear, straightforward answers about Foundation Course and our $300 access model.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 font-semibold text-slate-900 flex items-center justify-between gap-4 hover:text-indigo-600 transition"
                >
                  <span className="text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white rounded-3xl p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-5 relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-['Outfit'] tracking-tight">
              Your Idea Can Become a Digital Solution.
            </h2>
            <p className="text-base sm:text-lg text-indigo-100 font-normal">
              Learn how to use AI to build, create, launch, and grow.
            </p>

            <div className="pt-3">
              {hasPaidAccess ? (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-8 py-4 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-base shadow-xl transition inline-flex items-center gap-2"
                >
                  <span>Go to Student Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={onOpenCheckout}
                  className="px-8 py-4 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-base shadow-xl transition inline-flex items-center gap-2.5 transform hover:-translate-y-0.5"
                  id="final-cta-btn"
                >
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  <span>Get Full Access — $300</span>
                </button>
              )}
            </div>

            <p className="text-xs text-indigo-200 pt-2">
              One payment of $300 • All 6 core courses included • Instant access
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
