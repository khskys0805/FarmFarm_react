# ✅ 1. Node.js 기반 이미지 사용 (빌드 단계)
FROM node:20-alpine AS build

# ✅ 2. 작업 디렉토리 설정
WORKDIR /app

# ✅ 3. package.json과 package-lock.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm cache clean --force && npm config set registry https://registry.npmjs.org/ && npm install

# ✅ 4. 환경 변수 파일 복사 (.env 포함)
COPY .env ./

# ✅ 5. 소스 코드 복사 및 빌드 실행
COPY . .
RUN npm run build

# ✅ 6. 실제 서비스용 경량 Node.js 이미지 사용 (배포 단계)
FROM node:20-alpine AS production

# ✅ 7. 작업 디렉토리 설정
WORKDIR /app

# ✅ 8. 빌드된 정적 파일만 복사
COPY --from=build /app/build /app/build

# ✅ 9. 최신 npm 사용 (선택 사항) 및 정적 파일 제공을 위한 serve 설치
RUN npm install -g npm@latest && npm install -g serve

# ✅ 10. 컨테이너 실행 시 정적 파일 제공
CMD ["serve", "-s", "build", "-l", "3000"]