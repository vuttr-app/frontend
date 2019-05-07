#!/bin/sh

test -e dist.ok && rm -fv dist.ok

docker-compose up -d

(docker-compose logs -f &)

while true; do
  test -e dist.ok && break || sleep 10
done

(docker-compose down -v)

(cd app && ./deploy.sh && exit 0 || exit 1)

