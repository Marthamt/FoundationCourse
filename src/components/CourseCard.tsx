import React from 'react';
import {
  Clock,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
  onOpenCheckout?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelect,
  onOpenCheckout,
}) => {
  const { hasPaidAccess } = useAuth();
  const { getCourseProgressPercent } = useCourses();

  const progressPercent = getCourseProgressPercent(course.id);
  const totalLessons = course.totalLessons || course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div
      onClick={() => onSelect(course)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-indigo-300 transition duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
      id={`course-card-${course.id}`}
    >
      {/* Thumbnail & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-white/95 text-slate-900 backdrop-blur-xs shadow-xs">
            {course.category}
          </span>
          {course.badge && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-600 text-white shadow-xs">
              {course.badge}
            </span>
          )}
        </div>

        {/* Bottom Thumbnail Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
            <Clock className="w-3.5 h-3.5 text-indigo-300" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
            <BookOpen className="w-3.5 h-3.5 text-indigo-300" />
            {totalLessons} Lessons
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1.5">
            <span>{course.level}</span>
            <span>•</span>
            <span>Practical Implementation</span>
          </div>

          <h3 className="font-bold text-lg font-['Outfit'] text-slate-900 group-hover:text-indigo-600 transition leading-snug line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Skills pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {course.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-500 text-[11px]">
                +{course.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Bottom Section & Progress */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          {hasPaidAccess ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Course Progress</span>
                <span className="font-bold text-indigo-600">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {progressPercent === 100 ? (
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : progressPercent > 0 ? (
                    'In progress'
                  ) : (
                    'Ready to start'
                  )}
                </span>
                <span className="text-xs font-semibold text-indigo-600 group-hover:translate-x-0.5 transition flex items-center gap-1">
                  {progressPercent > 0 ? 'Resume' : 'Start'} Course <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Included in $300 Access</span>
              </div>
              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition">
                View Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
