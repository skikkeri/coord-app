'use client';
import { createContext, useContext } from 'react';

interface MobileMenuContextValue {
  onOpen: () => void;
}

export const MobileMenuContext = createContext<MobileMenuContextValue>({ onOpen: () => {} });

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}
