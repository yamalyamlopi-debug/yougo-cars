const CACHE = 'yougo-v1';
const ASSETS = ['/'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Only cache GET requests
  if (e.request.method !== 'GET') return;

  // Skip Supabase and Cloudinary API calls — always fresh
  const url = e.request.url;
  if (url.includes('supabase.co') || url.includes('cloudinary.com') || url.includes('api.')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request).then(res => {
        if (res && res.status === 200) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached);
      // Stale-while-revalidate: show cache instantly, update in background
      return cached || fresh;
    })
  );
});
