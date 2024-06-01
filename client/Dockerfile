FROM node:22-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7837

CMD ["npm", "run", "dev"]