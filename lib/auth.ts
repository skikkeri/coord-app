import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// ── TypeScript augmentation for custom session/token fields ──────────────────
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string;
  }
}

/**
 * Refresh an expired Google access token using the stored refresh token.
 * Called automatically by the jwt() callback whenever expiresAt has passed.
 */
async function refreshGoogleToken(token: any): Promise<any> {
  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });

    const refreshed = await response.json();

    if (!response.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      // Google may or may not issue a new refresh token — keep old one if not returned
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      // expires_in is seconds from now; convert to Unix timestamp (seconds)
      expiresAt: Math.floor(Date.now() / 1000) + (refreshed.expires_in as number),
      error: undefined,
    };
  } catch (error) {
    console.error('Failed to refresh Google access token:', error);
    // Signal to the client that re-authentication is needed
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}

// NextAuth v5: primary env var is AUTH_SECRET (not NEXTAUTH_SECRET).
// NEXTAUTH_URL → AUTH_URL. We support both for convenience.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'email',
            'profile',
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/calendar.events',
          ].join(' '),
          prompt: 'consent',
          access_type: 'offline',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // First login — persist tokens returned by Google
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
        };
      }

      // Token still valid (with 60-second buffer) — return as-is
      if (Date.now() < ((token.expiresAt as number) * 1000 - 60_000)) {
        return token;
      }

      // Token expired (or expiry unknown) — attempt silent refresh
      return refreshGoogleToken(token);
    },
    async session({ session, token }) {
      // Expose access token so server routes can call Google APIs
      (session as any).accessToken = token.accessToken;
      // Propagate any refresh error so the UI can prompt re-auth
      (session as any).error = token.error;
      return session;
    },
  },
  // v5 reads AUTH_SECRET from env automatically; belt-and-suspenders fallback
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  // Required for NextAuth v5 beta on non-localhost hosts (e.g. Vercel)
  trustHost: true,
});
