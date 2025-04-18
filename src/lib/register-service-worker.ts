(async () => {
  if (typeof window === 'undefined') return;

  if (!('serviceWorker' in navigator)) return;

  if (await navigator.serviceWorker.getRegistration('/service-worker/firebase-messaging.js'))
    return;

  await navigator.serviceWorker.register('/service-worker/firebase-messaging.js');
})();
