export class ChatService {
  private _chatURL: string;
  private _agentPath: string;
  private _languageCode: string;

  constructor(chatURL: string, agentPath: string, languageCode: string) {
    this._chatURL = chatURL;
    this._agentPath = agentPath;
    this._languageCode = languageCode;
  }

  public async sendMessage(sessionId: string, input: string): Promise<any[]> {
    const response = await fetch(`${this._chatURL}?sessionId=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
        agentPath: this._agentPath,
        languageCode: this._languageCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error sending message: ${response.statusText}`);
    }

    return response.json();
  }
}
