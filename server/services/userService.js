import { UserDTO } from "../dto/userDTO.js";
import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import { authService } from "./authService.js";
import bcrypt from "bcrypt";
import { AuthDTO } from "../dto/authDTO.js";

export default class userService {
  static async getAll({ filterObj, sortObj, page = 1, limit = 15, populateObj }) {
    const data = await userModel
      .find(filterObj)
      .sort(sortObj)
      .skip(--page * limit)
      .limit(limit)
      .populate(populateObj);

    if (!data.length) {
      throw new AppError("No documents match the current filters!", 404);
    }

    return data.map((item) => new UserDTO(item));
  }

  static async getOne({ id, populateObj }) {
    const doc = await userModel.findById(id).populate(populateObj).exec();

    if (!doc) throw new AppError("There aren't documents with this id!", 404);

    return [new UserDTO(doc)];
  }

  static async registration({ name, lastName, email, password, device }) {
    const candidate = await userModel.findOne({ email });

    if (candidate) throw new AppError("User with this email has already exist!", 409);

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await userModel.create({
      name,
      lastName,
      email,
      password: hashPassword,
    });

    const payload = new AuthDTO(user);
    const tokens = authService.generateTokens({ ...payload });
    await authService.saveToken(payload.id, tokens.refreshToken, device);

    return { user: new UserDTO(user), ...tokens };
  }

  static async login(email, password, device) {
    const user = await userModel.findOne({ email });

    if (!user) throw new AppError("Invalid email", 400);

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw new AppError("Invalid password", 400);

    const payload = new AuthDTO(user);
    const tokens = authService.generateTokens({ ...payload });

    await authService.saveToken(payload.id, tokens.refreshToken, device);
    return { user: new UserDTO(user), ...tokens };
  }

  static async logout(refreshToken, device) {
    const token = await authService.removeToken(refreshToken, device);
    return token;
  }

  static async refresh(refreshToken, device) {
    if (!refreshToken) throw new AppError("You are not log in!", 401);

    const userData = await authService.validateRefreshToken(refreshToken);
    if (!userData) throw new AppError("Invalid refresh token", 400);

    const tokenFromDb = await authService.findUserTokens(userData.id, refreshToken);
    if (!tokenFromDb) throw new AppError("You are not log in", 401);

    const user = await userModel.findById(userData.id);
    const payload = new AuthDTO(user);
    const tokens = authService.generateTokens({ ...payload });

    await authService.saveToken(payload.id, tokens.refreshToken, device);
    return { user: new UserDTO(user), ...tokens };
  }

  static async userInteractionAdd(id, arrName, data) {
    const user = await userModel.findByIdAndUpdate(
      id,
      { $addToSet: { [arrName]: data } },
      { new: true }
    );
    return [new UserDTO(user)];
  }

  static async userInteractionDelete(id, arrName, data) {
    const user = await userModel.findByIdAndUpdate(
      id,
      { $pull: { [arrName]: data } },
      { new: true }
    );
    return [new UserDTO(user)];
  }
}
