'use client';

import { ReactNode, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import Header from '@/component/layout/header';
import ModalContainer from '@/component/layout/modal-container';

import Api from '@/api';

import { initRoomStore } from '@/store/chat.store';
import { useInitStore } from '@/store/init.store';
import { initNotificationStore } from '@/store/notification.store';
import { useUserStore } from '@/store/user.store';

import { registerForeground } from '@/lib/firebase';
import '@/lib/register-service-worker';

import '@/style/global.css';

import { AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

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
      registerForeground().then();
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (user.district && user.birthYear && user.gender) return;
    if (pathname === '/profile/edit') return;
    toast.info('회원정보를 입력해주세요.');
    router.replace('/profile/edit');
  }, [pathname, user]);

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>Seoul IN Culture</title>
      </head>
      <body>
        {isInit && (
          <>
            <Header />
            <main className="h-full overflow-x-clip px-6 pt-14 pb-4 sm:px-8 sm:pt-16 sm:pb-8">
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
