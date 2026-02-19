import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

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
      // Persist OAuth tokens to the JWT right after sign-in
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose access token so server routes can call Google APIs
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  // v5 reads AUTH_SECRET from env automatically; belt-and-suspenders fallback
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  // Required for NextAuth v5 beta on non-localhost hosts (e.g. Vercel)
  trustHost: true,
});
