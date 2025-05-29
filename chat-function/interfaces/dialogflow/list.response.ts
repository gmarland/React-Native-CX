import { IResponse } from "../IResponse";

class ListItem {
  private _title: string | null;
  private _subtitle: string | null;
  private _image: string | null;
  private _url: string | null;

  constructor(
    title: string | null,
    subtitle: string | null,
    image: string | null,
    url: string | null
  ) {
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

export class ListResponse implements IResponse {
  private _items: ListItem[] = [];

  constructor(response: any) {
    console.log("ListResponse", response);
    for (const item of response.values) {
      if (item && (item.title || item.image)) {
        this._items.push(
          new ListItem(
            item.title ? item.title : null,
            item.subtitle ? item.subtitle : null,
            item.image ? item.image.rawUrl : null,
            item.anchor ? item.anchor.href : null
          )
        );
      }
    }
  }
  public toJSON() {
    return {
      type: "list",
      content: this._items.map((item) => item.toJSON()),
    };
  }
}
