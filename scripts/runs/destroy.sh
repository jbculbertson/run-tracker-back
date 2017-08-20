#!/bin/bash

API="http://localhost:4741"
URL_PATH="/runs"
TOKEN=Lk/1/4Qia9BNljMVchqvms8aEzFGELOir74DhtKPuAo=--04HwLeWJUxOxCFUO0pBa7s8x/VGQyBZEoU5y+ATvvYk=
ID=5999ba71a21a8feb87acfd04


curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=${TOKEN}"

echo
