export interface IChatService {
  sendMessage(
    sessionId: string,
    sessionVariables: Record<string, string>,
    message: string
  ): Promise<any[]>;
}
