import { IResponse } from "../IResponse";

export class ImageResponse implements IResponse {
  private _imageURL: string | null;

  constructor(response: any) {
    this._imageURL = response.rawUrl ? response.rawUrl : null;
  }

  public toJSON() {
    return {
      type: "image",
      content: {
        url: this._imageURL,
      },
    };
  }
}
