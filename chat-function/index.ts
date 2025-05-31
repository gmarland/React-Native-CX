import { Request, Response } from "express";
import { DialogflowService } from "./services/dialogflow.service";
import dotenv from "dotenv";

dotenv.config();

export const processChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  if (process.env.API_KEY) {
    const apiKey = req.headers["x-api-key"];

    if (apiKey !== process.env.API_KEY) {
      res.status(401).send("Unauthorized - Invalid API Key");
      return;
    }
  }

  if (!req.body || !req.body.input) {
    res.status(400).send("Input is required");
    return;
  }

  if (!req.query.sessionId) {
    res.status(400).send("Session ID is required");
    return;
  }

  const sessionId = req.query.sessionId as string;

  const {
    input,
    agentPath,
    languageCode = "en",
    sessionVariables = {},
  } = req.body;

  const dialogflowService = new DialogflowService(agentPath, languageCode);

  const responses = await dialogflowService.sendMessage(
    sessionId,
    sessionVariables,
    input
  );

  res.status(200).json(responses.map((r) => r.toJSON()));
};
