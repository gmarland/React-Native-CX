import { IResponse } from "../IResponse";

export class DescriptionResponse implements IResponse {
  private _title: string | null;

  private _texts: string[] = [];

  constructor(response: any) {
    this._title = response.title;

    if (response.text && Array.isArray(response.text)) {
      for (let i = 0; i < response.text.length; i++) {
        if (response.text[i]) {
          this._texts.push(response.text[i]);
        }
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
