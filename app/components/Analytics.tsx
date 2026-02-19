'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { pageview } from '@/lib/gtag';

/**
 * Fires a GA4 pageview on every client-side route change.
 *
 * Next.js App Router does not do a full page reload on navigation,
 * so we must track route changes manually via usePathname.
 *
 * Must be wrapped in <Suspense> in layout.tsx because useSearchParams
 * requires a Suspense boundary in App Router.
 */
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '');
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
