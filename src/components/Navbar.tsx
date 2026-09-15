import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  CreditCard,
  Info,
  Mail,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
  Menu,
  X,
  Lock,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenCheckout: () => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenCheckout,
  onOpenAuth,
}) => {
  const { user, hasPaidAccess, isAdmin, logout, demoLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'courses', label: 'All Courses', icon: BookOpen },
    { id: 'pricing', label: 'Pricing ($300)', icon: CreditCard },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4 font-medium flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase border border-indigo-500/30">
              <Sparkles className="w-3 h-3 text-indigo-400" /> Single Price Model
            </span>
            <span className="text-slate-300">
              <strong className="text-white">One Payment. All Courses. Learn. Build. Grow.</strong> — $300 One-Time Lifetime Access
            </span>
          </div>

          {/* Quick Demo Role Picker for reviewers */}
          <div className="relative hidden md:flex items-center gap-3">
            <span className="text-slate-400 text-[11px]">Quick Preview Mode:</span>
            <div className="inline-flex rounded-md shadow-xs text-[11px]">
              <button
                type="button"
                onClick={() => demoLogin('student')}
                className={`px-2 py-0.5 font-medium rounded-l-md transition ${
                  user?.email === 'student@example.com'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Log in as Enrolled Student with full course access"
              >
                Student (Enrolled)
              </button>
              <button
                type="button"
                onClick={() => demoLogin('unpaid')}
                className={`px-2 py-0.5 font-medium border-l border-slate-700 transition ${
                  user?.email === 'alex@example.com'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Log in as New Visitor without paid access"
              >
                Visitor (Unpaid)
              </button>
              <button
                type="button"
                onClick={() => demoLogin('admin')}
                className={`px-2 py-0.5 font-medium rounded-r-md border-l border-slate-700 transition ${
                  user?.role === 'admin'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Log in as Admin with curriculum & student management"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition duration-200">
              <GraduationCap className="w-5 h-5 text-indigo-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold font-['Outfit'] text-xl tracking-tight text-slate-900">
                  Foundation<span className="text-indigo-600">Course</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
                  AI & Business
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Practical AI for Software, Web & Business Growth
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                currentTab === 'home'
                  ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                      currentTab === 'admin'
                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                    Admin Portal
                  </button>
                )}

                {hasPaidAccess ? (
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition shadow-xs ${
                      currentTab === 'dashboard'
                        ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Student Dashboard
                  </button>
                ) : (
                  <button
                    onClick={onOpenCheckout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Get Full Access — $300
                  </button>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                    />
                    <div className="text-left leading-tight hidden xl:block">
                      <div className="text-xs font-semibold text-slate-900 truncate max-w-[120px]">
                        {user.name.split(' ')[0]}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {isAdmin ? 'Admin' : hasPaidAccess ? 'Enrolled' : 'Free Visitor'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={logout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                >
                  Log In
                </button>
                <button
                  onClick={onOpenCheckout}
                  className="flex items-center gap-2 px-4.5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-500 hover:to-indigo-600 shadow-md shadow-indigo-600/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Get Full Access — $300
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {!hasPaidAccess && (
              <button
                onClick={onOpenCheckout}
                className="px-3 py-1.5 text-xs font-bold bg-indigo-600 text-white rounded-lg shadow-xs"
              >
                $300 Access
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                currentTab === 'home' ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-700'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentTab === link.id ? 'bg-indigo-50 text-indigo-600 font-semibold' : 'text-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-slate-200"
                  />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{user.name}</div>
                    <div className="text-xs text-slate-500">
                      {user.role === 'admin' ? 'Administrator' : hasPaidAccess ? 'Full Enrolled Member' : 'Free Visitor'}
                    </div>
                  </div>
                </div>

                {hasPaidAccess && (
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Go to Student Dashboard
                  </button>
                )}

                {isAdmin && (
                  <button
                    onClick={() => {
                      onNavigate('admin');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-sm font-semibold"
                  >
                    <ShieldCheck className="w-4 h-4 text-rose-600" />
                    Admin Control Panel
                  </button>
                )}

                {!hasPaidAccess && (
                  <button
                    onClick={() => {
                      onOpenCheckout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Get Full Access — $300
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 text-sm text-slate-600 hover:text-rose-600 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onOpenCheckout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Get Full Access — $300
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-center text-sm font-medium text-slate-700 bg-slate-100 rounded-lg"
                >
                  Student Log In
                </button>
              </div>
            )}

            {/* Mobile preview mode switcher */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-1.5 font-medium">Switch Preview Persona:</div>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => {
                    demoLogin('student');
                    setMobileMenuOpen(false);
                  }}
                  className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded font-medium text-center"
                >
                  Enrolled
                </button>
                <button
                  onClick={() => {
                    demoLogin('unpaid');
                    setMobileMenuOpen(false);
                  }}
                  className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded font-medium text-center"
                >
                  Unpaid
                </button>
                <button
                  onClick={() => {
                    demoLogin('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="px-2 py-1 text-xs bg-rose-100 text-rose-800 rounded font-medium text-center"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
