import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { storage } from './server/storage';
import { Course, CourseModule, Lesson, User } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Standard middleware
  app.use(express.json());

  // Helper auth extraction
  function getAuthenticatedUser(req: Request): User | null {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    const token = authHeader.replace('Bearer ', '').trim();
    if (token.startsWith('fc_token_')) {
      const userId = token.replace('fc_token_', '');
      return storage.getUserById(userId) || null;
    }
    return null;
  }

  function requireAuth(req: Request, res: Response, next: NextFunction) {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    (req as any).user = user;
    next();
  }

  function requireAdmin(req: Request, res: Response, next: NextFunction) {
    const user = getAuthenticatedUser(req);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Administrator privileges required' });
    }
    (req as any).user = user;
    next();
  }

  // ==========================================
  // AUTH ROUTES
  // ==========================================
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const existing = storage.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const user = storage.createUser({
      name,
      email: email.trim(),
      role: 'student',
      hasPaidAccess: false,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      bio: 'New student on Foundation Course',
    });

    const token = `fc_token_${user.id}`;
    return res.json({ user, token });
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = storage.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'No account found with this email address' });
    }

    const token = `fc_token_${user.id}`;
    return res.json({ user, token });
  });

  app.get('/api/auth/me', (req: Request, res: Response) => {
    const user = getAuthenticatedUser(req);
    if (!user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    return res.json({ user });
  });

  app.post('/api/auth/reset-password', (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    return res.json({
      success: true,
      message: `If an account exists for ${email}, a secure password reset link has been dispatched.`,
    });
  });

  // ==========================================
  // PAYMENT & ACCESS ROUTES
  // ==========================================
  app.post('/api/payment/checkout', (req: Request, res: Response) => {
    const { email, name, cardNumber, expMonth, expYear, cvc, paymentMethod } = req.body;
    let user = getAuthenticatedUser(req);

    // If unauthenticated, find or create student account
    if (!user) {
      if (!email) {
        return res.status(400).json({ error: 'Email is required for checkout' });
      }
      user = storage.getUserByEmail(email);
      if (!user) {
        user = storage.createUser({
          name: name || email.split('@')[0],
          email: email.trim(),
          role: 'student',
          hasPaidAccess: false,
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || email)}`,
        });
      }
    }

    // Server-side payment verification simulation
    // Supports standard test cards or custom payment methods
    const maskedCard = cardNumber
      ? `Card ending in ${String(cardNumber).slice(-4)}`
      : paymentMethod || 'Visa •••• 4242';

    const txId = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    const paymentRecord = storage.recordPayment({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      amount: 300,
      currency: 'USD',
      status: 'succeeded',
      paymentMethod: maskedCard,
      transactionId: txId,
    });

    // Refresh user state
    const updatedUser = storage.getUserById(user.id)!;
    const token = `fc_token_${updatedUser.id}`;

    return res.json({
      success: true,
      message: 'Payment verified successfully. Full course access granted.',
      user: updatedUser,
      token,
      paymentRecord,
    });
  });

  app.post('/api/payment/verify-webhook', (req: Request, res: Response) => {
    // Webhook endpoint for payment gateways (Stripe / PayPal)
    res.json({ received: true, timestamp: new Date().toISOString() });
  });

  // ==========================================
  // COURSES ROUTES (PROTECTED VS PUBLIC)
  // ==========================================
  // Public course list: curriculum outlines provided, but deep lesson contents stripped for unpaid users
  app.get('/api/courses', (req: Request, res: Response) => {
    const user = getAuthenticatedUser(req);
    const hasFullAccess = user && (user.hasPaidAccess || user.role === 'admin');
    const courses = storage.getCourses();

    if (hasFullAccess) {
      return res.json({ courses, hasFullAccess: true });
    }

    // Strip protected markdown content for visitors / unpaid users
    const publicCourses = courses.map((course) => ({
      ...course,
      modules: course.modules.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((les) => ({
          id: les.id,
          title: les.title,
          duration: les.duration,
          type: les.type,
          isFreePreview: les.isFreePreview || false,
          summary: les.summary,
          order: les.order,
          keyTakeaways: les.keyTakeaways,
          promptTemplates: les.isFreePreview ? les.promptTemplates : undefined,
          // Content only included if free preview
          content: les.isFreePreview ? les.content : undefined,
          resources: les.isFreePreview ? les.resources : undefined,
          videoUrl: les.isFreePreview ? les.videoUrl : undefined,
        })),
      })),
    }));

    return res.json({ courses: publicCourses, hasFullAccess: false });
  });

  // Detailed single course info (public metadata)
  app.get('/api/courses/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const course = storage.getCourseByIdOrSlug(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const user = getAuthenticatedUser(req);
    const hasFullAccess = !!(user && (user.hasPaidAccess || user.role === 'admin'));

    if (hasFullAccess) {
      return res.json({ course, hasFullAccess: true });
    }

    // Scrub protected content
    const sanitizedCourse = {
      ...course,
      modules: course.modules.map((mod) => ({
        ...mod,
        lessons: mod.lessons.map((les) => ({
          id: les.id,
          title: les.title,
          duration: les.duration,
          type: les.type,
          isFreePreview: les.isFreePreview || false,
          summary: les.summary,
          order: les.order,
          keyTakeaways: les.keyTakeaways,
          promptTemplates: les.isFreePreview ? les.promptTemplates : undefined,
          content: les.isFreePreview ? les.content : undefined,
          resources: les.isFreePreview ? les.resources : undefined,
          videoUrl: les.isFreePreview ? les.videoUrl : undefined,
        })),
      })),
    };

    return res.json({ course: sanitizedCourse, hasFullAccess: false });
  });

  // PROTECTED: Full course content with all videos, materials, prompts, and notes
  app.get('/api/courses/:id/full', requireAuth, (req: Request, res: Response) => {
    const user = (req as any).user as User;
    if (!user.hasPaidAccess && user.role !== 'admin') {
      return res.status(403).json({
        error: 'Access restricted',
        message: 'This course requires the Foundation Course $300 full access membership.',
        requiresPayment: true,
      });
    }

    const { id } = req.params;
    const course = storage.getCourseByIdOrSlug(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.json({ course, hasFullAccess: true });
  });

  // ==========================================
  // PROGRESS & DASHBOARD ROUTES
  // ==========================================
  app.get('/api/progress', requireAuth, (req: Request, res: Response) => {
    const user = (req as any).user as User;
    const progressList = storage.getUserProgress(user.id);
    return res.json({ progress: progressList });
  });

  app.post('/api/progress', requireAuth, (req: Request, res: Response) => {
    const user = (req as any).user as User;
    const { courseId, completedLessonIds, lastAccessedLessonId, noteUpdate } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: 'courseId is required' });
    }

    const updated = storage.saveProgress(
      user.id,
      courseId,
      completedLessonIds || [],
      lastAccessedLessonId,
      noteUpdate
    );

    return res.json({ progress: updated });
  });

  // ==========================================
  // CONTACT INQUIRIES
  // ==========================================
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const submission = storage.addContact({
      name,
      email: email.trim(),
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });

    return res.json({
      success: true,
      message: 'Thank you! Your message has been sent to foundationcourse@gmail.com. We will respond within 24 hours.',
      submission,
    });
  });

  // ==========================================
  // ADMIN DASHBOARD ROUTES
  // ==========================================
  app.get('/api/admin/stats', requireAdmin, (req: Request, res: Response) => {
    const users = storage.getUsers();
    const courses = storage.getCourses();
    const payments = storage.getPayments();
    const contacts = storage.getContacts();

    const students = users.filter((u) => u.role === 'student');
    const enrolledStudents = students.filter((u) => u.hasPaidAccess);
    const totalRevenue = payments
      .filter((p) => p.status === 'succeeded')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalLessons = courses.reduce(
      (acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0),
      0
    );

    return res.json({
      totalRevenue,
      totalStudents: students.length,
      enrolledStudents: enrolledStudents.length,
      totalCourses: courses.length,
      totalLessons,
      totalPayments: payments.length,
      totalInquiries: contacts.length,
    });
  });

  app.get('/api/admin/students', requireAdmin, (req: Request, res: Response) => {
    const users = storage.getUsers();
    const courses = storage.getCourses();
    const studentsWithProgress = users
      .filter((u) => u.role === 'student')
      .map((student) => {
        const progressList = storage.getUserProgress(student.id);
        const totalCompletedLessons = progressList.reduce(
          (acc, p) => acc + (p.completedLessonIds?.length || 0),
          0
        );
        const totalCourseLessons = courses.reduce(
          (acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0),
          0
        );
        const completionRate = totalCourseLessons > 0
          ? Math.round((totalCompletedLessons / totalCourseLessons) * 100)
          : 0;

        return {
          ...student,
          totalCompletedLessons,
          completionRate,
          progress: progressList,
        };
      });

    return res.json({ students: studentsWithProgress });
  });

  app.post('/api/admin/students/:id/toggle-access', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const student = storage.getUserById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const updated = storage.updateUser(id, {
      hasPaidAccess: !student.hasPaidAccess,
      enrolledAt: !student.hasPaidAccess ? new Date().toISOString() : undefined,
    });

    return res.json({ student: updated });
  });

  app.get('/api/admin/payments', requireAdmin, (req: Request, res: Response) => {
    const payments = storage.getPayments();
    return res.json({ payments });
  });

  app.get('/api/admin/contacts', requireAdmin, (req: Request, res: Response) => {
    const contacts = storage.getContacts();
    return res.json({ contacts });
  });

  // Course Management CRUD
  app.post('/api/admin/courses', requireAdmin, (req: Request, res: Response) => {
    const courseData = req.body as Course;
    if (!courseData.title || !courseData.shortDescription) {
      return res.status(400).json({ error: 'Course title and short description are required' });
    }

    const newCourse: Course = {
      ...courseData,
      id: courseData.id || `course-${Date.now()}`,
      slug: courseData.slug || courseData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      modules: courseData.modules || [],
      totalLessons: courseData.modules
        ? courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0)
        : 0,
    };

    storage.createCourse(newCourse);
    return res.json({ course: newCourse });
  });

  app.put('/api/admin/courses/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    const updated = storage.updateCourse(id, updates);
    if (!updated) {
      return res.status(404).json({ error: 'Course not found' });
    }
    return res.json({ course: updated });
  });

  app.delete('/api/admin/courses/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const success = storage.deleteCourse(id);
    if (!success) {
      return res.status(404).json({ error: 'Course not found' });
    }
    return res.json({ success: true, message: 'Course deleted' });
  });

  app.post('/api/admin/courses/:id/modules', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const course = storage.getCourseByIdOrSlug(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const { title, description } = req.body;
    const newModule: CourseModule = {
      id: `mod-${Date.now()}`,
      title: title || 'New Module',
      description: description || '',
      order: course.modules.length + 1,
      lessons: [],
    };

    course.modules.push(newModule);
    storage.updateCourse(course.id, { modules: course.modules });
    return res.json({ course, module: newModule });
  });

  app.post('/api/admin/courses/:id/modules/:moduleId/lessons', requireAdmin, (req: Request, res: Response) => {
    const { id, moduleId } = req.params;
    const course = storage.getCourseByIdOrSlug(id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const moduleObj = course.modules.find((m) => m.id === moduleId);
    if (!moduleObj) {
      return res.status(404).json({ error: 'Module not found' });
    }

    const lessonData = req.body as Partial<Lesson>;
    const newLesson: Lesson = {
      id: `les-${Date.now()}`,
      title: lessonData.title || 'New Lesson',
      duration: lessonData.duration || '15 mins',
      type: lessonData.type || 'video',
      isFreePreview: !!lessonData.isFreePreview,
      summary: lessonData.summary || 'Lesson summary',
      content: lessonData.content || 'Detailed lesson instructions, prompt templates, and code walkthrough.',
      order: moduleObj.lessons.length + 1,
      keyTakeaways: lessonData.keyTakeaways || [],
      promptTemplates: lessonData.promptTemplates || [],
      resources: lessonData.resources || [],
    };

    moduleObj.lessons.push(newLesson);
    const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    storage.updateCourse(course.id, { modules: course.modules, totalLessons });

    return res.json({ course, lesson: newLesson });
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Foundation Course server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
