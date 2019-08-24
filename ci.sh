#!/bin/sh

test -e dist.ok && rm -fv dist.ok

docker-compose -f ci.yml up -d

(docker-compose -f ci.yml logs -f &)

while true; do
  test -e dist.ok && break || sleep 10
done

(docker-compose -f ci.yml down -v)

(cd app && ./deploy.sh && exit 0 || exit 1)

