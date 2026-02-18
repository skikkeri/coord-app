'use client';
import { useState } from 'react';
import { calDays } from '@/lib/mock-data';
import clsx from 'clsx';
import { Check, X } from 'lucide-react';

const buyerSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '3:30 PM', '4:00 PM'];

interface Colleague { email: string }

export default function BuyerBookingPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1); // Tue
  const [selectedSlot, setSelectedSlot] = useState('2:00 PM');
  const [email, setEmail] = useState('');
  const [colleagues, setColleagues] = useState<Colleague[]>([
    { email: 'sarah.it@northstarops.com' }
  ]);

  function addColleague() {
    if (email && email.includes('@')) {
      setColleagues(prev => [...prev, { email }]);
      setEmail('');
    }
  }

  function removeColleague(idx: number) {
    setColleagues(prev => prev.filter((_, i) => i !== idx));
  }

  if (confirmed) {
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
              <div className="text-[14px] text-emerald-600 mt-1">A calendar invite has been sent to derek@northstarops.com</div>
            </div>

            <div className="p-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Meeting Details</p>
              {[
                ['📅', <><strong>Tuesday, 24 February 2026</strong> · 2:00 PM – 2:45 PM (GMT)</>],
                ['🖥️', 'Google Meet · Link in your calendar invite'],
                ['⏱️', '45 minutes · Technical Demo'],
              ].map(([icon, text], i) => (
                <div key={i} className="flex items-center gap-2.5 px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg mb-2 text-[13.5px] text-gray-700">
                  <span className="text-base">{icon}</span><div>{text}</div>
                </div>
              ))}

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
                <div className="text-[12px] text-blue-600 mb-3">Add colleagues — they'll get their own invite with an agenda and context on who's attending from our side.</div>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                💡 Each colleague receives a personalised invite — no vendor involvement needed. Derek handles his own team.
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
                  {[
                    { label: 'Name', value: 'Derek Thompson', type: 'text' },
                    { label: 'Work email', value: 'derek@northstarops.com', type: 'email' },
                    { label: 'Company', value: 'NorthStar Ops', type: 'text' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        defaultValue={f.value}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13.5px] bg-gray-50 text-gray-700 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1">Anything to prepare? (optional)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-emerald-500"
                      placeholder="e.g. We'll have our IT lead joining"
                    />
                  </div>

                  <button
                    onClick={() => setConfirmed(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-bold transition-colors mt-1"
                  >
                    <Check size={16} />
                    Confirm — {calDays[selectedDay].name} {calDays[selectedDay].num} Feb at {selectedSlot} →
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
