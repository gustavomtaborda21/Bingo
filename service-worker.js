self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('bingo-cache').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './icon-192.png',
        './icon-512.png',
        './patrocinadores/p1.jpg',
        './patrocinadores/p2.jpg',
        './patrocinadores/p3.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
