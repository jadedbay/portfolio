FROM node:22-alpine

WORKDIR /server

RUN npm install -g ts-node

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8737

CMD ["npm", "run", "dev"]