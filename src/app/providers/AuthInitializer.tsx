
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

export default function AuthInitializer() {
  const { initialized, initializeAuth } = useAuthStore();

  useEffect(() => {
    if (!initialized) {
      initializeAuth();
    }
  }, [initialized, initializeAuth]);

  return null;
}