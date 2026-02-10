FROM node:18-alpine

WORKDIR /app

RUN npm install -g ts-node typescript

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npx", "ts-node", "index.ts"]