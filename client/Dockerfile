FROM node:18-alpine
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
