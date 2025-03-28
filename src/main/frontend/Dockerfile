# Node.js 기반 이미지 사용
FROM node:20-alpine AS build

# 작업 디렉토리 설정
WORKDIR /src/main/frontend

# package.json과 package-lock.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm cache clean --force && npm config set registry https://registry.npmjs.org/ && npm install

# 소스 코드 복사 및 빌드 실행
COPY . .
RUN npm run build

# 실제 서비스는 가벼운 웹 서버로 제공 (serve 사용)
FROM node:20-alpine AS production
WORKDIR /app

# 빌드된 정적 파일만 복사
# /src/main/frontend/build 디렉토리를 /app/build로 복사
COPY --from=build /src/main/frontend/build /app/build

# 최신 npm 사용 (선택 사항)
RUN npm install -g npm@latest && npm install -g serve

# 컨테이너 실행 시 정적 파일 제공
CMD ["serve", "-s", "build", "-l", "3000"]
