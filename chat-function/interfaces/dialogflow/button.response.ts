import { IResponse } from "../IResponse";

export class ButtonResponse implements IResponse {
  private _text: string | null;
  private _url: string | null;

  constructor(response: any) {
    this._text = response.text;

    this._url =
      response.anchor && response.anchor.href ? response.anchor.href : null;
  }

  public toJSON() {
    return {
      type: "button",
      content: {
        text: this._text,
        url: this._url,
      },
    };
  }
}
