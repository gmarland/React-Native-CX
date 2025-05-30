export class ChatService {
  private _chatURL: string;
  private _apiKey: string | undefined;
  private _agentPath: string;
  private _languageCode: string;

  constructor(
    chatURL: string,
    apiKey: string | undefined,
    agentPath: string,
    languageCode: string
  ) {
    this._chatURL = chatURL;
    this._apiKey = apiKey;
    this._agentPath = agentPath;
    this._languageCode = languageCode;
  }

  public async sendMessage(sessionId: string, input: string): Promise<any[]> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this._apiKey) {
        headers['x-api-key'] = this._apiKey;
      }

      console.log('BOOM', `${this._chatURL}?sessionId=${sessionId}`);

      const response = await fetch(`${this._chatURL}?sessionId=${sessionId}`, {
        method: 'POST',
        headers: headers,
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
    } catch (error) {
      console.error('Error retrieving chat:', error);
      return [];
    }
  }
}
