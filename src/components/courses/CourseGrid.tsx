import { Course } from '@/types';
import CourseCard from './CourseCard';

interface CourseGridProps {
  courses: Course[];
}

/**
 * Component: CourseGrid
 * Responsive grid that maps an array of courses to semantic list items.
 */
export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10"
    >
      {courses.map((course) => (
        <li key={course._id} className="flex">
          <CourseCard course={course} />
        </li>
      ))}
    </ul>
  );
}

