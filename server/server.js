// BakerFlow V3.0 온라인 버전 백엔드 서버
// Express + SQLite, 고정 API키 인증

const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error('ERROR: API_KEY 환경변수가 설정되지 않았습니다. .env 파일을 확인하세요.');
  process.exit(1);
}

// --- DB 초기화 ---
const db = new Database(path.join(__dirname, 'bakerflow.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS data (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )
`);

// --- 미들웨어 ---
app.use(express.json({ limit: '5mb' }));

// API키 인증 (헬스체크 제외)
app.use((req, res, next) => {
  if (req.path === '/api/health') return next();
  const key = req.header('X-API-Key');
  if (key !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing X-API-Key header' });
  }
  next();
});

// --- 라우트 ---

// 헬스체크 (인증 불필요)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 데이터 조회
// 예: GET /api/data/calcPresets
app.get('/api/data/:key', (req, res) => {
  const row = db.prepare('SELECT key, value, updated_at FROM data WHERE key = ?').get(req.params.key);
  if (!row) {
    return res.status(404).json({ error: 'Not found', key: req.params.key });
  }
  res.json(row);
});

// 데이터 저장 (전체 덮어쓰기 - upsert)
// 예: PUT /api/data/calcPresets  body: { "value": "{...json string...}" }
app.put('/api/data/:key', (req, res) => {
  const { value } = req.body;
  if (typeof value !== 'string') {
    return res.status(400).json({ error: 'body.value must be a string (e.g. JSON.stringify(...) result)' });
  }
  const now = Date.now();
  db.prepare(`
    INSERT INTO data (key, value, updated_at) VALUES (?, ?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
  `).run(req.params.key, value, now);
  res.json({ key: req.params.key, updated_at: now });
});

// 전체 데이터 한 번에 조회 (앱 초기 로딩용 - { key: value, ... } 형태)
app.get('/api/bootstrap', (req, res) => {
  const rows = db.prepare('SELECT key, value FROM data').all();
  const result = {};
  for (const row of rows) result[row.key] = row.value;
  res.json(result);
});

// 데이터 삭제
app.delete('/api/data/:key', (req, res) => {
  db.prepare('DELETE FROM data WHERE key = ?').run(req.params.key);
  res.json({ key: req.params.key, deleted: true });
});

// 전체 key 목록 (디버그/확인용)
app.get('/api/data', (req, res) => {
  const rows = db.prepare('SELECT key, updated_at FROM data').all();
  res.json(rows);
});

app.listen(PORT, () => {
  console.log(`BakerFlow API server running on port ${PORT}`);
});
