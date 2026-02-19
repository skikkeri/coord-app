export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';

/**
 * Send a pageview hit to GA4.
 * Called automatically by the Analytics component on every route change.
 */
export function pageview(url: string) {
  if (!GA_ID || typeof window === 'undefined') return;
  (window as any).gtag('config', GA_ID, { page_path: url });
}

/**
 * Fire a custom GA4 event.
 * Ready for future instrumentation (booking_confirmed, calendar_connected, etc.)
 *
 * Usage:
 *   import { event } from '@/lib/gtag';
 *   event('booking_confirmed', { meeting_type: 'Technical Demo', duration: 45 });
 */
export function event(action: string, params?: Record<string, unknown>) {
  if (!GA_ID || typeof window === 'undefined') return;
  (window as any).gtag('event', action, params);
}
