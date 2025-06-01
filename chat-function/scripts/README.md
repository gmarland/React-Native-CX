# Dialogflow CX Middleware Function

## Overview

This function is required to use the React Native chat component. Directly calling Dialogflow from a component would require either creating a service account and distributing a key file with every app, or managing a shadow OAuth flow within the component—both of which are undesirable.

The deploy.sh script in this package deploys the chat function. It must be run and deployed within the same Google Cloud project as your Dialogflow CX (Google Conversational Agent) project. This chat function acts as a proxy, allowing the React Native component to securely communicate with your agent.

## Running the deploy.sh script

You can deploy the chat function manually, but a deploy.sh script is provided to automate the process.

To run this script, first log in to your Google Cloud account via the command line:

```bash
gcloud auth login
```

Next, make sure the script is executable:

```bash
sudo chmod +x ./deploy.sh
```

Finally, run the script to deploy the function:

```bash
./deploy.sh
```

### Script prompts

When the deploy script runs, you will be prompted to enter the following details:

```bash
🧾 Google Cloud Project ID:
🌍 Region (e.g., us-central1):
📛 Cloud Function Name:
🔑 Would you like to set an optional API key for the function? (y/n):
```

If you choose to use an API key, you will also be prompted to enter it:

```bash
🔑 Enter the API key:
```

### Prompt Details

#### 🧾 Google Cloud Project ID

The ID of the Google Cloud project where the function should be deployed.
**Note:** This **must** be the same project that hosts your Dialogflow CX agent.

#### 🌍 Region

This is the region you would like to deploy the cloud function to.

#### 📛 Cloud Function Name

The name the function will be given in Google Cloud Platform after deployment.

#### 🔑 API Key (Optional)

An optional key you can set for added security. If provided, the Cloud Function will reject any incoming requests that do not include this key in the headers.

> This key does not need to be generated in Google Cloud. It can be any string you choose.
> It serves as a lightweight way to restrict access to your chat endpoint and prevent unauthorized usage.

## All done!

Once the function is deployed, you will need the function’s URL and (if used) the API key to configure the chat widget.

For example, if your function was deployed to https://europe-west1.cloudfunctions.net/tester with an API key of 12345678, you would configure the chat widget like this:

```javascript
<ChatDialog
  chatURL="https://europe-west1.cloudfunctions.net/tester"
  apiKey="12345678"
/>
```

If you need assistance deploying the function or would like customizations, feel free to email gareth@dotstorming.com.
