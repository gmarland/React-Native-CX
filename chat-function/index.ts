import { Request, Response } from "express";
import { DialogflowService } from "./services/dialogflow.service";

export const processChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.body || !req.body.input) {
    res.status(400).send("Input is required");
    return;
  }

  if (!req.query.sessionId) {
    res.status(400).send("Session ID is required");
    return;
  }

  const sessionId = req.query.sessionId as string;
  const input = req.body.input;

  const agentPath = req.body.agentPath;
  const languageCode = req.body.languageCode || "en";

  const dialogflowService = new DialogflowService(agentPath, languageCode);

  const responses = await dialogflowService.sendMessage(sessionId, input);

  res.status(200).json(responses.map((r) => r.toJSON()));
};
