#!/bin/bash
# BakerFlow V3.0 배포 스크립트
# GitHub v3-online 브랜치에서 최신 화면 파일을 받아오고, 백엔드 서버를 재시작합니다.
set -e

BRANCH="v3-online"
RAW="https://raw.githubusercontent.com/rabean80/ayo-baking/$BRANCH"

echo "1) 화면 파일 최신화..."
sudo curl -sL -o /var/www/ayobaking/index.html "$RAW/index.html"
sudo curl -sL -o /var/www/ayobaking/baking_scheduler_v2.html "$RAW/baking_scheduler_v2.html"
sudo curl -sL -o /var/www/ayobaking/manifest.json "$RAW/manifest.json"
sudo curl -sL -o /var/www/ayobaking/sw.js "$RAW/sw.js"

echo "2) 백엔드 서버 코드 최신화..."
curl -sL -o ~/bakerflow-server/server.js "$RAW/server/server.js"

echo "3) 백엔드 서버 재시작..."
sudo systemctl restart bakerflow

echo "4) 상태 확인..."
sleep 1
sudo systemctl is-active bakerflow
curl -s https://ayobaking.studiomiw.com/api/health
echo ""
echo "배포 완료!"
