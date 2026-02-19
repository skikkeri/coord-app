'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Text, Badge, NavigationItem } from '@salt-ds/core';
import {
  LayoutDashboard, CalendarPlus, Calendar, Settings, Bell,
  FileText, Building2, BarChart2
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  role: 'ae' | 'se';
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

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const nav = role === 'ae' ? aeNav : seNav;
  const user = role === 'ae'
    ? { initials: 'M', name: 'Marcus Chen', title: 'Account Executive', color: '#2563EB' }
    : { initials: 'P', name: 'Priya Sharma', title: 'Sales Engineer', color: '#7C3AED' };

  return (
    <aside
      className="coord-sidebar w-[260px] min-w-[260px] flex flex-col overflow-y-auto"
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
          style={{ color: '#fff', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}
        >
          Coord
        </Text>
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
  );
}
