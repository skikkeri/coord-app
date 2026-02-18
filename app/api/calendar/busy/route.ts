/**
 * GET /api/calendar/busy
 * Returns busy time blocks for the current user from Google Calendar.
 *
 * Query params:
 *   timeMin  ISO datetime (default: now)
 *   timeMax  ISO datetime (default: now + 7 days)
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth as getSession } from '@/lib/auth';
import { google } from 'googleapis';

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: 'Unauthorized — connect Google Calendar first' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const timeMin = searchParams.get('timeMin') ?? new Date().toISOString();
  const timeMax = searchParams.get('timeMax') ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const oauth2 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
  );
  oauth2.setCredentials({ access_token: (session as any).accessToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2 });

  try {
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: 'primary' }],
      },
    });

    const busy = res.data.calendars?.primary?.busy ?? [];
    return NextResponse.json({ busy });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
