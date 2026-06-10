/* Service worker — caches the app so it works fully OFFLINE.
   ── HOW TO SHIP AN UPDATE WITHOUT LOSING WORKOUTS ──
   1. Edit index.html (or any file)
   2. Bump the CACHE name below (v1 → v2 → v3 …)
   3. Upload the changed files
   Workouts are stored in localStorage, which this worker NEVER touches.
   Only the cached app files are replaced on update.                    */
const CACHE = 'trainer-v1';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(hit => hit ||
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return resp;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
