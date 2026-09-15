import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  FileText,
  Download,
  BookOpen,
  Sparkles,
  Volume2,
  Maximize2,
  MessageSquare,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  ListOrdered,
} from 'lucide-react';
import { Course, Lesson, CourseModule } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

interface CoursePlayerProps {
  course: Course;
  initialLesson?: Lesson;
  onBackToCourse: () => void;
  onOpenCheckout: () => void;
}

export const CoursePlayer: React.FC<CoursePlayerProps> = ({
  course: initialCourse,
  initialLesson,
  onBackToCourse,
  onOpenCheckout,
}) => {
  const { hasPaidAccess, token } = useAuth();
  const {
    markLessonComplete,
    isLessonCompleted,
    saveLessonNote,
    progress,
    getFullCourse,
  } = useCourses();

  const [course, setCourse] = useState<Course>(initialCourse);
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    initialLesson || initialCourse.modules[0]?.lessons[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'prompts' | 'notes'>('content');
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Fetch full protected course details if user has paid access
  useEffect(() => {
    async function loadFull() {
      if (hasPaidAccess && token) {
        const res = await getFullCourse(initialCourse.id);
        if (res.course) {
          setCourse(res.course);
          // Sync active lesson with full lesson content
          for (const m of res.course.modules) {
            const found = m.lessons.find((l) => l.id === activeLesson.id);
            if (found) {
              setActiveLesson(found);
              break;
            }
          }
        }
      }
    }
    loadFull();
  }, [hasPaidAccess, token, initialCourse.id]);

  // Load existing user note for current lesson
  useEffect(() => {
    const cp = progress.find((p) => p.courseId === course.id);
    const existing = cp?.notes?.[activeLesson.id] || '';
    setNoteText(existing);
    setNoteSaved(false);
  }, [activeLesson.id, progress, course.id]);

  // Flatten lessons for linear navigation
  const allLessons: { lesson: Lesson; module: CourseModule }[] = [];
  course.modules.forEach((m) => {
    m.lessons.forEach((l) => {
      allLessons.push({ lesson: l, module: m });
    });
  });

  const currentIndex = allLessons.findIndex((item) => item.lesson.id === activeLesson.id);
  const prevLessonItem = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLessonItem = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isCompleted = isLessonCompleted(course.id, activeLesson.id);
  const isAccessible = hasPaidAccess || activeLesson.isFreePreview;

  const handleToggleComplete = async () => {
    await markLessonComplete(course.id, activeLesson.id);
    if (!isCompleted) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handleSaveNote = async () => {
    await saveLessonNote(course.id, activeLesson.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelectLesson = (les: Lesson) => {
    setActiveLesson(les);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Bar Navigation */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Course Overview</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <div className="hidden sm:block">
            <span className="text-xs text-indigo-400 font-semibold">{course.title}</span>
          </div>
        </div>

        {/* Completion & Next/Prev Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleComplete}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>

          {prevLessonItem && (
            <button
              onClick={() => handleSelectLesson(prevLessonItem.lesson)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Previous Lesson"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {nextLessonItem && (
            <button
              onClick={() => handleSelectLesson(nextLessonItem.lesson)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Learning Canvas */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Video Player & Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Confetti Celebration Banner */}
          {showCelebration && (
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl flex items-center justify-between text-xs font-bold shadow-lg animate-in slide-in-from-top-2 duration-200">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                Lesson marked as complete! Your progress has been saved.
              </span>
              {nextLessonItem && (
                <button
                  onClick={() => handleSelectLesson(nextLessonItem.lesson)}
                  className="underline underline-offset-2 hover:text-emerald-100"
                >
                  Continue to next lesson →
                </button>
              )}
            </div>
          )}

          {/* Media Stage (Video / Visual Walkthrough) */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
            {isAccessible ? (
              <div className="w-full h-full relative flex flex-col justify-between p-4 sm:p-6 bg-radial from-slate-900 to-black">
                {/* Simulated Video Player UI */}
                <div className="flex items-center justify-between text-xs text-slate-400 z-10">
                  <span className="px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs font-medium border border-slate-800">
                    {course.category} • {activeLesson.title}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[11px]">
                    1080p HD
                  </span>
                </div>

                {/* Center Play Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-2xl group transition transform hover:scale-110 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7" />
                    ) : (
                      <Play className="w-7 h-7 ml-1 fill-white" />
                    )}
                  </button>
                </div>

                {/* Bottom Video Controls Bar */}
                <div className="space-y-2 z-10 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-slate-800">
                  <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
                    <div
                      className="h-full bg-indigo-500 transition-all duration-300"
                      style={{ width: isPlaying ? '64%' : '25%' }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <Volume2 className="w-4 h-4 text-slate-400" />
                      <span className="font-mono text-[11px] text-slate-400">
                        {isPlaying ? '08:45' : '03:12'} / {activeLesson.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const speeds = ['1x', '1.25x', '1.5x', '2x'];
                          const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
                          setPlaybackSpeed(next);
                        }}
                        className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono hover:bg-slate-700"
                      >
                        {playbackSpeed}
                      </button>
                      <Maximize2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Locked Lesson Paywall Screen */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-radial from-slate-900 via-slate-950 to-black space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shadow-xl">
                  <Lock className="w-7 h-7" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-xl font-bold font-['Outfit'] text-white">
                    This Lesson Requires Full Access
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Unlock all 6 comprehensive courses, prompt templates, downloadable starter repos, and community resources with a single $300 one-time payment.
                  </p>
                </div>
                <button
                  onClick={onOpenCheckout}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Get Full Access — $300</span>
                </button>
              </div>
            )}
          </div>

          {/* Lesson Tabs & Content Section */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 mb-1">
                <span>{course.title}</span>
                <span>•</span>
                <span>{activeLesson.duration}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
                {activeLesson.title}
              </h1>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                {activeLesson.summary}
              </p>
            </div>

            {/* Content Tabs */}
            <div className="flex border-b border-slate-800 text-sm font-medium">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-3 px-4 border-b-2 transition ${
                  activeTab === 'content'
                    ? 'border-indigo-500 text-indigo-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Lesson Guide & Resources
              </button>
              <button
                onClick={() => setActiveTab('prompts')}
                className={`pb-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                  activeTab === 'prompts'
                    ? 'border-indigo-500 text-indigo-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Prompt Templates ({activeLesson.promptTemplates?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-3 px-4 border-b-2 transition flex items-center gap-1.5 ${
                  activeTab === 'notes'
                    ? 'border-indigo-500 text-indigo-400 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                Personal Notes
              </button>
            </div>

            {/* TAB 1: Main Rich Content */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                {/* Key Takeaways */}
                {activeLesson.keyTakeaways && activeLesson.keyTakeaways.length > 0 && (
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Key Implementation Takeaways
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {activeLesson.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-400 font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Markdown text walkthrough */}
                {activeLesson.content ? (
                  <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
                    <div className="whitespace-pre-line font-sans">
                      {activeLesson.content}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-900 rounded-xl text-center text-xs text-slate-400">
                    {hasPaidAccess
                      ? 'Detailed walkthrough instructions for this lesson.'
                      : 'Enroll in Foundation Course to access full code walkthroughs and downloadable specs.'}
                  </div>
                )}

                {/* Downloadable Resources */}
                {activeLesson.resources && activeLesson.resources.length > 0 && (
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Lesson Downloads & References
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeLesson.resources.map((res, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs hover:border-slate-700 transition"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-indigo-400" />
                            <span className="font-medium text-slate-200">{res.title}</span>
                          </div>
                          <button
                            onClick={() => alert(`Downloading resource: ${res.title}`)}
                            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: AI Prompt Templates */}
            {activeTab === 'prompts' && (
              <div className="space-y-4">
                {activeLesson.promptTemplates && activeLesson.promptTemplates.length > 0 ? (
                  activeLesson.promptTemplates.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 rounded-xl p-5 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                          {p.name}
                        </span>
                        <button
                          onClick={() => handleCopyPrompt(p.prompt, idx)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="bg-slate-950 p-4 rounded-lg text-xs font-mono text-slate-300 whitespace-pre-wrap border border-slate-850 overflow-x-auto leading-relaxed">
                        {p.prompt}
                      </pre>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-900 rounded-xl">
                    No custom prompt templates for this lesson. Check lesson walkthrough text above.
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Student Private Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Private Student Notes for this Lesson
                  </label>
                  <textarea
                    rows={6}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Jot down personal observations, prompt adjustments, or questions..."
                    className="w-full p-4 text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-y font-sans"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Saved automatically to your student database profile.
                  </span>
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
                  >
                    {noteSaved ? 'Note Saved!' : 'Save Note'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Course Curriculum Drawer */}
        <div className="w-full lg:w-96 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 sm:p-6 overflow-y-auto shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold font-['Outfit'] text-sm text-white">
                Course Syllabus
              </h3>
              <span className="text-xs text-slate-400">
                {course.modules.length} Modules
              </span>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Module {modIdx + 1}: {mod.title.replace(/^Module \d+:\s*/, '')}
                  </div>

                  <div className="space-y-1">
                    {mod.lessons.map((les) => {
                      const isCurrent = les.id === activeLesson.id;
                      const completed = isLessonCompleted(course.id, les.id);
                      const accessible = hasPaidAccess || les.isFreePreview;

                      return (
                        <button
                          key={les.id}
                          onClick={() => {
                            if (accessible) {
                              handleSelectLesson(les);
                            } else {
                              onOpenCheckout();
                            }
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition ${
                            isCurrent
                              ? 'bg-indigo-600 text-white font-semibold shadow-md'
                              : completed
                              ? 'bg-slate-900/80 text-slate-300 hover:bg-slate-900 border border-emerald-950'
                              : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : accessible ? (
                              <Play className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-white' : 'text-slate-500'}`} />
                            ) : (
                              <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono shrink-0">
                            {les.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Upgrade notice if not paid */}
          {!hasPaidAccess && (
            <div className="mt-8 pt-4 border-t border-slate-800 text-center space-y-2">
              <div className="text-xs text-slate-400">Unlock all courses for $300</div>
              <button
                onClick={onOpenCheckout}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Get Full Access — $300
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
