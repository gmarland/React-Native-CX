import { IResponse } from "../IResponse";

export class TextResponse implements IResponse {
  private _content: string;
  private _isSelf: boolean;

  constructor(content: string, isSelf: boolean) {
    this._content = content;
    this._isSelf = isSelf;
  }

  public toJSON() {
    return {
      type: "text",
      content: {
        content: this._content,
        isSelf: this._isSelf,
      },
    };
  }
}
