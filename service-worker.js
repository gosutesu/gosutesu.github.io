'use strict';

// キャシュ先の名前
const CACHE_NAME = 'static-cache-sample';

// キャッシュするリソース定義
const FILES_TO_CACHE = [
  '/index.html'
];

// キャッシュの登録
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  )
  self.skipWaiting();
});

// ネットワークから取得できなければキャッシュからリソースを取得
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});