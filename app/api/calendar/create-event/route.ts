/**
 * POST /api/calendar/create-event
 * Creates a Google Calendar event for a confirmed booking.
 *
 * Body: { summary, description, startDateTime, endDateTime, attendees }
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth as getSession } from '@/lib/auth';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  const session = await getSession();

  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { summary, description, startDateTime, endDateTime, attendees } = body;

  if (!summary || !startDateTime || !endDateTime) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  oauth2.setCredentials({ access_token: (session as any).accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2 });

  try {
    const event = await calendar.events.insert({
      calendarId: 'primary',
      sendUpdates: 'all',
      requestBody: {
        summary,
        description,
        start: { dateTime: startDateTime, timeZone: 'UTC' },
        end: { dateTime: endDateTime, timeZone: 'UTC' },
        attendees: attendees ?? [],
        conferenceData: {
          createRequest: {
            requestId: 'coord-' + Date.now(),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
      conferenceDataVersion: 1,
    });

    return NextResponse.json({ eventId: event.data.id, link: event.data.htmlLink });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
