import { RedirectType, redirect } from 'next/navigation';

import Api from '@/api';

import { initializeApp } from 'firebase/app';
import {
  getMessaging as _getMessaging,
  getToken,
  isSupported,
  onMessage,
} from 'firebase/messaging';
import { toast } from 'sonner';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const getMessaging = async () => {
  if (typeof window === 'undefined' || !(await isSupported())) return;
  return _getMessaging(initializeApp(firebaseConfig));
};

export const requestNotificationPermission = async () => {
  const messaging = await getMessaging();

  if (!('Notification' in window) || !messaging) return false;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  await Api.Domain.Notification.subscribe({ token });
  await registerForeground();
  sessionStorage.setItem('fcmToken', token);

  return true;
};

let unsubscribe: () => void | undefined;
export async function registerForeground() {
  const message = await getMessaging();
  if (!message) return;

  if (unsubscribe) unsubscribe();
  unsubscribe = onMessage(message, ({ data }) => {
    if (!data) return;

    toast(data.title!, {
      description: data.body!,
      action: {
        label: '이동',
        onClick: () => redirect(data.url!, RedirectType.push),
      },
    });
  });
}
