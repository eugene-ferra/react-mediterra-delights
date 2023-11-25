export default function addLinks(req, data, fieldsToModify) {
  const port = process.env.PORT || 3000;
  const linkBegin = `${req.protocol}://${req.hostname}:${port}`;

  const processField = (fieldValue) => {
    if (typeof fieldValue === "string") {
      return `${linkBegin}/${fieldValue.replace(/\\/g, "/")}`;
    } else if (Array.isArray(fieldValue)) {
      return fieldValue.map((item) => processField(item));
    } else if (typeof fieldValue === "object" && fieldValue !== null) {
      for (let key in fieldValue) {
        fieldValue[key] = processField(fieldValue[key]);
      }
    }
    return fieldValue;
  };

  if (typeof data === "object") {
    for (let key in data) {
      if (fieldsToModify.includes(key)) {
        data[key] = processField(data[key]);
      }
    }
  }

  return data;
}
