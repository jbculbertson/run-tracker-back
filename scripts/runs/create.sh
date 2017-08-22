#!/bin/bash

DISTANCE=4
TIMETAKEN=28
ROUTE='[{lat: 37.772, lng: -122.214}, {lat: 21.291, lng: -157.821}, {lat: -18.142, lng: 178.431}, {lat: -27.467, lng: 153.027}]'
TOKEN=aYSmAkYIA89UX3B2mjO0/sEXvaFXRsImoKATWueaG3M=--hvp6WNV24R6Iuxk2k68fqgu3bo7twlQpDbyLnam6hJQ=

#

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
      "route": "'"${ROUTE}"'",
      "timeTaken": "'"${TIMETAKEN}"'"
    }
  }'

echo
