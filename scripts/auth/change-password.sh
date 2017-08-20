#!/bin/bash
ID=59999fb38c4fd6dedf11f636
TOKEN=1Xzu/Az6D/LGH6a9Ma/Q/FYxwI/Q+tpecfCwhDjyZEc=--FquY18HiV1gTtJjz9lYpb+MdEyhM5C/J9/4DcV1tdQM=
OLDPW='cc'
NEWPW='jj'

API="http://localhost:4741"
URL_PATH="/change-password"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
