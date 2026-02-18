import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/app/components/Card';
import { Badge } from '@/app/components/Badge';

const demos = [
  { month: 'FEB', day: 23, company: 'Veritas Cloud', ae: 'Marcus Chen', type: 'Technical Demo', time: '2:00 PM – 2:45 PM', attendees: 4, briefReady: true, status: 'confirmed' as const },
  { month: 'FEB', day: 24, company: 'NorthStar Ops', ae: 'Marcus Chen', type: 'Discovery', time: '11:00 AM – 11:45 AM', attendees: 3, briefReady: true, status: 'pending' as const },
  { month: 'FEB', day: 25, company: 'Luminary SaaS', ae: 'Sarah Osei', type: 'QBR', time: '10:00 AM – 11:00 AM', attendees: 6, briefReady: true, status: 'confirmed' as const },
  { month: 'FEB', day: 27, company: 'Creston Media', ae: 'Marcus Chen', type: 'Technical Demo', time: '1:00 PM – 1:45 PM', attendees: 2, briefReady: false, status: 'pending' as const },
];

export default function SEDemosPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-7 h-14 bg-white border-b border-gray-200 flex-shrink-0">
        <h1 className="text-base font-bold text-gray-900 flex-1">My Upcoming Demos</h1>
        <span className="text-[13px] text-gray-400">4 demos in the next 7 days</span>
        <Link href="/se/availability" className="px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
          Edit Availability
        </Link>
      </div>

      <div className="flex-1 p-7">
        <div className="grid grid-cols-2 gap-5">
          {/* Demo list */}
          <Card>
            <CardHeader><CardTitle>This Week</CardTitle></CardHeader>
            <div>
              {demos.map((d, i) => (
                <div key={i} className="flex gap-3.5 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="text-center min-w-[44px] flex-shrink-0">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{d.month}</div>
                    <div className="text-[24px] font-extrabold text-gray-900 leading-none">{d.day}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[14px] font-bold text-gray-900">{d.company}</div>
                    <div className="text-[12px] text-gray-500">Booked by {d.ae} · {d.type}</div>
                    <div className="text-[12px] text-gray-700 mt-0.5">{d.time} · {d.attendees} attendees</div>
                    {d.briefReady ? (
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700">
                        📋 Brief ready
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                        ⏳ Brief pending
                      </span>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant={d.status === 'confirmed' ? 'green' : 'amber'}>
                      {d.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle>This Week at a Glance</CardTitle></CardHeader>
              <div className="p-4 grid grid-cols-2 gap-2.5">
                {[
                  { label: 'Demos booked', value: '4', color: 'text-gray-900' },
                  { label: 'Avg lead time', value: '31h', color: 'text-emerald-600' },
                  { label: 'Briefs sent', value: '3', color: 'text-gray-900' },
                  { label: 'Prep blocks', value: '4', color: 'text-gray-900' },
                ].map((s) => (
                  <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{s.label}</div>
                    <div className={`text-[22px] font-extrabold ${s.color} mt-1 leading-none`}>{s.value}</div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11.5px] text-amber-800 flex gap-1.5">
              💡 Priya can see her entire week, with lead time, brief status, and confirmation status — all without chasing the AE on Slack.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
