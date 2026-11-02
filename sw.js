const CACHE_NAME = 'ayo-baking-v5'; // 페이지(iframe 포함)는 항상 서버에 새 버전 확인
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
  // 페이지 요청(메인/iframe 스케줄러)은 브라우저 캐시를 쓰지 않고 서버에 변경 여부 확인 → 배포 후 강력 새로고침 불필요
  const fresh = req.mode === 'navigate' ? fetch(req, { cache: 'no-cache' }) : fetch(req);
  e.respondWith(
    fresh
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, clone)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req))
  );
});
