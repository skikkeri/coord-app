'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardBody } from '@/app/components/Card';
import { CalendarConnect } from '@/app/components/CalendarConnect';
import clsx from 'clsx';

const HOURS = ['9–10 AM', '10–11 AM', '11–12 PM', '12–1 PM', '1–2 PM', '2–3 PM', '3–4 PM', '4–5 PM'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

// Initial grid: on=purple, blocked=red, off=gray
// Row indices 0-7 (hours), Col indices 0-4 (days)
const initialGrid: ('on' | 'off' | 'blocked')[][] = [
  ['off', 'off', 'off', 'off', 'off'],   // 9-10
  ['on',  'on',  'on',  'off', 'off'],   // 10-11
  ['on',  'on',  'on',  'off', 'off'],   // 11-12
  ['blocked','blocked','blocked','blocked','blocked'], // 12-1 (lunch)
  ['on',  'on',  'on',  'on',  'off'],   // 1-2
  ['on',  'on',  'on',  'on',  'off'],   // 2-3
  ['on',  'on',  'off', 'off', 'off'],   // 3-4
  ['off', 'off', 'off', 'off', 'off'],   // 4-5
];

export default function SEAvailabilityPage() {
  const [grid, setGrid] = useState(initialGrid);
  const [saved, setSaved] = useState(false);

  function toggle(row: number, col: number) {
    if (grid[row][col] === 'blocked') return;
    setGrid(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = next[row][col] === 'on' ? 'off' : 'on';
      return next;
    });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <div className="flex items-center gap-3 px-7 h-14 bg-white border-b border-gray-200 flex-shrink-0">
        <h1 className="text-base font-bold text-gray-900 flex-1">My Availability</h1>
        <span className="text-[13px] text-gray-400">Control when AEs can book you for demos</span>
        <CalendarConnect />
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[13px] font-semibold transition-colors"
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="flex-1 p-7">
        <div className="grid grid-cols-2 gap-5">
          {/* Left: grid */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle>Bookable Windows</CardTitle></CardHeader>
              <CardBody>
                <p className="text-[11px] text-gray-400 mb-3">Click cells to toggle availability. Purple = open for bookings.</p>

                {/* Grid */}
                <div className="grid gap-1" style={{ gridTemplateColumns: '72px repeat(5, 1fr)' }}>
                  <div /> {/* empty corner */}
                  {DAYS.map(d => (
                    <div key={d} className="text-[11px] font-bold uppercase tracking-wide text-center text-gray-500 py-1">{d}</div>
                  ))}
                  {HOURS.map((h, row) => (
                    <>
                      <div key={h} className="text-[11px] text-gray-400 self-center pr-1">{h}</div>
                      {DAYS.map((_, col) => (
                        <div
                          key={`${row}-${col}`}
                          onClick={() => toggle(row, col)}
                          className={clsx('h-7 rounded cursor-pointer transition-colors border', {
                            'bg-purple-600 border-purple-600': grid[row][col] === 'on',
                            'bg-red-100 border-red-200 cursor-not-allowed': grid[row][col] === 'blocked',
                            'bg-gray-100 border-gray-200 hover:bg-blue-100': grid[row][col] === 'off',
                          })}
                        />
                      ))}
                    </>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex gap-4 mt-3 text-[12px]">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-purple-600" /> Open for demos</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-red-100 border border-red-200" /> Blocked</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" /> Not available</div>
                </div>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11.5px] text-amber-800 flex gap-1.5">
                  💡 Blocked slots are pulled from your Google Calendar. AEs cannot book you during these times.
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right: rules + notifications */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle>Booking Rules</CardTitle></CardHeader>
              <CardBody className="flex flex-col gap-4">
                {[
                  { label: 'Minimum notice required', hint: "AEs can't book you with less notice than this", options: ['24 hours', '48 hours', '72 hours'] },
                  { label: 'Prep time buffer', hint: 'Automatically blocked in your calendar as "Prep — [Client]"', options: ['30 minutes before each demo', '15 minutes before each demo', '45 minutes before each demo'] },
                  { label: 'Max demos per day', hint: '', options: ['3 demos / day', '2 demos / day', '4 demos / day'] },
                ].map((r) => (
                  <div key={r.label}>
                    <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1.5">{r.label}</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-purple-500">
                      {r.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                    {r.hint && <p className="text-[11px] text-gray-400 mt-1">{r.hint}</p>}
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
              <CardBody className="flex flex-col gap-4">
                {[
                  { label: 'New booking confirmed', sub: 'Instant email + Slack DM', on: true },
                  { label: 'Pre-call brief ready', sub: '24 hrs before each demo', on: true },
                  { label: 'Reschedule requests', sub: 'When buyer reschedules', on: false },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-[13px] font-bold text-gray-900">{n.label}</div>
                      <div className="text-[11px] text-gray-500">{n.sub}</div>
                    </div>
                    <div className={clsx('relative w-9 h-5 rounded-full cursor-pointer transition-colors', n.on ? 'bg-purple-600' : 'bg-gray-200')}>
                      <div className={clsx('absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', n.on ? 'translate-x-4' : 'translate-x-0.5')} />
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
