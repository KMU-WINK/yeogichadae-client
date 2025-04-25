import Api from '@/api';

import { initializeApp } from 'firebase/app';
import { getMessaging as _getMessaging, getToken, isSupported } from 'firebase/messaging';

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

  if (!('Notification' in window) || !messaging) return;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  if (sessionStorage.getItem('fcmToken') === token) return;

  await Api.Domain.Notification.subscribe({ token });
  sessionStorage.setItem('fcmToken', token);
};
