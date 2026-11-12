# Skillio — Modern Learning Management System (LMS)

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.6-black.svg?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg?logo=express)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas_Cloud-47A248.svg?logo=mongodb)](https://www.mongodb.com/atlas)

A simplified, production-ready Full-Stack Learning Management System built for the **DataPollex Industrial Training Recruitment Task**. Skillio features an **Admin Dashboard** for course and lecture curriculum management and a public **Student Panel** for exploring courses and watching video lectures.

---

## 🚀 Key Features

### 1. Student Panel (Public & Learning Experience)
- **Course Catalog (`/courses`):** Dynamically fetches real courses from MongoDB Atlas. Each card displays 16:9 thumbnail previews, title, 2-line truncated description, formatted price badge, and dynamic lecture count indicator (`• N lectures`).
- **Course Details (`/courses/[id]`):** 2-column responsive layout with course hero summary, learning outcomes checklist, interactive lecture curriculum with "Watch" action badges, and a sticky enrollment preview card.
- **Embedded Lecture Player (`/courses/[id]/lectures/[lectureId]`):** Responsive 16:9 aspect ratio video player supporting YouTube watch, short, and embed links via privacy-friendly embed wrappers. Includes Prev/Next lesson navigation, lesson notes, and an **interactive sidebar playlist** showing all course lectures with active highlight.
- **Resilient UX:** Dedicated loading skeletons (`loading.tsx`), friendly empty states (`EmptyState.tsx`), and error boundaries with retry buttons (`error.tsx`).

### 2. Admin Dashboard (Protected & Operations Hub)
- **Authentication & Access Control:**
  - Secure Administrator login portal at `/admin/login`.
  - Protected layout (`AdminLayout` & `AdminLayoutClient`) preventing unauthorized or non-admin access.
  - Automated session-to-JWT exchange bridge (`/api/auth/token`).
- **Overview Analytics (`/admin`):**
  - Real-time KPI metrics cards: **Total Courses**, **Total Video Lectures**, and **Total Students** (dynamically queried from the `user` collection, strictly excluding administrator accounts).
  - Quick action shortcuts ("Create Course", "Student View").
  - Recent courses table with direct edit and lecture management shortcuts.
- **Course Management (`/admin/courses`):**
  - Table and responsive card view with thumbnail previews, titles, descriptions, prices, and lecture counts.
  - Create (`/admin/courses/new`) and Edit (`/admin/courses/[id]/edit`) forms with instant live thumbnail preview and input validation.
  - Delete course action with **cascade deletion of all linked lectures** and confirmation warning modal.
- **Lecture Management (`/admin/courses/[id]/lectures`):**
  - Course-centric lecture manager displaying selected course details.
  - Add & Edit lecture modals featuring a **live embedded video player preview** for instant verification of video URLs.
  - Delete lecture action with immediate reactive UI refresh and toast notifications.

### 3. User Authentication & Role System
- Powered by **Better Auth** with the official MongoDB adapter (`@better-auth/mongo-adapter`).
- Unified user model in MongoDB (`user` collection) with `role: 'student' | 'admin'`.
- Dynamic navbar reflecting the logged-in user name and avatar initial pill via `useSession()`.
- Bottom-right notifications matching brand theme via `react-hot-toast`.

---

## 🛠️ Tech Stack & Architecture

```
Layer               Technology
----------------------------------------------------------------------
Frontend Framework  Next.js 16 (App Router) + TypeScript
Styling             Tailwind CSS v4
Backend Server      Node.js + Express.js (ES Modules, MVC architecture)
Database            MongoDB Atlas (Cloud Cluster) + Mongoose ODM
Authentication      Better Auth (Sessions) + Stateless JWT Bearer Tokens
Video Processing    Custom Embed URL Normalizer (YouTube / YouTube Shorts)
Notifications       react-hot-toast
```

### Folder Structure
```
DataPollex/
├── backend/
│   ├── src/
│   │   ├── config/db.js             # Mongoose MongoDB Atlas connection
│   │   ├── models/                  # User.js, Course.js, Lecture.js
│   │   ├── controllers/             # authController, courseController, lectureController
│   │   ├── routes/                  # index.js, authRoutes, courseRoutes, lectureRoutes
│   │   ├── middleware/              # authMiddleware (protectAdmin), errorMiddleware
│   │   ├── utils/                   # generateToken.js
│   │   ├── app.js                   # Express application setup, CORS, JSON parsing
│   │   └── server.js                # Server entrypoint (Port 5000)
│   ├── scripts/seed.js              # Database seeder (Admin, 3 Courses, 7 Lectures)
│   ├── .env / .env.example
│   └── package.json
└── frontend/
    ├── public/                      # Brand assets (skillio.png, favicon)
    └── src/
        ├── app/                     # Next.js App Router pages
        │   ├── admin/               # Admin console, overview, courses, lectures
        │   ├── api/auth/            # Better Auth API + /api/auth/token exchange
        │   ├── courses/             # Public course catalog, details, lecture viewer
        │   ├── signin/, signup/     # Authentication portals
        │   └── layout.tsx           # Root layout with Navbar, Footer & Toaster
        ├── components/              # Modular UI components (navbar, footer, courses)
        ├── hooks/                   # useAuthStatus, useRole
        ├── lib/                     # auth.ts, auth-client.ts, videoUtils.ts, formatPrice.ts
        ├── services/                # authService.ts, courseService.ts
        └── types/                   # Strict TypeScript type definitions
```

---

## 🔐 Default Test Credentials

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Admin** | `admin@gmail.com` (or `admin@skillio.com`) | `Admin@123` | Full Admin Dashboard (`/admin`) & Course/Lecture CRUD |
| **Student** | `zabedfolio@gmail.com` | `Student@123` | Student View (`/courses`) & Lecture Player |

*(Quick Fill button available on `/admin/login` for instant testing)*.

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js v20+ installed
- Git installed
- MongoDB connection string (MongoDB Atlas or local MongoDB)

### 1. Clone the repository
```bash
git clone <repository-url>
cd DataPollex
```

### 2. Configure Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://skillio:tQhp0zsKyZ60PD5m@cluster0.mldxc9s.mongodb.net/skillio?retryWrites=true&w=majority
JWT_SECRET=change_this_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=admin@skillio.com
ADMIN_PASSWORD=Admin@123
```

Seed the database with default curriculum:
```bash
node scripts/seed.js
```

Start the backend server:
```bash
npm run dev
# Running on http://localhost:5000
```

### 3. Configure Frontend
Open a new terminal window:
```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_SECRET=change_this_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://skillio:tQhp0zsKyZ60PD5m@cluster0.mldxc9s.mongodb.net/skillio?retryWrites=true&w=majority
JWT_SECRET=change_this_secret
```

Start the Next.js development server:
```bash
npm run dev
# Running on http://localhost:3000
```

Open [http://localhost:3000/courses](http://localhost:3000/courses) in your browser.

---

## 📡 REST API Reference

Base URL: `http://localhost:5000/api`

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server health check |
| `GET` | `/courses` (or `/courses/all`) | List all courses with lecture counts |
| `GET` | `/courses/:id` | Get single course details with lectures |
| `GET` | `/courses/:courseId/lectures` | Get all lectures for a course |
| `GET` | `/lectures/:id` | Get single lecture by ID |

### Authentication Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Authenticate admin, returns JWT bearer token |
| `GET` | `/auth/me` | Get authenticated admin profile |

### Admin Protected Endpoints (Bearer JWT or Session Token Required)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/courses/stats/overview` | Dashboard metrics (Courses, Lectures, Students) |
| `POST` | `/courses` | Create new course (title, description, price, thumbnail) |
| `PUT` | `/courses/:id` | Update existing course details |
| `DELETE` | `/courses/:id` | Delete course with **cascade lecture deletion** |
| `POST` | `/courses/:courseId/lectures` | Add new lecture to course |
| `PUT` | `/lectures/:id` | Update lecture details |
| `DELETE` | `/lectures/:id` | Delete lecture |

---

## 🧪 Quality & Verification

- **TypeScript Typecheck:** `cd frontend && npx tsc --noEmit` -> **0 errors**.
- **ESLint Validation:** `cd frontend && npm run lint` -> **0 errors, 0 warnings**.
- **Syntax Check:** `node --check` executed on all backend modules -> **Passed**.
- **Responsive Viewports:** Verified across 360px (mobile), 768px (tablet), 1024px (laptop), and 1280px+ (desktop).

