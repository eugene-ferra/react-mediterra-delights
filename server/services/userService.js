import bcrypt from "bcrypt";
import crypto from "crypto";
import UserDTO from "../dto/userDTO.js";
import userModel from "../models/userModel.js";
import AppError from "../utils/appError.js";
import FileService from "./fileService.js";
import addLinks from "../utils/addLinks.js";

export default class userService {
  constructor() {
    this._folder = "users";
  }

  async countPages(filterObj, limit = 15) {
    /* count all pages based on filters and items per page (limit) */

    const docs = await userModel.countDocuments(filterObj);
    return Math.ceil(docs / limit);
  }

  async getAll({ filterObj, sortObj, page = 1, limit = 15 }, completeUrl = true) {
    /* get all users with pagination, sorting and filtering */

    const data = await userModel
      .find(filterObj)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!data.length) {
      throw new AppError("Користувачів за таким запитом не знайдено!", 404);
    }

    if (!completeUrl) return data.map((item) => new UserDTO(item));

    return data.map((item) => {
      const user = new UserDTO(item);
      return addLinks(user, ["avatar"]);
    });
  }

  async getOne(id, completeUrl = true) {
    /* get one user by id */

    const doc = await userModel.findById(id).exec();

    if (!doc) throw new AppError("Користувача за таким запитом не знайдено!", 404);

    if (!completeUrl) return new UserDTO(doc);
    return addLinks(new UserDTO(doc), ["avatar"]);
  }

  async testEmail(email) {
    /* test email for uniqueness */

    const doc = await userModel.findOne({ email }).exec();

    if (doc) throw new AppError("Користувач з таким e-mail вже зареєстрований!", 409);

    return true;
  }

  async findUserByEmail(email, completeUrl = true) {
    /* find user by email */

    const doc = await userModel.findOne({ email }).exec();
    if (!doc) throw new AppError("Користувача з таким email не знайдено!", 404);

    if (!completeUrl) return new UserDTO(doc);
    return addLinks(new UserDTO(doc), ["avatar"]);
  }

  async addOne({ name, lastName, email, password }, completeUrl = true) {
    /* create new user */

    await this.testEmail(email);

    const hashPassword = await bcrypt.hash(password, 12);
    const user = await userModel.create({
      name,
      lastName,
      email,
      password: hashPassword,
    });

    if (!completeUrl) return new UserDTO(user);
    return addLinks(new UserDTO(user), ["avatar"]);
  }

  async login(email, password) {
    /* login user (find by email and check password*/

    if (!email || !password) throw new AppError("Неправильний email або пароль!", 400);

    const user = await this.findUserByEmail(email);

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw new AppError("Непривильний email або пароль!", 400);

    return user;
  }

  async createResetToken(email, path) {
    /* create password reset token for user */

    const user = await this.findUserByEmail(email);

    const hours = 2;
    const plainResetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash("sha256")
      .update(plainResetToken)
      .digest("hex");

    await userModel.findOneAndUpdate(
      { email },
      {
        resetToken: hashedResetToken,
        resetTokenExpiresAt: Date.now() + hours * 60 * 60 * 1000,
      }
    );

    return {
      name: user.name,
      link: `${
        process.env.CLIENT_URL
      }/reset-password/${plainResetToken}?email=${email}&next=${path || "/"}`,
      time: `${hours} години`,
    };
  }

  async resetPassword(token, email, password) {
    /* reset user password by token */

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await userModel.findOne({ email: email, resetToken: hashedToken });

    if (!user)
      throw new AppError(
        "Сталася помилка. Зробіть повторний запит на скидання пароля!",
        400
      );
    if (user.resetTokenExpiresAt < Date.now())
      throw new AppError(
        "Пройшло забагато часу з моменту скидання паролю. Зробіть запит на його скидання ще раз!",
        400
      );

    await userModel.findByIdAndUpdate(
      user._id,
      {
        password: await bcrypt.hash(password, 12),
        resetToken: null,
        resetTokenExpiresAt: null,
      },
      { runValidators: true, new: true }
    );

    return addLinks(new UserDTO(user), ["avatar"]);
  }

  async addToArray(id, arrName, itemId) {
    /* add item to array in user document */

    await this.getOne(id);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $push: { [arrName]: itemId } },
      { new: true }
    );
    return addLinks(new UserDTO(updatedUser), ["avatar"]);
  }

  async deleteFromArray(id, arrName, itemId) {
    /* delete item from array in user document */

    await this.getOne(id);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $pull: { [arrName]: itemId } },
      { new: true }
    );
    return addLinks(new UserDTO(updatedUser), ["avatar"]);
  }

  async addToCart(id, product, quantity) {
    /* add item to cart in user document */

    const user = await this.getOne(id);

    const foundItem = user.cart.find(
      (item) => item.id.toString() === product.toString()
    );
    if (foundItem) throw new AppError("Страву вже додано!", 409);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $push: { cart: { id: product, quantity: quantity } } },
      { new: true }
    );
    return addLinks(new UserDTO(updatedUser), ["avatar"]);
  }

  async deleteFromCart(id, productId) {
    /* delete item from cart in user document */

    const user = await this.getOne(id);

    const foundItem = user.cart.find(
      (item) => item.id.toString() === productId.toString()
    );

    if (!foundItem) throw new AppError("Такої страви немає в кошику!", 404);

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $pull: { cart: foundItem } },
      { new: true }
    );
    return addLinks(new UserDTO(updatedUser), ["avatar"]);
  }

  async updateCart(userId, itemId, quantity) {
    /* update item quantity in cart in user document */

    const user = await this.getOne(userId);

    const foundItemIndex = user.cart.findIndex(
      (item) => item.id.toString() === itemId.toString()
    );

    if (foundItemIndex === -1)
      throw new AppError("Такої страви не знайдено в кошику!", 404);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: { [`cart.${foundItemIndex}.quantity`]: quantity },
      },
      { runValidators: true, new: true }
    );

    return addLinks(new UserDTO(updatedUser), ["avatar"]);
  }

  async clearCart(userId) {
    /* clear cart in user document */

    await this.getOne(userId);

    const updatedUser = await userModel.findByIdAndUpdate(userId, { cart: [] });

    return addLinks(new UserDTO(updatedUser), ["avatar"]);
  }

  async updateOne(id, data, avatar, completeUrl = true) {
    /* update user data by id with avatar*/

    const FS = new FileService();

    const prevUser = await this.getOne(id, false);
    const payload = `${data?.name || prevUser.name}-${
      data?.lastName || prevUser.lastName
    }`;

    const savedAvatar = !data?.password
      ? await FS.saveOneImage(avatar, this._folder, payload, 300)
      : null;

    if (savedAvatar) data.avatar = savedAvatar;

    if (data?.oldPassword || data?.password) {
      if (!data?.oldPassword) throw new AppError("Вкажіть поточний пароль!", 400);
      if (!data?.password) throw new AppError("Вкажіть новий пароль!", 400);
      if (!(await bcrypt.compare(data.oldPassword, prevUser.password)))
        throw new AppError("Неправильний пароль!", 400);

      data.password = await bcrypt.hash(data.password, 12);
    }

    try {
      const updatedDoc = await userModel.findByIdAndUpdate(id, data, {
        runValidators: true,
        new: true,
      });

      if (savedAvatar) await FS.deleteFiles(prevUser.avatar);

      if (!completeUrl) return new UserDTO(updatedDoc);
      return addLinks(new UserDTO(updatedDoc), ["avatar"]);
    } catch (err) {
      await FS.deleteFiles(savedAvatar);
      throw err;
    }
  }

  async deleteOne(id) {
    /* delete user by id */

    const FS = new FileService();
    const user = await this.getOne(id, false);

    await userModel.findByIdAndDelete(id);

    await FS.deleteFiles(user?.avatar);
  }
}
