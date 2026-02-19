'use client';
import { useState } from 'react';
import { Text, Button, Switch, FormField, FormFieldLabel, Toast, ToastContent } from '@salt-ds/core';
import { Card, CardHeader, CardTitle, CardBody } from '@/app/components/Card';
import { CalendarConnect } from '@/app/components/CalendarConnect';

const HOURS = ['9–10 AM', '10–11 AM', '11–12 PM', '12–1 PM', '1–2 PM', '2–3 PM', '3–4 PM', '4–5 PM'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const initialGrid: ('on' | 'off' | 'blocked')[][] = [
  ['off', 'off', 'off', 'off', 'off'],
  ['on',  'on',  'on',  'off', 'off'],
  ['on',  'on',  'on',  'off', 'off'],
  ['blocked','blocked','blocked','blocked','blocked'],
  ['on',  'on',  'on',  'on',  'off'],
  ['on',  'on',  'on',  'on',  'off'],
  ['on',  'on',  'off', 'off', 'off'],
  ['off', 'off', 'off', 'off', 'off'],
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
    setTimeout(() => setSaved(false), 2500);
  }

  const cellBg = (state: 'on' | 'off' | 'blocked') =>
    state === 'on' ? '#7C3AED' : state === 'blocked' ? '#FEE2E2' : '#F8FAFC';
  const cellBorder = (state: 'on' | 'off' | 'blocked') =>
    state === 'on' ? '#7C3AED' : state === 'blocked' ? '#FCA5A5' : '#E2E8F0';

  return (
    <>
      <div
        className="flex items-center gap-3 px-7 h-14 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}
      >
        <Text styleAs="h4" style={{ margin: 0, fontWeight: 700, flex: 1 }}>My Availability</Text>
        <Text style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>Control when AEs can book you for demos</Text>
        <CalendarConnect />
        <Button
          appearance="solid"
          sentiment="accented"
          onClick={handleSave}
          style={{ background: '#7C3AED', fontSize: 13 }}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </Button>
      </div>

      {saved && (
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 100 }}>
          <Toast status="success">
            <ToastContent>
              <Text style={{ margin: 0 }}>Availability saved successfully</Text>
            </ToastContent>
          </Toast>
        </div>
      )}

      <div className="flex-1 p-7">
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle>Bookable Windows</CardTitle></CardHeader>
              <CardBody>
                <Text style={{ fontSize: 11, color: '#94A3B8', marginBottom: 12, display: 'block' }}>
                  Click cells to toggle availability. Purple = open for bookings.
                </Text>
                <div className="grid gap-1" style={{ gridTemplateColumns: '72px repeat(5, 1fr)' }}>
                  <div />
                  {DAYS.map(d => (
                    <Text key={d} style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', textAlign: 'center', color: '#64748B', margin: 0, padding: '4px 0' }}>
                      {d}
                    </Text>
                  ))}
                  {HOURS.map((h, row) => (
                    <>
                      <Text key={h} style={{ fontSize: 11, color: '#94A3B8', alignSelf: 'center', margin: 0 }}>{h}</Text>
                      {DAYS.map((_, col) => (
                        <div
                          key={`${row}-${col}`}
                          onClick={() => toggle(row, col)}
                          style={{
                            height: 28,
                            borderRadius: 4,
                            cursor: grid[row][col] === 'blocked' ? 'not-allowed' : 'pointer',
                            border: `1px solid ${cellBorder(grid[row][col])}`,
                            background: cellBg(grid[row][col]),
                            transition: 'all 0.1s',
                          }}
                        />
                      ))}
                    </>
                  ))}
                </div>
                <div className="flex gap-4 mt-3">
                  {[
                    { bg: '#7C3AED', border: '#7C3AED', label: 'Open for demos' },
                    { bg: '#FEE2E2', border: '#FCA5A5', label: 'Blocked' },
                    { bg: '#F8FAFC', border: '#E2E8F0', label: 'Not available' },
                  ].map(({ bg, border, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: bg, border: `1px solid ${border}` }} />
                      <Text style={{ fontSize: 12, margin: 0 }}>{label}</Text>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-1.5 px-3 py-2 rounded-lg" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: 11.5, color: '#92400E' }}>
                  💡 Blocked slots are pulled from your Google Calendar. AEs cannot book you during these times.
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader><CardTitle>Booking Rules</CardTitle></CardHeader>
              <CardBody className="flex flex-col gap-4">
                {[
                  { label: 'Minimum notice required', hint: "AEs can't book you with less notice than this", options: ['24 hours', '48 hours', '12 hours', 'Same day'], defaultValue: '24 hours' },
                  { label: 'Prep buffer (before each demo)', hint: 'Automatically blocked before every booked demo', options: ['30 minutes', '15 minutes', '45 minutes', '60 minutes'], defaultValue: '30 minutes' },
                  { label: 'Max demos per day', hint: 'Prevents over-booking', options: ['3 demos', '2 demos', '4 demos', 'No limit'], defaultValue: '3 demos' },
                ].map((rule) => (
                  <FormField key={rule.label} labelPlacement="top">
                    <FormFieldLabel>{rule.label}</FormFieldLabel>
                    <select
                      defaultValue={rule.defaultValue}
                      className="w-full px-3 py-2.5 rounded-lg"
                      style={{ border: '1px solid #CBD5E1', fontSize: 13.5, outline: 'none', background: '#fff' }}
                    >
                      {rule.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <Text style={{ fontSize: 11, color: '#94A3B8', margin: 0 }}>{rule.hint}</Text>
                  </FormField>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
              <CardBody className="flex flex-col gap-3">
                {[
                  { label: 'New booking confirmed', defaultOn: true },
                  { label: 'Reschedule request', defaultOn: true },
                  { label: 'Pre-call brief ready', defaultOn: true },
                  { label: 'AE adds a note', defaultOn: false },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between py-1">
                    <Text style={{ fontSize: 13.5, color: '#374151', margin: 0 }}>{n.label}</Text>
                    <Switch defaultChecked={n.defaultOn} aria-label={n.label} />
                  </div>
                ))}
              </CardBody>
            </Card>

            <div className="flex gap-1.5 px-3 py-2 rounded-lg" style={{ background: '#FFFBEB', border: '1px solid #FDE68A', fontSize: 11.5, color: '#92400E' }}>
              💡 Priya controls exactly when she is bookable. AEs see live availability — no Slack back-and-forth.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
