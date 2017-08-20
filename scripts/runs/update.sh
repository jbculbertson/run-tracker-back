#!/bin/bash

TOKEN=Lk/1/4Qia9BNljMVchqvms8aEzFGELOir74DhtKPuAo=--04HwLeWJUxOxCFUO0pBa7s8x/VGQyBZEoU5y+ATvvYk=
ID=5999ba17caae28eb37cf0eba
DISTANCE=10
TIMETAKEN=70

API="http://localhost:4741"
URL_PATH="/runs"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}" \
  --data '{
    "run": {
      "distance": "'"${DISTANCE}"'",
      "timeTaken": "'"${TIMETAKEN}"'"
    }
  }'
echo
