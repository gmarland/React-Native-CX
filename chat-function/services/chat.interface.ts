export interface IChatService {
  sendMessage(sessionId: string, message: string): Promise<any[]>;
}
