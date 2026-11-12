export type Role = 'student' | 'admin';

export interface NavItem {
  label: string;
  href: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  lectureCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lecture {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  course: string | Course;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  name?: string;
  email: string;
  role: Role;
  image?: string;
}

export interface Admin {
  _id: string;
  name?: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
