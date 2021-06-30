FROM cypress/included:7.6.0

WORKDIR /app

COPY package.json ./package.json

RUN yarn install

COPY . .

RUN apt-get update && apt-get -y install cron
COPY interval-cron /etc/cron.d/interval-cron
RUN chmod 0644 /etc/cron.d/interval-cron
RUN crontab /etc/cron.d/interval-cron

RUN chmod a+x /app/reptile.sh

ENV CI=1

ENTRYPOINT [ "/app/reptile.sh" ]
# ENTRYPOINT [ "/bin/bash" ]