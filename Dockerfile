FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx typeorm migration:run -d dist/config/data-source.js && node dist/main"]