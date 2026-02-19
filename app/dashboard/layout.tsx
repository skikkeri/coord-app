'use client';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { MobileMenuContext } from '../components/MobileMenuContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <MobileMenuContext.Provider value={{ onOpen: () => setSidebarOpen(true) }}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar role="ae" isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto flex flex-col" style={{ background: '#F8FAFC' }}>
          {children}
        </main>
      </div>
    </MobileMenuContext.Provider>
  );
}
