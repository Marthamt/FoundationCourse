import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Course, CourseProgress, Lesson } from '../types';
import { useAuth } from './AuthContext';

interface CourseContextType {
  courses: Course[];
  progress: CourseProgress[];
  isLoadingCourses: boolean;
  refreshCourses: () => Promise<void>;
  refreshProgress: () => Promise<void>;
  getCourse: (idOrSlug: string) => Course | undefined;
  getFullCourse: (idOrSlug: string) => Promise<{ course?: Course; error?: string; requiresPayment?: boolean }>;
  markLessonComplete: (courseId: string, lessonId: string) => Promise<void>;
  saveLessonNote: (courseId: string, lessonId: string, note: string) => Promise<void>;
  isLessonCompleted: (courseId: string, lessonId: string) => boolean;
  getCourseProgressPercent: (courseId: string) => number;
  getLastAccessedLesson: () => { course: Course; lesson: Lesson } | null;
  overallProgress: { completed: number; total: number; percent: number };
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, token, hasPaidAccess } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);

  const fetchCourses = useCallback(async () => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch('/api/courses', { headers });
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
      }
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setIsLoadingCourses(false);
    }
  }, [token]);

  const fetchProgress = useCallback(async () => {
    if (!token || !user) {
      setProgress([]);
      return;
    }
    try {
      const res = await fetch('/api/progress', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProgress(data.progress || []);
      }
    } catch (err) {
      console.error('Failed to load progress', err);
    }
  }, [token, user]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses, hasPaidAccess]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress, user]);

  const getCourse = (idOrSlug: string) => {
    return courses.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
  };

  const getFullCourse = async (idOrSlug: string) => {
    if (!token) {
      return { error: 'Please sign in to view full course content', requiresPayment: true };
    }
    try {
      const res = await fetch(`/api/courses/${idOrSlug}/full`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          error: data.message || data.error || 'Access restricted',
          requiresPayment: data.requiresPayment || res.status === 403,
        };
      }
      return { course: data.course };
    } catch (err) {
      return { error: 'Network error retrieving course' };
    }
  };

  const markLessonComplete = async (courseId: string, lessonId: string) => {
    if (!token || !user) return;

    const existingCourseProgress = progress.find((p) => p.courseId === courseId);
    const completed = existingCourseProgress?.completedLessonIds || [];
    const isAlreadyCompleted = completed.includes(lessonId);

    const newCompleted = isAlreadyCompleted
      ? completed.filter((id) => id !== lessonId)
      : [...completed, lessonId];

    // Optimistic update
    setProgress((prev) => {
      const filtered = prev.filter((p) => p.courseId !== courseId);
      return [
        ...filtered,
        {
          courseId,
          completedLessonIds: newCompleted,
          lastAccessedLessonId: lessonId,
          lastAccessedAt: new Date().toISOString(),
          notes: existingCourseProgress?.notes || {},
        },
      ];
    });

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
          completedLessonIds: [lessonId],
          lastAccessedLessonId: lessonId,
        }),
      });
      fetchProgress();
    } catch (err) {
      console.error('Failed to persist lesson completion', err);
    }
  };

  const saveLessonNote = async (courseId: string, lessonId: string, note: string) => {
    if (!token || !user) return;
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
          noteUpdate: { lessonId, note },
        }),
      });
      fetchProgress();
    } catch (err) {
      console.error('Failed to save note', err);
    }
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    const cp = progress.find((p) => p.courseId === courseId);
    return cp ? cp.completedLessonIds.includes(lessonId) : false;
  };

  const getCourseProgressPercent = (courseId: string) => {
    const course = getCourse(courseId);
    if (!course) return 0;
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    if (totalLessons === 0) return 0;
    const cp = progress.find((p) => p.courseId === courseId);
    const completed = cp ? cp.completedLessonIds.length : 0;
    return Math.min(100, Math.round((completed / totalLessons) * 100));
  };

  const getLastAccessedLesson = (): { course: Course; lesson: Lesson } | null => {
    if (!progress.length || !courses.length) {
      // Default to first course and first lesson
      if (courses.length > 0 && courses[0].modules[0]?.lessons[0]) {
        return { course: courses[0], lesson: courses[0].modules[0].lessons[0] };
      }
      return null;
    }

    // Find progress entry with the most recent lastAccessedAt
    const sorted = [...progress].sort(
      (a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
    );

    for (const p of sorted) {
      const course = courses.find((c) => c.id === p.courseId);
      if (course) {
        let lesson: Lesson | undefined;
        if (p.lastAccessedLessonId) {
          for (const m of course.modules) {
            const found = m.lessons.find((l) => l.id === p.lastAccessedLessonId);
            if (found) {
              lesson = found;
              break;
            }
          }
        }
        if (!lesson && course.modules[0]?.lessons[0]) {
          lesson = course.modules[0].lessons[0];
        }
        if (lesson) {
          return { course, lesson };
        }
      }
    }

    return null;
  };

  // Overall calculation across all courses
  const totalAllLessons = courses.reduce(
    (acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0),
    0
  );
  const totalCompletedAll = progress.reduce((acc, p) => acc + p.completedLessonIds.length, 0);
  const overallPercent = totalAllLessons > 0 ? Math.round((totalCompletedAll / totalAllLessons) * 100) : 0;

  return (
    <CourseContext.Provider
      value={{
        courses,
        progress,
        isLoadingCourses,
        refreshCourses: fetchCourses,
        refreshProgress: fetchProgress,
        getCourse,
        getFullCourse,
        markLessonComplete,
        saveLessonNote,
        isLessonCompleted,
        getCourseProgressPercent,
        getLastAccessedLesson,
        overallProgress: {
          completed: totalCompletedAll,
          total: totalAllLessons,
          percent: overallPercent,
        },
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
