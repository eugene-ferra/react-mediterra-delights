import dotenv from "dotenv";
import AppError from "../utils/appError.js";
import { authService } from "../services/authService.js";

dotenv.config({ path: "./.env" });

export default function protect() {
  return async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return next(new AppError("Please provide authorization token!", 400));
      }

      const decoded = await authService.validateAccessToken(token);

      if (!decoded) return next(new AppError("Invalid authorization token!", 400));

      req.user = { _id: decoded.id, role: decoded.role };
      next();
    } catch (err) {
      next(err);
    }
  };
}
