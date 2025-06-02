# React Native DFCX Component

> A customizable React Native chat interface for Dialogflow CX agents

This React Native component provides a chat interface that communicates securely with a Dialogflow CX agent via a Google Cloud Function middleware proxy. It supports a wide range of Dialogflow Messenger response types and is designed to drop easily into any mobile app using React Native.

> 🔧 **Note**: You must deploy the required [Cloud Function Middleware](../cloud-function/README.md) in your Google Cloud project before using this component.

---

<p align="center">
  <br/>
  <img src="https://raw.githubusercontent.com/gmarland/react-native-DFCX/refs/heads/main/readme-images/preview.gif" width="300"/>
</p>

## Supported Dialogflow Response Types

The component supports the following standard Dialogflow response types in your conversation flows, as detailed in Google’s documentation: [Dialogflow Messenger Fulfillment](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger/fulfillment):

- **Text**: Simple text responses
- **Description**: Multi-line text with a header and body
- **Info**: Image with a title, body text, and optional URL
- **Image**: Direct image display
- **Video**: Embedded video via URL
- **Button**: Interactive buttons
- **List**: Scrollable lists of items with titles, subtitles, and images
- **Files**: Downloadable file attachments with name and preview
- **Chips**: Quick reply suggestions
- **Accordion**: Expandable content blocks

> **NOTE** This component requires the chat Cloud Function to be deployed in the same Google Cloud project as your Dialogflow CX agent.

## Installation

```sh
npm install react-native-dfcx
```

## Basic Usage

```js
import { ChatDialog } from 'react-native-dfcx';

<ChatDialog
  chatURL="https://europe-west1-dotstorming.cloudfunctions.net/cx-chat"
  apiKey="cb2be986-6b84-4ab1-8eeb-b2fc40402077"
  agentPath="https://dialogflow.cloud.google.com/cx/projects/dotstorming/locations/global/agents/4459aa96-eebe-4419-8d28-77207f442165"
  sessionTimeout={30}
  mainColor="#ff0000"
  mainTextColor="#FFFFFF"
  sessionVariables={{
    userId: '12345',
    userName: 'John Doe',
  }}
/>;
```

## Props

| Name               | Type   | Required | Default        | Description                                                            |
| ------------------ | ------ | -------- | -------------- | ---------------------------------------------------------------------- |
| `chatURL`          | string | ✅       | —              | The URL of your deployed Dialogflow CX chat function.                  |
| `apiKey`           | string | ❌       | —              | Optional API key required to call the chat function.                   |
| `agentPath`        | string | ✅       | —              | The full Dialogflow Agent path URL.                                    |
| `languageCode`     | string | ❌       | `'en'`         | Language code of the Dialogflow CX agent.                              |
| `sessionTimeout`   | number | ❌       | `30`           | Time in minutes before session resets and new session ID is generated. |
| `placeholder`      | string | ❌       | `'Message...'` | Input placeholder text.                                                |
| `startMessage`     | string | ❌       | —              | Hidden message sent to Dialogflow when session starts.                 |
| `welcomeMessage`   | string | ❌       | —              | Message shown to user at session start (not sent to Dialogflow).       |
| `mainColor`        | string | ✅       | —              | Background color for user messages.                                    |
| `mainTextColor`    | string | ✅       | —              | Color for user input text.                                             |
| `sessionVariables` | object | ❌       | `{}`           | Parameters sent with each user input.                                  |

## Retrieving your Agent Path

To find your agent path:

1. Go to the Dialogflow CX Console.
2. Open your project and view the list of agents.
3. Click the clipboard icon next to your agent to copy its path.

<p align="center">
  <br/>
  <img src="https://github.com/gmarland/react-native-DFCX/raw/refs/heads/main/readme-images/dfcx-agent.png" width="800px"/>
  <br/>
</p>

The copied URL can be pasted directly into the agentPath prop.

## Need Help?

For help or customizations, reach out to gareth@dotstorming.com.
