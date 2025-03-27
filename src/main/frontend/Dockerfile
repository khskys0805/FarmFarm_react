# Node.js 기반 이미지 사용
FROM node:20-alpine AS build

# 작업 디렉토리 설정
WORKDIR /src

# package.json과 package-lock.json 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사 및 빌드 실행
COPY . .
RUN npm run build

# 실제 서비스는 가벼운 웹 서버로 제공 (serve 사용)
FROM node:20-alpine AS production
WORKDIR /app

# 빌드된 정적 파일만 복사
COPY --from=build /src/build /app/build

# serve 패키지 글로벌 설치 (정적 파일 제공)
RUN npm install -g serve

# 컨테이너 실행 시 정적 파일 제공
CMD ["serve", "-s", "build", "-l", "3000"]