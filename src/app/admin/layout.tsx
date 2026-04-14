import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-surface-dim min-h-screen">
      <AdminSidebar />
      <main className="ml-72 flex-1 relative">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-40 left-40 w-64 h-64 bg-accent/[0.02] rounded-full blur-[80px] pointer-events-none" />
        
        {/* Content Container */}
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
