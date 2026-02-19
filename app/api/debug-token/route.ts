/**
 * GET /api/debug-token
 * Temporary endpoint to retrieve the stored refresh token from your NextAuth v5 JWT.
 * DELETE THIS FILE after copying the refresh token to Vercel env vars.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { auth as getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  // Try NextAuth v5 session first (uses auth() server-side)
  const session = await getSession();

  // Also try getToken with both v4 and v5 cookie names
  const tokenV5 = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    cookieName: 'authjs.session-token',
  });

  const tokenV4 = await getToken({
    req,
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token',
  });

  const token = tokenV5 ?? tokenV4;

  // Show debug info regardless so we can diagnose
  return NextResponse.json({
    sessionExists: !!session,
    sessionEmail: session?.user?.email ?? null,
    sessionAccessToken: session ? !!((session as any).accessToken) : null,
    sessionError: (session as any)?.error ?? null,
    tokenV5Found: !!tokenV5,
    tokenV4Found: !!tokenV4,
    tokenEmail: token?.email ?? null,
    // Only show the actual tokens if we found them
    refreshToken: token?.refreshToken ?? '(not found — see debug info above)',
    accessToken: token?.accessToken ?? null,
    expiresAt: token?.expiresAt ?? null,
    note: token?.refreshToken
      ? 'Copy refreshToken value as GOOGLE_REFRESH_TOKEN in Vercel env vars, then delete this route.'
      : 'Token not found. Check sessionExists — if true, the cookie name mismatch is the issue.',
  });
}
