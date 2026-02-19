/**
 * GET /api/debug-token
 * Temporary endpoint to retrieve the stored refresh token from your NextAuth JWT.
 * DELETE THIS FILE after copying the refresh token to Vercel env vars.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.json({
      error: 'Not signed in — go to /se/availability, connect Google Calendar, then visit this URL again.',
    }, { status: 401 });
  }

  return NextResponse.json({
    note: 'Copy the refreshToken value below as GOOGLE_REFRESH_TOKEN in Vercel env vars, then delete app/api/debug-token/route.ts',
    userEmail: token.email,
    refreshToken: token.refreshToken,
    accessToken: token.accessToken,
    expiresAt: token.expiresAt,
  });
}
