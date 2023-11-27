import { UserDTO } from "../dto/userDTO.js";
import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import { authService } from "./authService.js";
import bcrypt from "bcrypt";
import { AuthDTO } from "../dto/authDTO.js";
import { fileService } from "./fileService.js";

const folder = "users";
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

  static async addToArray(id, arrName, data, dataModel) {
    const itemId = data?.id || data;
    const addedItem = await dataModel.findById(itemId);
    if (!addedItem) throw new AppError("Item with this id does not exists!", 404);

    const user = await userModel.findById(id);
    if (!user) throw new AppError("User with this id does not exists!", 404);

    const foundItem = user[arrName].find((item) => {
      if (item?.id) {
        return item.id.toString() === itemId.toString();
      } else {
        return item.toString() === itemId.toString();
      }
    });

    if (foundItem) throw new AppError("Item already added!", 409);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $push: { [arrName]: data } },
      { new: true }
    );
    return [new UserDTO(updatedUser)];
  }

  static async deleteFromArray(id, arrName, itemId) {
    const user = await userModel.findById(id);
    if (!user) throw new AppError("User with this id does not exists!", 404);

    const foundItem = user[arrName].find((item) => {
      if (item && item.id) {
        return item.id.toString() === itemId.toString() ? item : false;
      } else {
        return item.toString() === itemId.toString() ? item : false;
      }
    });

    if (!foundItem) throw new AppError("This item does not exist!", 404);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $pull: { [arrName]: { _id: foundItem?.id || foundItem } } },
      { new: true }
    );
    return [new UserDTO(updatedUser)];
  }
  static async updateCart(userId, itemId, quantity) {
    const user = await userModel.findById(userId);
    const foundItemIndex = user.cart.findIndex(
      (item) => item.id.toString() === itemId.toString()
    );

    if (foundItemIndex === -1) throw new AppError("This item does not exist!", 404);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: { [`cart.${foundItemIndex}.quantity`]: quantity },
      },
      { runValidators: true, new: true }
    );

    return [new UserDTO(updatedUser)];
  }

  static async updateOne(id, data, avatar) {
    const doc = await userModel.findById(id);
    if (!doc) throw new AppError(`There aren't users with this id!`, 404);
    const payload = `${data?.name || doc.name}-${data?.lastName || doc.lastName}`;

    const savedAvatar = await fileService.saveOneImage(avatar, folder, payload, 300);

    if (savedAvatar) data["avatar"] = savedAvatar;

    if (data?.oldPassword || data?.password) {
      if (!data?.oldPassword) throw new AppError("Provide oldPassword!", 400);
      if (!data?.password) throw new AppError("Provide password!", 400);
      if (!(await bcrypt.compare(data.oldPassword, doc.password)))
        throw new AppError("Invalid oldPassword", 400);
    }

    try {
      const updatedDoc = await userModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      if (savedAvatar) await fileService.deleteFiles(doc.avatar);

      return [new UserDTO(updatedDoc)];
    } catch (err) {
      await fileService.deleteFiles(savedAvatar);
      throw err;
    }
  }

  static async deleteOne(id) {
    const doc = await userModel.findById(id);

    if (!doc) throw new AppError(`There aren't users with this id!`, 404);

    await fileService.deleteFiles(doc?.avatar);

    await userModel.findByIdAndDelete(id);
  }
}
