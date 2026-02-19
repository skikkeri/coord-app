'use client';
import Link from 'next/link';
import { mockMeetings } from '@/lib/mock-data';
import { Badge } from '../components/Badge';
import { Card, CardHeader, CardTitle } from '../components/Card';
import { CalendarConnect } from '../components/CalendarConnect';
import { Text, Button, StackLayout, FlowLayout } from '@salt-ds/core';
import { AlertTriangle } from 'lucide-react';

const statusVariant = {
  confirmed: 'green' as const,
  pending: 'amber' as const,
  draft: 'gray' as const,
};

const statusLabel = {
  confirmed: '✓ Confirmed',
  pending: '⏳ Link sent',
  draft: 'Draft',
};

const dotColor: Record<string, string> = {
  confirmed: '#2563EB',
  pending: '#F59E0B',
  draft: '#94A3B8',
};

export default function DashboardPage() {
  return (
    <>
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-7 h-14 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}
      >
        <Text styleAs="h4" style={{ margin: 0, fontWeight: 700, flex: 1 }}>Dashboard</Text>
        <Text style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>Wed 18 Feb, 2026</Text>
        <CalendarConnect />
        <Link href="/book" style={{ textDecoration: 'none' }}>
          <Button appearance="solid" sentiment="accented" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            + Book a Demo
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-7">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3.5 mb-5">
          {[
            { label: 'Meetings this week', value: '7', delta: '↑ 2 vs last week', positive: true },
            { label: 'Awaiting confirmation', value: '3', delta: "Buyer hasn't picked yet", positive: false },
            { label: 'Active deals', value: '18', delta: '↑ 1 new this week', positive: true },
            { label: 'Avg. booking time', value: '4m', delta: '↓ from 42m manually', positive: true },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: '#fff',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                padding: 16,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#64748B', margin: 0 }}>
                {s.label}
              </Text>
              <Text style={{ fontSize: 28, fontWeight: 800, color: '#1A1D23', lineHeight: 1.1, margin: '4px 0' }}>
                {s.value}
              </Text>
              <Text style={{ fontSize: 12, color: s.positive ? '#16A34A' : '#DC2626', margin: 0 }}>
                {s.delta}
              </Text>
            </div>
          ))}
        </div>

        {/* Meetings table */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <Badge variant="blue">7 scheduled</Badge>
            <Button appearance="bordered" sentiment="neutral" style={{ fontSize: 12, padding: '3px 10px' }}>
              Filter
            </Button>
          </CardHeader>
          <div>
            {mockMeetings.map((m) => (
              <Link
                href={m.status === 'draft' ? '/book' : '#'}
                key={m.id}
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="flex items-center gap-3.5 px-4 py-3 transition-colors cursor-pointer"
                  style={{ borderBottom: '1px solid #F8FAFC' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: dotColor[m.status] }}
                  />
                  <Text style={{ fontWeight: 600, fontSize: 13.5, color: '#1A1D23', margin: 0, minWidth: 160 }}>{m.deal}</Text>
                  <Text style={{ fontSize: 12, color: '#64748B', margin: 0, minWidth: 110 }}>{m.type}</Text>
                  <Text style={{ fontSize: 12, color: '#374151', margin: 0, minWidth: 170 }}>{m.date}</Text>
                  <div className="flex items-center gap-1.5 min-w-[110px]">
                    {m.se ? (
                      <>
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                          style={{ background: '#7C3AED', fontSize: 10 }}
                        >P</div>
                        <Text style={{ fontSize: 12, color: '#374151', margin: 0 }}>{m.se}</Text>
                      </>
                    ) : (
                      <Text style={{ fontSize: 12, color: '#DC2626', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertTriangle size={12} /> No SE yet
                      </Text>
                    )}
                  </div>
                  <Text style={{ fontSize: 12, color: '#64748B', margin: 0, minWidth: 80 }}>{m.attendees} attendees</Text>
                  <div className="ml-auto">
                    <Badge variant={statusVariant[m.status as keyof typeof statusVariant]}>{statusLabel[m.status as keyof typeof statusLabel]}</Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Annotation */}
        <div
          className="mt-4 flex gap-1.5 px-3 py-2 rounded-lg"
          style={{ background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: 11.5, color: '#92400E' }}
        >
          💡 Deals without an SE or without buyer confirmation are flagged automatically. Marcus can see at a glance what needs attention.
        </div>
      </div>
    </>
  );
}
