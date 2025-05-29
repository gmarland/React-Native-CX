import { IResponse } from "../IResponse";

class Chip {
  private _title: string;
  private _subtitle: string;
  private _image: string;
  private _url: string;

  constructor(title: string, subtitle: string, image: string, url: string) {
    this._title = title;
    this._subtitle = subtitle;
    this._image = image;
    this._url = url;
  }

  public get title() {
    return this._title;
  }

  public get subtitle() {
    return this._subtitle;
  }

  public get image() {
    return this._image;
  }

  public get url() {
    return this._url;
  }

  public toJSON() {
    return {
      title: this._title,
      subtitle: this._subtitle,
      image: this._image,
      url: this._url,
    };
  }
}

export class ChipsResponse implements IResponse {
  private _chips: Chip[] = [];

  constructor(response: any) {
    response.options.map((chip: any) => {
      if (chip.text || chip.image) {
        this._chips.push(
          new Chip(
            chip.text ? chip.text : "",
            chip.subtitle ? chip.subtitle : "",
            chip.image ? chip.image.rawUrl : "",
            chip.anchor ? chip.anchor.href : ""
          )
        );
      }
      return null;
    });
  }

  public toJSON() {
    return {
      type: "chips",
      content: this._chips.map((chip) => chip.toJSON()),
    };
  }
}
