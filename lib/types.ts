export type UserRole = 'ae' | 'se' | 'buyer';

export interface Meeting {
  id: string;
  deal: string;
  type: 'Technical Demo' | 'Discovery' | 'QBR / Strategy';
  date: string;
  time: string;
  se: string;
  attendees: number;
  status: 'confirmed' | 'pending' | 'draft';
}

export interface SEAvailabilityWindow {
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri';
  hour: number; // 9-17
  available: boolean;
  blocked: boolean; // pulled from calendar
}

export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
}
