#!/bin/bash

tsc
rm -rf dist
mkdir -p dist
cp -r build/* dist/
cp ./deploy.sh dist/
cp ./package.json dist/

cd dist

# Input and output file names
INPUT_FILE="package.json"
OUTPUT_FILE="package.transformed.json"

# Use jq to transform the JSON
jq 'del(.devDependencies)
    | .main = "index.js"
    | .scripts = {}' "$INPUT_FILE" > "$OUTPUT_FILE"

echo "Transformed package.json written to $OUTPUT_FILE"

rm -f "$INPUT_FILE"

mv "$OUTPUT_FILE" "$INPUT_FILE"

echo "package.json has been updated and moved back to its original name."