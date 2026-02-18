'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CalendarPlus, Calendar, Settings, Bell, FileText, Building2, BarChart2 } from 'lucide-react';
import clsx from 'clsx';

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
    ? { initials: 'M', name: 'Marcus Chen', title: 'Account Executive', color: 'bg-blue-600' }
    : { initials: 'P', name: 'Priya Sharma', title: 'Sales Engineer', color: 'bg-purple-600' };

  return (
    <aside className="w-[260px] min-w-[260px] flex flex-col overflow-y-auto" style={{ background: '#1E2230', color: '#CBD5E1' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b text-white font-bold text-[15px] tracking-tight" style={{ borderColor: '#2D3348' }}>
        ⚡ <span className="text-blue-400">Coord</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#64748B' }}>
          Navigation
        </div>
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-2.5 mx-2 px-3 py-2 rounded-md text-[13.5px] transition-colors',
                active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-[#2D3348] hover:text-slate-200'
              )}
            >
              <span className="w-4 flex items-center justify-center">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-px min-w-[18px] text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t flex items-center gap-2.5" style={{ borderColor: '#2D3348' }}>
        <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0', user.color)}>
          {user.initials}
        </div>
        <div>
          <div className="text-[13px] font-semibold text-slate-200">{user.name}</div>
          <div className="text-[11px]" style={{ color: '#64748B' }}>{user.title}</div>
        </div>
      </div>
    </aside>
  );
}
