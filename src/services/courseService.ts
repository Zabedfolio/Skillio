import { Course, ApiResponse } from '@/types';

/**
 * Service: courseService
 * Handles public course catalog data fetching using the native fetch API.
 * Uses cache: "no-store" so administrative course additions/updates reflect instantly.
 */
export async function getCourses(): Promise<Course[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  try {
    const res = await fetch(`${apiUrl}/courses`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch courses: Server responded with status ${res.status} (${res.statusText})`
      );
    }

    const result: ApiResponse<Course[]> = await res.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || 'Failed to retrieve courses from the database.');
    }

    return result.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while connecting to the course service.');
  }
}

