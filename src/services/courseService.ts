import { Course, Lecture, ApiResponse } from '@/types';
import { getAdminToken, getAdminTokenAsync } from './authService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * High-fidelity sample courses for UI preview when backend is disconnected.
 */
export const SAMPLE_COURSES: Course[] = [
  {
    _id: 'course-1',
    title: 'Full-Stack Next.js 15 & React Mastery',
    description:
      'Master modern web development with Next.js App Router, Server Actions, TypeScript, Tailwind CSS, and scalable full-stack architectures.',
    price: 49.99,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    lectureCount: 4,
    createdAt: '2026-01-15T00:00:00.000Z',
  },
  {
    _id: 'course-2',
    title: 'Complete Node.js & Express RESTful API Bootcamp',
    description:
      'Build robust, production-ready backend microservices, JWT authentication, error handling pipelines, and REST APIs with Node.js and Express.',
    price: 39.99,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=80',
    lectureCount: 2,
    createdAt: '2026-02-01T00:00:00.000Z',
  },
  {
    _id: 'course-3',
    title: 'MongoDB & Mongoose: Modern Data Modeling',
    description:
      'Learn NoSQL database schema design, indexing, aggregations, relationship modeling, and database transactions for high-traffic apps.',
    price: 29.99,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    lectureCount: 2,
    createdAt: '2026-02-10T00:00:00.000Z',
  },
];

export const SAMPLE_LECTURES: Lecture[] = [
  {
    _id: 'lec-1-1',
    title: '1. Introduction to Next.js App Router Architecture',
    description:
      'Understanding Server Components vs Client Components, routing conventions, layouts, and data streaming in modern Next.js.',
    videoUrl: 'https://www.youtube.com/watch?v=wm5gMKuwSYk',
    course: 'course-1',
  },
  {
    _id: 'lec-1-2',
    title: '2. Server Actions & Mutations without API Routes',
    description:
      'How to build secure form submissions and database mutations using React 19 Server Actions and revalidation.',
    videoUrl: 'https://www.youtube.com/watch?v=dPx1228_EYA',
    course: 'course-1',
  },
  {
    _id: 'lec-1-3',
    title: '3. Tailwind CSS & Responsive Layout Mastery',
    description:
      'Styling fluid UI components, designing custom theme tokens, and structuring full-screen responsive layouts.',
    videoUrl: 'https://www.youtube.com/watch?v=pfaSUYaSgRo',
    course: 'course-1',
  },
  {
    _id: 'lec-2-1',
    title: '1. Express Architecture & MVC Foundations',
    description:
      'Setting up clean ES Modules structure, middleware chains, router segmentation, and centralized error handling.',
    videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
    course: 'course-2',
  },
  {
    _id: 'lec-3-1',
    title: '1. MongoDB Schema Design & Mongoose Modeling',
    description:
      'Designing performant schemas, custom validators, index strategies, and document lifecycles.',
    videoUrl: 'https://www.youtube.com/watch?v=DZBGEExL2eE',
    course: 'course-3',
  },
];

