FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run build && npm run migration:run && npm run start:prod"]