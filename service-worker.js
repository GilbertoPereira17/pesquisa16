const cacheName = 'site-static-v16';
const assets = [
    '/',
    '/pesquisav16/index.html',
    '/pesquisav16/styles.css',
    '/pesquisav16/script.js',
    '/pesquisav16/manifest.json',
    '/pesquisav16/images/icon-192x192.png',
    '/pesquisav16/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});