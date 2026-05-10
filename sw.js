const CACHE_NAME = 'jlpt-n2-v2'; // 更新版本號
const ASSETS = [
  './',                // 快取根目錄
  './index.html',      // 快取主程式
  './data.js',         // 快取資料庫
  './manifest.json'    // 快取設定檔
];

// 安裝事件：強制將檔案寫入手機實體空間
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('【快取作業】正在固化離線資源');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // 強制跳過等待，立即生效
  );
});

// 激活事件：刪除舊版本的快取
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 攔截請求：當網路斷開時，從快取讀取
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // 若快取有資料就用快取，否則走網路
      return response || fetch(e.request);
    })
  );
});
