'use client';

import { Toaster as SonnerToaster } from 'sonner';

export default function SonnerProvider() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        className: 'rounded-xl border border-border bg-background text-foreground',
        duration: 3000,
      }}
    />
  );
}
