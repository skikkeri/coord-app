'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Spinner, Tooltip } from '@salt-ds/core';
import { Calendar, LogOut } from 'lucide-react';

export function CalendarConnect() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: '#F1F5F9', color: '#64748B', fontSize: 12 }}>
        <Spinner size="small" aria-label="Connecting" />
        <span>Connecting…</span>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', fontSize: 12, fontWeight: 600 }}
        >
          <Calendar size={13} />
          <span>Google Calendar connected</span>
          <span style={{ color: '#4ADE80', fontSize: 10 }}>({session.user?.email})</span>
        </div>
        <Tooltip content="Disconnect Google Calendar" placement="bottom">
          <Button
            appearance="transparent"
            sentiment="neutral"
            onClick={() => signOut()}
            aria-label="Disconnect"
            style={{ padding: '4px 6px', minWidth: 0 }}
          >
            <LogOut size={13} />
          </Button>
        </Tooltip>
      </div>
    );
  }

  return (
    <Button
      appearance="solid"
      sentiment="accented"
      onClick={() => signIn('google')}
      style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
    >
      <Calendar size={13} />
      Connect Google Calendar
    </Button>
  );
}
