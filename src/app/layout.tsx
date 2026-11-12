import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Skillio | Learning Platform',
  description: 'Online Learning Platform',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <Toaster
          position="bottom-right"
          gutter={10}
          containerStyle={{
            bottom: 24,
            right: 24,
            zIndex: 99999,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFFFFF',
              color: '#0F172A',
              border: '1px solid #E2E8F0',
              padding: '12px 16px',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: 500,
              boxShadow:
                '0 20px 25px -5px rgba(30, 64, 255, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
              fontFamily: 'inherit',
            },
            success: {
              duration: 4000,
              iconTheme: {
                primary: '#1E40FF',
                secondary: '#EEF2FF',
              },
              style: {
                border: '1px solid rgba(30, 64, 255, 0.25)',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FEF2F2',
              },
              style: {
                border: '1px solid rgba(239, 68, 68, 0.25)',
              },
            },
            loading: {
              iconTheme: {
                primary: '#00B4FF',
                secondary: '#EEF2FF',
              },
            },
          }}
        />
        <Suspense fallback={<div className="h-16 border-b border-slate-200/70 bg-white" />}>
          <Navbar />
        </Suspense>
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
