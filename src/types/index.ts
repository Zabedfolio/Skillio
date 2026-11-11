export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
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

export interface Admin {
  _id: string;
  email: string;
  role: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

