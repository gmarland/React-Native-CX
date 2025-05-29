import { IResponse } from "../IResponse";

export class InfoResponse implements IResponse {
  private _title: string | null;
  private _subtitle: string | null;
  private _image: string | null;
  private _url: string | null;

  constructor(response: any) {
    this._title = response.title ? response.title.stringValue : null;
    this._subtitle = response.subtitle ? response.subtitle.stringValue : null;
    this._image = response.image.structValue.fields.rawUrl
      ? response.image.structValue.fields.rawUrl.stringValue
      : null;
    this._url = response.anchor
      ? response.anchor.structValue.fields.href.stringValue
      : null;
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
