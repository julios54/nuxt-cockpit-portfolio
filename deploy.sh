#!/bin/sh

yarn generate
cp ./CNAME ./dist/
cp ./assets/img/favicon.png ./dist/
yarn deploy
