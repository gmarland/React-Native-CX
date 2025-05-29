import { IResponse } from "../IResponse";

export class VideoResponse implements IResponse {
  private _videoURL: string | null;

  constructor(response: any) {
    if (response?.source?.type === "link") {
      this._videoURL = response?.source?.anchor?.href;
    } else {
      throw new Error("Invalid response format for VideoResponse");
    }
  }

  public toJSON() {
    return {
      type: "video",
      content: {
        url: this._videoURL,
      },
    };
  }
}
