FROM node:22-alpine

WORKDIR /server

RUN npm install -g ts-node

COPY .env server/package*.json ./
RUN npm install

COPY server/ ./

CMD ["npm", "run", "dev"]