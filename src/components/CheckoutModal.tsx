import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Sparkles,
  CreditCard,
  ArrowRight,
  AlertCircle,
  Clock,
  Award,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PaymentRecord } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (receipt: PaymentRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user, checkout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUseTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setExpDate('12/28');
    setCvc('888');
    if (!name) setName('Jordan Miller');
    if (!email) setEmail('jordan@example.com');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address for your course access');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await checkout({
        name,
        email,
        cardNumber: cardNumber.replace(/\s+/g, ''),
        cvc,
        paymentMethod: cardNumber ? `Card ending in ${cardNumber.slice(-4)}` : 'Visa •••• 4242',
      });

      if (res.success && res.receipt) {
        onSuccess(res.receipt);
        onClose();
      } else {
        setErrorMessage(res.error || 'Payment verification failed. Please check card details.');
      }
    } catch (err) {
      setErrorMessage('Network error while processing payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        id="checkout-modal"
      >
        {/* Header with Close */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-['Outfit']">
                Foundation Course Access Checkout
              </h2>
              <p className="text-xs text-slate-300">
                One Payment. All Courses. Learn. Build. Grow.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-white p-1 rounded-md transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Plan Summary Card */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-slate-50 to-white rounded-xl p-5 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white uppercase tracking-wider mb-1.5">
                Full Membership Access
              </span>
              <h3 className="text-base font-bold text-slate-900">
                All 6 Practical AI & Digital Business Courses
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Lifetime updates, all downloadable prompt systems, code templates & student certificate.
              </p>
            </div>
            <div className="text-right sm:border-l sm:border-indigo-100 sm:pl-5 shrink-0">
              <div className="text-3xl font-extrabold text-slate-900 font-['Outfit']">
                $300
              </div>
              <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wide">
                One-Time Payment
              </div>
            </div>
          </div>

          {/* Included Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>AI Fundamentals (4.5 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Build Websites with AI (6.5 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Build Software & Apps (8.5 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>AI for Local Businesses (5 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Google Business Profile (4 hrs)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Personal Branding (5.5 hrs)</span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah Jenkins"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Account Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  Card Information
                </label>
                <button
                  type="button"
                  onClick={handleUseTestCard}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 transition"
                >
                  ⚡ Autofill Demo Test Card
                </button>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="4242  4242  4242  4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    placeholder="MM / YY"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Trust & Security Notice */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Server-side verified & encrypted
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-indigo-600" /> 30-Day Money-Back Guarantee
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Verifying Server-Side Payment...</span>
                </div>
              ) : (
                <>
                  <span>Authorize $300 & Activate All Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* What happens next explainer */}
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <span className="font-semibold text-slate-700 block">What happens immediately after payment?</span>
            <p>
              1. Your student account is immediately created/activated.
            </p>
            <p>
              2. Access to all 6 courses is instantly granted.
            </p>
            <p>
              3. You are redirected to your student dashboard to start learning right away.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
