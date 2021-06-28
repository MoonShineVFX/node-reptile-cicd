FROM node:16-alpine3.11

WORKDIR /app

COPY package.json ./package.json

RUN yarn install

COPY . .

CMD npm start
