import { Course, User, CourseProgress, PaymentRecord, ContactSubmission } from '../src/types';
import { INITIAL_COURSES } from '../src/data/courses';

export interface StorageData {
  users: User[];
  courses: Course[];
  progress: Record<string, CourseProgress[]>; // userId -> CourseProgress[]
  payments: PaymentRecord[];
  contacts: ContactSubmission[];
}

export class AppStorage {
  private data: StorageData;

  constructor() {
    this.data = {
      users: [
        {
          id: 'usr-admin-1',
          name: 'Marcus Vance (Admin)',
          email: 'admin@foundationcourse.com',
          role: 'admin',
          hasPaidAccess: true,
          enrolledAt: '2026-01-10T10:00:00.000Z',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          bio: 'Platform founder and system architect.',
        },
        {
          id: 'usr-student-1',
          name: 'Sarah Chen (Enrolled Student)',
          email: 'student@example.com',
          role: 'student',
          hasPaidAccess: true,
          enrolledAt: '2026-02-14T14:30:00.000Z',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
          bio: 'Boutique design studio owner expanding into AI web development.',
        },
        {
          id: 'usr-unpaid-1',
          name: 'Alex Rivera (New Visitor)',
          email: 'alex@example.com',
          role: 'student',
          hasPaidAccess: false,
          enrolledAt: undefined,
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
          bio: 'Considering enrollment to automate local HVAC contracting business.',
        },
      ],
      courses: JSON.parse(JSON.stringify(INITIAL_COURSES)),
      progress: {
        'usr-student-1': [
          {
            courseId: 'ai-fundamentals',
            completedLessonIds: ['les-1-1', 'les-1-2'],
            lastAccessedLessonId: 'les-2-1',
            lastAccessedAt: '2026-09-14T16:20:00.000Z',
            notes: {
              'les-1-1': 'Remember: Shift from search to synthesis. Structure constraints first.',
            },
          },
          {
            courseId: 'build-websites-with-ai',
            completedLessonIds: ['web-1-1'],
            lastAccessedLessonId: 'web-2-1',
            lastAccessedAt: '2026-09-15T08:15:00.000Z',
            notes: {},
          },
        ],
      },
      payments: [
        {
          id: 'pay-seed-1',
          userId: 'usr-student-1',
          userEmail: 'student@example.com',
          userName: 'Sarah Chen',
          amount: 300,
          currency: 'USD',
          status: 'succeeded',
          createdAt: '2026-02-14T14:30:00.000Z',
          paymentMethod: 'Visa •••• 4242',
          transactionId: 'ch_3N8vZ2J7xFoundation001',
          receiptNumber: 'REC-2026-0042',
        },
      ],
      contacts: [
        {
          id: 'con-1',
          name: 'David Keller',
          email: 'david@kellerroofing.com',
          phone: '303-555-0198',
          subject: 'Team enrollment inquiry for 4 estimators',
          message: 'Hi, we run a commercial roofing company in Denver. Can we buy multiple seats or do you have a group access code?',
          createdAt: '2026-09-12T11:00:00.000Z',
          status: 'new',
        },
      ],
    };
  }

  // Users
  getUsers() {
    return this.data.users;
  }

  getUserById(id: string) {
    return this.data.users.find((u) => u.id === id);
  }

  getUserByEmail(email: string) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    this.data.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const index = this.data.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.data.users[index] = { ...this.data.users[index], ...updates };
    return this.data.users[index];
  }

  // Courses
  getCourses() {
    return this.data.courses;
  }

  getCourseByIdOrSlug(identifier: string) {
    return this.data.courses.find((c) => c.id === identifier || c.slug === identifier);
  }

  createCourse(course: Course): Course {
    this.data.courses.push(course);
    return course;
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    const idx = this.data.courses.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.data.courses[idx] = { ...this.data.courses[idx], ...updates };
    return this.data.courses[idx];
  }

  deleteCourse(id: string): boolean {
    const initialLen = this.data.courses.length;
    this.data.courses = this.data.courses.filter((c) => c.id !== id);
    return this.data.courses.length < initialLen;
  }

  // Payments
  getPayments() {
    return this.data.payments;
  }

  recordPayment(payment: Omit<PaymentRecord, 'id' | 'createdAt' | 'receiptNumber'>): PaymentRecord {
    const count = this.data.payments.length + 1;
    const padCount = String(count).padStart(4, '0');
    const newPayment: PaymentRecord = {
      ...payment,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString(),
      receiptNumber: `REC-${new Date().getFullYear()}-${padCount}`,
    };
    this.data.payments.unshift(newPayment);

    // Update user access
    const user = this.getUserById(payment.userId);
    if (user) {
      user.hasPaidAccess = true;
      user.enrolledAt = newPayment.createdAt;
    }

    return newPayment;
  }

  // Progress
  getUserProgress(userId: string): CourseProgress[] {
    return this.data.progress[userId] || [];
  }

  saveProgress(
    userId: string,
    courseId: string,
    completedLessonIds: string[],
    lastAccessedLessonId?: string,
    noteUpdate?: { lessonId: string; note: string }
  ): CourseProgress {
    if (!this.data.progress[userId]) {
      this.data.progress[userId] = [];
    }

    let cp = this.data.progress[userId].find((p) => p.courseId === courseId);
    if (!cp) {
      cp = {
        courseId,
        completedLessonIds: [],
        lastAccessedLessonId,
        lastAccessedAt: new Date().toISOString(),
        notes: {},
      };
      this.data.progress[userId].push(cp);
    }

    cp.completedLessonIds = Array.from(new Set([...cp.completedLessonIds, ...completedLessonIds]));
    if (lastAccessedLessonId) {
      cp.lastAccessedLessonId = lastAccessedLessonId;
    }
    cp.lastAccessedAt = new Date().toISOString();

    if (noteUpdate) {
      if (!cp.notes) cp.notes = {};
      cp.notes[noteUpdate.lessonId] = noteUpdate.note;
    }

    return cp;
  }

  // Contacts
  getContacts() {
    return this.data.contacts;
  }

  addContact(data: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>): ContactSubmission {
    const newContact: ContactSubmission = {
      ...data,
      id: `con-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    this.data.contacts.unshift(newContact);
    return newContact;
  }
}

export const storage = new AppStorage();
