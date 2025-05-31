#!/bin/bash

# Prompt the user for required input
read -p "🧾 Google Cloud Project ID: " PROJECT_ID
read -p "🌍 Region (e.g., us-central1): " REGION
read -p "📛 Cloud Function Name: " FUNCTION_NAME

# Ask if the user wants to set an optional API key
read -p "🔑 Would you like to set an optional API key for the function? (y/n): " SET_API_KEY

if [[ "$SET_API_KEY" == "y" || "$SET_API_KEY" == "Y" ]]; then
  read -p "🔑 Enter the API key: " API_KEY
  echo "API key set to: $API_KEY"
fi

echo ""
echo "🚀 Deploying function..."
echo "Name: $FUNCTION_NAME"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

if [[ -n "$API_KEY" ]]; then
  gcloud functions deploy "$FUNCTION_NAME" \
    --update-env-vars "API_KEY=$API_KEY" \
    --project="$PROJECT_ID" \
    --region="$REGION" \
    --entry-point="processChat" \
    --runtime=nodejs20 \
    --trigger-http \
    --allow-unauthenticated \
    --source=. \
    --memory=256MB \
    --timeout=60s
else
  gcloud functions deploy "$FUNCTION_NAME" \
    --project="$PROJECT_ID" \
    --region="$REGION" \
    --entry-point="processChat" \
    --runtime=nodejs20 \
    --trigger-http \
    --allow-unauthenticated \
    --source=. \
    --memory=256MB \
    --timeout=60s
fi

echo "✅ Function '$FUNCTION_NAME' deployed successfully!"