import { prepareData } from "./prepareData";

export function getFormData(obj, formData = new FormData(), parentKey = "") {
  obj = prepareData(obj);

  for (let key in obj) {
    let fullKey = parentKey ? `${parentKey}.${key}` : key;
    let value = obj[key];

    if (value instanceof File) {
      formData.append(fullKey, value);
    } else if (value instanceof Array) {
      value.forEach((element) => {
        formData.append(`${fullKey}`, element);
      });
    } else if (typeof value === "object" && !(value instanceof File)) {
      getFormData(value, formData, fullKey);
    } else {
      formData.append(fullKey, value);
    }
  }
  return formData;
}
