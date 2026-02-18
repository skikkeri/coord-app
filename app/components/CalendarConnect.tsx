'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Calendar, LogOut, RefreshCw } from 'lucide-react';

export function CalendarConnect() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 text-[12px]">
        <RefreshCw size={13} className="animate-spin" /> Connecting…
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-green-700 text-[12px] font-semibold">
          <Calendar size={13} />
          <span>Google Calendar connected</span>
          <span className="text-green-500 text-[10px]">({session.user?.email})</span>
        </div>
        <button
          onClick={() => signOut()}
          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          title="Disconnect"
        >
          <LogOut size={13} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold transition-colors"
    >
      <Calendar size={13} />
      Connect Google Calendar
    </button>
  );
}
