#!/bin/sh

yarn generate
cp ./CNAME ./dist/
yarn deploy
