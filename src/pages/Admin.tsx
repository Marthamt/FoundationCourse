import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  DollarSign,
  BookOpen,
  Plus,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Trash2,
  Edit2,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Course, User } from '../types';

interface AdminStats {
  totalUsers: number;
  paidUsers: number;
  totalRevenue: number;
  totalCourses: number;
  totalLessonsCompleted: number;
}

interface AdminProps {
  courses: Course[];
  onRefreshCourses: () => void;
  onSelectCourse: (course: Course) => void;
}

export const Admin: React.FC<AdminProps> = ({
  courses,
  onRefreshCourses,
  onSelectCourse,
}) => {
  const { user, token, demoLogin } = useAuth();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses'>('overview');
  const [searchStudent, setSearchStudent] = useState('');

  // Course creation modal state
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('AI Core');
  const [newDesc, setNewDesc] = useState('');
  const [newDuration, setNewDuration] = useState('4.0 hrs');

  const isAdmin = user?.role === 'admin';

  const fetchAdminData = async () => {
    if (!token || !isAdmin) return;
    setLoading(true);
    try {
      const [statsRes, studentsRes] = await Promise.all([
        fetch('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch('/api/admin/students', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (statsRes.ok) {
        const sData = await statsRes.json();
        setStats(sData);
      }
      if (studentsRes.ok) {
        const uData = await studentsRes.json();
        setStudents(uData.students);
      }
    } catch (e) {
      console.error('Error loading admin data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchAdminData();
    }
  }, [isAdmin, token]);

  const handleToggleStudentAccess = async (studentId: string, currentStatus: boolean) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/admin/students/${studentId}/access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hasPaidAccess: !currentStatus }),
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (e) {
      console.error('Toggle error', e);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          shortDescription: newDesc,
          fullDescription: newDesc,
          duration: newDuration,
          level: 'Beginner to Intermediate',
          skills: ['AI Operations', 'Digital Strategy'],
          intendedAudience: ['Entrepreneurs', 'Creators'],
          learningObjectives: [
            'Master core principles',
            'Deploy practical solutions',
          ],
          modules: [
            {
              id: 'mod-1',
              title: 'Module 1: Foundations & Architecture',
              description: 'Setting up the environment and technical specs.',
              lessons: [
                {
                  id: 'les-1',
                  title: 'Getting Started & Workflow Setup',
                  duration: '15 min',
                  summary: 'Essential tools and overview.',
                  isFreePreview: true,
                  content: 'Welcome to this newly created course! Practical workflows start here.',
                },
              ],
            },
          ],
        }),
      });

      if (res.ok) {
        setIsCreatingCourse(false);
        setNewTitle('');
        setNewDesc('');
        onRefreshCourses();
        fetchAdminData();
      }
    } catch (e) {
      console.error('Create course error', e);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-md">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-['Outfit'] text-slate-900">
          Admin Portal Protected
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          You are not currently logged in as an administrator. You can switch to the administrator demo profile with one click to manage courses and view student metrics.
        </p>
        <div className="pt-2">
          <button
            onClick={() => demoLogin('admin')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition"
          >
            Switch to Admin Demo Profile
          </button>
        </div>
      </div>
    );
  }

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchStudent.toLowerCase()) ||
      s.email.toLowerCase().includes(searchStudent.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-4 h-4" /> Foundation Course Command Center
          </div>
          <h1 className="text-3xl font-extrabold font-['Outfit']">
            Admin Management Console
          </h1>
          <p className="text-xs text-slate-400">
            Real-time enrollment, single-price $300 revenue calculations, and course catalog control.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminData}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsCreatingCourse(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Course</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 border-b-2 transition ${
            activeTab === 'overview'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 px-4 border-b-2 transition ${
            activeTab === 'students'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Student Roster ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`pb-3 px-4 border-b-2 transition ${
            activeTab === 'courses'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Curriculum Catalog ({courses.length})
        </button>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && stats && (
        <div className="space-y-8">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Total Revenue</span>
                <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Derived from {stats.paidUsers} single $300 memberships
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Paid Students</span>
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
                {stats.paidUsers} <span className="text-sm font-normal text-slate-400">/ {stats.totalUsers} total</span>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                {stats.totalUsers > 0
                  ? `${Math.round((stats.paidUsers / stats.totalUsers) * 100)}% conversion rate`
                  : '0% conversion'}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Active Courses</span>
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
                {stats.totalCourses}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                All unlocked with single payment
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
                <span>Lessons Completed</span>
                <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="mt-3 text-3xl font-extrabold font-['Outfit'] text-slate-900">
                {stats.totalLessonsCompleted}
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Recorded student interactions
              </div>
            </div>
          </div>

          {/* Value Model Breakdown */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-indigo-950">
                  Fixed Membership Architecture: $300 Fixed Price
                </h3>
                <p className="text-xs text-indigo-800">
                  No individual course checkout or monthly renewal logic exists in the system. The platform enforces the exact single $300 full access architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Students */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="font-bold text-base font-['Outfit'] text-slate-900">
              Student Accounts & Access Status
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Access Status</th>
                  <th className="p-3">Enrolled Since</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-slate-500">{s.email}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                        {s.role}
                      </span>
                    </td>
                    <td className="p-3">
                      {s.hasPaidAccess ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> $300 Member
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold border border-amber-200">
                          <Clock className="w-3.5 h-3.5" /> Free Visitor
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-slate-500">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleStudentAccess(s.id, s.hasPaidAccess)}
                        className={`px-3 py-1 rounded text-xs font-semibold transition ${
                          s.hasPaidAccess
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        }`}
                      >
                        {s.hasPaidAccess ? 'Revoke Access' : 'Grant Full Access'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Courses */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base font-['Outfit'] text-slate-900">
              Active Courses in Foundation Course
            </h3>
            <button
              onClick={() => setIsCreatingCourse(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <h4 className="font-bold text-base font-['Outfit'] text-slate-900 mt-0.5">
                    {course.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {course.shortDescription}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.modules.length} Modules</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-semibold"
                  >
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {isCreatingCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold font-['Outfit'] text-lg text-slate-900">
                Add New Foundation Course
              </h3>
              <button
                onClick={() => setIsCreatingCourse(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Customer Support Automation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none"
                  >
                    <option value="AI Core">AI Core</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Local Business">Local Business</option>
                    <option value="Local SEO">Local SEO</option>
                    <option value="Personal Branding">Personal Branding</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description & Learning Outcomes
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Practical breakdown of what students will build..."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg outline-none resize-y"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCourse(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs"
                >
                  Create & Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
