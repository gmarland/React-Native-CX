#!/bin/bash

# Prompt the user for required input
read -p "🧾 Google Cloud Project ID: " PROJECT_ID
read -p "🌍 Region (e.g., us-central1): " REGION
read -p "📛 Cloud Function Name: " FUNCTION_NAME

echo ""
echo "🚀 Deploying function..."
echo "Name: $FUNCTION_NAME"
echo "Project: $PROJECT_ID"
echo "Region: $REGION"
echo ""

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

echo "✅ Function '$FUNCTION_NAME' deployed successfully!"