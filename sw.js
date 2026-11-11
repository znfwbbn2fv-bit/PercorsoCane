// Offline cache for the single-device demonstration app. No personal data is sent to a server.
const CACHE = 'percorsocane-pwa-v1-0-6';
const ASSETS = ['./','./index.html','./styles.css','./app.js','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png','./manifest.webmanifest'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('percorsocane-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    } catch {
      const cached = await cache.match(request, {ignoreSearch:true});
      if (cached) return cached;
      if (request.mode === 'navigate') return await cache.match('./index.html') || Response.error();
      return Response.error();
    }
  })());
});