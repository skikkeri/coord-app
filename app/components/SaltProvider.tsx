'use client';

import { SaltProvider } from '@salt-ds/core';
import '@salt-ds/theme/index.css';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/pt-mono/400.css';

export function SaltAppProvider({ children }: { children: React.ReactNode }) {
  return (
    <SaltProvider mode="light" density="medium">
      {children}
    </SaltProvider>
  );
}
