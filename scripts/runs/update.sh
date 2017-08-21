#!/bin/bash

TOKEN=Z5B9c4C8Tt6zhkZi3xz2oQaRTKiOfrRkR4O8ROHFWZE=--OzDFvUYM9evYeY3xpo9rBt3HPzJKF0ptSzKdBgdCziI=
ID=5999ba17caae28eb37cf0eba
DISTANCE=10
TIMETAKEN=70
ROUTE={[
          {lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}
        ]}

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
      "route": "'"${ROUTE}"'",
      "timeTaken": "'"${TIMETAKEN}"'"
    }
  }'
echo
