import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CourseProvider, useCourses } from './context/CourseContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { CoursePlayer } from './pages/CoursePlayer';
import { Pricing } from './pages/Pricing';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Course, Lesson, PaymentRecord } from './types';
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

function AppContent() {
  const { user, hasPaidAccess } = useAuth();
  const { courses, refreshCourses } = useCourses();

  // Navigation state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Modals state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [paymentReceipt, setPaymentReceipt] = useState<PaymentRecord | null>(null);

  const handleNavigate = (tab: string, param?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tab === 'course-detail' && param) {
      const match = courses.find((c) => c.slug === param || c.id === param);
      if (match) {
        setSelectedCourse(match);
        setActiveTab('course-details');
        return;
      }
    }

    if (tab === 'dashboard' && !user) {
      setAuthMode('login');
      setIsAuthOpen(true);
      return;
    }

    if (tab === 'admin' && user?.role !== 'admin') {
      setActiveTab('admin');
      return;
    }

    setActiveTab(tab);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLesson = (course: Course, lesson: Lesson) => {
    setSelectedCourse(course);
    setActiveLesson(lesson);
    setActiveTab('player');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = (receipt: PaymentRecord) => {
    setPaymentReceipt(receipt);
    refreshCourses();
  };

  // If in the CoursePlayer mode, render the immersive learning room (without standard navbar/footer)
  if (activeTab === 'player' && selectedCourse) {
    return (
      <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col">
        <CoursePlayer
          course={selectedCourse}
          initialLesson={activeLesson || undefined}
          onBackToCourse={() => {
            setActiveTab('course-details');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
        {/* Checkout Modal */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onNavigate={handleNavigate}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {activeTab === 'courses' && (
          <Courses
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {activeTab === 'course-details' && selectedCourse && (
          <CourseDetails
            course={selectedCourse}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onStartLesson={handleStartLesson}
            onBack={() => {
              setActiveTab('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'pricing' && (
          <Pricing
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'about' && (
          <About
            onNavigate={handleNavigate}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
          />
        )}

        {activeTab === 'contact' && <Contact />}

        {activeTab === 'dashboard' && (
          <Dashboard
            courses={courses}
            onSelectCourse={handleSelectCourse}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'admin' && (
          <Admin
            courses={courses}
            onRefreshCourses={refreshCourses}
            onSelectCourse={handleSelectCourse}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal ($300 Single Fixed Price) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Auth Modal (Sign In / Register / Demo) */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          setActiveTab('dashboard');
        }}
      />

      {/* Payment Success Receipt Dialog */}
      {paymentReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" /> Membership Activated
              </div>
              <h3 className="text-2xl font-bold font-['Outfit'] text-slate-900">
                Welcome to Foundation Course!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Your payment was verified. You now have lifetime access to all 6 courses and all upcoming modules.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-medium text-slate-800">{paymentReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan:</span>
                <span className="font-semibold text-indigo-600">Full Membership Access</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-bold text-slate-900">${paymentReceipt.amount} USD (Single Payment)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-emerald-600">Completed & Verified</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setPaymentReceipt(null);
                  setActiveTab('dashboard');
                }}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Go to Your Student Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setPaymentReceipt(null);
                  setActiveTab('courses');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Explore All Unlocked Courses
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <AppContent />
      </CourseProvider>
    </AuthProvider>
  );
}
