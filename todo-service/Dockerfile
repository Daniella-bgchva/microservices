FROM node:20-alpine

WORKDIR /app

RUN npm install -g ts-node typescript

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8021

CMD ["npx", "ts-node", "src/main.ts"]