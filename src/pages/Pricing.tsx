import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Shield,
  HelpCircle,
  ArrowRight,
  CreditCard,
  Award,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PricingProps {
  onOpenCheckout: () => void;
  onNavigate: (tab: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenCheckout, onNavigate }) => {
  const { hasPaidAccess } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Transparent Single Pricing Model
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
          One Payment. All Courses. Learn. Build. Grow.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          We reject monthly subscription traps, tiered locks, and expensive individual course checkout fees. One flat payment unlocks everything on Foundation Course for life.
        </p>
      </div>

      {/* Main Pricing Hero Card */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border-2 border-indigo-600 shadow-2xl overflow-hidden relative">
        {/* Banner badge */}
        <div className="bg-indigo-600 text-white text-center py-2 px-4 text-xs font-bold uppercase tracking-wider">
          Most Transparent Value in AI Education • Lifetime Full Membership
        </div>

        <div className="p-8 sm:p-12 space-y-8">
          {/* Price Heading */}
          <div className="text-center pb-6 border-b border-slate-100">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-slate-500">$</span>
              <span className="text-6xl sm:text-7xl font-extrabold font-['Outfit'] text-slate-900 tracking-tight">
                300
              </span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mt-2">
              Single One-Time Payment
            </div>
            <p className="text-xs text-slate-500 mt-1">
              No monthly charges • No subscription renewals • No hidden upsells
            </p>
          </div>

          {/* Included Features */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Everything Included With Your $300 Access:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>AI Fundamentals</strong> (Complete mental models & prompting)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Build Websites with AI</strong> (HTML, CSS, JS & hosting)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Build Software & Apps</strong> (Full-stack React, APIs, DBs)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>AI for Local Businesses</strong> (Operations & automations)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Google Business Profile</strong> (Local 3-Pack & Reviews)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Personal Branding</strong> (Authority, LinkedIn, Audience)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Over 90+ Video Lessons & Downloadable Code Starters</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>All Future Course Releases & Curriculum Updates</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-4">
            {hasPaidAccess ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>You Have Full Access • Open Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenCheckout}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
                id="pricing-checkout-btn"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Get Full Access — $300</span>
              </button>
            )}
          </div>

          {/* Guarantee Badges */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              30-Day 100% Money-Back Guarantee
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600" />
              Instant Account & Course Activation
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="font-bold font-['Outfit'] text-lg text-slate-900">
            How Foundation Course Compares
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Why our single $300 membership is the highest ROI investment for creators and business owners.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left">
            <thead className="bg-slate-100/75 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">Criteria</th>
                <th className="p-4 text-indigo-700 bg-indigo-50/70 font-bold">Foundation Course</th>
                <th className="p-4 text-slate-500">Monthly AI Subscriptions</th>
                <th className="p-4 text-slate-500">Coding Bootcamps</th>
                <th className="p-4 text-slate-500">Marketing Agencies</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium text-slate-800">Total Price</td>
                <td className="p-4 font-bold text-indigo-600 bg-indigo-50/30">$300 one-time</td>
                <td className="p-4 text-slate-600">$40 - $120 / month recurring</td>
                <td className="p-4 text-slate-600">$10,000 - $20,000</td>
                <td className="p-4 text-slate-600">$3,000 - $8,000 per project</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-800">Focus</td>
                <td className="p-4 font-bold text-indigo-600 bg-indigo-50/30">Real software & local business outputs</td>
                <td className="p-4 text-slate-600">Superficial prompt tricks</td>
                <td className="p-4 text-slate-600">Low-level theory before AI</td>
                <td className="p-4 text-slate-600">Locked proprietary code</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-800">Curriculum Scope</td>
                <td className="p-4 font-bold text-indigo-600 bg-indigo-50/30">All 6 Core Tracks included</td>
                <td className="p-4 text-slate-600">Paywalled per module</td>
                <td className="p-4 text-slate-600">Rigid single language</td>
                <td className="p-4 text-slate-600">None (they do it for you)</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-800">Lifetime Access</td>
                <td className="p-4 font-bold text-emerald-600 bg-indigo-50/30">Yes, forever</td>
                <td className="p-4 text-rose-500">Lost when cancelled</td>
                <td className="p-4 text-slate-600">Limited cohort window</td>
                <td className="p-4 text-rose-500">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
