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

  public async sendMessage(
    sessionId: string,
    input: string,
    sessionVariables: Record<string, string>
  ): Promise<any[]> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this._apiKey) {
        headers['x-api-key'] = this._apiKey;
      }

      const response = await fetch(`${this._chatURL}?sessionId=${sessionId}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          input,
          agentPath: this._agentPath,
          languageCode: this._languageCode,
          sessionVariables: sessionVariables,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return response.json();
    } catch (error) {
      return [
        {
          type: 'error',
          content: {
            message:
              error instanceof Error
                ? error.message
                : 'An error occurred processing your message. Please try again.',
          },
        },
      ];
    }
  }
}
