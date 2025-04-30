'use client';

import { ReactNode, useEffect } from 'react';

import Header from '@/component/layout/header';
import ModalContainer from '@/component/layout/modal-container';

import Api from '@/api';

import { initRoomStore } from '@/store/chat.store';
import { useInitStore } from '@/store/init.store';
import { initNotificationStore } from '@/store/notification.store';
import { useUserStore } from '@/store/user.store';

import '@/lib/register-service-worker';

import '@/style/global.css';

import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const { isInit, setInit } = useInitStore();
  const { user } = useUserStore();

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

  useEffect(() => {
    if (!user) return;

    initRoomStore().then();
    initNotificationStore().then();
    if (sessionStorage.getItem('fcmToken')) {
      Api.Domain.Notification.subscribe({ token: sessionStorage.getItem('fcmToken')! }).then();
    }
  }, [user]);

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>Seoul IN Culture</title>
      </head>
      <body>
        {isInit && (
          <>
            <Header />
            <main className="h-full overflow-x-clip px-4 pt-14 pb-4 sm:px-8 sm:pt-16 sm:pb-8">
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
