'use client';

import { ReactNode, useEffect } from 'react';

import Header from '@/component/layout/header';
import ModalContainer from '@/component/layout/modal-container';

import Api from '@/api';

import { useInitStore } from '@/store/init.store';

import '@/lib/register-service-worker';

import '@/style/global.css';

import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const { isInit, setInit } = useInitStore();

  useEffect(() => {
    setInit(false);

    (async () => {
      const token = localStorage.getItem('token');

      if (token) {
        await Api.Request.setToken(token);
      }

      setInit(true);
    })();
  }, []);

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>Seoul IN Culture</title>
      </head>
      <body>
        {isInit && (
          <>
            <Header />
            <main className="h-full px-4 pt-14 pb-4 sm:px-8 sm:pt-16 sm:pb-8">
              <AnimatePresence>{children}</AnimatePresence>
            </main>
          </>
        )}

        <ModalContainer />

        <Toaster
          theme="light"
          position="bottom-right"
          richColors
          closeButton
          className="font-sans"
        />
      </body>
    </html>
  );
}
