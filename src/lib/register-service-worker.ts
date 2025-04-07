(async () => {
  if (typeof window === 'undefined') return;

  if (!('serviceWorker' in navigator)) return;

  if (await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js')) return;

  await navigator.serviceWorker.register('/firebase-messaging-sw.js');
})();
