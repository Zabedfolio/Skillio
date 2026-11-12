import { redirect } from 'next/navigation';

/**
 * Root page route.
 * Redirects visitors directly to the public courses catalog.
 */
export default function Home() {
  redirect('/courses');
}
