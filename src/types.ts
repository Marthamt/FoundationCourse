export type Role = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  hasPaidAccess: boolean;
  enrolledAt?: string;
  avatarUrl?: string;
  bio?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'pdf' | 'code' | 'prompt' | 'link';
  description?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g., "18 mins"
  type: 'video' | 'article' | 'project';
  isFreePreview?: boolean;
  videoUrl?: string;
  summary: string;
  content?: string; // Markdown / rich text formatted curriculum
  promptTemplates?: { name: string; prompt: string }[];
  keyTakeaways?: string[];
  resources?: Resource[];
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  badge?: string;
  category: 'AI Core' | 'Web Development' | 'Software Engineering' | 'Local Business' | 'Local SEO' | 'Personal Branding';
  level: 'Beginner' | 'Beginner to Intermediate' | 'All Levels';
  duration: string; // e.g., "6 hours"
  totalLessons: number;
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  learningObjectives: string[];
  skills: string[];
  intendedAudience: string[];
  modules: CourseModule[];
  featured?: boolean;
}

export interface CourseProgress {
  courseId: string;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  lastAccessedAt: string;
  notes?: Record<string, string>; // lessonId -> user private notes
}

export interface PaymentRecord {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  amount: number; // 300
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  createdAt: string;
  paymentMethod: string;
  transactionId: string;
  receiptNumber: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed';
}

export interface AuthResponse {
  user: User;
  token: string;
}
