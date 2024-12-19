#FROM node:20-alpine
#
#WORKDIR /src
#
#COPY package.json .
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 3000
#
#CMD [ "npm", "start" ]

FROM node:20-alpine

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# 디버깅을 위해 명령어를 바꿉니다.
CMD ["sh", "-c", "npm start && tail -f /dev/null"]