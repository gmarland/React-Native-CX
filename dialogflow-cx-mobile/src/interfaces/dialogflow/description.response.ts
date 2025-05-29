import { IResponse } from "../IResponse";

export class DescriptionResponse implements IResponse {
  private _title: string | null;

  private _texts: string[] = [];

  constructor(response: any) {
    this._title = response.title.stringValue;

    for (let i = 0; i < response.text.listValue.values.length; i++) {
      if (response.text.listValue.values[i].stringValue) {
        this._texts.push(response.text.listValue.values[i].stringValue);
      }
    }
  }

  public toJSON() {
    return {
      type: "description",
      content: {
        title: this._title,
        texts: this._texts,
      },
    };
  }
}
