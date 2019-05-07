#!/bin/sh +x
set -e

apk add curl

(cd api && npm install && PORT=4000 npm start &)

(cd app && npm install && yarn pre-dist && yarn serve &)

while true; do
  result="$(curl -s http://hub:4444 > /dev/null && echo ok || echo fail)"
  echo "$result"
  if [ "$result" == "ok" ]; then
    break
  fi
  sleep 5
done

while true; do
  result="$(curl -s http://ci:4000 > /dev/null && echo ok || echo fail)"
  echo "$result"
  if [ "$result" == "ok" ]; then
    break
  fi
  sleep 5
done

while true; do
  result="$(curl -s http://ci:4200 > /dev/null && echo ok || echo fail)"
  echo "$result"
  if [ "$result" == "ok" ]; then
    break
  fi
  sleep 5
done


(cd e2e && npm install && npm test && cd ../app && VUE_APP_API=https://vuttr-rest-api.herokuapp.com yarn dist && chmod a+w -R dist)

exit 0
