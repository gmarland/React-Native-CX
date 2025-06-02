# React Native Chat for Dialogflow CX

This repository contains a React Native chat component and a Google Cloud Function that together allow secure interaction with a **Dialogflow CX conversational agent**.

## 🚀 Overview

Dialogflow CX does not support direct client-side integration without exposing service account credentials or requiring OAuth flows. This project solves that by providing:

1. 🧠 A **React Native component** (`/component`) for rendering Dialogflow CX conversations.
2. 🔐 A **Google Cloud Function** (`/cloud-function`) that acts as a secure middleware proxy between the component and your Dialogflow agent.

---

## 📁 Project Structure

```
/
├── component         # React Native component: <ChatDialog />
├── cloud-function    # Google Cloud Function middleware proxy
```

---

## 🔧 Requirements

- A Google Cloud Platform project with Dialogflow CX enabled
- Node.js and npm
- React Native development environment (React Native ≥ 0.70 recommended)

---

## 🧱 Setup Steps

### 1. Deploy the Cloud Function

Go to the [`cloud-function`](./cloud-function) folder and follow the [deployment instructions](./cloud-function/README.md). You’ll run a script that:

- Deploys the function to Google Cloud
- Optionally secures it with an API key
- Outputs the function URL for use in the React Native app

### 2. Add the Component to Your App

Go to the [`component`](./component) folder and follow the [component usage guide](./component/README.md) or install directly via npm:

```bash
npm install react-native-dfcx
```

Then use it in your React Native app:

```tsx
import { ChatDialog } from "react-native-dfcx";

<ChatDialog
  chatURL="YOUR_CLOUD_FUNCTION_URL"
  apiKey="YOUR_API_KEY_IF_USED"
  agentPath="YOUR_DIALOGFLOW_AGENT_PATH"
  mainColor="USER_INPUTS_BACKGROUND_COLOR"
  mainTextColor="USER_INPUTS_TEXT_COLOR"
/>;
```

---

## 💬 Supported Dialogflow Features

The component supports all standard [Dialogflow Messenger response types](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger/fulfillment), including:

- Text, Buttons, Chips
- Info cards
- Image & Video responses
- Lists, Accordions, File downloads
- Custom session variables
- Custom welcome and start messages

---

## 📘 Example

<p align="center">
<img src="./readme-images/preview.gif" width="250"/>
</p>

---

## ❓ Need Help?

If you get stuck or want custom features, feel free to reach out:

📧 **gareth@dotstorming.com**
