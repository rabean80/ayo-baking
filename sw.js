const CACHE_NAME = 'ayo-baking-v4'; // GETC774C678 C694Ccad Ce90C2f1 Bc84Adf8 C218C815
const ASSETS = [
  '/',
  '/index.html',
  '/baking_scheduler_v2.html',
  '/manifest.json'
];

// 설치: 핵심 파일 캐시
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 활성화: 오래된 캐시 삭제
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 네트워크 우선, 실패 시 캐시 사용 (GET 요청만 캐싱 - PUT/POST 등은 그대로 통과)
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith('http')) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req))
  );
});
