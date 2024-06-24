export default function prefillReqBody(fields) {
  return (req, res, next) => {
    Object.keys(fields).forEach((key) => {
      let value = fields[key];
      if (!req.body[key]) {
        if (typeof value === "function") {
          value = value(req);
        }
        req.body[key] = value;
      }
    });
    next();
  };
}
