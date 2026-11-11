# LMS Frontend

Simplified Learning Management System (LMS) frontend built with Next.js (App Router), TypeScript, Tailwind CSS, and Axios.

## Prerequisites
- Node.js (v18+)
- Backend running on `http://localhost:5000`

## Setup Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Default:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

## Folder Structure
- `src/app/`: App router files (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/lib/`: Axios instance configuration with JWT interceptors
- `src/types/`: Strict TypeScript interfaces for Course, Lecture, Admin, ApiResponse
- `src/services/`: Future API service functions
- `src/components/`: Reusable UI components
- `src/context/`: React context providers
