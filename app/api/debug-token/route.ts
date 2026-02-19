/**
 * GET /api/debug-token
 * Temporary endpoint to extract the refresh token from the NextAuth v5 encrypted JWT.
 * DELETE THIS FILE after copying the refresh token to Vercel env vars.
 */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { auth as getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getSession();

  if (!session || !(session as any).accessToken) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  // NextAuth v5 uses JWE (encrypted) tokens by default.
  // getToken() in next-auth/jwt supports this when you pass `secureCookie` + `salt`.
  // The salt for production (https) is "__Secure-authjs.session-token".
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? '';

  // Try with the v5 secure cookie name and salt
  const tokenSecure = await getToken({
    req,
    secret,
    cookieName: '__Secure-authjs.session-token',
    salt: '__Secure-authjs.session-token',
  });

  // Try with the non-secure variant (in case running without https somehow)
  const tokenPlain = await getToken({
    req,
    secret,
    cookieName: 'authjs.session-token',
    salt: 'authjs.session-token',
  });

  const token = tokenSecure ?? tokenPlain;

  return NextResponse.json({
    sessionEmail: session.user?.email,
    secureTokenFound: !!tokenSecure,
    plainTokenFound: !!tokenPlain,
    refreshToken: token?.refreshToken ?? '(still not found)',
    accessTokenFromToken: token?.accessToken ?? null,
    expiresAt: token?.expiresAt ?? null,
    note: token?.refreshToken
      ? '✅ Copy refreshToken to GOOGLE_REFRESH_TOKEN in Vercel, then delete this file.'
      : '❌ Could not decrypt — the JWE salt may differ. Try the manual Google OAuth Playground method instead.',
  });
}
