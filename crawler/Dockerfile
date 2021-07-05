FROM cypress/included:7.6.0

WORKDIR /app

COPY package.json ./package.json

RUN yarn install

RUN apt-get update && apt-get -y install apt-utils && apt-get -y install cron
COPY interval-cron /etc/cron.d/interval-cron
RUN crontab /etc/cron.d/interval-cron

COPY reptile.sh .
RUN chmod a+x reptile.sh

COPY . .

ENTRYPOINT ["/app/reptile.sh"]

