FROM cypress/included:7.0.0

WORKDIR /app

COPY package.json ./package.json

RUN yarn install

COPY . .
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -y install apt-utils && apt-get -y install cron
COPY interval-cron /etc/cron.d/interval-cron
RUN chmod 0644 /etc/cron.d/interval-cron
RUN crontab /etc/cron.d/interval-cron

RUN chmod a+x /app/reptile.sh

ENV CI=1
ENV DEBIAN_FRONTEND=newt

ENTRYPOINT [ "/app/reptile.sh" ]
# ENTRYPOINT [ "/bin/bash" ]