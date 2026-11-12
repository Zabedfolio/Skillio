import { Course, ApiResponse } from '@/types';

/**
 * High-fidelity sample courses for UI preview and design evaluation.
 * Displayed when the backend is offline or before backend routes are seeded.
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
    createdAt: '2026-02-10T00:00:00.000Z',
  },
  {
    _id: 'course-4',
    title: 'Modern TypeScript from Zero to Production',
    description:
      'Master strict type safety, generics, utility types, and enterprise architecture patterns to write bulletproof JavaScript codebases.',
    price: 34.99,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1516116211227-bbc80459c0f9?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-02-15T00:00:00.000Z',
  },
  {
    _id: 'course-5',
    title: 'UI/UX Design Systems with Tailwind CSS',
    description:
      'Craft stunning responsive web applications, accessible components, dark mode layouts, and custom design tokens with modern CSS.',
    price: 0,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-02-20T00:00:00.000Z',
  },
  {
    _id: 'course-6',
    title: 'Docker, CI/CD & Cloud Deployment Masterclass',
    description:
      'Containerize full-stack applications, configure automated GitHub Actions pipelines, and deploy scalable cloud infrastructure.',
    price: 44.99,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-02-25T00:00:00.000Z',
  },
];

/**
 * Service: courseService
 * Fetches course catalog from the backend API.
 * If the backend is unavailable or not yet connected, returns sample courses
 * so the UI and card designs can be previewed immediately.
 */
export async function getCourses(): Promise<Course[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${apiUrl}/courses`, {
      cache: 'no-store',
    });

    if (res.ok) {
      const result: ApiResponse<Course[]> = await res.json();
      if (result.success && Array.isArray(result.data) && result.data.length > 0) {
        return result.data;
      }
    }
  } catch {
    // Backend is currently offline or unreachable; fall through to preview courses
  }

  // Return preview sample courses for design evaluation
  return SAMPLE_COURSES;
}
