import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID ?? '';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? '';
  const authSecret = process.env.AUTH_SECRET ?? '';
  const authUrl = process.env.AUTH_URL ?? '';

  // Test Google Discovery endpoint is reachable
  let discoveryOk = false;
  let discoveryError = '';
  try {
    const res = await fetch('https://accounts.google.com/.well-known/openid-configuration');
    discoveryOk = res.ok;
  } catch (e: any) {
    discoveryError = e.message;
  }

  // Test token endpoint reachability with a dummy request (will fail with invalid_client, not network error)
  let tokenEndpointReachable = false;
  let tokenResponse = '';
  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: 'dummy_code_for_testing',
        redirect_uri: `${authUrl}/api/auth/callback/google`,
        grant_type: 'authorization_code',
      }),
    });
    tokenEndpointReachable = true;
    const json = await res.json();
    tokenResponse = JSON.stringify(json); // Will show error like invalid_grant or invalid_client
  } catch (e: any) {
    tokenResponse = e.message;
  }

  return NextResponse.json({
    AUTH_URL: authUrl,
    AUTH_SECRET_LENGTH: authSecret.length,
    AUTH_SECRET_FIRST4: authSecret.slice(0, 4),
    GOOGLE_CLIENT_ID_LENGTH: clientId.length,
    GOOGLE_CLIENT_ID_LAST8: clientId.slice(-8),
    GOOGLE_CLIENT_SECRET_LENGTH: clientSecret.length,
    GOOGLE_CLIENT_SECRET_LAST6: clientSecret.slice(-6),
    GOOGLE_CLIENT_SECRET_FULL: clientSecret, // Show full secret so we can verify
    discoveryOk,
    discoveryError,
    tokenEndpointReachable,
    tokenResponse, // Will show "invalid_client" if secret is wrong, "invalid_grant" if secret is right
  });
}
