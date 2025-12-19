'use client';

import AuthInitializer from '@/app/providers/AuthInitializer';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthInitializer />
      {children}
    </>
  );
}