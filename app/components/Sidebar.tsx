'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Text } from '@salt-ds/core';
import {
  LayoutDashboard, CalendarPlus, Calendar, Settings, Bell,
  FileText, Building2, BarChart2, X
} from 'lucide-react';
import { CalendarConnect } from './CalendarConnect';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  role: 'ae' | 'se';
  isOpen?: boolean;
  onClose?: () => void;
}

const aeNav: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} />, badge: 3 },
  { href: '/book', label: 'Book a Demo', icon: <CalendarPlus size={15} /> },
  { href: '/dashboard/deals', label: 'Active Deals', icon: <Building2 size={15} /> },
  { href: '/dashboard/pipeline', label: 'Pipeline View', icon: <BarChart2 size={15} /> },
  { href: '/dashboard/settings', label: 'Preferences', icon: <Settings size={15} /> },
];

const seNav: NavItem[] = [
  { href: '/se/demos', label: 'My Demos', icon: <LayoutDashboard size={15} /> },
  { href: '/se/availability', label: 'Availability', icon: <Calendar size={15} /> },
  { href: '/se/briefs', label: 'Pre-call Briefs', icon: <FileText size={15} /> },
  { href: '/se/notifications', label: 'Notifications', icon: <Bell size={15} /> },
  { href: '/se/settings', label: 'Preferences', icon: <Settings size={15} /> },
];

export function Sidebar({ role, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const nav = role === 'ae' ? aeNav : seNav;
  const user = role === 'ae'
    ? { initials: 'M', name: 'Marcus Chen', title: 'Account Executive', color: '#2563EB' }
    : { initials: 'P', name: 'Priya Sharma', title: 'Sales Engineer', color: '#7C3AED' };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close drawer on route change (mobile navigation)
  useEffect(() => {
    onClose?.();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Mobile backdrop — shown when drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'coord-sidebar flex flex-col overflow-y-auto',
          // Mobile: fixed overlay drawer, slides in/out
          'fixed top-0 left-0 h-full z-50 w-[260px]',
          'transition-transform duration-200 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop (md+): always visible, static position
          'md:relative md:translate-x-0 md:w-[260px] md:min-w-[260px]',
        ].join(' ')}
        style={{ color: '#CBD5E1' }}
      >
        {/* Logo */}
        <div
          className="px-5 py-5 flex items-center gap-2"
          style={{ borderBottom: '1px solid #2D3348' }}
        >
          <span style={{ color: '#60A5FA', fontSize: 18 }}>⚡</span>
          <Text
            styleAs="h4"
            style={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.5px', margin: 0, flex: 1 }}
          >
            Coord
          </Text>
          {/* Close button — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-7 h-7 rounded-md"
            style={{ color: '#94A3B8', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3">
          <div
            className="px-4 py-2"
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569' }}
          >
            Navigation
          </div>
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <div
                  className="flex items-center gap-2.5 mx-2 px-3 py-2 rounded-md transition-colors"
                  style={{
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 400,
                    background: active ? '#2563EB' : 'transparent',
                    color: active ? '#fff' : '#94A3B8',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLDivElement).style.background = '#2D3348';
                      (e.currentTarget as HTMLDivElement).style.color = '#E2E8F0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                      (e.currentTarget as HTMLDivElement).style.color = '#94A3B8';
                    }
                  }}
                >
                  <span className="w-4 flex items-center justify-center opacity-80">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className="flex items-center justify-center rounded-full text-white font-bold"
                      style={{ background: '#EF4444', fontSize: 10, minWidth: 18, height: 18, padding: '0 4px' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Calendar connect */}
        <div className="px-4 pb-3" style={{ borderTop: '1px solid #2D3348', paddingTop: 12 }}>
          <CalendarConnect />
        </div>

        {/* User footer */}
        <div
          className="p-4 flex items-center gap-2.5"
          style={{ borderTop: '1px solid #2D3348' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{ background: user.color, fontSize: 13 }}
          >
            {user.initials}
          </div>
          <div>
            <Text style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 13, margin: 0 }}>{user.name}</Text>
            <Text style={{ color: '#475569', fontSize: 11, margin: 0 }}>{user.title}</Text>
          </div>
        </div>
      </aside>
    </>
  );
}
