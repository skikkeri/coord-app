import Link from 'next/link';
import { mockMeetings } from '@/lib/mock-data';
import { Badge } from '../components/Badge';
import { Card, CardHeader, CardTitle } from '../components/Card';
import { CalendarConnect } from '../components/CalendarConnect';
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

const dotColor = {
  confirmed: 'bg-blue-600',
  pending: 'bg-amber-500',
  draft: 'bg-gray-400',
};

export default function DashboardPage() {
  return (
    <>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-7 h-14 bg-white border-b border-gray-200 flex-shrink-0">
        <h1 className="text-base font-bold text-gray-900 flex-1">Dashboard</h1>
        <span className="text-[13px] text-gray-400">Wed 18 Feb, 2026</span>
        <CalendarConnect />
        <Link href="/book" className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold transition-colors">
          + Book a Demo
        </Link>
      </div>

      <div className="flex-1 p-7">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3.5 mb-5">
          {[
            { label: 'Meetings this week', value: '7', delta: '↑ 2 vs last week', up: true },
            { label: 'Awaiting confirmation', value: '3', delta: "Buyer hasn't picked yet", up: false },
            { label: 'Active deals', value: '18', delta: '↑ 1 new this week', up: true },
            { label: 'Avg. booking time', value: '4m', delta: '↓ from 42m manually', up: true },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{s.label}</div>
              <div className="text-[28px] font-extrabold text-gray-900 my-1 leading-none">{s.value}</div>
              <div className={`text-[12px] ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Meetings table */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <Badge variant="blue">7 scheduled</Badge>
            <button className="text-[12px] px-3 py-1 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">Filter</button>
          </CardHeader>
          <div>
            {mockMeetings.map((m) => (
              <Link
                href={m.status === 'draft' ? '/book' : '#'}
                key={m.id}
                className="flex items-center gap-3.5 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor[m.status]}`} />
                <div className="font-semibold text-[13.5px] text-gray-900 min-w-[160px]">{m.deal}</div>
                <div className="text-[12px] text-gray-500 min-w-[110px]">{m.type}</div>
                <div className="text-[12px] text-gray-700 min-w-[170px]">{m.date}</div>
                <div className="flex items-center gap-1.5 text-[12px] text-gray-700 min-w-[110px]">
                  {m.se ? (
                    <>
                      <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white">P</div>
                      {m.se}
                    </>
                  ) : (
                    <span className="flex items-center gap-1 text-red-500 font-semibold text-[12px]">
                      <AlertTriangle size={12} /> No SE yet
                    </span>
                  )}
                </div>
                <div className="text-[12px] text-gray-500 min-w-[80px]">{m.attendees} attendees</div>
                <div className="ml-auto">
                  <Badge variant={statusVariant[m.status]}>{statusLabel[m.status]}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Annotation */}
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11.5px] text-amber-800 flex gap-1.5">
          💡 Deals without an SE or without buyer confirmation are flagged automatically. Marcus can see at a glance what needs attention.
        </div>
      </div>
    </>
  );
}
