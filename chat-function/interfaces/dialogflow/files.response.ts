import { IResponse } from "../IResponse";

class File {
  private _name: string | null;
  private _image: string | null;
  private _url: string | null;

  constructor(name: string, image: string, url: string) {
    this._name = name;
    this._image = image;
    this._url = url;
  }
  public get name() {
    return this._name;
  }
  public get image() {
    return this._image;
  }
  public get url() {
    return this._url;
  }
  public toJSON() {
    return {
      name: this._name,
      image: this._image,
      url: this._url,
    };
  }
}

export class FilesResponse implements IResponse {
  private _files: File[] = [];

  constructor(response: any) {
    for (const file of response.files) {
      if (file.anchor) {
        this._files.push(
          new File(
            file.name ? file.name : null,
            file.image ? file.image.rawUrl : null,
            file.anchor.href
          )
        );
      }
    }
  }

  public toJSON() {
    return {
      type: "files",
      content: this._files.map((file) => file.toJSON()),
    };
  }
}
