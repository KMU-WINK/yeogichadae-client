import { ReactNode } from 'react';

import type { Metadata } from 'next';

import Header from '@/components/header';
import SonnerProvider from '@/components/sonner-provider';

import '@/style/global.css';

export const metadata: Metadata = {
  title: 'Seoul IN Culture',
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <body className="bg-background min-h-screen">
        <Header />
        <SonnerProvider />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
