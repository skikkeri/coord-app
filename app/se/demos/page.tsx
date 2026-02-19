'use client';
import Link from 'next/link';
import { Text, Button } from '@salt-ds/core';
import { Card, CardHeader, CardTitle } from '@/app/components/Card';
import { Badge } from '@/app/components/Badge';
import { useMobileMenu } from '@/app/components/MobileMenuContext';
import { Menu } from 'lucide-react';

const demos = [
  { month: 'FEB', day: 23, company: 'Veritas Cloud', ae: 'Marcus Chen', type: 'Technical Demo', time: '2:00 PM – 2:45 PM', attendees: 4, briefReady: true, status: 'confirmed' as const },
  { month: 'FEB', day: 24, company: 'NorthStar Ops', ae: 'Marcus Chen', type: 'Discovery', time: '11:00 AM – 11:45 AM', attendees: 3, briefReady: true, status: 'pending' as const },
  { month: 'FEB', day: 25, company: 'Luminary SaaS', ae: 'Sarah Osei', type: 'QBR', time: '10:00 AM – 11:00 AM', attendees: 6, briefReady: true, status: 'confirmed' as const },
  { month: 'FEB', day: 27, company: 'Creston Media', ae: 'Marcus Chen', type: 'Technical Demo', time: '1:00 PM – 1:45 PM', attendees: 2, briefReady: false, status: 'pending' as const },
];

export default function SEDemosPage() {
  const { onOpen } = useMobileMenu();
  return (
    <>
      <div
        className="flex items-center gap-3 px-4 md:px-7 h-14 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}
      >
        <button
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-md -ml-1"
          style={{ color: '#64748B', background: 'transparent', border: 'none', cursor: 'pointer' }}
          onClick={onOpen}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <Text styleAs="h4" style={{ margin: 0, fontWeight: 700, flex: 1 }}>My Upcoming Demos</Text>
        <Text className="hidden sm:block" style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>4 demos in the next 7 days</Text>
        <Link href="/se/availability" style={{ textDecoration: 'none' }}>
          <Button appearance="bordered" sentiment="neutral" style={{ fontSize: 13 }}>
            Edit Availability
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-4 md:p-7">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card>
            <CardHeader><CardTitle>This Week</CardTitle></CardHeader>
            <div>
              {demos.map((d, i) => (
                <div
                  key={i}
                  className="flex gap-3.5 px-4 py-3.5 transition-colors"
                  style={{ borderBottom: i < demos.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                >
                  <div className="text-center flex-shrink-0" style={{ minWidth: 44 }}>
                    <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', margin: 0 }}>{d.month}</Text>
                    <Text style={{ fontSize: 24, fontWeight: 800, color: '#1A1D23', lineHeight: 1, margin: 0 }}>{d.day}</Text>
                  </div>
                  <div className="flex-1">
                    <Text style={{ fontSize: 14, fontWeight: 700, color: '#1A1D23', margin: 0 }}>{d.company}</Text>
                    <Text style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Booked by {d.ae} · {d.type}</Text>
                    <Text style={{ fontSize: 12, color: '#374151', margin: '2px 0 0' }}>{d.time} · {d.attendees} attendees</Text>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        marginTop: 4,
                        padding: '2px 8px',
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 600,
                        background: d.briefReady ? '#EDE9FE' : '#FEF3C7',
                        color: d.briefReady ? '#5B21B6' : '#92400E',
                      }}
                    >
                      {d.briefReady ? '📋 Brief ready' : '⏳ Brief pending'}
                    </span>
                  </div>
                  <div className="flex-shrink-0 pt-1">
                    <Badge variant={d.status === 'confirmed' ? 'green' : 'amber'}>
                      {d.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle>This Week at a Glance</CardTitle></CardHeader>
              <div className="p-4 grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Demos booked', value: '4', color: '#1A1D23' },
                  { label: 'Avg lead time', value: '31h', color: '#16A34A' },
                  { label: 'Briefs sent', value: '3', color: '#1A1D23' },
                  { label: 'Prep blocks', value: '4', color: '#1A1D23' },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#64748B', margin: 0 }}>{s.label}</Text>
                    <Text style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1.1, margin: '4px 0 0' }}>{s.value}</Text>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex gap-1.5 px-3 py-2 rounded-lg" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: 11.5, color: '#92400E' }}>
              💡 Priya can see her entire week, with lead time, brief status, and confirmation status — all without chasing the AE on Slack.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
