'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { Badge } from '../components/Badge';
import { mockSlots, calDays } from '@/lib/mock-data';
import clsx from 'clsx';
import { Check, Copy, AlertTriangle } from 'lucide-react';

type Step = 1 | 2 | 3;
type MeetingType = 'Technical Demo' | 'Discovery' | 'QBR / Strategy';

interface StepIndicatorProps { current: Step }
function StepIndicator({ current }: StepIndicatorProps) {
  const steps = [
    { n: 1, label: 'Deal & Type' },
    { n: 2, label: 'Select Team' },
    { n: 3, label: 'Share Link' },
  ];
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className={clsx('flex items-center gap-2 text-[13px] font-semibold', {
            'text-blue-600': current === s.n,
            'text-emerald-600': current > s.n,
            'text-gray-400': current < s.n,
          })}>
            <div className={clsx('w-6 h-6 rounded-full border-2 flex items-center justify-center text-[12px] font-bold flex-shrink-0', {
              'bg-blue-600 border-blue-600 text-white': current === s.n,
              'bg-emerald-600 border-emerald-600 text-white': current > s.n,
              'border-current text-current': current < s.n,
            })}>
              {current > s.n ? <Check size={11} /> : s.n}
            </div>
            {s.label}
          </div>
          {i < steps.length - 1 && (
            <div className={clsx('h-0.5 w-12 mx-2 flex-shrink-0', current > s.n ? 'bg-emerald-600' : 'bg-gray-200')} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingFlow() {
  const [step, setStep] = useState<Step>(1);
  const [meetingType, setMeetingType] = useState<MeetingType>('Technical Demo');
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [vpIncluded, setVpIncluded] = useState(false);
  const [copied, setCopied] = useState(false);

  const bookingUrl = 'coord.app/book/marcus/veritas-cloud-demo-feb26';

  function handleCopy() {
    navigator.clipboard.writeText('https://' + bookingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center gap-3 px-7 h-14 bg-white border-b border-gray-200 flex-shrink-0">
        <h1 className="text-base font-bold text-gray-900 flex-1">
          {step === 3 ? 'Booking Link Ready' : 'Book a Demo'}
        </h1>
        <span className="text-[13px] text-gray-400">
          {step === 1 && 'Step 1 of 2 — Deal & Meeting Type'}
          {step === 2 && 'Step 2 of 2 — Select Internal Team'}
          {step === 3 && 'Veritas Cloud · Technical Demo · 45 min'}
        </span>
      </div>

      <div className="flex-1 p-7" style={{ maxWidth: 720 }}>
        <StepIndicator current={step} />

        {/* ─── STEP 1 ─── */}
        {step === 1 && (
          <Card>
            <CardHeader><CardTitle>Meeting Details</CardTitle></CardHeader>
            <CardBody>
              <div className="mb-4">
                <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1.5">Deal / Account</label>
                <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13.5px] text-gray-900 focus:outline-none focus:border-blue-500">
                  <option>Veritas Cloud — Mid-Market · Stage: Demo</option>
                  <option>NorthStar Ops — SMB · Stage: Discovery</option>
                  <option>Axiom Finance — Enterprise · Stage: Demo</option>
                </select>
                <p className="text-[11px] text-gray-400 mt-1">Linked to CRM — attendee context will be pulled automatically</p>
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1.5">Meeting Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Technical Demo', 'Discovery', 'QBR / Strategy'] as MeetingType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMeetingType(t)}
                      className={clsx('px-3 py-3 border-2 rounded-lg text-left transition-colors', {
                        'border-blue-600 bg-blue-50': meetingType === t,
                        'border-gray-200 hover:border-blue-300': meetingType !== t,
                      })}
                    >
                      <div className="text-[13.5px] font-bold text-gray-900">{t}</div>
                      <div className="text-[12px] text-gray-500">
                        {t === 'Technical Demo' && 'SE required'}
                        {t === 'Discovery' && 'AE only'}
                        {t === 'QBR / Strategy' && 'VP recommended'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1.5">Duration</label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-500">
                    <option>45 minutes</option>
                    <option>30 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1.5">Earliest booking</label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-500">
                    <option>24 hrs from now</option>
                    <option>48 hrs from now</option>
                    <option>As soon as possible</option>
                  </select>
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-[12px] font-bold uppercase tracking-wide text-gray-600 mb-1.5">Notes for SE (optional)</label>
                <input
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-[13.5px] focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Focus on data pipeline integrations — CTO will be attending"
                />
                <p className="text-[11px] text-gray-400 mt-1">Included in the SE's pre-call brief</p>
              </div>
            </CardBody>
          </Card>
        )}

        {/* ─── STEP 2 ─── */}
        {step === 2 && (
          <>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Internal Attendees</CardTitle>
                <span className="text-[11px] text-gray-500">Only showing times when all selected people are free</span>
              </CardHeader>
              <CardBody>
                {/* AE – always included */}
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Required</p>
                <div className="flex items-center gap-3 px-3.5 py-3 border-2 border-emerald-200 bg-emerald-50 rounded-lg mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0">M</div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-bold text-gray-900">Marcus Chen <span className="text-[11px] text-emerald-600">· You</span></div>
                    <div className="text-[12px] text-gray-500">Account Executive · Always included</div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center"><Check size={10} className="text-white" /></div>
                </div>

                {/* SE */}
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-4 mb-2">Sales Engineer <span className="text-red-500">*</span></p>
                <div className="flex items-center gap-3 px-3.5 py-3 border-2 border-blue-600 bg-blue-50 rounded-lg mb-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0">P</div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-bold text-gray-900">Priya Sharma</div>
                    <div className="text-[12px] text-gray-500">Sales Engineer — handles this segment</div>
                    <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">✓ 8 open slots next 5 days</div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center"><Check size={10} className="text-white" /></div>
                </div>

                {/* VP – optional */}
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-4 mb-2">Optional — VP / Leadership</p>
                <button
                  onClick={() => setVpIncluded(!vpIncluded)}
                  className={clsx('w-full flex items-center gap-3 px-3.5 py-3 border-2 rounded-lg transition-colors text-left', {
                    'border-blue-600 bg-blue-50': vpIncluded,
                    'border-gray-200 hover:border-blue-200': !vpIncluded,
                  })}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0">R</div>
                  <div className="flex-1">
                    <div className="text-[13.5px] font-bold text-gray-900">Rachel Kim</div>
                    <div className="text-[12px] text-gray-500">VP Sales — strategic accounts</div>
                    <div className="text-[11px] text-amber-600 font-semibold mt-0.5">⚠ Only 2 slots available next 5 days</div>
                  </div>
                  <div className={clsx('w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0', {
                    'bg-blue-600 border-blue-600': vpIncluded,
                    'border-gray-300': !vpIncluded,
                  })}>
                    {vpIncluded && <Check size={10} className="text-white" />}
                  </div>
                </button>
              </CardBody>
            </Card>

            {/* Available windows */}
            <Card>
              <CardHeader>
                <CardTitle>Available Windows</CardTitle>
                <span className="text-[11px] text-gray-500">Based on all selected attendees · next 5 business days</span>
              </CardHeader>
              <CardBody>
                {/* Day strip */}
                <div className="flex gap-1.5 mb-4">
                  {calDays.map((d, i) => (
                    <button
                      key={d.num}
                      onClick={() => setSelectedDay(i)}
                      className={clsx('flex-1 text-center py-2 px-1 rounded-lg border-2 transition-colors', {
                        'bg-blue-600 border-blue-600 text-white': selectedDay === i,
                        'border-gray-200 hover:border-blue-200': selectedDay !== i,
                      })}
                    >
                      <div className={clsx('text-[10px] uppercase font-bold tracking-wide', selectedDay === i ? 'text-blue-200' : 'text-gray-400')}>{d.name}</div>
                      <div className={clsx('text-[18px] font-extrabold', selectedDay === i ? 'text-white' : 'text-gray-900')}>{d.num}</div>
                    </button>
                  ))}
                </div>

                {/* Slot grid */}
                <div className="grid grid-cols-4 gap-2">
                  {mockSlots.map((s) => (
                    <button
                      key={s.time}
                      disabled={s.taken}
                      onClick={() => !s.taken && setSelectedSlot(s.time)}
                      className={clsx('py-2 text-center border-2 rounded-lg text-[13px] font-semibold transition-colors', {
                        'bg-blue-600 border-blue-600 text-white': selectedSlot === s.time,
                        'bg-gray-100 border-gray-200 text-gray-300 line-through cursor-not-allowed': s.taken,
                        'border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50': !s.taken && selectedSlot !== s.time,
                      })}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>

                <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11.5px] text-amber-800 flex gap-1.5">
                  💡 Greyed-out slots are blocked for one or more attendees. The buyer will only see the white slots.
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* ─── STEP 3 ─── */}
        {step === 3 && (
          <>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-emerald-600">✓ Link generated</CardTitle>
              </CardHeader>
              <CardBody>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Booking Link</p>
                <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 mb-4">
                  <span className="text-[13px] text-blue-600 font-mono flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{bookingUrl}</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-200 text-[12px] font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">What this link does</p>
                <div className="flex flex-col gap-2 mb-4">
                  {[
                    ['📅', 'Shows only times when Marcus + Priya are both free'],
                    ['✉️', 'Sends calendar invites to all parties once booked'],
                    ['👥', 'Allows buyer to add their own colleagues on confirmation'],
                    ['📋', 'Logs activity in CRM automatically (P2)'],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-2.5 px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[13.5px] text-gray-700">
                      <span className="text-base">{icon}</span>{text}
                    </div>
                  ))}
                </div>

                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Share via</p>
                <div className="flex gap-2">
                  {['📧 Email', '💬 Slack', '🔗 CRM Activity'].map((label) => (
                    <button key={label} className="px-3 py-1.5 border border-gray-200 rounded-lg text-[12px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                      {label}
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Attendee summary */}
            <Card>
              <CardHeader><CardTitle>Attendee Summary</CardTitle></CardHeader>
              <CardBody>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Your Team</p>
                    <div className="flex flex-col gap-2">
                      {[
                        { init: 'M', name: 'Marcus Chen', role: 'Account Executive', color: 'bg-blue-600', badge: <Badge variant="blue">You</Badge> },
                        { init: 'P', name: 'Priya Sharma', role: 'Sales Engineer', color: 'bg-purple-600', badge: <Badge variant="purple">SE</Badge> },
                      ].map((a) => (
                        <div key={a.name} className="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 ${a.color}`}>{a.init}</div>
                          <div className="flex-1">
                            <div className="text-[13px] font-bold text-gray-900">{a.name}</div>
                            <div className="text-[11px] text-gray-500">{a.role}</div>
                          </div>
                          {a.badge}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Buyer Side</p>
                    <div className="px-3 py-3 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-[13px] text-gray-400">
                      Awaiting buyer to confirm &amp; add colleagues
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Nav buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {step === 1 && (
            <>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </Link>
              <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold transition-colors">
                Next: Select Team →
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button onClick={() => setStep(3)} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-semibold transition-colors">
                Generate Booking Link →
              </button>
            </>
          )}
          {step === 3 && (
            <Link href="/dashboard" className="px-4 py-2 rounded-lg border border-gray-200 text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              ← Back to Dashboard
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
