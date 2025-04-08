'use client';

import { ReactNode, useEffect } from 'react';

import Header from '@/components/header';
import SonnerProvider from '@/components/sonner-provider';

import '@/lib/register-service-worker';

import '@/style/global.css';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>Seoul IN Culture</title>
      </head>
      <body className="bg-background min-h-screen">
        <Header />
        <SonnerProvider />
        <NuqsAdapter>
          <main className="pt-14 sm:pt-16">{children}</main>
        </NuqsAdapter>
      </body>
    </html>
  );
}
