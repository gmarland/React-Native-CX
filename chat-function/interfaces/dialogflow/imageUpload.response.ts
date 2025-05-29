import { IResponse } from "../IResponse";

export class ImageUploadResponse implements IResponse {
  private _postLocation: string | null;

  constructor(response: any) {
    this._postLocation = response.postLocation;
  }

  public toJSON() {
    return {
      type: "imageUpload",
      content: {
        postLocation: this._postLocation,
      },
    };
  }
}
