import { IResponse } from "../IResponse";

export class AccordianResponse implements IResponse {
  private _title: string;
  private _subtitle: string | null;
  private _image: string | null;
  private _text: string | null;

  constructor(response: any) {
    this._title = response.title.stringValue;
    this._subtitle = response.subtitle ? response.subtitle.stringValue : null;
    this._image = response.image
      ? response.image.structValue.fields.rawUrl.stringValue
      : null;
    this._text = response.text ? response.text.stringValue : null;
  }

  public toJSON() {
    return {
      type: "accordian",
      content: {
        title: this._title,
        subtitle: this._subtitle,
        image: this._image,
        text: this._text,
      },
    };
  }
}
