import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    AUTH_URL: process.env.AUTH_URL ?? 'NOT SET',
    AUTH_SECRET_SET: !!(process.env.AUTH_SECRET),
    AUTH_SECRET_LENGTH: process.env.AUTH_SECRET?.length ?? 0,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'NOT SET',
    NEXTAUTH_SECRET_SET: !!(process.env.NEXTAUTH_SECRET),
    GOOGLE_CLIENT_ID_SET: !!(process.env.GOOGLE_CLIENT_ID),
    GOOGLE_CLIENT_ID_PREFIX: process.env.GOOGLE_CLIENT_ID?.slice(0, 20) ?? 'NOT SET',
    GOOGLE_CLIENT_SECRET_SET: !!(process.env.GOOGLE_CLIENT_SECRET),
    GOOGLE_CLIENT_SECRET_PREFIX: process.env.GOOGLE_CLIENT_SECRET?.slice(0, 10) ?? 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL ?? 'NOT SET',
  });
}
