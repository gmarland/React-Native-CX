import { IResponse } from "../IResponse";

export class ButtonResponse implements IResponse {
  private _text: string | null;
  private _url: string | null;

  constructor(response: any) {
    this._text = response.text.stringValue;

    this._url =
      response.anchor && response.anchor.href
        ? response.anchor.structValue.fields.href.stringValue
        : null;
  }

  public toJSON() {
    return {
      type: "button",
      content: {
        text: this._text,
        value: this._url ? this._url : this._text,
      },
    };
  }
}
