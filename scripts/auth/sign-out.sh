#!/bin/bash
ID=59999fb38c4fd6dedf11f636
TOKEN=1Xzu/Az6D/LGH6a9Ma/Q/FYxwI/Q+tpecfCwhDjyZEc=--FquY18HiV1gTtJjz9lYpb+MdEyhM5C/J9/4DcV1tdQM=

API="http://localhost:4741"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN"

echo
