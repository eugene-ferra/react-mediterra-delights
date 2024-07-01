import { validationResult } from "express-validator";

export default function fileValidation(errObjs = []) {
  return (req, res, next) => {
    const errors = validationResult(req);

    const errArray = errors.array();

    if (!errors.isEmpty()) {
      errObjs.forEach((errObj) => {
        if (errObj.path && errObj.msg) {
          if (req.files) {
            if (!req.files[errObj.path]) {
              errArray.push(errObj);
            }
          }
          if (req.file) {
            if (req.file.fieldname === errObj.path) {
              errArray.push(errObj);
            }
          }
        }
      });
    }

    req.errors = errArray;

    next();
  };
}
