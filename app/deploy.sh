#!/bin/sh +x
set -e

SOURCE_BRANCH="master"

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy."
    exit 0
fi

cd dist

sed -e "s|<title>VUTTR</title>|<title>VUTTR [$TRAVIS_BUILD_NUMBER]</title>|g" index.html > out && mv out index.html

git init

git config user.name "mestihudson"
git config user.email "mestihudson@gmail.com"

git add --all

git commit -m 'Deploy to Github Pages'

git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
