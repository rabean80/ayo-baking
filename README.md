# 🥐 AYO Baking Planner

Baking scheduler, recipe cards, baking history & tip notes, all in one place

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-brightgreen)](https://[username].github.io/baking-studio/)
![HTML](https://img.shields.io/badge/HTML-pure%20vanilla-orange)
![No Framework](https://img.shields.io/badge/framework-none-lightgrey)

---

## ✨ 주요 기능

| 탭 | 기능 |
|---|---|
| 🥖 **스케줄러** | 빵 종류별 단계를 드래그해서 완성 목표 시각에 맞게 역산 |
| 📖 **레시피** | 이모지·태그·온도·시간·노트로 나만의 레시피 카드 저장 |
| 📅 **히스토리** | 날짜별 베이킹 기록 + 5점 평가 + 개선 메모 |
| 💡 **베이킹 팁** | 폴더로 분류하는 나만의 베이킹 사전 |

---

## 🍞 공정 편집, 스케줄러 지원 

> 베이킹 아이템별 공정 생성 및 수정, 일정 기입
> 모든 빵은 완성 목표 시각을 기준으로 전 단계가 자동 역산됩니다.
> 한 종류부터 다양한 종류의 베이킹 플랜을 체계적으로 짤 수 있습니다.

---

## 🚀 사용 방법

````bash
# 별도 설치 없음 — 브라우저에서 바로 열기
open index.html
````

또는 배포된 주소로 접속:
````
https://[rabean80].github.io/ayo-baking/
````

---

## 📁 파일 구조

````
ayo-baking/
├── index.html                    # 메인 앱 (스튜디오 홈)
└── baking_scheduler_v2.html      # 드래그 타임라인 스케줄러
````

---

## 💾 데이터 저장

레시피, 히스토리, 팁은 **브라우저 localStorage**에 저장됩니다.
서버나 계정 없이 내 브라우저에서 바로 동작해요.

> ⚠️ 브라우저 캐시를 지우면 데이터가 초기화될 수 있으니 주요 레시피는 별도로 백업해두세요.

---

## 🛠️ 기술 스택

- **Vanilla HTML / CSS / JavaScript** (프레임워크 없음)
- **localStorage** 데이터 저장
- **GitHub Pages** 배포

---

## 📌 앞으로 계획 (Roadmap)

- [ ] 빵 프로젝트 추가 (바게트, 포카치아 등)
- [ ] 레시피 내보내기 (JSON / 인쇄)
- [ ] 회원가입 & 클라우드 저장
- [ ] 모바일 앱 버전 (PWA)

---

*Made with 🧡 by Ayoung*
