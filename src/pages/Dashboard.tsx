import React from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
  Lock,
  Download,
  FileText,
  Bookmark,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

interface DashboardProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenCheckout: () => void;
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  courses,
  onSelectCourse,
  onOpenCheckout,
  onNavigate,
}) => {
  const { user, hasPaidAccess } = useAuth();
  const { progress, getCourseProgressPercent, isLessonCompleted } = useCourses();

  // Calculate overall metrics
  const totalCourses = courses.length;
  let totalLessonsCompleted = 0;
  let totalPossibleLessons = 0;

  courses.forEach((c) => {
    const totalC = c.totalLessons || c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    totalPossibleLessons += totalC;

    const prog = progress.find((p) => p.courseId === c.id);
    if (prog) {
      totalLessonsCompleted += prog.completedLessonIds.length;
    }
  });

  const overallPercent = totalPossibleLessons > 0
    ? Math.round((totalLessonsCompleted / totalPossibleLessons) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              {hasPaidAccess ? 'Full Lifetime Member' : 'Visitor Account'}
            </span>
            {hasPaidAccess && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                All 6 Courses Unlocked
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold font-['Outfit']">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {hasPaidAccess
              ? 'Track your learning progress, build real software solutions, and review your notes and prompts below.'
              : 'You are currently on a free preview account. Unlock all 6 flagship courses and full materials with your one-time $300 payment.'}
          </p>
        </div>

        {!hasPaidAccess && (
          <button
            onClick={onOpenCheckout}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Unlock All Courses — $300</span>
          </button>
        )}
      </div>

      {/* Access Warning if Unpaid */}
      {!hasPaidAccess && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-amber-900">
                Full Membership Required for Course Lessons & Downloads
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                One payment of $300 gives you lifetime access to all 6 courses, code templates, and prompts.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCheckout}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition whitespace-nowrap"
          >
            Complete $300 Access
          </button>
        </div>
      )}

      {/* Progress Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Overall Progress
            </span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
            {overallPercent}%
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Lessons Completed
            </span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
            {totalLessonsCompleted} <span className="text-sm font-normal text-slate-400">/ {totalPossibleLessons}</span>
          </div>
          <div className="text-xs text-slate-500 mt-3">
            Across all available curriculum tracks
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Enrolled Courses
            </span>
            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
            {hasPaidAccess ? totalCourses : '0'} <span className="text-sm font-normal text-slate-400">/ {totalCourses}</span>
          </div>
          <div className="text-xs text-slate-500 mt-3">
            {hasPaidAccess ? 'Full platform access active' : 'Purchase required'}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Certificates Ready
            </span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
            {courses.filter((c) => getCourseProgressPercent(c.id) === 100).length}
          </div>
          <div className="text-xs text-slate-500 mt-3">
            Earned at 100% course completion
          </div>
        </div>
      </div>

      {/* Your Courses List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-['Outfit'] text-slate-900">
              Your Course Tracks
            </h2>
            <p className="text-xs text-slate-500">
              Pick up where you left off or start a new track.
            </p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Explore Catalog <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const coursePercent = getCourseProgressPercent(course.id);
            const isFinished = coursePercent === 100;

            return (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-slate-900">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[11px] font-bold text-white">
                      {course.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-base font-['Outfit'] text-slate-900 line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {course.shortDescription}
                    </p>

                    {/* Progress */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Completion</span>
                        <span className="font-bold text-indigo-600">{coursePercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all"
                          style={{ width: `${coursePercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  {hasPaidAccess ? (
                    <button
                      onClick={() => onSelectCourse(course)}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition flex items-center justify-center gap-2"
                    >
                      <span>{coursePercent > 0 ? 'Resume Track' : 'Start Course'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={onOpenCheckout}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      <span>Unlock with $300 Access</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Prompts & Saved Notes Vault */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg font-['Outfit'] text-slate-900">
              Your Practical Tools & Resources Vault
            </h3>
            <p className="text-xs text-slate-500">
              Access the curated AI prompt templates, code repositories, and starter specs anytime.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                Prompt Systems
              </div>
              <h4 className="font-bold text-sm text-slate-900">40+ Engineering Prompts</h4>
              <p className="text-xs text-slate-600 mt-1">
                Specs for full-stack apps, Google Maps ranking, and landing page wireframes.
              </p>
            </div>
            <button
              onClick={() => onSelectCourse(courses[0])}
              className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-800 text-left"
            >
              Browse Prompts in Courses →
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                Code Starters
              </div>
              <h4 className="font-bold text-sm text-slate-900">Full-Stack Starter Repos</h4>
              <p className="text-xs text-slate-600 mt-1">
                Pre-configured React, Vite, Node and Tailwind projects ready to clone.
              </p>
            </div>
            <button
              onClick={() => onSelectCourse(courses[2])}
              className="mt-4 text-xs font-semibold text-emerald-700 hover:text-emerald-900 text-left"
            >
              View Software Track →
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                Local Business Playbook
              </div>
              <h4 className="font-bold text-sm text-slate-900">GBP & Review SOPs</h4>
              <p className="text-xs text-slate-600 mt-1">
                Step-by-step checklists to rank local businesses in Google Maps Top 3.
              </p>
            </div>
            <button
              onClick={() => onSelectCourse(courses[4])}
              className="mt-4 text-xs font-semibold text-amber-700 hover:text-amber-900 text-left"
            >
              View Google Business Track →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
