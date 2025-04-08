importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBaz5796SQz9hHJoMKsm1xJGTSqNxr8djg',
  authDomain: 'seoul-in-culture.firebaseapp.com',
  projectId: 'seoul-in-culture',
  messagingSenderId: '443690620828',
  appId: '1:443690620828:web:ce9a6bcc521e6138311a59',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  await self.registration.showNotification(payload.data.title, {
    body: payload.data.body,
    icon: '/icon/icon.png',
    data: payload.data,
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    }),
  );

  // TODO: 서버로 알림 읽음 처리 요청
});
