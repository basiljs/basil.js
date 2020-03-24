#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

./node_modules/.bin/jsdoc -t node_modules/tsd-jsdoc/dist -r ./basil.js
cat ./node_modules/types-for-adobe/InDesign/2020/index.d.ts > basil.d.ts
cat ./out/types.d.ts >> basil.d.ts
rm -rf out