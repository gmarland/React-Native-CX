import { IResponse } from "../IResponse";

export class InfoResponse implements IResponse {
  private _title: string | null;
  private _subtitle: string | null;
  private _image: string | null;
  private _url: string | null;

  constructor(response: any) {
    this._title = response.title ? response.title : null;
    this._subtitle = response.subtitle ? response.subtitle : null;
    this._image = response.image.rawUrl ? response.image.rawUrl : null;
    this._url = response.anchor ? response.anchor.href : null;
  }
  public toJSON() {
    return {
      type: "info",
      content: {
        title: this._title,
        subtitle: this._subtitle,
        image: this._image,
        url: this._url,
      },
    };
  }
}
