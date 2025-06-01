# Dialogflow CX Middleware Function

## Overview

This function is required to use the React Native chat component. Directly calling Dialogflow from a component would require either creating a service account and distributing a key file with every app, or managing a shadow OAuth flow within the component—both of which are undesirable.

The deploy.sh script in this package deploys the chat function. It must be run and deployed within the same Google Cloud project as your Dialogflow CX (Google Conversational Agent) project. This chat function acts as a proxy, allowing the React Native component to securely communicate with your agent.

## Running the deploy.sh script

You can deploy the chat function yourself, but there is a deploy.sh provided. This will deploy and set up the function for you.

In order to run this script, you will first need to log into your Google Cloud via command line:

```bash
gcloud auth login
```

Once you have logged in, you should make sure that you can run the deploy script This can be done as follows:

```bash
sudo chmod +x ./deploy.sh
```

Finally, run the script:

```bash
./deploy.sh
```
