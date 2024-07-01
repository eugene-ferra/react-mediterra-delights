import { validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  const reqErrors = req?.errors || [];

  if (!errors.isEmpty() || !!reqErrors.length) {
    return res.status(400).json({
      status: "fail",
      errors: req?.errors || errors.array(),
    });
  }

  next();
};

export default handleValidation;
