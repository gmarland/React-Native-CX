import { IResponse } from "../IResponse";

export class FormResponse implements IResponse {
  private _formdetails: any;

  constructor(response: any) {
    const inputs = this.buildFormDetails(response.inputs.listValue.values);

    this._formdetails = {
      id: response.id?.stringValue,
      introduction: response.introduction?.stringValue,
      postLocation: response.postLocation?.stringValue,
      onCancel: response.onCancel?.stringValue,
      onComplete: response.onComplete?.stringValue,
      inputs: inputs,
    };
  }

  private buildFormDetails(details: any[]) {
    const formDetails = [];

    for (const detail of details) {
      if (detail.structValue && detail.structValue.fields) {
        const newValue: any = {};

        for (const field of Object.keys(detail.structValue.fields)) {
          const key = detail.structValue.fields[field];

          if (key && key.listValue) {
            const values = [];

            for (const value of key.listValue.values) {
              values.push(value.stringValue);
            }

            newValue[field] = values;
          } else {
            let fieldValue = key.stringValue ? key.stringValue : null;
            if (fieldValue === null)
              fieldValue = key.boolValue ? key.boolValue : null;

            newValue[field] = fieldValue;
          }
        }

        formDetails.push(newValue);
      }
    }
    return formDetails;
  }

  public toJSON() {
    return {
      type: "form",
      content: this._formdetails,
    };
  }
}
