'use client';
import { useState } from 'react';
import { Text, Button, Input, FormField, FormFieldLabel, Spinner } from '@salt-ds/core';
import { calDays } from '@/lib/mock-data';
import { Check, X, AlertCircle } from 'lucide-react';

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
  const [buyerEmail, setBuyerEmail] = useState('kssantosh84@gmail.com');
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
            { email: 'santosh.kikkeri@gmail.com' }, // Marcus + Priya (same inbox for testing)
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

  // ── Shared topbar ──
  const Topbar = () => (
    <div className="flex items-center gap-3.5 px-7 h-14" style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}>
      <Text style={{ fontSize: 16, fontWeight: 800, color: '#1A1D23', margin: 0 }}>
        ⚡ <span style={{ color: '#059669' }}>Coord</span>
      </Text>
      <div className="flex-1" />
      <Text style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Powered by Coord · Secure booking</Text>
    </div>
  );

  if (confirmed) {
    const day = calDays[selectedDay];
    return (
      <div className="min-h-screen flex flex-col" style={{ background: '#F0F2F5' }}>
        <Topbar />
        <div className="flex-1 flex items-start justify-center p-8">
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, width: '100%', maxWidth: 640, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            {/* Hero */}
            <div className="text-center px-7 py-7" style={{ background: 'linear-gradient(135deg, #ECFDF5, #F0FDF4)', borderBottom: '1px solid #D1FAE5' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#059669', fontSize: 24 }}>✓</div>
              <Text styleAs="h3" style={{ color: '#064E3B', fontWeight: 800, margin: 0 }}>You're booked!</Text>
              <Text style={{ fontSize: 14, color: '#059669', margin: '4px 0 0' }}>A calendar invite has been sent to {buyerEmail}</Text>
            </div>

            <div className="p-6">
              <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 12, display: 'block' }}>Meeting Details</Text>
              {[
                { icon: '📅', content: <><strong>{day.name} {day.num} Feb 2026</strong> · {selectedSlot} – 45 min (GMT)</> },
                { icon: '🖥️', content: <>Google Meet · {meetLink ? <a href={meetLink} target="_blank" rel="noreferrer" style={{ color: '#2563EB', textDecoration: 'underline' }}>Open meeting link</a> : 'Link in your calendar invite'}</> },
                { icon: '⏱️', content: <>45 minutes · Technical Demo · {buyerCompany}</> },
              ].map(({ icon, content }, idx) => (
                <div key={idx} className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg mb-2" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: 13.5, color: '#374151' }}>
                  <span style={{ fontSize: 16 }}>{icon}</span><div>{content}</div>
                </div>
              ))}

              <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #F1F5F9' }} />
              <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 12, display: 'block' }}>Who you'll meet</Text>
              <div className="flex flex-col gap-2 mb-4">
                {[
                  { init: 'M', name: 'Marcus Chen', role: 'Account Executive · Will walk you through the platform', bg: '#2563EB' },
                  { init: 'P', name: 'Priya Sharma', role: 'Sales Engineer · Will handle all technical questions', bg: '#7C3AED' },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: a.bg, fontSize: 10, fontWeight: 700 }}>{a.init}</div>
                    <div>
                      <Text style={{ fontSize: 13, fontWeight: 700, color: '#1A1D23', margin: 0 }}>{a.name}</Text>
                      <Text style={{ fontSize: 11, color: '#64748B', margin: 0 }}>{a.role}</Text>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add colleagues */}
              <div className="rounded-lg p-4" style={{ background: '#EFF6FF', border: '2px dashed #93C5FD' }}>
                <Text style={{ fontSize: 14, fontWeight: 700, color: '#1E40AF', margin: '0 0 4px' }}>👥 Bring your team</Text>
                <Text style={{ fontSize: 12, color: '#3B82F6', margin: '0 0 12px' }}>Add colleagues — they'll get their own calendar invite.</Text>
                <div className="flex gap-2 mb-2.5">
                  <input
                    type="email"
                    value={colleagueEmail}
                    onChange={e => setColleagueEmail(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addColleague()}
                    placeholder="colleague@company.com"
                    className="px-3 py-2 rounded-lg"
                    style={{ flex: 1, border: '1px solid #CBD5E1', fontSize: 13.5, outline: 'none' }}
                  />
                  <Button appearance="solid" sentiment="accented" onClick={addColleague} style={{ fontSize: 12 }}>Add</Button>
                </div>
                {colleagues.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Text style={{ fontSize: 12, color: '#94A3B8', margin: 0 }}>Added:</Text>
                    {colleagues.map((c, i) => (
                      <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: '#DBEAFE', color: '#1E40AF', fontSize: 11, fontWeight: 600 }}>
                        {c.email}
                        <button onClick={() => removeColleague(i)} style={{ color: '#93C5FD', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-1.5 px-3 py-2 rounded-lg" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: 11.5, color: '#92400E' }}>
                💡 Each colleague receives a personalised invite — no vendor involvement needed.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#F0F2F5' }}>
      <Topbar />
      <div className="flex-1 flex items-start justify-center p-8">
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, width: '100%', maxWidth: 768, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          {/* Green header */}
          <div className="px-7 py-6" style={{ background: '#059669' }}>
            <Text styleAs="h3" style={{ color: '#fff', fontWeight: 800, margin: '0 0 4px' }}>Book a Demo with Veritas Cloud Team</Text>
            <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', margin: 0 }}>Technical Demo · 45 minutes · Google Meet</Text>
            <div className="flex gap-2.5 mt-3.5">
              {[
                { init: 'M', name: 'Marcus Chen', role: 'Account Executive', bg: '#2563EB' },
                { init: 'P', name: 'Priya Sharma', role: 'Sales Engineer', bg: '#7C3AED' },
              ].map((a) => (
                <div key={a.name} className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: a.bg, fontSize: 10, fontWeight: 700 }}>{a.init}</div>
                  <div>
                    <Text style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>{a.name}</Text>
                    <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{a.role}</Text>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-7">
              {/* Left: date + slots */}
              <div>
                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>Select a date</Text>
                <div className="flex gap-1.5 mb-5">
                  {calDays.map((d, i) => (
                    <button
                      key={d.num}
                      onClick={() => setSelectedDay(i)}
                      className="flex-1 text-center py-2 px-1 rounded-lg transition-colors"
                      style={{
                        border: `2px solid ${selectedDay === i ? '#059669' : '#E2E8F0'}`,
                        background: selectedDay === i ? '#059669' : '#fff',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: selectedDay === i ? '#A7F3D0' : '#94A3B8' }}>{d.name}</div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: selectedDay === i ? '#fff' : '#1A1D23' }}>{d.num}</div>
                    </button>
                  ))}
                </div>

                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 8, display: 'block' }}>
                  Available times — {calDays[selectedDay].name} {calDays[selectedDay].num} Feb
                </Text>
                <div className="grid grid-cols-3 gap-2">
                  {buyerSlots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className="py-2 text-center rounded-lg transition-colors"
                      style={{
                        border: `2px solid ${selectedSlot === s ? '#059669' : '#E2E8F0'}`,
                        background: selectedSlot === s ? '#059669' : '#fff',
                        color: selectedSlot === s ? '#fff' : '#374151',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex gap-1.5 px-3 py-2 rounded-lg" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: 11.5, color: '#92400E' }}>
                  💡 All times shown are when both Marcus and Priya are free — no back-and-forth needed.
                </div>
              </div>

              {/* Right: form */}
              <div>
                <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#94A3B8', marginBottom: 12, display: 'block' }}>Your details</Text>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Name', type: 'text', value: buyerName, onChange: setBuyerName, placeholder: '' },
                    { label: 'Work email', type: 'email', value: buyerEmail, onChange: setBuyerEmail, placeholder: '' },
                    { label: 'Company', type: 'text', value: buyerCompany, onChange: setBuyerCompany, placeholder: '' },
                    { label: 'Anything to prepare? (optional)', type: 'text', value: notes, onChange: setNotes, placeholder: "e.g. We'll have our IT lead joining" },
                  ].map(({ label, type, value, onChange, placeholder }) => (
                    <div key={label}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: '#475569', marginBottom: 6 }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-3 py-2.5 rounded-lg"
                        style={{ border: '1px solid #CBD5E1', fontSize: 13.5, outline: 'none', background: '#F8FAFC', color: '#374151', fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}

                  {error && (
                    <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg" style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', fontSize: 12, color: '#DC2626' }}>
                      <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 2 }} />
                      {error}
                    </div>
                  )}

                  <Button
                    appearance="solid"
                    sentiment="accented"
                    onClick={handleConfirm}
                    disabled={loading || !buyerEmail || !buyerName}
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 700,
                      background: '#059669',
                      marginTop: 4,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 0',
                    }}
                  >
                    {loading
                      ? <><Spinner size="small" aria-label="Creating event" /> Creating event…</>
                      : <><Check size={16} /> Confirm — {calDays[selectedDay].name} {calDays[selectedDay].num} Feb at {selectedSlot} →</>
                    }
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
