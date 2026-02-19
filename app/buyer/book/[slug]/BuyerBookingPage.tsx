'use client';
import { useState } from 'react';
import { calDays } from '@/lib/mock-data';
import clsx from 'clsx';
import { Check, X, Loader2, AlertCircle } from 'lucide-react';

const buyerSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '3:30 PM', '4:00 PM'];

// Maps display time strings to hour offsets for building ISO datetimes
const slotHours: Record<string, { h: number; m: number }> = {
  '10:00 AM': { h: 10, m: 0 },
  '11:00 AM': { h: 11, m: 0 },
  '2:00 PM':  { h: 14, m: 0 },
  '3:00 PM':  { h: 15, m: 0 },
  '3:30 PM':  { h: 15, m: 30 },
  '4:00 PM':  { h: 16, m: 0 },
};

// calDays are Feb 23-27 2026
const dayDates = [23, 24, 25, 26, 27];

interface Colleague { email: string }

export default function BuyerBookingPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1); // Tue 24
  const [selectedSlot, setSelectedSlot] = useState('2:00 PM');

  // Controlled form fields
  const [buyerName, setBuyerName] = useState('Derek Thompson');
  const [buyerEmail, setBuyerEmail] = useState('derek@northstarops.com');
  const [buyerCompany, setBuyerCompany] = useState('NorthStar Ops');
  const [notes, setNotes] = useState('');

  // Colleague management (post-confirmation)
  const [colleagueEmail, setColleagueEmail] = useState('');
  const [colleagues, setColleagues] = useState<Colleague[]>([]);

  // Async state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [meetLink, setMeetLink] = useState('');

  function addColleague() {
    if (colleagueEmail && colleagueEmail.includes('@')) {
      setColleagues(prev => [...prev, { email: colleagueEmail }]);
      setColleagueEmail('');
    }
  }

  function removeColleague(idx: number) {
    setColleagues(prev => prev.filter((_, i) => i !== idx));
  }

  async function handleConfirm() {
    setLoading(true);
    setError('');

    // Build ISO datetimes for the selected day + slot
    const { h, m } = slotHours[selectedSlot];
    const day = dayDates[selectedDay];
    const start = new Date(Date.UTC(2026, 1, day, h, m, 0));   // month is 0-indexed: 1=Feb
    const end   = new Date(Date.UTC(2026, 1, day, h, m + 45, 0)); // 45-min meeting

    const description = [
      `Booked by: ${buyerName} <${buyerEmail}> — ${buyerCompany}`,
      notes ? `Notes: ${notes}` : '',
      '',
      'Attendees (vendor side):',
      '• Marcus Chen — Account Executive',
      '• Priya Sharma — Sales Engineer',
    ].filter(Boolean).join('\n');

    try {
      const res = await fetch('/api/calendar/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: `Technical Demo — ${buyerCompany} × Veritas Cloud`,
          description,
          startDateTime: start.toISOString(),
          endDateTime:   end.toISOString(),
          attendees: [
            { email: buyerEmail },
            { email: 'marcus@veritascloud.com' },
            { email: 'priya@veritascloud.com' },
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Failed to create calendar event. Are you signed in with Google Calendar?');
        setLoading(false);
        return;
      }

      setMeetLink(data.link ?? '');
      setConfirmed(true);
    } catch (e: any) {
      setError(e.message ?? 'Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (confirmed) {
    const day = calDays[selectedDay];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#F8FAFC' }}>
        {/* Topbar */}
        <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-3.5">
          <div className="text-[16px] font-extrabold text-gray-900">⚡ <span className="text-emerald-600">Coord</span></div>
          <div className="flex-1" />
          <div className="text-[12px] text-gray-400">Powered by Coord · Secure booking</div>
        </div>

        {/* Body */}
        <div className="flex-1 flex items-start justify-center p-8">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-2xl overflow-hidden shadow-sm">
            {/* Confirmation hero */}
            <div className="text-center px-7 py-7 border-b border-emerald-100" style={{ background: 'linear-gradient(135deg, #ECFDF5, #F0FDF4)' }}>
              <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">✓</div>
              <div className="text-[20px] font-extrabold text-emerald-900">You're booked!</div>
              <div className="text-[14px] text-emerald-600 mt-1">A calendar invite has been sent to {buyerEmail}</div>
            </div>

            <div className="p-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Meeting Details</p>
              <div className="flex items-center gap-2.5 px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg mb-2 text-[13.5px] text-gray-700">
                <span className="text-base">📅</span>
                <div><strong>{day.name} {day.num} Feb 2026</strong> · {selectedSlot} – 45 min (GMT)</div>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg mb-2 text-[13.5px] text-gray-700">
                <span className="text-base">🖥️</span>
                <div>
                  Google Meet ·{' '}
                  {meetLink
                    ? <a href={meetLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open meeting link</a>
                    : 'Link in your calendar invite'}
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg mb-2 text-[13.5px] text-gray-700">
                <span className="text-base">⏱️</span>
                <div>45 minutes · Technical Demo · {buyerCompany}</div>
              </div>

              <hr className="my-4 border-gray-100" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Who you'll meet</p>
              <div className="flex flex-col gap-2 mb-4">
                {[
                  { init: 'M', name: 'Marcus Chen', role: 'Account Executive · Will walk you through the platform', color: 'bg-blue-600' },
                  { init: 'P', name: 'Priya Sharma', role: 'Sales Engineer · Will handle all technical questions', color: 'bg-purple-600' },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ${a.color}`}>{a.init}</div>
                    <div><div className="text-[13px] font-bold text-gray-900">{a.name}</div><div className="text-[11px] text-gray-500">{a.role}</div></div>
                  </div>
                ))}
              </div>

              {/* Add colleagues */}
              <div className="bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4">
                <div className="text-[14px] font-bold text-blue-800 mb-1">👥 Bring your team</div>
                <div className="text-[12px] text-blue-600 mb-3">Add colleagues — they'll get their own calendar invite.</div>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="email"
                    value={colleagueEmail}
                    onChange={e => setColleagueEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addColleague()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-500"
                    placeholder="colleague@company.com"
                  />
                  <button onClick={addColleague} className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-semibold transition-colors">
                    Add
                  </button>
                </div>
                {colleagues.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[12px] text-gray-400">Added:</span>
                    {colleagues.map((c, i) => (
                      <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold">
                        {c.email}
                        <button onClick={() => removeColleague(i)} className="text-blue-400 hover:text-blue-700">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11.5px] text-amber-800 flex gap-1.5">
                💡 Each colleague receives a personalised invite — no vendor involvement needed.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F8FAFC' }}>
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-7 h-14 flex items-center gap-3.5">
        <div className="text-[16px] font-extrabold text-gray-900">⚡ <span className="text-emerald-600">Coord</span></div>
        <div className="flex-1" />
        <div className="text-[12px] text-gray-400">Powered by Coord · Secure booking</div>
      </div>

      {/* Body */}
      <div className="flex-1 flex items-start justify-center p-8">
        <div className="bg-white border border-gray-200 rounded-xl w-full max-w-3xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-7 py-6 text-white" style={{ background: '#059669' }}>
            <h2 className="text-[20px] font-extrabold mb-1">Book a Demo with Veritas Cloud Team</h2>
            <p className="text-[13px] opacity-85">Technical Demo · 45 minutes · Google Meet</p>
            <div className="flex gap-2.5 mt-3.5">
              {[
                { init: 'M', name: 'Marcus Chen', role: 'Account Executive', color: 'bg-blue-500' },
                { init: 'P', name: 'Priya Sharma', role: 'Sales Engineer', color: 'bg-purple-600' },
              ].map((a) => (
                <div key={a.name} className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1" style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)' }}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ${a.color}`}>{a.init}</div>
                  <div>
                    <div className="text-[13px] font-bold text-white">{a.name}</div>
                    <div className="text-[11px]" style={{ color: 'rgba(255,255,255,.7)' }}>{a.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-7">
              {/* Left: calendar + slots */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Select a date</p>
                <div className="flex gap-1.5 mb-5">
                  {calDays.map((d, i) => (
                    <button
                      key={d.num}
                      onClick={() => setSelectedDay(i)}
                      className={clsx('flex-1 text-center py-2 px-1 rounded-lg border-2 transition-colors', {
                        'bg-emerald-600 border-emerald-600 text-white': selectedDay === i,
                        'border-gray-200 hover:border-emerald-300': selectedDay !== i,
                      })}
                    >
                      <div className={clsx('text-[10px] uppercase font-bold tracking-wide', selectedDay === i ? 'text-emerald-200' : 'text-gray-400')}>{d.name}</div>
                      <div className={clsx('text-[18px] font-extrabold', selectedDay === i ? 'text-white' : 'text-gray-900')}>{d.num}</div>
                    </button>
                  ))}
                </div>

                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Available times — {calDays[selectedDay].name} {calDays[selectedDay].num} Feb</p>
                <div className="grid grid-cols-3 gap-2">
                  {buyerSlots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className={clsx('py-2 text-center border-2 rounded-lg text-[13px] font-semibold transition-colors', {
                        'bg-emerald-600 border-emerald-600 text-white': selectedSlot === s,
                        'border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50': selectedSlot !== s,
                      })}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11.5px] text-amber-800 flex gap-1.5">
                  💡 All times shown are when both Marcus and Priya are free — no back-and-forth needed.
                </div>
              </div>

              {/* Right: form */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Your details</p>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={e => setBuyerName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-gray-50 text-gray-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1">Work email</label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={e => setBuyerEmail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-gray-50 text-gray-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1">Company</label>
                    <input
                      type="text"
                      value={buyerCompany}
                      onChange={e => setBuyerCompany(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-gray-50 text-gray-700 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1">Anything to prepare? (optional)</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. We'll have our IT lead joining"
                    />
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-700">
                      <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleConfirm}
                    disabled={loading || !buyerEmail || !buyerName}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-bold transition-colors mt-1"
                  >
                    {loading
                      ? <><Loader2 size={16} className="animate-spin" /> Creating event…</>
                      : <><Check size={16} /> Confirm — {calDays[selectedDay].name} {calDays[selectedDay].num} Feb at {selectedSlot} →</>
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
