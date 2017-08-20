#!/bin/sh

TOKEN=UGWqFzQXHfH1VSDjwzjZQEYiBPjG23w2H4Q8HVo0i6A=--WXyeEEWW84b2gdWNC0yj3KtwR/4uoFFAvYFq8mGadiY=

API="http://localhost:4741"
URL_PATH="/runs"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
