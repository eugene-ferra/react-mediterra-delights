export default function addLinks(req, data, fieldsToModify) {
  const port = process.env.PORT || 3000;
  const linkBegin = `${req.protocol}://${req.hostname}:${port}`;

  const processField = (fieldValue) => {
    if (typeof fieldValue === "string") {
      if (fieldValue.startsWith(linkBegin)) return fieldValue.replace(/\\/g, "/");
      return `${linkBegin}/${fieldValue.replace(/\\/g, "/")}`;
    }
    if (Array.isArray(fieldValue)) {
      return fieldValue.map((item) => processField(item));
    }
    if (typeof fieldValue === "object" && fieldValue !== null) {
      Object.keys(fieldValue).forEach((key) => {
        fieldValue[key] = processField(fieldValue[key]);
      });
    }
    return fieldValue;
  };

  if (typeof data === "object") {
    Object.keys(data).forEach((key) => {
      if (fieldsToModify.includes(key)) {
        data[key] = processField(data[key]);
      }
    });
  }

  return data;
}
