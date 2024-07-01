import dotenv from "dotenv";
import AppError from "../utils/appError.js";
import AuthService from "../services/authService.js";

dotenv.config({ path: "./.env" });

export default function protect() {
  return async (req, res, next) => {
    try {
      const authService = new AuthService();

      const token = req?.cookies?.access;

      if (!token) {
        return next(new AppError("Please provide authorization token!", 401));
      }

      const decoded = await authService.validateAccessToken(token);

      if (!decoded) return next(new AppError("Invalid authorization token!", 401));

      req.user = { _id: decoded.id, role: decoded.role };
      next();
    } catch (err) {
      next(err);
    }
  };
}
