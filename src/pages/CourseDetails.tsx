import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  Code,
  ArrowRight,
  Sparkles,
  Award,
  Users,
  ChevronDown,
  ChevronUp,
  Share2,
  Shield,
} from 'lucide-react';
import { Course, CourseModule, Lesson } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

interface CourseDetailsProps {
  course: Course;
  onOpenCheckout: () => void;
  onStartLesson: (course: Course, lesson: Lesson) => void;
  onBack: () => void;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({
  course,
  onOpenCheckout,
  onStartLesson,
  onBack,
}) => {
  const { hasPaidAccess } = useAuth();
  const { isLessonCompleted, getCourseProgressPercent } = useCourses();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    course.modules.forEach((m, idx) => {
      init[m.id] = idx === 0; // expand first module by default
    });
    return init;
  });

  const progressPercent = getCourseProgressPercent(course.id);
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Find first lesson to begin
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb / Back button */}
      <button
        onClick={onBack}
        className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition flex items-center gap-1.5"
      >
        ← Back to All Courses
      </button>

      {/* Hero Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                {course.category}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-300 font-medium">{course.level}</span>
              {course.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white">
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {course.fullDescription}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                {course.duration} Total Content
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                {totalLessons} Guided Lessons
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                All Courses Included ($300 Flat)
              </span>
            </div>

            {/* Instructor */}
            <div className="pt-4 flex items-center gap-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-10 h-10 rounded-full border border-slate-700 object-cover"
              />
              <div>
                <div className="text-xs font-bold text-white">{course.instructor.name}</div>
                <div className="text-[11px] text-slate-400">{course.instructor.role}</div>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden relative group">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                  <Play className="w-5 h-5 ml-0.5 fill-slate-950" />
                </div>
              </div>
            </div>

            {hasPaidAccess ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Your Progress</span>
                  <span className="font-bold text-indigo-400">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                {firstLesson && (
                  <button
                    onClick={() => onStartLesson(course, firstLesson)}
                    className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>{progressPercent > 0 ? 'Continue Learning' : 'Start Course Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3 text-center">
                <div className="text-xs text-slate-300">
                  Included in the <strong className="text-white">Foundation Course Membership</strong>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-extrabold font-['Outfit'] text-white">$300</span>
                  <span className="text-xs text-slate-400">one-time payment</span>
                </div>
                <button
                  onClick={onOpenCheckout}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Unlock All Courses — $300</span>
                </button>
                <p className="text-[11px] text-slate-400">
                  Unlocks all 6 tracks • Instant access • 30-day guarantee
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid: Overview & Objectives vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Objectives, Skills, Syllabus */}
        <div className="lg:col-span-2 space-y-10">
          {/* Learning Objectives */}
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold font-['Outfit'] text-slate-900 mb-4">
              What You Will Learn & Build
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {course.learningObjectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus / Modules & Lessons */}
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-['Outfit'] text-slate-900">
                  Curriculum & Course Modules
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {course.modules.length} Modules • {totalLessons} Lessons
                </p>
              </div>
              <button
                onClick={() => {
                  const allExpanded = Object.values(expandedModules).every(Boolean);
                  const newMap: Record<string, boolean> = {};
                  course.modules.forEach((m) => {
                    newMap[m.id] = !allExpanded;
                  });
                  setExpandedModules(newMap);
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Toggle All
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((mod, modIdx) => {
                const isExpanded = !!expandedModules[mod.id];
                return (
                  <div
                    key={mod.id}
                    className="border border-slate-200 rounded-xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full text-left p-4.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between gap-4 transition"
                    >
                      <div>
                        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                          Module {modIdx + 1}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 mt-0.5">
                          {mod.title}
                        </h3>
                        {mod.description && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                            {mod.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
                          {mod.lessons.length} lessons
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="divide-y divide-slate-100 bg-white">
                        {mod.lessons.map((les) => {
                          const completed = isLessonCompleted(course.id, les.id);
                          const isAccessible = hasPaidAccess || les.isFreePreview;

                          return (
                            <div
                              key={les.id}
                              onClick={() => {
                                if (isAccessible) {
                                  onStartLesson(course, les);
                                } else {
                                  onOpenCheckout();
                                }
                              }}
                              className={`p-4 flex items-center justify-between gap-4 hover:bg-indigo-50/50 transition cursor-pointer ${
                                completed ? 'bg-emerald-50/20' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                  {completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  ) : isAccessible ? (
                                    <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                                  ) : (
                                    <Lock className="w-4 h-4 text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs sm:text-sm font-semibold text-slate-900">
                                      {les.title}
                                    </span>
                                    {les.isFreePreview && (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                        Free Preview
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                    {les.summary}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-xs text-slate-400">{les.duration}</span>
                                <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                                  {isAccessible ? 'Start' : 'Unlock'} <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Skills, Audience & Guarantee */}
        <div className="space-y-6">
          {/* Skills Gain */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-base font-['Outfit'] text-slate-900 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Skills You Will Gain
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Intended Audience */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-base font-['Outfit'] text-slate-900 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              Who This Course Is For
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {course.intendedAudience.map((aud, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{aud}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Access Callout */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-indigo-500/30 space-y-3">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Single Price Guarantee
            </div>
            <h4 className="font-bold text-lg font-['Outfit']">
              One Payment. All Courses.
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your $300 purchase unlocks not only this entire course, but all 5 other courses on the platform, plus all upcoming modules.
            </p>
            {!hasPaidAccess && (
              <button
                onClick={onOpenCheckout}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition shadow-sm"
              >
                Get Full Access — $300
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
