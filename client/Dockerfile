FROM node:22-alpine

WORKDIR /client

COPY .env client/package*.json ./
RUN npm install

COPY client/ ./

CMD ["npm", "run", "dev"]