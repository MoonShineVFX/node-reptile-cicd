FROM cypress/included:7.6.0

WORKDIR /app

COPY package.json ./package.json

RUN yarn install

COPY . .

ENV CI=1
