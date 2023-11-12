export default function prefillReqBody(fields) {
  return (req, res, next) => {
    for (const key in fields) {
      let value = fields[key];
      if (!req.body[key]) {
        if (typeof value === "function") {
          value = value(req);
        }
        req.body[key] = value;
      }
    }
    next();
  };
}
