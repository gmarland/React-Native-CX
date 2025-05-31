import axios from "axios";
import { GoogleAuth } from "google-auth-library";

import { IChatService } from "./chat.interface";
import { IResponse } from "../interfaces/IResponse";
import { InfoResponse } from "../interfaces/dialogflow/info.response";
import { ChipsResponse } from "../interfaces/dialogflow/chips.response";
import { ButtonResponse } from "../interfaces/dialogflow/button.response";
import { ImageResponse } from "../interfaces/dialogflow/image.response";
import { DescriptionResponse } from "../interfaces/dialogflow/description.response";
import { VideoResponse } from "../interfaces/dialogflow/video.response";
import { TextResponse } from "../interfaces/dialogflow/text.response";
import { ListResponse } from "../interfaces/dialogflow/list.response";
import { FilesResponse } from "../interfaces/dialogflow/files.response";
import { AccordianResponse } from "../interfaces/dialogflow/accordian.response";
import { ImageUploadResponse } from "../interfaces/dialogflow/imageUpload.response";

export class DialogflowService implements IChatService {
  private _projectId: string | null = null;
  private _location: string | null = null;
  private _agentId: string | null = null;
  private _languageCode: string;

  constructor(agentPath: string, languageCode: string = "en") {
    this.parseAgentPath(agentPath);
    this._languageCode = languageCode;
  }

  public async sendMessage(
    sessionId: string,
    sessionVariables: Record<string, string>,
    message: string
  ): Promise<any[]> {
    if (!this._projectId || !this._location || !this._agentId) {
      throw new Error("Invalid agent path");
    }

    const session = `projects/${this._projectId}/locations/${this._location}/agents/${this._agentId}/sessions/${sessionId}`;

    const url = `https://${this._location}-dialogflow.googleapis.com/v3/${session}:detectIntent`;

    const requestBody = {
      queryInput: {
        text: {
          text: message,
        },
        languageCode: this._languageCode,
      },
      queryParams: {
        parameters: sessionVariables,
      },
    };

    try {
      const auth = new GoogleAuth({
        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
      });

      const client = await auth.getClient();
      const accessToken = await client.getAccessToken();

      const response = await axios.post(url, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken.token || accessToken}`,
          "X-Goog-User-Project": this._projectId,
          "Content-Type": "application/json",
        },
      });

      return this.processResponse([response.data]);
    } catch (error) {
      console.error("❌ Error sending message to Dialogflow via REST:", error);
      return [];
    }
  }

  private processResponse(responses: any[]): IResponse[] {
    const processedResponses: IResponse[] = [];

    for (const response of responses.filter((r: any) => r !== null)) {
      for (const message of response.queryResult.responseMessages || []) {
        if (message.text) {
          processedResponses.push(
            new TextResponse(message.text.text[0], false)
          );
        } else if (message.payload) {
          if (
            message.payload.richContent &&
            Array.isArray(message.payload.richContent)
          ) {
            const structValues = this.findStructValues(
              message.payload.richContent
            );
            if (structValues) {
              for (const structValue of structValues) {
                const responseType = structValue.type ? structValue.type : null;

                if (responseType) {
                  const response = structValue;
                  const processedResponse = this.buildResponse(
                    responseType,
                    response
                  );
                  if (processedResponse) {
                    processedResponses.push(processedResponse);
                  }
                }
              }
            }
          }
        }
      }
    }

    return processedResponses;
  }

  private findStructValues(listValues: any[]): any[] {
    const structValues: any[] = [];

    if (listValues) {
      for (const value of listValues) {
        if (value !== null) {
          if (typeof value == "object" && !Array.isArray(value)) {
            structValues.push(value);
          } else if (Array.isArray(value)) {
            if (value.length > 1) {
              structValues.push({
                type: "list",
                values: value,
              });
            } else {
              const nestedValues = this.findStructValues(value);
              if (nestedValues) structValues.push(...nestedValues);
            }
          }
        }
      }
    }

    return structValues;
  }

  private buildResponse(responseType: string, response: any): IResponse | null {
    try {
      switch (responseType) {
        case "info":
          return new InfoResponse(response);
        case "description":
          return new DescriptionResponse(response);
        case "image":
          return response.rawUrl ? new ImageResponse(response) : null;
        case "video":
          return new VideoResponse(response);
        case "button":
          return response.text ? new ButtonResponse(response) : null;
        case "list":
          return new ListResponse(response);
        case "accordion":
          return new AccordianResponse(response);
        case "chips":
          return new ChipsResponse(response);
        case "files":
          return new FilesResponse(response);
        case "html":
          return new TextResponse(response.html, false);
        case "image_upload":
          return new ImageUploadResponse(response);
        default:
          console.warn(`Unknown response type: ${responseType}`);
          return null;
      }
    } catch (error) {
      console.error("Error building response:", error);
      return null;
    }
  }

  private parseAgentPath(agentPath: string): void {
    const parts = agentPath.split("/");
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === "projects") this._projectId = parts[i + 1];
      if (parts[i] === "locations") this._location = parts[i + 1];
      if (parts[i] === "agents") this._agentId = parts[i + 1];
    }

    if (!this._projectId || !this._location || !this._agentId) {
      throw new Error("Invalid agent path");
    }
  }
}
