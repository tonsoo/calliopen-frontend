#/bin/bash

mkdir -p api src/api
curl -o api/client.openapi.yaml https://m.calliopen.com.br/api/documentation/yaml
npx openapi-typescript-codegen --input api/client.openapi.yaml --output src/api --client fetch