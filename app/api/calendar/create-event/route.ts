/**
 * POST /api/calendar/create-event
 * Creates a Google Calendar event for a confirmed booking.
 *
 * Auth strategy:
 *  1. If a NextAuth session with an accessToken exists (signed-in SE/AE), use it.
 *  2. Otherwise fall back to GOOGLE_REFRESH_TOKEN env var — this covers the
 *     public buyer-facing booking page where the visitor has no session.
 *
 * Body: { summary, description, startDateTime, endDateTime, attendees }
 */
import { NextRequest, NextResponse } from 'next/server';
import { auth as getSession } from '@/lib/auth';
import { google } from 'googleapis';

async function getAccessToken(): Promise<string | null> {
  // ── Path 1: signed-in user session (SE/AE testing the flow) ─────────────
  const session = await getSession();
  if (session && (session as any).accessToken) {
    return (session as any).accessToken as string;
  }

  // ── Path 2: stored refresh token for the buyer-facing public page ────────
  const storedRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (!storedRefreshToken) return null;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: storedRefreshToken,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.access_token) return null;
    return data.access_token as string;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Calendar not connected. Please sign in with Google Calendar on the SE availability page, then copy your refresh token to GOOGLE_REFRESH_TOKEN in Vercel env vars.' },
      { status: 401 },
    );
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
  oauth2.setCredentials({ access_token: accessToken });

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
