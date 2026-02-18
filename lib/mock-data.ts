import type { Meeting } from './types';

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    deal: 'Veritas Cloud',
    type: 'Technical Demo',
    date: 'Mon 23 Feb · 2:00 PM',
    time: '2026-02-23T14:00:00',
    se: 'Priya S.',
    attendees: 4,
    status: 'confirmed',
  },
  {
    id: '2',
    deal: 'NorthStar Ops',
    type: 'Discovery',
    date: 'Tue 24 Feb · 11:00 AM',
    time: '2026-02-24T11:00:00',
    se: 'Priya S.',
    attendees: 3,
    status: 'pending',
  },
  {
    id: '3',
    deal: 'Axiom Finance',
    type: 'Technical Demo',
    date: 'Tue 24 Feb · 3:30 PM',
    time: '2026-02-24T15:30:00',
    se: 'Priya S.',
    attendees: 5,
    status: 'pending',
  },
  {
    id: '4',
    deal: 'Luminary SaaS',
    type: 'QBR / Strategy',
    date: 'Wed 25 Feb · 10:00 AM',
    time: '2026-02-25T10:00:00',
    se: 'Priya S.',
    attendees: 6,
    status: 'confirmed',
  },
  {
    id: '5',
    deal: 'Creston Media',
    type: 'Discovery',
    date: 'Thu 26 Feb · 1:00 PM',
    time: '2026-02-26T13:00:00',
    se: '',
    attendees: 2,
    status: 'draft',
  },
];

export const mockSlots = [
  { time: '10:00 AM', taken: false },
  { time: '10:45 AM', taken: false },
  { time: '11:30 AM', taken: true },
  { time: '2:00 PM', taken: false },
  { time: '2:45 PM', taken: false },
  { time: '3:30 PM', taken: false },
  { time: '4:00 PM', taken: true },
  { time: '4:45 PM', taken: false },
];

export const calDays = [
  { name: 'Mon', num: 23 },
  { name: 'Tue', num: 24 },
  { name: 'Wed', num: 25 },
  { name: 'Thu', num: 26 },
  { name: 'Fri', num: 27 },
];
