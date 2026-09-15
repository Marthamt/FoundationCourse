import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Lock,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { Course } from '../types';
import { CourseCard } from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';

interface CoursesProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onOpenCheckout: () => void;
}

export const Courses: React.FC<CoursesProps> = ({
  courses,
  onSelectCourse,
  onOpenCheckout,
}) => {
  const { hasPaidAccess } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI Core',
    'Web Development',
    'Software Engineering',
    'Local Business',
    'Local SEO',
    'Personal Branding',
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> All-Inclusive Curriculum
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit']">
            All Foundation Courses
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Every single course, module, and lesson is included with your $300 full access membership. No separate course fees, no tiered locks.
          </p>
        </div>

        {!hasPaidAccess && (
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-indigo-500/30 text-center shrink-0">
            <div className="text-xs text-slate-400">Total Price</div>
            <div className="text-3xl font-extrabold font-['Outfit'] text-white">$300</div>
            <div className="text-[11px] text-indigo-300 font-semibold mb-3">Access All Courses</div>
            <button
              onClick={onOpenCheckout}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition"
            >
              Unlock Everything
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by topic, skill or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
        </div>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onSelect={onSelectCourse}
              onOpenCheckout={onOpenCheckout}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No courses match your query</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search terms or selecting 'All' categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Bottom Sticky Value Proposition Reminder */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-indigo-950">
              One Payment. All Courses. Learn. Build. Grow.
            </h4>
            <p className="text-xs text-indigo-800">
              Purchasing access grants you entry into every course listed above plus future releases.
            </p>
          </div>
        </div>

        {!hasPaidAccess && (
          <button
            onClick={onOpenCheckout}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition whitespace-nowrap"
          >
            Get Full Access — $300
          </button>
        )}
      </div>
    </div>
  );
};
