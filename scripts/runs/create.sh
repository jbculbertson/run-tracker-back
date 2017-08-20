#!/bin/bash

DISTANCE='4'
TIMETAKEN='28'
TOKEN=Lk/1/4Qia9BNljMVchqvms8aEzFGELOir74DhtKPuAo=--04HwLeWJUxOxCFUO0pBa7s8x/VGQyBZEoU5y+ATvvYk=

API="http://localhost:4741"
URL_PATH="/runs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "run": {
      "distance": "'"${DISTANCE}"'",
      "timeTaken": "'"${TIMETAKEN}"'"
    }
  }'

echo
