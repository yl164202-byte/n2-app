// sw.js - 離線控制核心
const CACHE_NAME = 'jlpt-n2-v1';
const ASSETS = [
  'index.html',
  'data.js',
  'manifest.json'
];

// 安裝時快取檔案
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('【離線化完成】檔案已存入快取');
      return cache.addAll(ASSETS);
    })
  );
});

// 攔截請求，優先從快取讀取資料
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