/**
 * Helper to construct Authorization header for admin requests.
 * Uses stored admin JWT or retrieves one from active Better Auth session.
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  let token = getAdminToken();
  if (!token) {
    token = await getAdminTokenAsync();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Public: Get all courses.
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_URL}/courses`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const result: ApiResponse<Course[]> = await res.json();
      if (result.success && Array.isArray(result.data)) {
        return result.data;
      }
    }
  } catch {
    // Fall back to sample courses
  }

  return SAMPLE_COURSES;
}

/**
 * Public: Get a single course by ID.
 */
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const res = await fetch(`${API_URL}/courses/${id}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const result: ApiResponse<Course> = await res.json();
      if (result.success && result.data) {
        return result.data;
      }
    }
  } catch {
    // Fall back to sample courses
  }

  return SAMPLE_COURSES.find((c) => c._id === id) || null;
}

/**
 * Public: Get all lectures for a specific course.
 */
export async function getCourseLectures(courseId: string): Promise<Lecture[]> {
  try {
    const res = await fetch(`${API_URL}/courses/${courseId}/lectures`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const result: ApiResponse<Lecture[]> = await res.json();
      if (result.success && Array.isArray(result.data)) {
        return result.data;
      }
    }
  } catch {
    // Fall back to sample lectures
  }

  return SAMPLE_LECTURES.filter((l) => {
    const refId = typeof l.course === 'string' ? l.course : l.course._id;
    return refId === courseId;
  });
}

/**
 * Public: Get a single lecture by ID.
 */
export async function getLectureById(lectureId: string): Promise<Lecture | null> {
  try {
    const res = await fetch(`${API_URL}/lectures/${lectureId}`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const result: ApiResponse<Lecture> = await res.json();
      if (result.success && result.data) {
        return result.data;
      }
    }
  } catch {
    // Fall back to sample lectures
  }

  return SAMPLE_LECTURES.find((l) => l._id === lectureId) || null;
}

/* =========================================================================
 * Administrative Operations (Requires Admin JWT Token)
 * ========================================================================= */

export interface CourseInput {
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
}

export interface LectureInput {
  title: string;
  description: string;
  videoUrl: string;
}

export interface DashboardStats {
  totalCourses: number;
  totalLectures: number;
  totalStudents: number;
  recentCourses: Course[];
}

/**
 * Admin: Get dashboard overview metrics.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/courses/stats/overview`, {
    headers,
    credentials: 'include',
    cache: 'no-store',
  });

  const result: ApiResponse<DashboardStats> = await res.json();
  if (!res.ok || !result.success || !result.data) {
    throw new Error(result.message || 'Failed to fetch dashboard metrics.');
  }

  return result.data;
}

/**
 * Admin: Create a new course.
 */
export async function createCourse(data: CourseInput): Promise<Course> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/courses`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Course> = await res.json();
  if (!res.ok || !result.success || !result.data) {
    throw new Error(result.message || 'Failed to create course.');
  }

  return result.data;
}

/**
 * Admin: Update an existing course.
 */
export async function updateCourse(id: string, data: Partial<CourseInput>): Promise<Course> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Course> = await res.json();
  if (!res.ok || !result.success || !result.data) {
    throw new Error(result.message || 'Failed to update course.');
  }

  return result.data;
}

/**
 * Admin: Delete a course and all its linked lectures.
 */
export async function deleteCourse(id: string): Promise<void> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  });

  const result: ApiResponse = await res.json();
  if (!res.ok || !result.success) {
    throw new Error(result.message || 'Failed to delete course.');
  }
}

/**
 * Admin: Add a lecture to a course.
 */
export async function createLecture(courseId: string, data: LectureInput): Promise<Lecture> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/courses/${courseId}/lectures`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Lecture> = await res.json();
  if (!res.ok || !result.success || !result.data) {
    throw new Error(result.message || 'Failed to create lecture.');
  }

  return result.data;
}

/**
 * Admin: Update an existing lecture.
 */
export async function updateLecture(lectureId: string, data: Partial<LectureInput>): Promise<Lecture> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/lectures/${lectureId}`, {
    method: 'PUT',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const result: ApiResponse<Lecture> = await res.json();
  if (!res.ok || !result.success || !result.data) {
    throw new Error(result.message || 'Failed to update lecture.');
  }

  return result.data;
}

/**
 * Admin: Delete a lecture.
 */
export async function deleteLecture(lectureId: string): Promise<void> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_URL}/lectures/${lectureId}`, {
    method: 'DELETE',
    headers,
    credentials: 'include',
  });

  const result: ApiResponse = await res.json();
  if (!res.ok || !result.success) {
    throw new Error(result.message || 'Failed to delete lecture.');
  }
}
