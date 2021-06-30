#!/bin/sh

# 排程
20 15 * * * export TZ=Asia/Taipei; npx cypress run -s cypress/integration/hr/workDate_aDay.js > /proc/1/fd/1 2>/proc/1/fd/2
# 30 3 * * * export TZ=Asia/Taipei; cypress run -s cypress/integration/hr/workDate_aMonth.js > /proc/1/fd/1 2>/proc/1/fd/2

# 55 14 * * * export TZ=Asia/Taipei; echo "hiiii" >> /usr/bin/cron.log

# cron job 時間格式
# https://support.acquia.com/hc/en-us/articles/360004224494-Cron-time-string-format
