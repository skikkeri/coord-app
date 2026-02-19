'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Text, Button, Input, FormField, FormFieldLabel, FormFieldHelperText, Dropdown, Option } from '@salt-ds/core';
import { Card, CardHeader, CardTitle, CardBody } from '../components/Card';
import { Badge } from '../components/Badge';
import { useMobileMenu } from '../components/MobileMenuContext';
import { mockSlots, calDays } from '@/lib/mock-data';
import clsx from 'clsx';
import { Check, Copy, Menu } from 'lucide-react';

type Step = 1 | 2 | 3;
type MeetingType = 'Technical Demo' | 'Discovery' | 'QBR / Strategy';

// Salt-styled step indicator
function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: 'Deal & Type' },
    { n: 2, label: 'Select Team' },
    { n: 3, label: 'Share Link' },
  ];
  return (
    <div className="flex items-center gap-0 mb-6">
      {steps.map((s, i) => {
        const done = current > s.n;
        const active = current === s.n;
        return (
          <div key={s.n} className="flex items-center">
            <div className="flex items-center gap-2" style={{ fontSize: 13, fontWeight: 600, color: active ? '#2563EB' : done ? '#16A34A' : '#94A3B8' }}>
              <div
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  background: active ? '#2563EB' : done ? '#16A34A' : 'transparent',
                  borderColor: active ? '#2563EB' : done ? '#16A34A' : '#CBD5E1',
                  color: active || done ? '#fff' : '#94A3B8',
                }}
              >
                {done ? <Check size={11} /> : s.n}
              </div>
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <div style={{ height: 2, width: 32, margin: '0 4px', background: done ? '#16A34A' : '#E2E8F0', flexShrink: 0 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BookingFlow() {
  const { onOpen } = useMobileMenu();
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
        <Text styleAs="h4" style={{ margin: 0, fontWeight: 700, flex: 1 }}>
          {step === 3 ? 'Booking Link Ready' : 'Book a Demo'}
        </Text>
        <Text className="hidden sm:block" style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
          {step === 1 && 'Step 1 of 2 — Deal & Meeting Type'}
          {step === 2 && 'Step 2 of 2 — Select Internal Team'}
          {step === 3 && 'Veritas Cloud · Technical Demo · 45 min'}
        </Text>
      </div>

      <div className="flex-1 p-4 md:p-7" style={{ maxWidth: 720 }}>
        <StepIndicator current={step} />

        {/* ─── STEP 1 ─── */}
        {step === 1 && (
          <Card>
            <CardHeader><CardTitle>Meeting Details</CardTitle></CardHeader>
            <CardBody>
              {/* Deal selector */}
              <FormField labelPlacement="top" style={{ marginBottom: 16 }}>
                <FormFieldLabel>Deal / Account</FormFieldLabel>
                <select
                  className="w-full px-3 py-2.5 rounded-lg text-sm"
                  style={{ border: '1px solid #CBD5E1', fontSize: 13.5, color: '#1A1D23', outline: 'none', background: '#fff' }}
                >
                  <option>Veritas Cloud — Mid-Market · Stage: Demo</option>
                  <option>NorthStar Ops — SMB · Stage: Discovery</option>
                  <option>Axiom Finance — Enterprise · Stage: Demo</option>
                </select>
                <FormFieldHelperText>Linked to CRM — attendee context will be pulled automatically</FormFieldHelperText>
              </FormField>

              {/* Meeting type */}
              <div style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#475569', marginBottom: 6, display: 'block' }}>
                  Meeting Type
                </Text>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Technical Demo', 'Discovery', 'QBR / Strategy'] as MeetingType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setMeetingType(t)}
                      style={{
                        padding: '12px',
                        borderRadius: 8,
                        border: `2px solid ${meetingType === t ? '#2563EB' : '#E2E8F0'}`,
                        background: meetingType === t ? '#EFF6FF' : '#fff',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <Text style={{ fontSize: 13.5, fontWeight: 700, color: '#1A1D23', margin: 0 }}>{t}</Text>
                      <Text style={{ fontSize: 12, color: '#64748B', margin: 0 }}>
                        {t === 'Technical Demo' && 'SE required'}
                        {t === 'Discovery' && 'AE only'}
                        {t === 'QBR / Strategy' && 'VP recommended'}
                      </Text>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration + notice */}
              <div className="grid grid-cols-2 gap-4" style={{ marginBottom: 16 }}>
                <FormField labelPlacement="top">
                  <FormFieldLabel>Duration</FormFieldLabel>
                  <select className="w-full px-3 py-2.5 rounded-lg" style={{ border: '1px solid #CBD5E1', fontSize: 13.5, outline: 'none', background: '#fff' }}>
                    <option>45 minutes</option>
                    <option>30 minutes</option>
                    <option>60 minutes</option>
                  </select>
                </FormField>
                <FormField labelPlacement="top">
                  <FormFieldLabel>Earliest booking</FormFieldLabel>
                  <select className="w-full px-3 py-2.5 rounded-lg" style={{ border: '1px solid #CBD5E1', fontSize: 13.5, outline: 'none', background: '#fff' }}>
                    <option>24 hrs from now</option>
                    <option>48 hrs from now</option>
                    <option>As soon as possible</option>
                  </select>
                </FormField>
              </div>

              {/* Notes */}
              <FormField labelPlacement="top">
                <FormFieldLabel>Notes for SE (optional)</FormFieldLabel>
                <input
                  type="text"
                  placeholder="e.g. Focus on data pipeline integrations — CTO will be attending"
                  className="w-full px-3 py-2.5 rounded-lg"
                  style={{ border: '1px solid #CBD5E1', fontSize: 13.5, outline: 'none', background: '#fff', fontFamily: 'inherit' }}
                />
                <FormFieldHelperText>Included in the SE's pre-call brief</FormFieldHelperText>
              </FormField>
            </CardBody>
          </Card>
        )}

        {/* ─── STEP 2 ─── */}
        {step === 2 && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <CardHeader>
                <CardTitle>Internal Attendees</CardTitle>
                <Text style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Only showing times when all selected people are free</Text>
              </CardHeader>
              <CardBody>
                {/* AE */}
                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>Required</Text>
                <div className="flex items-center gap-3 px-3.5 py-3 rounded-lg mb-3" style={{ border: '2px solid #BBF7D0', background: '#F0FDF4' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: '#2563EB', fontSize: 13 }}>M</div>
                  <div className="flex-1">
                    <Text style={{ fontSize: 13.5, fontWeight: 700, color: '#1A1D23', margin: 0 }}>Marcus Chen <span style={{ fontSize: 11, color: '#16A34A' }}>· You</span></Text>
                    <Text style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Account Executive · Always included</Text>
                  </div>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#16A34A' }}><Check size={10} color="#fff" /></div>
                </div>

                {/* SE */}
                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: 8, marginTop: 16, display: 'block' }}>Sales Engineer <span style={{ color: '#DC2626' }}>*</span></Text>
                <div className="flex items-center gap-3 px-3.5 py-3 rounded-lg mb-3" style={{ border: '2px solid #2563EB', background: '#EFF6FF' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: '#7C3AED', fontSize: 13 }}>P</div>
                  <div className="flex-1">
                    <Text style={{ fontSize: 13.5, fontWeight: 700, color: '#1A1D23', margin: 0 }}>Priya Sharma</Text>
                    <Text style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Sales Engineer — handles this segment</Text>
                    <Text style={{ fontSize: 11, color: '#16A34A', fontWeight: 600, margin: 0 }}>✓ 8 open slots next 5 days</Text>
                  </div>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#2563EB' }}><Check size={10} color="#fff" /></div>
                </div>

                {/* VP */}
                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: 8, marginTop: 16, display: 'block' }}>Optional — VP / Leadership</Text>
                <button
                  onClick={() => setVpIncluded(!vpIncluded)}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-left transition-colors"
                  style={{
                    border: `2px solid ${vpIncluded ? '#2563EB' : '#E2E8F0'}`,
                    background: vpIncluded ? '#EFF6FF' : '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: '#16A34A', fontSize: 13 }}>R</div>
                  <div className="flex-1">
                    <Text style={{ fontSize: 13.5, fontWeight: 700, color: '#1A1D23', margin: 0 }}>Rachel Kim</Text>
                    <Text style={{ fontSize: 12, color: '#64748B', margin: 0 }}>VP Sales — strategic accounts</Text>
                    <Text style={{ fontSize: 11, color: '#B45309', fontWeight: 600, margin: 0 }}>⚠ Only 2 slots available next 5 days</Text>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ background: vpIncluded ? '#2563EB' : 'transparent', borderColor: vpIncluded ? '#2563EB' : '#CBD5E1' }}
                  >
                    {vpIncluded && <Check size={10} color="#fff" />}
                  </div>
                </button>
              </CardBody>
            </Card>

            {/* Available windows */}
            <Card>
              <CardHeader>
                <CardTitle>Available Windows</CardTitle>
                <Text style={{ fontSize: 11, color: '#64748B', margin: 0 }}>Based on all selected attendees · next 5 business days</Text>
              </CardHeader>
              <CardBody>
                {/* Day strip */}
                <div className="flex gap-1.5 mb-4">
                  {calDays.map((d, i) => (
                    <button
                      key={d.num}
                      onClick={() => setSelectedDay(i)}
                      className="flex-1 text-center py-2 px-1 rounded-lg transition-colors"
                      style={{
                        border: `2px solid ${selectedDay === i ? '#2563EB' : '#E2E8F0'}`,
                        background: selectedDay === i ? '#2563EB' : '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: selectedDay === i ? '#BFDBFE' : '#94A3B8' }}>{d.name}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: selectedDay === i ? '#fff' : '#1A1D23' }}>{d.num}</div>
                    </button>
                  ))}
                </div>

                {/* Slot grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {mockSlots.map((s) => (
                    <button
                      key={s.time}
                      disabled={s.taken}
                      onClick={() => !s.taken && setSelectedSlot(s.time)}
                      className="py-2 text-center rounded-lg transition-colors"
                      style={{
                        border: `2px solid ${selectedSlot === s.time ? '#2563EB' : s.taken ? '#E2E8F0' : '#E2E8F0'}`,
                        background: selectedSlot === s.time ? '#2563EB' : s.taken ? '#F8FAFC' : '#fff',
                        color: selectedSlot === s.time ? '#fff' : s.taken ? '#CBD5E1' : '#374151',
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: s.taken ? 'line-through' : 'none',
                        cursor: s.taken ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex gap-1.5 px-3 py-2 rounded-lg" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: 11.5, color: '#92400E' }}>
                  💡 Greyed-out slots are blocked for one or more attendees. The buyer will only see the white slots.
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* ─── STEP 3 ─── */}
        {step === 3 && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <CardHeader>
                <CardTitle style={{ color: '#16A34A' }}>✓ Link generated</CardTitle>
              </CardHeader>
              <CardBody>
                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>Booking Link</Text>
                <div className="flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 mb-4" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Text style={{ fontSize: 13, color: '#2563EB', fontFamily: 'var(--salt-typography-fontFamily-ptMono, PT Mono, monospace)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                    {bookingUrl}
                  </Text>
                  <Button
                    appearance="bordered"
                    sentiment="neutral"
                    onClick={handleCopy}
                    style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    {copied ? <Check size={12} color="#16A34A" /> : <Copy size={12} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>

                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>What this link does</Text>
                <div className="flex flex-col gap-2 mb-4">
                  {[
                    ['📅', 'Shows only times when Marcus + Priya are both free'],
                    ['✉️', 'Sends calendar invites to all parties once booked'],
                    ['👥', 'Allows buyer to add their own colleagues on confirmation'],
                    ['📋', 'Logs activity in CRM automatically (P2)'],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: 13.5, color: '#374151' }}>
                      <span style={{ fontSize: 16 }}>{icon}</span>{text}
                    </div>
                  ))}
                </div>

                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>Share via</Text>
                <div className="flex flex-wrap gap-2">
                  {['📧 Email', '💬 Slack', '🔗 CRM Activity'].map((label) => (
                    <Button key={label} appearance="bordered" sentiment="neutral" style={{ fontSize: 12 }}>
                      {label}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Attendee summary */}
            <Card>
              <CardHeader><CardTitle>Attendee Summary</CardTitle></CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>Your Team</Text>
                    <div className="flex flex-col gap-2">
                      {[
                        { init: 'M', name: 'Marcus Chen', role: 'Account Executive', color: '#2563EB', badge: <Badge variant="blue">You</Badge> },
                        { init: 'P', name: 'Priya Sharma', role: 'Sales Engineer', color: '#7C3AED', badge: <Badge variant="purple">SE</Badge> },
                      ].map((a) => (
                        <div key={a.name} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: a.color, fontSize: 10, fontWeight: 700 }}>{a.init}</div>
                          <div className="flex-1">
                            <Text style={{ fontSize: 13, fontWeight: 700, color: '#1A1D23', margin: 0 }}>{a.name}</Text>
                            <Text style={{ fontSize: 11, color: '#64748B', margin: 0 }}>{a.role}</Text>
                          </div>
                          {a.badge}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>Buyer Side</Text>
                    <div className="px-3 py-3 rounded-lg" style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', fontSize: 13, color: '#94A3B8' }}>
                      Awaiting buyer to confirm &amp; add colleagues
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-end gap-2 mt-4">
          {step === 1 && (
            <>
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <Button appearance="bordered" sentiment="neutral" style={{ fontSize: 13 }}>Cancel</Button>
              </Link>
              <Button appearance="solid" sentiment="accented" onClick={() => setStep(2)} style={{ fontSize: 13 }}>
                Next: Select Team →
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Button appearance="bordered" sentiment="neutral" onClick={() => setStep(1)} style={{ fontSize: 13 }}>← Back</Button>
              <Button appearance="solid" sentiment="accented" onClick={() => setStep(3)} style={{ fontSize: 13 }}>
                Generate Booking Link →
              </Button>
            </>
          )}
          {step === 3 && (
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Button appearance="bordered" sentiment="neutral" style={{ fontSize: 13 }}>← Back to Dashboard</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
